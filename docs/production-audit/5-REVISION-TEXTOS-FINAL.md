# Revisión final de textos — antes de publicar para el cliente

Revisión de todo el texto visible de las 12 páginas y de los componentes que realmente se muestran
(Home, layout, datos en `AppConstants.cs` y `Specialties.cs`). Complementa a `2-CONTENT_REVIEW.md`.

Alcance: ortografía, gramática, tono, consistencia entre páginas y afirmaciones que el cliente debe confirmar.
Lo que era un error objetivo se corrigió; **lo que es una afirmación de negocio o clínica NO se cambió**
(no podemos verificarla desde el código): queda listado abajo para que el cliente la confirme.

---

## 1. Corregido en esta revisión

| Dónde | Antes | Ahora | Por qué |
|---|---|---|---|
| Conócenos | Sin visión ni objetivo | Tarjetas "Nuestra Visión" / "Nuestro Objetivo" | Pendiente del tracker. **Es un borrador**, ver §2 |
| Conócenos (hero) | Título "Nuestra Historia" y, justo debajo, otro H2 "Nuestra Historia" | Título "Conócenos" | Repetición |
| Conócenos / `AppConstants` | Subtítulo del hero: "más de 10 años…" en minúscula | "Más de 10 años…" | Empezaba la frase en minúscula. Nuevo `YearsOfServiceCapitalized` |
| Contacto | "incluyendo festivos" (2 veces) | "incluyendo feriados" | En Chile es *feriados*; el resto del sitio ya lo usa |
| Exámenes | Meta description: "urianálisis" | "uroanálisis" | El catálogo de la misma página dice "Uroanálisis" |
| Exámenes | "Completo rango de estudios…" | "Un amplio rango de estudios…" | Calco del inglés |
| Exámenes | "Procesamiento in-house" | "Procesamiento en la clínica" | Anglicismo |
| Exámenes | "UPC (Ratio Proteína/Creatinina)" | "UPC (Relación Proteína/Creatinina)" | Término estándar |
| Especialistas | "a su área de expertise" | "a su especialidad" | Anglicismo |
| Hospitalización | "llama directamente a número de recepción" | "…al número de recepción" | Gramática |
| Hospitalización | Botón "Consultas WhatsApp" | "Consultas por WhatsApp" | Gramática |
| Hospitalización | Estadística "más de 10 años / Años de Experiencia" | "10+ / Años de Experiencia" | Redundante |
| `AppConstants.Hospital.InfoPolicy` | "Información del paciente se le dará solo al tutor responsable registrado en ficha" | "La información del paciente se entrega solo al tutor responsable registrado en la ficha clínica" | Redacción |
| Servicios | Vet Móvil listaba "Atención de urgencias" | "Control de pacientes crónicos" | **Contradicción**: el FAQ de Vet Móvil dice que el móvil *no* atiende urgencias |
| Servicios | "Hospitalización 24hrs" | "Hospitalización 24/7" | Formato consistente con el resto |
| Parvovirus | "…probabilidad de sobrevivir" · "puede ser mortal en 48-72 horas" · "una enfermedad que puede ser mortal" | "…de recuperación" · "puede volverse crítico en 48-72 horas" · "una enfermedad grave y prevenible" | Mismo criterio que Vacunación |
| Títulos de pestaña | `Especialistas - San Pablo…`, `Vacunación - …`, etc. | `… \| San Pablo Vet Clínic` | 6 páginas usaban " - " y el resto " \| " |

---

## 2. Visión y objetivo — BORRADOR a validar con el cliente

El tracker indicaba que este texto **lo debe proporcionar el cliente**. Como no existe, se redactó usando
**solo afirmaciones que la clínica ya hace en su propio sitio** (no se inventaron metas, fechas ni cifras):

- **Visión:** "Ser la clínica veterinaria de referencia en Rancagua, donde cada mascota reciba atención médica de calidad con calidez humana."
  *(de "Nuestra Historia": "…convertirnos en la clínica veterinaria de referencia en Rancagua" y "atención médica de calidad con calidez humana")*
- **Objetivo:** "Cuidar la salud y el bienestar de cada mascota con especialistas certificados, tecnología de diagnóstico de última generación y atención disponible las 24 horas, en la clínica y a domicilio."
  *(de Home / Conócenos: especialistas certificados, tecnología IDEXX, 24 h, servicio móvil)*

Está en `Pages/Conocenos.razor` (bloque `historia-vo`). **Reemplazar por el texto oficial del cliente si lo tiene.**

---

## 3. El cliente debe confirmar (no se pudo verificar)

**Historia y marca**
- Cronología de Conócenos: 2014 fundación · 2018 equipos IDEXX y ampliación del laboratorio · 2020 especialistas y 24 h · 2024 servicio móvil.
- "Más de 10 años", "Desde 2014".

**Pagos y seguros — el texto NO coincide entre páginas**
- Home (FAQ, componente no publicado), Contacto y Vet Móvil listan medios de pago distintos (Visa/Mastercard/AmEx, cuotas, seguros, solo efectivo+transferencia+tarjetas).
- Contacto: "trabajamos con las principales aseguradoras de mascotas en Chile" → ¿cuáles?
- Definir una sola lista y usarla en todas las páginas.

**Contacto**
- Estacionamiento en la entrada, rampas y espacios para sillas de ruedas, "frente a la plaza de Villa Triana".

**Exámenes**
- Horario de laboratorio Lun–Sáb 9:00–19:00 · resultados en 15–30 min (PCR/histopatología 24–72 h) · entrega por correo o WhatsApp · ayuno de 8–12 h.
- Catálogo completo (sobre todo la lista de PCR) y la marca GXMED.

**Especialistas**
- "Certificaciones nacionales e internacionales" · consultas de 45–60 min · abono del 50 % (se repite en varias secciones de la página) · exigir evaluación previa.

**Hospitalización**
- Horarios (llamadas 09–22, visitas 16–19 de 10 min, altas 11–13) · controles cada 2–4 h · cámaras de vigilancia 24/7 · cámaras/máscaras de oxígeno · jaulas separadas por especie y tamaño.

**Vet Móvil**
- Horario 09:00–16:30 todos los días · 24 h de anticipación · cancelación hasta 12 h antes · recargo por último momento · eutanasia a domicilio y "coordinación de servicios funerarios" · "laboratorio certificado".

**Peluquería**
- Etiquetas "Más Vendido" y "Recomendado" en los paquetes (¿es cierto?) · "productos premium" · limpieza dental dentro de peluquería.

**Vacunación**
- Meta description dice "vacunas importadas" · "aprovecha nuestras promociones" (también en Parvovirus) → ¿hay promociones vigentes?
- **Revisión veterinaria** de los esquemas (edades y dosis) y de la vacuna FIV: confirmar que está disponible en Chile.

**Parvovirus — datos clínicos a validar por un veterinario**
- Fiebre sobre 39,5 °C · cloro 1:30 · esperar 6 meses para un cachorro nuevo · razas "susceptibles" (Rottweiler, Doberman, Pit Bull) · 5–10 días de hospitalización · ventana de 3–10 días para los síntomas.
- Quedan expresiones fuertes que se dejaron por precisión clínica: "mantener al perro con vida", "salvar la vida de tu perro". Decidir con el cliente si se suavizan.

---

## 4. Decisiones de estilo pendientes (no son errores)

- **Un mismo servicio con 5 nombres:** "Vet Móvil", "Vet a Domicilio", "Veterinaria Móvil", "Veterinario Móvil", "Atención a domicilio". Conviene elegir uno para navegación y títulos.
- **Tutor / dueño / cliente:** se mezclan. "Tutor" aparece en hospitalización; "dueño" en otras páginas.
- **"hrs" / "horas" y "24/7" / "24 horas":** ambos formatos conviven; son válidos, solo consistencia.
- **Servicios → Especialidades:** la lista dice "Oncología y ecografía" (son dos especialidades distintas en `Specialties.cs`).
- **Shampoo / champú:** Peluquería usa "shampoo" (habitual en Chile, la RAE prefiere "champú"). Consistente dentro de la página.

---

## 5. Código sin uso con textos que NO deben publicarse

11 componentes no se usan en ninguna página, pero siguen en el repo. Contienen **testimonios ficticios con nombres
inventados** (`TestimonialsSection`: María González, Carlos Pérez…), cifras sin respaldo ("La confianza de miles de
familias", `WhyUsSection`) y un FAQ duplicado (`FaqSection`).

`AnnouncementCarousel`, `BookingHint`, `ContactSection`, `FaqSection`, `FeatureCardsSection`, `HeroProSection`,
`HighlightStat`, `HospitalInfoSection`, `MobileVetSection`, `TestimonialsSection`, `WhyUsSection`.

**Recomendación:** borrarlos antes de entregar, para que nadie los monte por error.
