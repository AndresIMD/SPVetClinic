# 📋 TASK TRACKER - SPVetClinic Diseño & UX

**Última actualización:** 2024-01-10 (Segunda sesión)
**Estado General:** 🔄 En Progreso (Tier 1-2 completados + refinamientos)

---

## ✅ COMPLETADO (Tier 1 - MVP Rápido)

- [x] Transparencia del hero se ve mejor en la variante A que en la C
- [x] Quitar selección inicial de los div al recargar la página
- [x] Agregar redirección de los botones de urgencia a la página de contacto con el mapa
- [x] Footer con nombre de mi empresa desarrolladora para futuros posibles proyectos
- [x] Alerta flotante persistente (localStorage) - convertida en componente reutilizable
- [x] NavBar/ mensaje de - Urgencias 24/7 animar con un pequeño cambio de color y tamaño de tipo breathing

---

## ✅ COMPLETADO (Tier 2 - Refinamientos)

### Botón Flotante de Urgencias (EmergencyFab) - FINALIZADO
- [x] Tooltip inicial con mensaje "Contacto de urgencias" (3 seg, luego desaparece)
- [x] Agregar elemento "Dirección" al dropdown
- [x] Ícono X visible y blanco (antes no se veía)
- [x] Recoger dropdown al hacer clic en otro lado de la página
- [x] **AJUSTE:** Elemento dirección repetido 2 veces → REMOVIDO
- [x] **AJUSTE:** Elemento dirección ahora redirija a Google Maps (empresa) en lugar de `/contacto#mapa`

### NavBar - Urgencias 24/7 (Animación Breathing) - FINALIZADO
- [x] Animación breathing agregada (cambio tamaño + color)
- [x] **AJUSTE:** La animación NO desplaza el texto de la derecha
- [x] **AJUSTE:** Tamaño máximo es el correcto (usa transform: scale en lugar de font-size)
- [x] **AJUSTE:** Alineación vertical perfecta (punto y texto centrados)

### Home - Sección de Ubicación (Mapa) - FINALIZADO
- [x] Mapa embebido usa coordenadas correctas (San Pablo Vet Clínic, no Central 265)
- [x] Botón "Ver en Google Maps" abre con link directo a empresa (no dirección general)
- [x] Consistente con lógica de `/contacto` (referencia verificada)
- [x] Actualizado AppConstants.Maps con URLs correctas

---

## 📋 PENDIENTE - REQUIERE CAPTURAS (Tier 3)

### Especialistas
- [ ] Botón alerta de abono pegado arriba → reemplazar por mensaje debajo de "Reserva Online"
- [ ] Quitar BookingHint (alerta gris)

### Vet Móvil
- [ ] Botón "Ver Servicios" es más pequeño que otros botones
- [ ] Igualar tamaño con botones secundarios

### Vacunación
- [ ] Alerta flotante cortada por arriba → ajustar espaciado
- [ ] Mejorar diseño del gráfico de fechas de vacunación (coherente con `/conocenos`)

### Contacto
- [ ] Cambiar emojis de "Antes de tu visita" por iconos estilizados (usar componente Icon)

### Hospitalización
- [ ] Botones de contacto deben usar números de recepción (no hospital)
- [ ] Los números de hospital son solo para WhatsApp con reportes diarios

---

## 🎯 PENDIENTE - CONTENIDO (Tier 4)

- [x] Agregar la visión y objetivo de la empresa en la página "Conócenos" / Historia
  - **Hecho como BORRADOR** (solo afirmaciones que el sitio ya hace). **Pendiente:** que el cliente confirme o reemplace el texto. Ver `production-audit/5-REVISION-TEXTOS-FINAL.md` §2
- [x] Revisión final de textos de todas las páginas (correcciones aplicadas; afirmaciones por confirmar con el cliente en `production-audit/5-REVISION-TEXTOS-FINAL.md` §3)

---

## 🔧 DETALLES TÉCNICOS

### Archivos Modificados (Tier 2 - Refinamientos)
| Archivo | Estado | Cambios |
|---------|--------|---------|
| `Layout/EmergencyBar.razor` | ✅ | Animación breathing con transform: scale (sin reflow) |
| `Layout/EmergencyFab.razor` | ✅ | Duplicado removido + Google Maps link agregado |
| `Pages/Home.razor` | ✅ | Botón Google Maps usa CompanyDirectLink |
| `Data/AppConstants.cs` | ✅ | URLs de Google Maps actualizadas (EmbedUrl + CompanyDirectLink) |
| `wwwroot/js/site.js` | ✅ | Persistent promo + click-outside FAB |
| `wwwroot/css/pages.css` | ✅ | Hero transparency + user-select |
| `Components/Sections/Footer.razor` | ✅ | Crédito de desarrollador |

### Cambios Específicos (Tier 2)

#### EmergencyBar.razor - Breathing Animation
```css
.ebar__label {
    animation: breathing 3s ease-in-out infinite;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    height: 1.2em;
    transform-origin: center center;
}

@keyframes breathing {
    0%, 100% {
        opacity: 0.7;
        transform: scale(1) translateY(0);
    }
    50% {
        opacity: 1;
        transform: scale(1.08) translateY(0);
        text-shadow: 0 0 8px rgba(187, 84, 95, 0.4);
    }
}
```
**Beneficio:** No desplaza elementos, alineación perfecta vertical

#### AppConstants.cs - Google Maps URLs
```csharp
public const string EmbedUrl = "...embed...San%20Pablo%20Vet%20Cl%C3%ADnic..."; // Empresa
public const string CompanyDirectLink = "https://www.google.com/maps/search/San+Pablo+Vet+Clínic+Rancagua"; // Empresa
public const string DirectionsUrl = "...Central+265..."; // Dirección general (heredada)
```

#### EmergencyFab.razor - Google Maps Link
```razor
<a href="@AppConstants.Maps.CompanyDirectLink" target="_blank" class="efab__option efab__option--location">
    <strong>Dirección</strong>
    <span>Ver en Google Maps</span>
</a>
```

### Archivos Pendientes (A Revisar)
| Archivo | Acción |
|---------|--------|
| `Pages/Especialistas.razor` | Cambiar layout CTA |
| `Pages/VetMovil.razor` | Igualar tamaño de botón |
| `Pages/Vacunacion.razor` | Ajustar alerta + gráfico |
| `Pages/Contacto.razor` | Reemplazar emojis |
| `Pages/Hospitalizacion.razor` | Cambiar números |

---

## 📊 RESUMEN DE PROGRESO

```
Tier 1 (MVP) ████████████████ 100% ✅
Tier 2 (Refinamientos) ████████████████ 100% ✅
Tier 3 (Capturas) ░░░░░░░░░░░░░░░░ 0% ⏳
Tier 4 (Contenido) ░░░░░░░░░░░░░░░░ 0% ⏳
```

---

## 🎯 PRÓXIMOS PASOS (Orden Recomendado)

### **INMEDIATO (Hoy):**
1. ✅ Revisar y corregir elemento dirección repetido en FAB
2. ✅ Cambiar redirección de dirección a Google Maps (empresa)
3. ✅ Corregir animación breathing del NavBar (sin desplazamiento)
4. ✅ Revisar mapa de Home (usar lógica de Contacto)
5. ✅ Corregir botón "Ver en Google Maps" en Home

### **PRÓXIMA SESIÓN:**
6. Capturar pantallas de Especialistas, Vet Móvil, Vacunación, Contacto, Hospitalización
7. Implementar cambios basados en capturas
8. Agregar contenido de visión/objetivo

---

## 📝 NOTAS

- El trabajo está organizado en **Tiers** por complejidad
- **Tier 1 (MVP)** está 100% completo
- **Tier 2 (Refinamientos)** está 100% completo
- **Tier 3** requiere capturas del usuario
- **Tier 4** requiere texto del usuario

**Cambios recientes:**
- ✅ Removido elemento "Dirección" duplicado en FAB
- ✅ Actualizado URLs de Google Maps en AppConstants (empresa en lugar de dirección general)
- ✅ FAB ahora abre Google Maps de la empresa
- ✅ Home botón de ubicación ahora abre Google Maps correcto
- ✅ NavBar breathing corregida (sin desplazamiento horizontal, alineación vertical perfecta)

