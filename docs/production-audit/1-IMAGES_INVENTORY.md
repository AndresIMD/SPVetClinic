# Inventario de Imágenes - San Pablo Vet Clínic

## Estado Actual: Incompleto ⚠️
Se requieren **10-12 imágenes adicionales** antes de publicación

---

## 1. IMÁGENES DEL HERO (Carrusel Principal)

### Estado: Parcial (2/5)
El carrusel necesita 3-5 imágenes para buena experiencia. Actualmente tiene:

| Imagen | Estado | Ruta | Especificaciones |
|--------|--------|------|-----------------|
| Hero - Fachada | ✅ Presente | `hero-frontage.webp` | 1920x1080px, 390KB |
| Hero - Fachada con Logo | ✅ Presente | `hero-frontage-logo.webp` | 1920x1080px, 378KB |
| Hero - Interior/Recepción | ❌ Falta | - | 1920x1080px, <500KB, formato WebP |
| Hero - Equipo/Especialistas | ❌ Falta | - | 1920x1080px, <500KB, formato WebP |
| Hero - Pacientes Felices | ❌ Falta | - | 1920x1080px, <500KB, formato WebP |

**Recomendación:** Mínimo agregar 3 imágenes más (recepción, equipo, pacientes)

---

## 2. SERVICIOS ESPECÍFICOS

### Estado: Parcial (6/8)
Se usan en la página de Servicios y como backgrounds en el Hero carousel.

| Servicio | Imagen Actual | Ruta | Necesario | Estado |
|----------|---------------|------|-----------|--------|
| Cirugía | ✅ Sí | `service-cirugia.webp` | Sí | ✅ Completo |
| Sala de Cirugía | ✅ Sí | `service-surgery-suite.webp` | Sí | ✅ Completo |
| Exámenes | ✅ Sí | `service-examenes.webp` | Sí | ✅ Completo |
| Laboratorio | ✅ Sí | `service-laboratory.webp` | Sí | ✅ Completo |
| Vet Móvil | ✅ Sí | `service-vetmovil.webp` | Sí | ✅ Completo |
| Peluquería (Grooming) | ✅ Sí | `service-grooming.webp` | Sí | ✅ Completo |
| Consulta General | ❌ No | - | Sí | ❌ Falta |
| Vacunación | ❌ No | - | Sí | ❌ Falta |

**Código en ImagePaths.cs:**
```csharp
public const string Consulta = "";      // ← VACÍO
public const string Vacunacion = "";    // ← VACÍO
```

**Recomendación:** Agregar 2 imágenes (consulta general y vacunación)

---

## 3. EQUIPOS E INSTRUMENTOS

### Estado: Minimal (1/2)

| Equipo | Imagen Actual | Ruta | Necesario | Estado |
|--------|---------------|------|-----------|--------|
| Equipo Quirúrgico | ✅ Sí | `equipment-surgical.webp` | Sí | ✅ Completo |
| Ecografía | ❌ No | - | Recomendado | ❌ Falta |

**Código en ImagePaths.cs:**
```csharp
public const string Ecografia = "";    // ← VACÍO
```

**Recomendación:** Agregar foto de equipo de ecografía (menciona "ecografía" en la página pero sin imagen)

---

## 4. EQUIPO MÉDICO (Especialistas)

### Estado: Vacío (0/2)
Las fotos de los especialistas son críticas para credibilidad y confianza.

| Especialista | Foto Actual | Ruta | Necesario | Estado |
|--------------|-------------|------|-----------|--------|
| Dr. Hernán Vargas (Neurología) | ❌ No | - | Sí | ❌ Falta |
| Dra. ? (Medicina Felina) | ❌ No | - | Sí | ❌ Falta |

**Código en ImagePaths.cs:**
```csharp
public const string DrVargas = "";      // ← VACÍO
public const string DraMunoz = "";      // ← VACÍO
```

**Ubicación en página:** `Pages/Especialistas.razor` muestra avatares genéricos con iconos porque faltan fotos reales.

**Recomendación:** CRÍTICA - Agregar fotos profesionales de los dos especialistas

---

## 5. INSTALACIONES DE LA CLÍNICA

### Estado: Completo (3/3)

| Área | Imagen Actual | Ruta | Estado |
|------|---------------|------|--------|
| Recepción | ✅ Sí | `clinic-reception.webp` | ✅ Completo |
| Mostrador de Recepción | ✅ Sí | `clinic-reception-desk.webp` | ✅ Completo |
| Recepción de Especialistas | ✅ Sí | `clinic-specialist-reception.webp` | ✅ Completo |

**Ubicación en página:** Galería de instalaciones en `Pages/Conocenos.razor`

**Estado:** ✅ Sin problemas

---

## 6. FOTOS DE PACIENTES

### Estado: Completo (3/3)
Se usan en testimonios y secciones promocionales.

| Paciente | Imagen Actual | Ruta | Estado |
|----------|---------------|------|--------|
| Perro - Closeup | ✅ Sí | `patient-dog-closeup.webp` | ✅ Completo |
| Gato - Closeup | ✅ Sí | `patient-cat-closeup.webp` | ✅ Completo |
| Perro - En caja | ✅ Sí | `patient-dog-box.webp` | ✅ Completo |

**Estado:** ✅ Sin problemas

---

## 7. LOGOS Y ASSETS ESTÁTICOS

### Estado: Completo (1/1)

| Asset | Archivo | Ruta | Estado |
|-------|---------|------|--------|
| Logo SP Vet Clínic | ✅ Sí | `SP_Logo.png` | ✅ Completo |

**Estado:** ✅ Sin problemas

---

## 📋 RESUMEN DE NECESIDADES

### ✅ Completo (8 imágenes)
- 3x Instalaciones de clínica
- 3x Pacientes
- 2x Hero (fachada)
- 1x Logo

### ⚠️ Parcial (2 imágenes)
- 2x Carrusel Hero (de 5 recomendadas)

### ❌ Falta (5+ imágenes) - CRÍTICAS
- 3x Hero adicionales (recepción, equipo, pacientes)
- 2x Servicios (consulta, vacunación)
- 2x Especialistas (Dr. Vargas, Dra. Muñoz)
- 1x Equipo (ecografía)

---

## 🎯 MÍNIMO PARA PUBLICACIÓN

**Imágenes que DEBEN estar antes de ir a producción:**

1. ✅ **2-3 imágenes adicionales de Hero** → Mejor experiencia visual del carrusel
2. ✅ **Fotos de los 2 especialistas** → Crítico para credibilidad
3. ✅ **Imagen de Consulta General** → Se menciona en servicios
4. ✅ **Imagen de Vacunación** → Se menciona en servicios
5. ⚠️ **Imagen de Ecografía** → Recomendado (existe en texto pero sin imagen)

**Total mínimo:** 8-9 imágenes nuevas

---

## 📁 DIRECTORIO ACTUAL

```
wwwroot/images/
├── SP_Logo.png
└── gallery/
	├── hero/
	│   ├── hero-frontage.webp ✅
	│   └── hero-frontage-logo.webp ✅
	├── clinic/
	│   ├── clinic-reception.webp ✅
	│   ├── clinic-reception-desk.webp ✅
	│   └── clinic-specialist-reception.webp ✅
	├── services/
	│   ├── service-cirugia.webp ✅
	│   ├── service-examenes.webp ✅
	│   ├── service-grooming.webp ✅
	│   ├── service-laboratory.webp ✅
	│   ├── service-surgery-suite.webp ✅
	│   └── service-vetmovil.webp ✅
	├── team/
	│   └── .gitkeep (VACÍO - Necesita fotos)
	├── patients/
	│   ├── patient-dog-closeup.webp ✅
	│   ├── patient-cat-closeup.webp ✅
	│   └── patient-dog-box.webp ✅
	└── equipment/
		├── equipment-surgical.webp ✅
		└── .gitkeep (Necesita ecografía)
```

---

## ✏️ PRÓXIMOS PASOS

1. **Reunión con cliente/publicidad:**
   - Solicitar 8-9 fotos adicionales según lista anterior
   - Priorizar: Especialistas (crítico), Hero adicionales, Consulta & Vacunación

2. **Especificaciones técnicas al entregar fotos:**
   - Formato: WebP preferido (mejor compresión)
   - Tamaño máximo: 500KB (hero), 200KB (servicios), 100KB (equipo)
   - Resolución: 1920x1080 (hero), 800x600 (servicios), 400x400 (equipo)
   - Ver `wwwroot/images/gallery/README.md` para especificaciones completas

3. **Actualizar ImagePaths.cs:**
   - Una vez tengas las fotos, actualizar rutas en `SPVetClinic/Data/ImagePaths.cs`

4. **Validar antes de publicación:**
   - Verificar que no hay imágenes rotas (usa DevTools → Network)
   - Comprobar pesos de imágenes (Core Web Vitals)

---

## 📞 Referencias de Código

- **Configuración de rutas:** `SPVetClinic/Data/ImagePaths.cs`
- **Especificaciones técnicas:** `wwwroot/images/gallery/README.md`
- **Páginas que usan imágenes:**
  - Home: `Pages/Home.razor` (hero, servicios, pacientes)
  - Servicios: `Pages/Servicios.razor`
  - Conocenos: `Pages/Conocenos.razor` (instalaciones)
  - Especialistas: `Pages/Especialistas.razor` (team)
