# LISTA REVISADA - CAPTURAS NECESARIAS

## 📸 PÁGINAS QUE NECESITO CAPTURAR

### ✅ YA COMPLETADO (Sin capturas necesarias)
- [x] Agregar redirección de los botones de urgencia → Contacto
- [x] Quitar selección inicial de divs
- [x] Transparencia del hero mejorada
- [x] Footer con crédito de desarrollador
- [x] Alerta flotante persistente (localStorage)

---

### 🔴 **CAPTURAS NECESARIAS - Orden de Prioridad**

#### **PÁGINA 1: `/especialistas`
**¿QUÉ CAPTURAR?**
- Scroll a la sección final (donde dice "Abono del 50%")
- Captura la zona con:
  - BookingHint (alerta gris con mensaje "Las citas con especialistas requieren 50% de abono")
  - Los dos botones debajo (WhatsApp + Reserva Online)
- Muéstrame cómo se ven ACTUALMENTE (el espaciado, alineación, tamaño)

**¿QUÉ NECESITO HACER?**
- Quitar BookingHint
- Agregar un mensaje de aviso DEBAJO del botón "Reserva Online"
- Simplificar: solo 1 botón de acción (Reserva Online)

**¿DESKTOP O MOBILE?**
- Desktop: sí (para ver el layout completo)
- Mobile: optional (solo si difiere mucho)

---

#### **PÁGINA 2: `/vet-movil`
**¿QUÉ CAPTURAR?**
- Sección HERO (título, subtítulo, botones)
- Botón "Ver Servicios" que dices es más pequeño
- Compáralo visualmente con otros botones de la página (ej: "Agendar Visita")

**¿QUÉ NECESITO HACER?**
- Igualar tamaño del botón "Ver Servicios" con otros botones secundarios
- Probablemente ajuste en padding o font-size

**¿DESKTOP O MOBILE?**
- Desktop: sí
- Mobile: optional

---

#### **PÁGINA 3: `/vacunacion`
**¿QUÉ CAPTURAR?**
1. **Alerta flotante en la parte superior** (promo 20% OFF)
   - ¿Se ve cortada por la parte superior?
   - ¿Qué distancia tiene con respecto al navbar?

2. **Gráfico de fechas de vacunación** (calendario)
   - Sección "Calendarios" → "Calendario de Vacunación para Perros"
   - El gráfico actual con fechas (6-8 semanas, etc.)
   - Compáralo con el gráfico de la página `/conocenos` (timeline de historia)

**¿QUÉ NECESITO HACER?**
- Ajustar espaciado/altura de alerta flotante
- Rediseñar el calendario para que sea coherente con el timeline de "Conócenos"

**¿DESKTOP O MOBILE?**
- Desktop: sí (ambas secciones)

---

#### **PÁGINA 4: `/hospitalizacion`
**¿QUÉ CAPTURAR?**
- Sección HERO o CTA final con botones de contacto/urgencia
- ¿Qué botones ves actualmente?
- ¿Cuál es el número que aparece?

**¿QUÉ NECESITO HACER?**
- Cambiar números de "Hospital" por números de "Recepción"
- Probablemente modificar AppConstants.cs y los botones

**¿DESKTOP O MOBILE?**
- Desktop: sí

---

#### **PÁGINA 5: `/contacto`
**¿QUÉ CAPTURAR?**
- Sección "Antes de tu visita" (donde ves los emojis)
- Muéstrame los emojis actuales
- Compáralo con los iconos que se usan en otras secciones de la página

**¿QUÉ NECESITO HACER?**
- Reemplazar emojis por componente Icon() (mismo que usas en el resto del sitio)

**¿DESKTOP O MOBILE?**
- Desktop: sí

---

#### **PÁGINA 6: `/` (HOME - Navbar + Botón flotante de urgencias)**
**¿QUÉ CAPTURAR?**
1. **NavBar** - Mensaje "Urgencias 24/7"
   - Cómo se ve actualmente (debe tener animación breathing después)

2. **Botón flotante rojo (EmergencyFab)** en la esquina inferior derecha
   - Estado CERRADO (solo ícono de reloj)
   - Estado ABIERTO (dropdown desplegado)
   - ¿El ícono se ve bien al cambiar a "X"?
   - ¿Queda abierto cuando haces clic en otra parte?

**¿QUÉ NECESITO HACER?**
- Animar el mensaje "Urgencias 24/7" en navbar (breathing: cambio tamaño + color)
- Agregar animación inicial al botón flotante (mostrar "contacto de urgencias" 3 seg, luego desaparecer)
- Cambiar ícono de reloj a "X" al abrir dropdown (y darle color correcto)
- Cerrar dropdown si haces clic fuera
- Agregar opción "Dirección" al dropdown que lleve a contacto#mapa

**¿DESKTOP O MOBILE?**
- Desktop: sí
- Mobile: sí (es importante verlo en ambos)

---

#### **PÁGINA 7: `/conocenos`
**¿QUÉ CAPTURAR?**
- Sección "Historia" → gráfico de timeline
- Esto me servirá de REFERENCIA para rediseñar el calendario de vacunación

**¿NECESITO QUE HAGAS ALGO?**
- No, solo es referencia visual

---

## 📋 ORDEN RECOMENDADO PARA CAPTURAR

1. **HOME** (botón flotante + navbar) - CRÍTICA
2. **ESPECIALISTAS** - CRÍTICA (cambio de layout)
3. **VET MÓVIL** - Media (ajuste simple)
4. **VACUNACIÓN** - Media (ajuste + rediseño)
5. **CONTACTO** - Media (reemplazar emojis)
6. **HOSPITALIZACIÓN** - Baja (cambio de números)
7. **CONÓCENOS** - Baja (solo referencia)

---

## 🎯 CÓMO ENVIAR LAS CAPTURAS

**Opción A: Aquí en el chat**
- Copia/pega las imágenes directamente

**Opción B: URL de desarrollo local**
- Si tienes el sitio corriendo: `http://localhost:PORT/`
- Yo puedo asumir ciertos detalles

**Opción C: Descripción textual**
- Para cada página, describe:
  - Qué ves (elementos, colores, espaciado)
  - Qué NO funciona bien
  - Qué quieres que cambie

---

## ⚡ QUICK ACTION ITEMS (Sin captura)

Estos puedo hacerlos ahora mismo:

- [ ] **Visión y objetivo en Historia** - ¿Qué texto quieres? Dame el contenido.
- [ ] **Números de Hospitalización** - ¿Cuál es el número de recepción? Dame el número.
- [ ] **NavBar breathing animation** - Puedo hacerlo ya en CSS

¿Quieres que comience con estos mientras capturan las pantallas?

---

**¿Cuándo puedes mandar las capturas?** 📸
