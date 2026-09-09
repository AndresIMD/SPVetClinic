# 🔄 Flujo de Trabajo del Sistema de Reservas

**Última actualización:** 2024-01-15  
**Propósito:** Documentación visual del flujo completo

---

## 📊 Diagrama General del Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                  SISTEMA DE RESERVA ESPECIALISTAS               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘


						USUARIO INGRESA
							  │
							  ▼
		┌──────────────────────────────────────────┐
		│  /reservas/especialistas                 │
		│  - Página Principal                      │
		│  - Indicador de Progreso                 │
		└──────────────────────────────────────────┘
							  │
							  ▼
		╔══════════════════════════════════════════╗
		║  STEP 1: SELECCIONAR ESPECIALISTA       ║
		╚══════════════════════════════════════════╝
							  │
				┌─────────────┼─────────────┐
				│             │             │
		┌───────────────┐  ┌──────────┐ ┌──────────┐
		│  Neurología   │  │ Felina   │ │Endocrino │
		│  Dra. Soto    │  │ Dr. González│ Dra. R   │
		│  $85.000      │  │ $75.000   │ │ $80.000  │
		└───────────────┘  └──────────┘ └──────────┘
				│
		Usuario ▼ Elige
				│
		┌─────────────────────┐
		│ SpecialistSelector  │
		│ .SelectSpecialist() │
		└─────────────────────┘
				│
		BookingState ▼
		.SelectSpecialist()
				│
				▼
		FormData.SelectedSpecialist = ✓
				│
				▼
		NextStep() ──► CurrentStep = TimeSlotSelection
				│
				▼
		╔══════════════════════════════════════════╗
		║  STEP 2: SELECCIONAR FECHA Y HORA       ║
		╚══════════════════════════════════════════╝
				│
				▼
		┌──────────────────────────────────┐
		│ Calendario de Disponibilidad     │
		├──────────────────────────────────┤
		│ [◄] Ene 15-21, 2024 [►]         │
		│                                  │
		│  L   M   W   J   V   S   D      │
		│ 15  16  17  18  19  20  21      │
		│  ✓   ✓   ✓   ✓   ✗   ✓   ✓      │
		│                                  │
		│ Horas disponibles - Martes 16    │
		│ [10:00] [10:30] [11:00]         │
		│ [14:00] [14:30] [15:00]         │
		└──────────────────────────────────┘
				│
		Usuario ▼ Selecciona
				│
		┌─────────────────────┐
		│ TimeSlotCalendar    │
		│ .SelectTimeSlot()   │
		└─────────────────────┘
				│
		BookingState ▼
		.SelectTimeSlot()
				│
				▼
		FormData.SelectedTimeSlot = ✓
				│
				▼
		NextStep() ──► CurrentStep = FormData
				│
				▼
		╔══════════════════════════════════════════╗
		║  STEP 3: COMPLETAR DATOS                 ║
		╚══════════════════════════════════════════╝
				│
				▼
		┌──────────────────────────────────┐
		│ PROPIETARIO                      │
		│ [Nombre: Juan Pérez         ]   │
		│ [Email: juan@example.com    ]   │
		│ [Teléfono: +56 9 6190 0401 ]   │
		├──────────────────────────────────┤
		│ MASCOTA                          │
		│ [Nombre: Rex               ]    │
		│ [Especie: Perro            ]    │
		│ [Raza: Pastor Alemán       ]    │
		│ [Edad: 3 años              ]    │
		├──────────────────────────────────┤
		│ SÍNTOMAS                         │
		│ [Descripción de síntomas...] │
		├──────────────────────────────────┤
		│ RESUMEN                          │
		│ Especialista: Dra. Soto      │
		│ Fecha: Martes, 16 enero      │
		│ Hora: 10:00 AM               │
		│ Valor: $85.000               │
		│                                  │
		│ [Atrás] [Continuar al Pago] │
		└──────────────────────────────────┘
				│
		Usuario ▼ Completa y Envía
				│
		┌─────────────────────┐
		│ BookingForm         │
		│ HandleSubmit()      │
		└─────────────────────┘
				│
		BookingState ▼
		.CreateReservation()
				│
				▼
		┌─────────────────────────────┐
		│ Validar Datos               │
		│ ├─ OwnerName ✓              │
		│ ├─ OwnerEmail ✓             │
		│ ├─ OwnerPhone ✓             │
		│ ├─ PetName ✓                │
		│ ├─ PetSpecies ✓             │
		│ ├─ SelectedSpecialist ✓     │
		│ └─ SelectedTimeSlot ✓       │
		└─────────────────────────────┘
				│
		Datos ▼ Válidos
				│
		┌─────────────────────────────┐
		│ Crear Objeto Reservation    │
		│ - ID: GUID                  │
		│ - Status: Pending           │
		│ - Datos Propietario         │
		│ - Datos Mascota             │
		│ - SpecialistId              │
		│ - TimeSlotId                │
		│ - TotalPrice: $85.000       │
		└─────────────────────────────┘
				│
				▼
		CurrentReservation = ✓
				│
				▼
		NextStep() ──► CurrentStep = Review
				│
				▼
		╔══════════════════════════════════════════╗
		║  STEP 4: REVISAR RESUMEN                 ║
		╚══════════════════════════════════════════╝
				│
				▼
		┌──────────────────────────────────┐
		│ REVISA TU RESERVA                │
		├──────────────────────────────────┤
		│ ESPECIALISTA                     │
		│ • Dra. Catalina Soto            │
		│ • Neurología                    │
		│ • 45 minutos                    │
		├──────────────────────────────────┤
		│ CITA                             │
		│ • Martes, 16 enero 2024         │
		│ • 10:00 AM                      │
		├──────────────────────────────────┤
		│ PROPIETARIO                      │
		│ • Juan Pérez                    │
		│ • juan@example.com              │
		│ • +56 9 6190 0401              │
		├──────────────────────────────────┤
		│ MASCOTA                          │
		│ • Rex (Perro)                   │
		│ • Pastor Alemán, 3 años         │
		├──────────────────────────────────┤
		│ PRECIO TOTAL: $85.000            │
		│                                  │
		│ [☐] Acepto términos             │
		│                                  │
		│ [Editar] [Proceder al Pago] │
		└──────────────────────────────────┘
				│
		Usuario ▼ Confirma
				│
		┌─────────────────────────────┐
		│ BookingSummary              │
		│ OnConfirmed()               │
		└─────────────────────────────┘
				│
		BookingState ▼
		.GoToStep(Payment)
				│
				▼
		╔══════════════════════════════════════════╗
		║  STEP 5: PROCESAMIENTO DE PAGO          ║
		╚══════════════════════════════════════════╝
				│
				▼
		┌──────────────────────────────┐
		│ PAGO SEGURO CON WEBPAY PLUS  │
		├──────────────────────────────┤
		│ Monto: $85.000               │
		│ 🔒 Pago Seguro               │
		│                              │
		│ Tarjetas de Prueba:          │
		│ • 4051885600446623 (Visa)   │
		│ • 5186059559590568 (MC)     │
		│ CVV: 123  Exp: 12/99        │
		│                              │
		│ [🔐 Continuar a WebPay Plus] │
		└──────────────────────────────┘
				│
		Usuario ▼ Hace Clic
				│
		┌──────────────────────────┐
		│ BookingStateService      │
		│ .InitializePayment()     │
		└──────────────────────────┘
				│
				▼
		┌──────────────────────────────────┐
		│ WebPayTransaction Creada         │
		│ - ID: GUID                       │
		│ - ReservationId: RES-123         │
		│ - Amount: 85000                  │
		│ - Currency: CLP                  │
		│ - Status: Pending                │
		└──────────────────────────────────┘
				│
				▼
		┌──────────────────────────────────┐
		│ WebPayService                    │
		│ .InitiateTransaction(...)        │
		└──────────────────────────────────┘
				│
				▼
		┌──────────────────────────────────┐
		│ WEBPAY API (Transbank)           │
		│                                  │
		│ POST /transactions               │
		│ {                                │
		│   buyOrder: "ORD-20240116-1234" │
		│   sessionId: "...",              │
		│   amount: 8500000,               │
		│   returnUrl: "...",              │
		│   buyerEmail: "juan@..."         │
		│ }                                │
		└──────────────────────────────────┘
				│
		WebPay ▼ Responde
				│
		┌──────────────────────────────┐
		│ {                            │
		│   token: "01928374...",      │
		│   url: "https://webpay/..."  │
		│ }                            │
		└──────────────────────────────┘
				│
				▼
		REDIRIGIR A WEBPAY
				│
				▼
		┌──────────────────────────────┐
		│   WEBPAY CHECKOUT            │
		│                              │
		│ Selecciona banco             │
		│ [BancoEstado] [Santander]    │
		│ [Scotiabank] [BBVA]          │
		│                              │
		│ O                            │
		│                              │
		│ Ingresa tarjeta              │
		│ [4051885600446623    ]       │
		│ [Exp: 12/99] [CVV: 123]    │
		│                              │
		│ [Pagar] [Cancelar]           │
		└──────────────────────────────┘
				│
				├──────────────────────┐
				│                      │
	USUARIO PAGA ▼          USUARIO CANCELA ▼
				│                      │
		┌──────────────────┐   ┌──────────────────┐
		│ WebPay Valida    │   │ Redirecciona a   │
		│ • Banco          │   │ /payment/cancel  │
		│ • Fondos         │   │                  │
		│ • 3D Secure      │   │ Reserva NO se    │
		│ • Fraude         │   │ crea             │
		└──────────────────┘   └──────────────────┘
				│
		┌───────┴───────────┐
		│                   │
	Exitoso ▼         Error ▼
		│                   │
	┌────────────┐   ┌──────────────┐
	│ AUTORIZADO │   │ RECHAZADA    │
	│ ResponseOK │   │ Error msg    │
	└────────────┘   └──────────────┘
		│                   │
		▼                   ▼
	Redirige a        Redirige a
	/payment/        /payment/
	return           return
		│                   │
		▼                   ▼
	┌─────────────────────────────────┐
	│ PaymentReturn.razor             │
	│ - Obtiene Token                 │
	│ - Llama GetTransactionResult()  │
	│ - Valida Firma                  │
	└─────────────────────────────────┘
		│
	┌───┴───────────────┐
	│                   │
	Exitoso ▼      Error ▼
		│                 │
	┌──────────────┐  ┌─────────────┐
	│ Status:      │  │ Status:     │
	│ AUTHORIZED   │  │ FAILED      │
	│ TransactionOK│  │ ShowError   │
	└──────────────┘  └─────────────┘
		│
		▼
	┌────────────────────────────────┐
	│ BookingStateService            │
	│ .UpdatePaymentStatus(          │
	│   orderId: "01928374...",       │
	│   isSuccessful: true,           │
	│   responseCode: "00"            │
	│ )                              │
	└────────────────────────────────┘
		│
		▼
	┌────────────────────────────────┐
	│ Reservation.Status =           │
	│ ReservationStatus.Confirmed    │
	│                                │
	│ WebPayTransaction.IsSuccessful │
	│ = true                         │
	│                                │
	│ TimeSlot.IsAvailable = false   │
	│ TimeSlot.ReservationId = RES   │
	└────────────────────────────────┘
		│
		▼
	┌────────────────────────────────┐
	│ EmailService.SendConfirmation( │
	│   email: "juan@example.com",    │
	│   reservationId: "RES-123",     │
	│   appointment: {...}           │
	│ )                              │
	└────────────────────────────────┘
		│
		▼
	┌────────────────────────────────┐
	│ WhatsAppService.SendReminder(  │
	│   phone: "+56961900401",        │
	│   date: "16 enero 10:00 AM"    │
	│ )                              │
	│ [Programado 24h antes]         │
	└────────────────────────────────┘
		│
		▼
	╔══════════════════════════════════════════╗
	║  STEP 6: CONFIRMACIÓN FINAL              ║
	╚══════════════════════════════════════════╝
		│
		▼
	┌──────────────────────────────────┐
	│  ✅ ¡PAGO COMPLETADO!            │
	├──────────────────────────────────┤
	│  Número Reserva: RES-20240116   │
	│  Especialista: Dra. Soto        │
	│  Fecha: Martes, 16 enero        │
	│  Hora: 10:00 AM                 │
	│                                  │
	│  ✓ Email de confirmación        │
	│  ✓ Recordatorio 24h antes       │
	│  ✓ Puedes contactar a cambiar   │
	│                                  │
	│  [🏠 Volver al Inicio]          │
	└──────────────────────────────────┘
		│
		▼
	┌──────────────────────────────────┐
	│ BookingState                     │
	│ .CompleteReservation()           │
	│ CurrentStep = Completed          │
	│                                  │
	│ OnReservationCompleted.Invoke() │
	└──────────────────────────────────┘
		│
		▼
		FIN
```

---

## 🔄 Ciclo de Vida de BookingStateService

```
┌──────────────────────────┐
│  Constructor             │
│  (Inyección de Servicio) │
└──────────────────────────┘
		   │
		   ▼
┌──────────────────────────┐
│  Initialize()            │
│  - Cargar Especialistas  │
│  - Cargar TimeSlots      │
│  - Emitir OnStepChanged  │
└──────────────────────────┘
		   │
		   ▼
┌──────────────────────────┐
│  CurrentStep =           │
│  SpecialistSelection     │
│                          │
│  FormData = {}           │
│  CurrentReservation = ∅  │
│  CurrentTransaction = ∅  │
└──────────────────────────┘
		   │
	┌──────┴──────┐
	│             │
	▼             ▼
┌──────────┐  ┌──────────┐
│NextStep()│  │PrevStep()│
└──────────┘  └──────────┘
	│             │
	▼             ▼
CurrentStep  CurrentStep
   + 1          - 1
	│             │
	└──────┬──────┘
		   │
		   ▼
┌──────────────────────────┐
│  UpdateFormData()        │
│  - UpdateOwnerData()     │
│  - UpdatePetData()       │
│  - UpdateSymptoms()      │
│  - Emitir OnFormChanged  │
└──────────────────────────┘
		   │
		   ▼
┌──────────────────────────┐
│  CreateReservation()     │
│  - Validar Datos         │
│  - Crear Objeto          │
│  - Emitir OnError si falla
└──────────────────────────┘
		   │
	┌──────┴──────┐
	│             │
	▼ Válido      ▼ Error
	│             │
CurrentRes = obj  Error msg
	│             │
	▼             ▼
NextStep()   Emitir Error
	│        Mostrar Msg
	▼
InitializePayment()
	│
	▼
UpdatePaymentStatus()
	│
	▼
CompleteReservation()
	│
	▼
CurrentStep = Completed
	│
	▼
Emitir OnReservationCompleted
	│
	▼
┌──────────────────────────┐
│  Reset() [Opcional]      │
│  - Limpiar todos datos   │
│  - Volver a inicio       │
└──────────────────────────┘
```

---

## 📌 Flujo de Eventos

```
┌─────────────────────────────────────────────────────────┐
│                   EVENT DRIVEN FLOW                     │
└─────────────────────────────────────────────────────────┘

BookingStateService.OnStepChanged
├─► SpecialistBooking.StateHasChanged()
│   └─► Re-render UI con nuevo paso
│
├─► Mostrar/Ocultar componentes
│   ├─ SpecialistSelector (Step 1)
│   ├─ TimeSlotCalendar (Step 2)
│   ├─ BookingForm (Step 3)
│   ├─ BookingSummary (Step 4)
│   ├─ PaymentStep (Step 5)
│   └─ Confirmación (Step 6)
│
└─► Actualizar Indicador de Progreso

BookingStateService.OnFormDataChanged
├─► Validación Real-time
│   └─► Habilitar/Deshabilitar botones
│
└─► Actualizar componentes hijos

BookingStateService.OnError
├─► Mostrar mensaje de error
├─► Registrar en logs
└─► Emitir telemetría

BookingStateService.OnReservationCompleted
├─► Enviar Email
├─► Enviar SMS/WhatsApp
├─► Guardar en base datos
├─► Generar recibo
└─► Mostrar confirmación
```

---

## 🔐 Flujo de Seguridad WebPay

```
					USUARIO
					  │
					  ▼
		┌─────────────────────────────┐
		│ Sistema SPVetClinic         │
		│ (dominio HTTPS)             │
		│                             │
		│ Información de reserva:     │
		│ - Especialista              │
		│ - Fecha/Hora                │
		│ - Datos propietario         │
		│ - Datos mascota             │
		│ ✓ NO incluye tarjeta        │
		└─────────────────────────────┘
					  │
					  ▼
		┌─────────────────────────────┐
		│ WebPay Checkout             │
		│ (diferente dominio HTTPS)   │
		│                             │
		│ Usuario ingresa:            │
		│ - Tarjeta de crédito        │
		│ - Fecha vencimiento         │
		│ - CVV                       │
		│ ✓ Encriptado en cliente     │
		│ ✓ Enviado directo a banco   │
		└─────────────────────────────┘
					  │
					  ▼
		┌─────────────────────────────┐
		│ Banco / Red de Pago         │
		│ (Visa/Mastercard/etc)       │
		│                             │
		│ ✓ Autoriza pago             │
		│ ✓ Valida 3D Secure          │
		│ ✓ Valida Fraude             │
		│ ✓ Retorna token (NO tarjeta)│
		└─────────────────────────────┘
					  │
					  ▼
		┌─────────────────────────────┐
		│ Transbank (Intermediario)   │
		│                             │
		│ ✓ Recibe token              │
		│ ✓ Procesa transacción       │
		│ ✓ Firma respuesta           │
		│ ✓ Devuelve a SPVetClinic    │
		└─────────────────────────────┘
					  │
					  ▼
		┌─────────────────────────────┐
		│ SPVetClinic (PaymentReturn) │
		│                             │
		│ ✓ Recibe token + firma      │
		│ ✓ Valida firma con cert pub │
		│ ✓ Verifica monto            │
		│ ✓ Verifica sessionId        │
		│ ✓ Guarda SOLO token (no #)  │
		│ ✓ Crea reserva              │
		│ ✓ Envía confirmación        │
		└─────────────────────────────┘

DATOS ALMACENADOS EN BBDD:
├─ WebPayTransaction
│  ├─ Id (GUID)
│  ├─ OrderId (de Transbank)
│  ├─ Amount (85000)
│  ├─ Token (ABC123DEF...)  ← TOKEN, NO número tarjeta
│  ├─ CardLast4Digits (6623) ← solo últimos 4
│  ├─ CardType (Visa)
│  ├─ Status (AUTHORIZED)
│  └─ Signature (validada ✓)
│
└─ NUNCA GUARDAMOS:
   ├─ Número completo de tarjeta
   ├─ CVV
   ├─ Fecha vencimiento
   └─ Datos personales tarjeta
```

---

## 📊 Estados de Reserva

```
┌──────────────────────────────────────────────────────┐
│         CICLO DE VIDA DE UNA RESERVA                │
└──────────────────────────────────────────────────────┘


	START (Usuario crea reserva)
	  │
	  ▼
   ┌──────────────────┐
   │ PENDING          │
   ├──────────────────┤
   │ Reserva creada   │
   │ Datos guardados  │
   │ Pago pendiente   │
   │ TimeSlot bloqueado
   │                  │
   │ Válido por: 30m  │
   │ (luego se cancela)
   └──────────────────┘
	  │
	  ▼
   ┌──────────────────┐      ┌──────────────────┐
   │PAYMENT_PROCESSING│ ──→  │ PAYMENT_FAILED   │
   ├──────────────────┤      ├──────────────────┤
   │ Usuario en       │      │ Error en pago    │
   │ WebPay          │      │ TimeSlot libre   │
   │ Ingresando tarj. │      │ Usuario puede    │
   │                  │      │ reintentar       │
   └──────────────────┘      │                  │
	  │                      │ Retorna a PENDING│
	  │                      └──────────────────┘
	  │ Pago exitoso
	  ▼
   ┌──────────────────┐
   │ CONFIRMED        │
   ├──────────────────┤
   │ Pago autorizado  │
   │ Email enviado    │
   │ SMS/WA enviado   │
   │ TimeSlot ocupado │
   │ Reserva vigente  │
   └──────────────────┘
	  │
	  ├─► A solicitud usuario ──┐
	  │                          ▼
	  │                    ┌──────────────────┐
	  │                    │ CANCELLED        │
	  │                    ├──────────────────┤
	  │                    │ Usuario canceló  │
	  │                    │ TimeSlot libre   │
	  │                    │ Reembolso        │
	  │                    └──────────────────┘
	  │
	  └─► En el día de la cita ──► COMPLETED (historial)


TRANSICIONES VÁLIDAS:
├─ PENDING ──► PAYMENT_PROCESSING
├─ PENDING ──► CANCELLED (expira 30m)
├─ PAYMENT_PROCESSING ──► CONFIRMED
├─ PAYMENT_PROCESSING ──► PAYMENT_FAILED
├─ PAYMENT_FAILED ──► PAYMENT_PROCESSING (reintentar)
├─ CONFIRMED ──► CANCELLED (usuario)
└─ CONFIRMED ──► COMPLETED (después de cita)

TRANSICIONES NO VÁLIDAS:
├─ CONFIRMED ──► PENDING (nunca)
├─ CANCELLED ──► CONFIRMED (nunca)
└─ COMPLETED ──► cualquier (es final)
```

---

## 🧩 Componentes en Acción

```
				  SpecialistBooking (Página)
						   │
		  ┌────────────────┼────────────────┐
		  │                │                │
	┌─────────────┐   ┌──────────┐   ┌────────────┐
	│ Componente  │   │ Componente│   │ Componente │
	│ Selector    │   │ Calendar │   │ Form       │
	└─────────────┘   └──────────┘   └────────────┘
		  │                │                │
	Input:           Input:           Input:
	-Specialist   -TimeSlots        -FormData
	List          by Specialist     (pre-filled)
		  │                │                │
	Process:          Process:           Process:
	-Filter active  -Group by date    -Validate
	-Show cards     -Group by time    -Bind data
	-Track select   -Track select     -Create obj
		  │                │                │
	Output:           Output:          Output:
	-Selected*      -Selected*       -Reservation
	-Call Service   -Call Service    -Call Service
		  │                │                │
		  └────────────────┼────────────────┘
						   │
				BookingStateService
				(Servicio Central)
						   │
			┌──────────────┼──────────────┐
			│              │              │
	[FormData]      [Status]        [Events]
	-Specialist     -Step (1-6)      -OnChange
	-TimeSlot       -Valid?          -OnError
	-Owner data     -Ready?          -OnComplete
	-Pet data
			│              │              │
			└──────────────┼──────────────┘
						   │
				  ┌────────┴────────┐
				  │                 │
			[Database]         [WebPay]
			-Reservation       -Transaction
			-TimeSlot update   -Payment data
```

Este diagrama de flujos proporciona una visión completa del sistema desde el inicio hasta la confirmación de la reserva.
