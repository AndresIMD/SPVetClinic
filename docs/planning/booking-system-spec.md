# 📋 Especificación Técnica: Sistema de Reserva de Especialistas

**Versión:** 1.0  
**Fecha:** 2024-01-15  
**Estado:** Implementado (MVP con datos mock)  
**Próximo Paso:** Integración con API backend

---

## 📌 Descripción General

Sistema completo de reserva online para consultas con especialistas veterinarios en San Pablo Vet Clínic. El usuario puede:

1. **Seleccionar especialista** de la lista disponible
2. **Elegir fecha y hora** del calendario disponible
3. **Completar formulario** con datos del propietario y mascota
4. **Revisar resumen** de la cita y precios
5. **Procesar pago** mediante WebPay Plus
6. **Recibir confirmación** con detalles de la cita

---

## 🏗️ Arquitectura

### Componentes Principales

```
Pages/
├── SpecialistBooking.razor       # Página maestra (orquestador)
│
Components/Booking/
├── SpecialistSelector.razor      # Step 1: Seleccionar especialista
├── TimeSlotCalendar.razor        # Step 2: Seleccionar fecha/hora
├── BookingForm.razor             # Step 3: Datos propietario/mascota
├── BookingSummary.razor          # Step 4: Resumen y confirmación
└── PaymentStep.razor             # Step 5: Procesamiento de pago

Services/Booking/
├── BookingStateService.cs        # Gestión de estado compartido
├── BookingMockDataService.cs     # Datos mock (temporal)
└── WebPayService.cs              # [TODO] Integración WebPay Plus

Data/Models/Booking/
├── Specialist.cs                 # Modelo: especialista
├── TimeSlot.cs                   # Modelo: franja horaria
├── Reservation.cs                # Modelo: reserva completa
├── WebPayTransaction.cs          # Modelo: transacción de pago
└── BookingFormData.cs            # DTO: datos del formulario
```

---

## 🔄 Flujo de Estados (State Machine)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  START (SpecialistSelection)                               │
│     │                                                        │
│     ▼                                                        │
│  [1] Elegir Especialista ──────────────────┐               │
│     │                                       │               │
│     ▼                                       │               │
│  [2] Seleccionar Fecha/Hora ────────────┐  │               │
│     │                                    │  │               │
│     ▼                                    │  │               │
│  [3] Completar Formulario ──────────────┤  │               │
│     │                                    │  │               │
│     ▼                                    │  │               │
│  [4] Revisar Resumen ──────────────────┤  │               │
│     │                                    │  │               │
│     ▼                                    │  │               │
│  [5] Pago WebPay ──────────────────┐    │  │               │
│     │         │                     │    │  │               │
│     │    Error│                     │    │  │               │
│     │         └─────────────────────┤────┘  │               │
│     │                              │       │               │
│     ▼ Exitoso                      │       │               │
│  [6] Confirmación ────────────────┘       │               │
│     │                                      │               │
│     ├──► Enviar Email                      │               │
│     ├──► Marcar TimeSlot como Ocupado     │               │
│     │                                      │               │
│     ▼                                      │               │
│  END (Reserva Completada)                 │               │
│                                            │               │
│  [Botón "Atrás" permite retroceder] ──────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Modelos de Datos

### Specialist
```csharp
public class Specialist
{
	public int Id { get; set; }              // ID único
	public string Name { get; set; }         // Nombre del especialista
	public string Specialty { get; set; }    // Especialidad (Neurología, etc.)
	public string Description { get; set; } // Descripción breve
	public string Icon { get; set; }         // Ícono (brain, cat, flask, heart)
	public string AvatarColor { get; set; } // Color (teal, coral, purple)
	public decimal ConsultationPrice { get; set; }      // Precio en CLP
	public int ConsultationDurationMinutes { get; set; } // Duración (30, 45 min)
	public bool IsActive { get; set; }      // Disponible para reservas
}
```

### TimeSlot
```csharp
public class TimeSlot
{
	public int Id { get; set; }
	public int SpecialistId { get; set; }    // FK al especialista
	public DateTime Date { get; set; }       // Fecha de la consulta
	public TimeSpan StartTime { get; set; }  // Hora inicio (HH:mm)
	public TimeSpan EndTime { get; set; }    // Hora fin (HH:mm)
	public bool IsAvailable { get; set; }    // ¿Disponible?
	public int? ReservationId { get; set; }  // FK a reserva (si está ocupada)
}
```

### Reservation
```csharp
public enum ReservationStatus
{
	Pending,           // Creada, pendiente de pago
	PaymentProcessing, // Pagando
	Confirmed,         // Confirmada (pago completado)
	Cancelled,         // Cancelada
	PaymentFailed      // Pago fallido
}

public class Reservation
{
	public string Id { get; set; }                      // GUID único
	public int SpecialistId { get; set; }              // FK especialista
	public int TimeSlotId { get; set; }                // FK hora
	public ReservationStatus Status { get; set; }      // Estado

	// Datos del propietario
	public string OwnerName { get; set; }
	public string OwnerEmail { get; set; }
	public string OwnerPhone { get; set; }

	// Datos de la mascota
	public string PetName { get; set; }
	public string PetSpecies { get; set; }    // Perro, Gato, etc.
	public string? PetBreed { get; set; }
	public string? PetAge { get; set; }

	// Síntomas y notas
	public string? Symptoms { get; set; }
	public string? AdditionalNotes { get; set; }

	// Pago
	public decimal TotalPrice { get; set; }
	public string? WebPayOrderId { get; set; }
	public string? WebPayTransactionId { get; set; }

	// Auditoría
	public DateTime CreatedAt { get; set; }
	public DateTime? ConfirmedAt { get; set; }
}
```

### WebPayTransaction
```csharp
public class WebPayTransaction
{
	public string Id { get; set; }                      // ID único
	public string ReservationId { get; set; }          // FK reserva
	public string OrderId { get; set; }                // Orden WebPay
	public decimal Amount { get; set; }                // Monto CLP
	public string Currency { get; set; } = "CLP";      // Siempre CLP
	public bool IsSuccessful { get; set; }             // ¿Exitosa?
	public string? ResponseCode { get; set; }          // Código respuesta
	public string? ResponseMessage { get; set; }       // Mensaje respuesta
	public string? SessionToken { get; set; }          // Token WebPay
	public string? RedirectUrl { get; set; }           // URL redirige

	// Datos tarjeta (NUNCA guardar datos reales)
	public string? CardToken { get; set; }             // Token, no número
	public string? CardLast4Digits { get; set; }       // Últimos 4 dígitos
	public string? CardType { get; set; }              // Visa, Mastercard

	// Auditoría
	public DateTime CreatedAt { get; set; }
	public DateTime? ProcessedAt { get; set; }
}
```

---

## 🎯 Servicios

### BookingStateService

Gestiona el estado compartido entre componentes. Implementa patrón **Scoped** para mantener datos durante la sesión del usuario.

**Responsabilidades:**
- Mantener estado actual del flujo (paso actual)
- Almacenar datos del formulario
- Validar datos completados
- Emitir eventos de cambio
- Gestionar errores

**Métodos principales:**
```csharp
// Navegación
public void NextStep();
public void PreviousStep();
public void GoToStep(BookingStep step);

// Datos
public void SelectSpecialist(Specialist specialist);
public void SelectTimeSlot(TimeSlot timeSlot);
public void UpdateOwnerData(string name, string email, string phone);
public void UpdatePetData(string name, string species, ...);
public void UpdateSymptoms(string symptoms, string notes);

// Validación y Creación
public bool CreateReservation();
public bool IsValid();

// Pago
public void InitializePayment(decimal amount);
public void UpdatePaymentStatus(string orderId, bool isSuccessful, ...);
public void CompleteReservation();

// Control
public void Reset();
```

**Eventos:**
```csharp
public event Action? OnStepChanged;           // Cambio de paso
public event Action? OnFormDataChanged;       // Cambio en datos
public event Action? OnError;                 // Error
public event Action? OnReservationCompleted;  // Reserva completada
```

### BookingMockDataService

Proporciona datos mock para desarrollo. **Será reemplazado por llamadas a API backend**.

**Datos:**
- 4 especialistas con información completa
- 14 días de horarios generados dinámicamente
- Distribución aleatoria reproducible de horas ocupadas (30%)

**Métodos:**
```csharp
public List<Specialist> GetMockSpecialists();
public Dictionary<int, List<TimeSlot>> GetMockTimeSlots();
```

---

## 🔐 WebPay Plus - Integración

### Estado Actual
- **MVP:** Simulación de pago (sin integración real)
- **Tarjetas de prueba disponibles** en UI de desarrollo
- **Estructura lista** para integración real

### Integración Real (Próxima Fase)

#### Dependencias Necesarias
```xml
<PackageReference Include="WebPayPlus" Version="3.0" />
<!-- O consumir API REST directamente -->
```

#### Flujo Integración WebPay

```
Usuario ──► [Hace clic "Continuar WebPay"] ──►
  │
  ├─► BookingStateService.InitializePayment()
  │
  ├─► Crear transacción con orden única
  │
  ├─► Llamar API WebPay.initTransaction()
  │   - Parámetros: monto, orderId, sessionId
  │   - Retorna: URL de redirección
  │
  ├─► Redirigir usuario a WebPay
  │
  ├─► Usuario completa pago en WebPay
  │
  ├─► WebPay redirige a callback URL con resultado
  │
  ├─► Validar firma de respuesta (CRÍTICO)
  │
  ├─► BookingStateService.UpdatePaymentStatus()
  │
  ├─► Si exitoso:
  │   ├─► Cambiar TimeSlot.IsAvailable = false
  │   ├─► Cambiar Reservation.Status = Confirmed
  │   ├─► Enviar correo de confirmación
  │   └─► Mostrar pantalla de éxito
  │
  └─► Si fallido:
	  ├─► Mantener TimeSlot disponible
	  ├─► Cambiar Reservation.Status = PaymentFailed
	  └─► Mostrar error con opción de reintentar
```

#### Implementación WebPayService.cs (TODO)

```csharp
public class WebPayService
{
	private readonly ILogger<WebPayService> _logger;
	private readonly WebPayConfig _config; // Credenciales en appsettings.json

	/// <summary>
	/// Inicia una transacción con WebPay Plus
	/// </summary>
	public async Task<WebPayResponse> InitiateTransaction(
		decimal amount, 
		string orderId, 
		string returnUrl,
		string sessionId)
	{
		// 1. Crear payload
		// 2. Firmar con llave privada
		// 3. Enviar POST a WebPay API
		// 4. Validar respuesta
		// 5. Retornar URL de redirección
	}

	/// <summary>
	/// Valida respuesta de WebPay después del pago
	/// </summary>
	public async Task<WebPayValidationResult> ValidatePaymentResponse(
		string token,
		string responseCode)
	{
		// 1. Llamar a getTransactionResult(token)
		// 2. Validar firma de respuesta
		// 3. Extraer datos: amountórdenes, estado, etc.
		// 4. Retornar resultado validado
	}
}
```

#### Configuración (appsettings.json)
```json
{
  "WebPay": {
	"Environment": "Development", // o Production
	"CommerceCode": "597055555532", // De WebPay
	"PrivateKey": "...", // PEM format
	"PublicCert": "...",
	"ApiUrl": "https://webpay3gint.transbank.cl/webpayapi/v1.3"
  }
}
```

#### Seguridad - Checklist
- [ ] NO guardar datos de tarjeta (usar tokens WebPay)
- [ ] HTTPS obligatorio en producción
- [ ] Validar firma de todas las respuestas
- [ ] Usar sesiones/tokens seguros
- [ ] Auditar todas las transacciones
- [ ] Cumplir PCI DSS
- [ ] Usar certificados válidos

---

## 📱 Diagrama de Flujo UI

### Step 1: Especialista
```
┌────────────────────────────────────────┐
│ Elige tu Especialista                  │
├────────────────────────────────────────┤
│                                        │
│  [Neurología] [Medicina Felina]        │
│  [Endocrinología] [Cardiología]        │
│                                        │
│  Cada card muestra:                    │
│  - Nombre + Especialidad               │
│  - Descripción                         │
│  - Horario de atención                 │
│  - Duración consulta                   │
│  - Precio                              │
│                                        │
└────────────────────────────────────────┘
```

### Step 2: Calendario
```
┌────────────────────────────────────────┐
│ Selecciona Fecha y Hora                │
├────────────────────────────────────────┤
│                                        │
│  [◄] Ene 15-21, 2024 [►]              │
│                                        │
│  Lun  Mar  Mié  Jue  Vie  Sáb  Dom   │
│  15   16   17   18   19   20   21    │
│  ✓    ✓    ✓    ✓    ✗    ✓    ✓    │
│                                        │
│  Horas disponibles - Martes, 16 Ene   │
│  [10:00]  [10:30]  [11:00] [11:30]   │
│  [14:00]  [14:30]  [15:00] [15:30]   │
│                                        │
└────────────────────────────────────────┘
```

### Step 3: Formulario
```
┌────────────────────────────────────────┐
│ Información de tu Mascota              │
├────────────────────────────────────────┤
│                                        │
│ Datos del Propietario                  │
│ [Nombre Completo        ]              │
│ [Email              ]  [Teléfono      ]│
│                                        │
│ Datos de la Mascota                    │
│ [Nombre Pet  ] [Especie: Perro ▼]     │
│ [Raza        ] [Edad            ]     │
│                                        │
│ Síntomas                               │
│ [Descripción de síntomas...     ]     │
│                                        │
│ Resumen Cita:                          │
│ ✓ Especialista: Dra. Catalina Soto   │
│ ✓ Fecha: Martes, 16 de enero          │
│ ✓ Hora: 10:00 AM                      │
│ ✓ Valor: $85.000                      │
│                                        │
│ [Atrás]  [Continuar al Pago]         │
│                                        │
└────────────────────────────────────────┘
```

### Step 4: Revisión
```
┌────────────────────────────────────────┐
│ Revisa tu Reserva                      │
├────────────────────────────────────────┤
│                                        │
│ ┌──────────────────────────────────┐ │
│ │ ESPECIALISTA                     │ │
│ │ Nombre: Dra. Catalina Soto       │ │
│ │ Especialidad: Neurología         │ │
│ │ Duración: 45 minutos             │ │
│ └──────────────────────────────────┘ │
│                                        │
│ ┌──────────────────────────────────┐ │
│ │ CITA                             │ │
│ │ Fecha: Martes, 16 de enero 2024  │ │
│ │ Hora: 10:00 AM                   │ │
│ └──────────────────────────────────┘ │
│                                        │
│ ┌──────────────────────────────────┐ │
│ │ PROPIETARIO                      │ │
│ │ Nombre: Juan Pérez               │ │
│ │ Email: juan@example.com          │ │
│ │ Teléfono: +56 9 XXXX XXXX       │ │
│ └──────────────────────────────────┘ │
│                                        │
│ ┌──────────────────────────────────┐ │
│ │ MASCOTA                          │ │
│ │ Nombre: Rex                      │ │
│ │ Especie: Perro                   │ │
│ │ Raza: Pastor Alemán              │ │
│ │ Edad: 3 años                     │ │
│ └──────────────────────────────────┘ │
│                                        │
│ Monto Total: $85.000                  │
│                                        │
│ [☐] Acepto términos y condiciones    │
│                                        │
│ [Editar]  [Proceder al Pago]         │
│                                        │
└────────────────────────────────────────┘
```

### Step 5: Pago
```
┌────────────────────────────────────────┐
│ Confirmar Pago                         │
├────────────────────────────────────────┤
│                                        │
│ Resumen del Pago                       │
│ ┌──────────────────────────────────┐ │
│ │ Consulta Veterinaria  $85.000    │ │
│ ├──────────────────────────────────┤ │
│ │ TOTAL             $85.000        │ │
│ └──────────────────────────────────┘ │
│                                        │
│ 🔒 Pago Seguro con WebPay Plus       │
│                                        │
│ [🔐 Continuar a WebPay Plus]         │
│                                        │
│ No almacenamos tus datos de tarjeta   │
│                                        │
│ [Volver]                              │
│                                        │
└────────────────────────────────────────┘
```

### Step 6: Confirmación
```
┌────────────────────────────────────────┐
│                                        │
│ ✅ ¡Pago Completado!                 │
│                                        │
│ Tu reserva ha sido confirmada          │
│                                        │
│ Número de Reserva: RES-20240116-1234  │
│                                        │
│ Especialista: Dra. Catalina Soto      │
│ Fecha: Martes, 16 de enero            │
│ Hora: 10:00 AM                        │
│                                        │
│ Próximos Pasos:                        │
│ ✓ Email de confirmación en            │
│   juan@example.com                     │
│ ✓ Recordatorio 24h antes de tu cita   │
│ ✓ Puedes cambiar la hora si necesitas │
│                                        │
│ [🏠 Volver al Inicio]                 │
│                                        │
└────────────────────────────────────────┘
```

---

## 🚀 Instalación y Setup

### 1. Registrar Servicios (Program.cs)

```csharp
// Agregar al Program.cs
builder.Services.AddScoped<BookingStateService>();
builder.Services.AddScoped<BookingMockDataService>();
// builder.Services.AddScoped<WebPayService>(); // TODO: cuando integres WebPay
```

### 2. Ruta en Navegación

```html
<!-- En TopNav.razor o menú de navegación -->
<a href="/reservas/especialistas">Reservar Especialista</a>
```

### 3. Estilos (wwwroot/css/booking.css)

```css
/* Estilos específicos para componentes Booking */
/* Ver archivo booking.css en esta carpeta */
```

---

## 🧪 Testing

### Unit Tests (BookingStateService)
- [ ] Validación de pasos
- [ ] Cambio de estado
- [ ] Validación de datos
- [ ] Creación de reserva
- [ ] Eventos

### Integration Tests
- [ ] Flujo completo sin pago
- [ ] Validación de formulario
- [ ] Carga de especialistas/horarios

### E2E Tests (Selenium/Playwright)
- [ ] Seleccionar especialista
- [ ] Navegar calendario
- [ ] Llenar formulario
- [ ] Ver resumen
- [ ] Simular pago

---

## 🔮 Próximas Fases

### Fase 2: Backend API
- [ ] Crear endpoints para especialistas
- [ ] Crear endpoints para TimeSlots
- [ ] Crear endpoints para Reservas
- [ ] Autenticación de usuarios
- [ ] Base de datos persistente

### Fase 3: Integración WebPay Real
- [ ] Obtener credenciales de WebPay
- [ ] Implementar WebPayService.cs
- [ ] Validar firmas de respuesta
- [ ] Callbacks y webhooks
- [ ] Testing con tarjetas reales

### Fase 4: Notificaciones
- [ ] Emails de confirmación
- [ ] SMS/WhatsApp de recordatorio
- [ ] Notificaciones de cambios
- [ ] Confirmación de asistencia

### Fase 5: Admin Panel
- [ ] Gestión de especialistas
- [ ] Gestión de horarios disponibles
- [ ] Listado de reservas
- [ ] Cambios/cancelaciones
- [ ] Reportes

---

## 📚 Referencias

- [Documentación WebPay Plus](https://www.transbank.cl/productos-y-servicios/webpay)
- [Blazor Lifecycle](https://docs.microsoft.com/en-us/aspnet/core/blazor/lifecycle)
- [EditForm Validation](https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation)
- [State Management Blazor](https://docs.microsoft.com/en-us/aspnet/core/blazor/state-management)

---

## ✅ Checklist de Implementación

- [x] Modelos de datos
- [x] Componentes UI
- [x] Servicio de estado
- [x] Datos mock
- [x] Página principal
- [x] Flujo completo (MVP)
- [ ] Estilos CSS completos
- [ ] Integración WebPay real
- [ ] Backend API
- [ ] Base de datos
- [ ] Envío de emails
- [ ] Tests unitarios
- [ ] Tests E2E
- [ ] Documentación de usuario
- [ ] Deployment a producción
