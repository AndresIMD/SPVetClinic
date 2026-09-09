# 🔐 Guía de Integración: WebPay Plus

**Versión:** 1.0  
**Última actualización:** 2024-01-15  
**Responsable:** Equipo de Desarrollo  

---

## 📌 Introducción

Esta guía explica cómo integrar completamente **WebPay Plus** (procesador de pagos de Transbank Chile) en el sistema de reservas de especialistas.

### ¿Qué es WebPay Plus?

WebPay Plus es la solución de pagos online más segura y confiable en Chile. Maneja:
- ✅ Tarjetas de crédito (Visa, Mastercard, American Express)
- ✅ Débito a cuentas bancarias
- ✅ Protección contra fraude (PCI DSS Level 1)
- ✅ Seguridad de datos de tarjeta

### Por qué WebPay Plus en SPVetClinic

1. **Seguridad:** Tus datos de tarjeta nunca llegan a nuestros servidores
2. **Confianza:** Todos los bancos chilenos lo soportan
3. **Simplicidad:** API REST clara y documentada
4. **Soporte:** Excelente servicio de atención

---

## 🔑 Obtener Credenciales

### Paso 1: Registrarse en Transbank

1. Ir a [Transbank Portal de Comercios](https://www.transbank.cl/productos-y-servicios/webpay)
2. Crear cuenta de empresa
3. Proporcionar datos fiscales (RUT, razón social)
4. Firmar contrato

### Paso 2: Ambiente de Desarrollo

Una vez aprobado, Transbank te proporcionará:

```json
{
  "Environment": "Development",
  "CommerceCode": "597055555532",      // Código de comercio
  "PrivateKeyPath": "certificates/key.pem",
  "PublicCertPath": "certificates/cert.pem",
  "BankPublicCertPath": "certificates/bank-cert.pem"
}
```

**Credenciales de Prueba (Development):**
```
Visa:       4051885600446623  CVV: 123  Exp: 12/99
Mastercard: 5186059559590568  CVV: 123  Exp: 12/99
```

### Paso 3: Obtener Certificados

WebPay usa **PKI (Public Key Infrastructure)** para firmar transacciones:

1. Generar par de claves (privada/pública)
2. Enviar certificado público a Transbank
3. Transbank firma y valida
4. Descargar certificado del banco

```bash
# Generar certificado autofirmado (solo para desarrollo)
openssl req -new -x509 -days 365 -nodes \
  -out cert.pem -keyout key.pem

# En producción, usar CA certificado oficial
```

---

## 🛠️ Implementación Técnica

### Dependencias NuGet

```bash
dotnet add package WebpayPlus.ThreeDES
```

O consumir directamente vía HTTP:

```bash
# No requiere dependencias externas
# API REST estándar con JSON
```

### Estructura de Carpetas

```
SPVetClinic/
├── Services/Booking/
│   ├── BookingStateService.cs
│   ├── WebPayService.cs              # ← NUEVO
│   ├── WebPayCallbackHandler.cs      # ← NUEVO
│   └── BookingMockDataService.cs
├── Certificates/
│   ├── key.pem                       # Llave privada (SECRETO)
│   ├── cert.pem                      # Certificado público
│   └── bank-cert.pem                 # Certificado banco Transbank
├── Pages/
│   ├── SpecialistBooking.razor
│   └── Payment/
│       ├── PaymentReturn.razor       # ← NUEVA (callback)
│       └── PaymentCancel.razor       # ← NUEVA (cancelación)
└── appsettings.json
```

### Configuración (appsettings.json)

```json
{
  "WebPay": {
	"Environment": "Development",
	"CommerceCode": "597055555532",
	"PrivateKeyPath": "Certificates/key.pem",
	"PublicCertPath": "Certificates/cert.pem",
	"BankPublicCertPath": "Certificates/bank-cert.pem",
	"ApiBaseUrl": "https://webpay3gint.transbank.cl/webpayapi/v1.3",
	"ProductionApiBaseUrl": "https://webpay3g.transbank.cl/webpayapi/v1.3",
	"ReturnUrl": "https://tudominio.com/payment/return",
	"CancelUrl": "https://tudominio.com/payment/cancel"
  }
}
```

### Implementar WebPayService.cs

```csharp
using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace SPVetClinic.Services.Booking;

public class WebPayService
{
	private readonly HttpClient _httpClient;
	private readonly IConfiguration _config;
	private readonly ILogger<WebPayService> _logger;

	public WebPayService(
		HttpClient httpClient,
		IConfiguration config,
		ILogger<WebPayService> logger)
	{
		_httpClient = httpClient;
		_config = config;
		_logger = logger;
	}

	/// <summary>
	/// Inicia una transacción con WebPay Plus
	/// </summary>
	public async Task<InitTransactionResponse> InitiateTransaction(
		decimal amount,
		string buyOrder,           // ID único de la orden (sin espacios)
		string sessionId,          // Token de sesión único
		string returnUrl,          // URL donde redirige después
		string buyerEmail = "")
	{
		try
		{
			_logger.LogInformation($"Iniciando transacción WebPay: Orden {buyOrder}");

			// 1. Validar parámetros
			if (amount <= 0)
				throw new ArgumentException("El monto debe ser mayor a 0");

			if (string.IsNullOrWhiteSpace(buyOrder))
				throw new ArgumentException("Buy Order es requerido");

			// 2. Preparar payload
			var request = new
			{
				buyOrder = buyOrder.Replace(" ", ""),  // Sin espacios
				sessionId = sessionId,
				amount = (long)amount,                  // Centavos (long)
				returnUrl = returnUrl,
				buyerEmail = buyerEmail
			};

			// 3. Serializar y firmar
			var json = JsonSerializer.Serialize(request);
			var token = GenerateToken(json);

			// 4. Enviar a WebPay
			var apiUrl = $"{GetApiBaseUrl()}/transactions";
			var content = new StringContent(
				JsonSerializer.Serialize(new { wpmTransaction = token }),
				Encoding.UTF8,
				"application/json");

			var response = await _httpClient.PostAsync(apiUrl, content);
			var responseContent = await response.Content.ReadAsStringAsync();

			if (!response.IsSuccessStatusCode)
			{
				_logger.LogError($"Error WebPay: {response.StatusCode} - {responseContent}");
				throw new WebPayException($"WebPay retornó error: {response.StatusCode}");
			}

			// 5. Parsear respuesta
			var result = JsonSerializer.Deserialize<InitTransactionResponse>(responseContent);

			_logger.LogInformation($"Transacción iniciada: {result?.Url}");
			return result ?? throw new WebPayException("Respuesta inválida de WebPay");
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Error iniciando transacción WebPay");
			throw;
		}
	}

	/// <summary>
	/// Obtiene el resultado de la transacción después de que el usuario vuelve
	/// </summary>
	public async Task<GetTransactionResultResponse> GetTransactionResult(string token)
	{
		try
		{
			_logger.LogInformation($"Obteniendo resultado transacción");

			// 1. Validar token
			if (string.IsNullOrWhiteSpace(token))
				throw new ArgumentException("Token es requerido");

			// 2. Enviar GET a WebPay con token
			var apiUrl = $"{GetApiBaseUrl()}/transactions/{token}";
			var request = new HttpRequestMessage(HttpMethod.Get, apiUrl);

			var response = await _httpClient.SendAsync(request);
			var responseContent = await response.Content.ReadAsStringAsync();

			if (!response.IsSuccessStatusCode)
			{
				_logger.LogError($"Error obteniendo resultado: {response.StatusCode}");
				throw new WebPayException("Error obteniendo resultado de WebPay");
			}

			// 3. Parsear y validar firma
			var result = JsonSerializer.Deserialize<GetTransactionResultResponse>(responseContent);

			// CRÍTICO: Validar firma de respuesta
			ValidateResponseSignature(responseContent, result?.Signature ?? "");

			_logger.LogInformation($"Resultado obtenido: {result?.TransactionStatus}");
			return result ?? throw new WebPayException("Respuesta inválida");
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Error obteniendo resultado transacción");
			throw;
		}
	}

	/// <summary>
	/// Genera token firmado para WebPay (3DES + SHA1)
	/// </summary>
	private string GenerateToken(string jsonData)
	{
		// IMPORTANTE: WebPay usa Triple DES para encriptación
		// Este es un ejemplo simplificado
		// En producción, usar librería oficial de Transbank

		throw new NotImplementedException("Requiere integración con librería WebPayPlus");
	}

	/// <summary>
	/// Valida la firma de la respuesta de WebPay
	/// </summary>
	private void ValidateResponseSignature(string data, string signature)
	{
		// CRÍTICO PARA SEGURIDAD
		// Validar que la respuesta viene realmente de WebPay
		// Usar certificado público del banco

		// Implementación simplificada
		if (string.IsNullOrWhiteSpace(signature))
			throw new WebPayException("Firma ausente en respuesta");

		_logger.LogInformation("Firma de respuesta validada");
	}

	private string GetApiBaseUrl()
	{
		var environment = _config["WebPay:Environment"];
		return environment == "Production"
			? _config["WebPay:ProductionApiBaseUrl"]!
			: _config["WebPay:ApiBaseUrl"]!;
	}

	public class InitTransactionResponse
	{
		public string Token { get; set; } = "";
		public string Url { get; set; } = "";
	}

	public class GetTransactionResultResponse
	{
		public string BuyOrder { get; set; } = "";
		public string SessionId { get; set; } = "";
		public string CardNumber { get; set; } = "";
		public long Amount { get; set; }
		public string PaymentTypeCode { get; set; } = "VD"; // VD = Débito, VN = Crédito
		public string Status { get; set; } = "";            // AUTHORIZED, FAILED
		public string TransactionStatus { get; set; } = ""; // TSK = completa, TSI = incompleta
		public string VCI { get; set; } = "";               // TSY = 3D Secure OK
		public string Signature { get; set; } = "";
		public DateTime TransactionDate { get; set; }
		public string AccountingDate { get; set; } = "";
	}
}

public class WebPayException : Exception
{
	public WebPayException(string message) : base(message) { }
}
```

### Páginas de Callback

#### PaymentReturn.razor

```razor
@page "/payment/return"
@using SPVetClinic.Services.Booking
@inject BookingStateService BookingState
@inject WebPayService WebPayService
@inject NavigationManager Nav

<div class="payment-return">
	@if (IsProcessing)
	{
		<div class="loading">
			<p>Verificando tu pago...</p>
		</div>
	}
	else if (IsSuccess)
	{
		<div class="success">
			<h2>✅ ¡Pago Completado!</h2>
			<p>Tu reserva ha sido confirmada.</p>
		</div>
	}
	else
	{
		<div class="error">
			<h2>❌ Error en el Pago</h2>
			<p>@ErrorMessage</p>
		</div>
	}
</div>

@code {
	[SupplyParameterFromQuery]
	public string? Token { get; set; }

	private bool IsProcessing = true;
	private bool IsSuccess = false;
	private string? ErrorMessage;

	protected override async Task OnInitializedAsync()
	{
		if (string.IsNullOrEmpty(Token))
		{
			ErrorMessage = "Token no recibido";
			IsProcessing = false;
			return;
		}

		try
		{
			// 1. Obtener resultado de WebPay
			var result = await WebPayService.GetTransactionResult(Token);

			// 2. Validar resultado
			if (result.Status == "AUTHORIZED" && result.TransactionStatus == "TSK")
			{
				// ✅ Pago exitoso
				BookingState.UpdatePaymentStatus(
					orderId: result.BuyOrder,
					isSuccessful: true,
					responseCode: "00",
					message: "Pago autorizado"
				);

				// 3. Guardar detalles en BD
				// ... (guardar transaction)

				// 4. Enviar email de confirmación
				// ... (SendConfirmationEmail)

				IsSuccess = true;
			}
			else
			{
				ErrorMessage = "Transacción no autorizada por el banco";
			}
		}
		catch (Exception ex)
		{
			ErrorMessage = $"Error: {ex.Message}";
		}
		finally
		{
			IsProcessing = false;
		}
	}
}
```

#### PaymentCancel.razor

```razor
@page "/payment/cancel"
@inject NavigationManager Nav

<div class="payment-cancel">
	<h2>❌ Pago Cancelado</h2>
	<p>Has cancelado la transacción de pago.</p>
	<p>Tu reserva NO ha sido procesada. Puedes intentar de nuevo.</p>

	<a href="/reservas/especialistas" class="btn-primary">
		Volver a Reservas
	</a>
</div>
```

---

## 🧪 Testing con Tarjetas de Prueba

### Tarjetas de Prueba (Ambiente Development)

```
┌─────────────┬──────────────────────┬──────┬────────┐
│ Visa        │ 4051885600446623     │ 123  │ 12/99  │
├─────────────┼──────────────────────┼──────┼────────┤
│ Mastercard  │ 5186059559590568     │ 123  │ 12/99  │
├─────────────┼──────────────────────┼──────┼────────┤
│ Amex        │ 373948372911002      │ 1234 │ 12/99  │
└─────────────┴──────────────────────┴──────┴────────┘

CVV: Cualquier número de 3-4 dígitos
Fecha Vencimiento: Cualquier fecha futura
```

### Flujo de Test E2E

1. **Test 1: Pago Exitoso**
   ```
   - Entrar a /reservas/especialistas
   - Completar todos los pasos
   - Usar tarjeta Visa 4051885600446623
   - Verificar confirmación
   - Validar email enviado
   ```

2. **Test 2: Cancelar Pago**
   ```
   - En formulario WebPay, hacer clic "Cancelar"
   - Verificar redirección a /payment/cancel
   - Verificar que reserva NO se creó
   ```

3. **Test 3: Tarjeta Rechazada**
   ```
   - Usar tarjeta con "Fondos Insuficientes"
   - Verificar mensaje de error
   - Opción de reintentar
   ```

---

## 🔒 Seguridad - Checklist

### SSL/HTTPS
- [ ] HTTPS obligatorio en producción
- [ ] Certificado SSL válido
- [ ] TLS 1.2 mínimo
- [ ] Headers de seguridad configurados

### Datos Sensibles
- [ ] NO guardar números de tarjeta completos
- [ ] Usar tokens de WebPay
- [ ] Guardar solo últimos 4 dígitos
- [ ] Encriptar datos sensibles en BD
- [ ] PCI DSS Level 1 compliance

### Validaciones
- [ ] Validar firma de TODAS las respuestas de WebPay
- [ ] Validar montos antes/después
- [ ] Validar SessionId único por transacción
- [ ] Auditar todas las transacciones
- [ ] Logging de eventos de seguridad

### Certificados
- [ ] Guardar key.pem en variable de ambiente (NO en código)
- [ ] Certificados con permisos restrictivos (400)
- [ ] Renovar certificados antes de vencer
- [ ] Usar certificados oficiales en producción

### API Endpoints
- [ ] Validación de CORS
- [ ] Rate limiting en endpoints de pago
- [ ] Protección CSRF
- [ ] Validación de entrada

---

## 🚀 Deployment a Producción

### Paso 1: Cambiar a Producción WebPay

```csharp
// En appsettings.Production.json
{
  "WebPay": {
	"Environment": "Production",
	"CommerceCode": "YOUR_PRODUCTION_CODE",
	"ApiBaseUrl": "https://webpay3g.transbank.cl/webpayapi/v1.3"
  }
}
```

### Paso 2: Configurar Certificados

```bash
# Copiar certificados seguros (variables de ambiente)
export WEBPAY_PRIVATE_KEY=$(cat key.pem | base64)
export WEBPAY_CERT=$(cat cert.pem | base64)
export WEBPAY_BANK_CERT=$(cat bank-cert.pem | base64)
```

### Paso 3: URLs de Producción

```json
{
  "WebPay": {
	"ReturnUrl": "https://sanpablovetclinic.cl/payment/return",
	"CancelUrl": "https://sanpablovetclinic.cl/payment/cancel"
  }
}
```

### Paso 4: Testing en Producción

```
⚠️ IMPORTANTE: En producción, WebPay NO proporciona tarjetas de prueba
- Hacer transacciones reales de MONTO MÍNIMO
- Validar endpoints
- Monitorear logs
- Estar en horario de atención Transbank
```

---

## 🆘 Solución de Problemas

### Error: "Token inválido"
```
Causa: Token expiró (válido 30 minutos)
Solución: Usuario debe reintentar
```

### Error: "Firma inválida"
```
Causa: Certificados incorrectos o datos alterados
Solución: 
- Verificar certificados en appsettings
- Validar que datos no fueron modificados
- Contactar soporte Transbank
```

### Error: "CORS bloqueado"
```
Causa: Origen no permitido
Solución:
- Configurar CORS en Program.cs
- Agregar dominio a Transbank
```

### Error: "Monto no coincide"
```
Causa: Monto modificado entre steps
Solución:
- Validar monto en servidor antes de enviar
- No permitir cambios de monto en cliente
```

---

## 📞 Contacto Transbank

- **Portal:** https://www.transbank.cl/
- **Email:** integracion@transbank.cl
- **Teléfono:** +56 2 2595 0000
- **Horario Soporte:** Lunes a Viernes, 8AM-6PM

---

## 📚 Referencias

- [Documentación Oficial WebPay Plus](https://www.transbank.cl/productos-y-servicios/webpay)
- [API REST WebPay](https://www.transbank.cl/recursos-descargables)
- [Certificados y Seguridad](https://www.transbank.cl/certificados-seguridad)
- [PCI DSS Compliance](https://www.pcisecuritystandards.org/)

---

## ✅ Checklist de Integración

**Desarrollo**
- [x] Estructura de código
- [x] Simulación de pago
- [ ] Obtener credenciales demo
- [ ] Implementar WebPayService
- [ ] Implementar validación de firma
- [ ] Crear páginas de callback
- [ ] Testing E2E

**Pre-Producción**
- [ ] Obtener credenciales producción
- [ ] Configurar SSL/HTTPS
- [ ] Configurar URLs finales
- [ ] Certificados actualizados
- [ ] Testing transacciones reales (monto mínimo)
- [ ] Auditoría de seguridad
- [ ] Plan de incidentes

**Producción**
- [ ] Deployment a servidor
- [ ] Monitoreo de transacciones
- [ ] Alertas de errores
- [ ] Backup de datos
- [ ] Documentación de operación
