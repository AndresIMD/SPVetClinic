# Guía Visual de Imágenes Faltantes

**Propósito:** Mostrar exactamente qué fotos se necesitan y dónde va cada una

---

## 1. ESPECIALISTAS (🔴 CRÍTICO)

### Ubicación: `Pages/Especialistas.razor`
### Impacto: ALTO - Sin fotos, la página pierde credibilidad

---

### Dr. Hernán Vargas - Neurología

**Especificaciones:**
- Tamaño: 400x400px (cuadrado)
- Formato: WebP o JPG
- Peso máximo: 100KB
- Estilo: Foto profesional, formal

**Ruta en servidor:**
```
wwwroot/images/gallery/team/team-dr-vargas.webp
```

**Código a actualizar:** `Data/ImagePaths.cs`
```csharp
public const string DrVargas = "images/gallery/team/team-dr-vargas.webp";
```

**Descripción de la foto:**
- Retrato profesional del médico
- Bata blanca o uniforme médico
- Fondo neutro (blanco o gris)
- Foto clara y bien iluminada
- Mínimo 400x400px

---

### Dra. ? - Medicina Felina

**Especificaciones:**
- Tamaño: 400x400px (cuadrado)
- Formato: WebP o JPG
- Peso máximo: 100KB
- Estilo: Foto profesional, formal

**Ruta en servidor:**
```
wwwroot/images/gallery/team/team-dra-munoz.webp
```

**Código a actualizar:** `Data/ImagePaths.cs`
```csharp
public const string DraMunoz = "images/gallery/team/team-dra-munoz.webp";
```

**Descripción de la foto:**
- Retrato profesional de la médica
- Bata blanca o uniforme médico
- Fondo neutro (blanco o gris)
- Foto clara y bien iluminada
- Mínimo 400x400px

---

## 2. CARRUSEL HERO (🟠 ALTA PRIORIDAD)

### Ubicación: `Pages/Home.razor` - Sección Hero Carousel
### Impacto: MEDIO-ALTO - Mejora experiencia visual inicial

**Especificaciones generales:**
- Tamaño: 1920x1080px (16:9)
- Formato: WebP (recomendado) o JPG
- Peso máximo: 500KB por imagen
- Cantidad recomendada: 3-5 imágenes (actualmente tiene 2)

---

### Hero #3 - Interior/Recepción

**Propósito:** Mostrar calidez y profesionalismo de la clínica

**Especificaciones:**
- Tamaño: 1920x1080px
- Formato: WebP
- Peso: <500KB

**Ruta en servidor:**
```
wwwroot/images/gallery/hero/hero-reception.webp
```

**Descripción de la foto:**
- Interior de la clínica
- Área de recepción o espera
- Limpio, moderno, acogedor
- Con personas (staff) si es posible
- Buena iluminación

**Texto sugerido en slide:**
```
Tag: "ESPACIO CÓMODO Y ACOGEDOR"
Título: "Tu mascota se sentirá segura"
Subtítulo: "Instalaciones modernas diseñadas para la comodidad animal"
```

---

### Hero #4 - Equipo Médico

**Propósito:** Mostrar profesionalismo y especialización

**Especificaciones:**
- Tamaño: 1920x1080px
- Formato: WebP
- Peso: <500KB

**Ruta en servidor:**
```
wwwroot/images/gallery/hero/hero-team.webp
```

**Descripción de la foto:**
- Veterinarios en el consultorio
- Con equipamiento visible
- Atendiendo a un paciente si es posible
- Profesionalismo evidente
- Buena iluminación

**Texto sugerido en slide:**
```
Tag: "EQUIPO ALTAMENTE CAPACITADO"
Título: "Especialistas que aman a los animales"
Subtítulo: "Profesionales certificados dedicados al cuidado de tu mascota"
```

---

### Hero #5 - Pacientes Felices

**Propósito:** Conexión emocional, muestra resultados positivos

**Especificaciones:**
- Tamaño: 1920x1080px
- Formato: WebP
- Peso: <500KB

**Ruta en servidor:**
```
wwwroot/images/gallery/hero/hero-happy-pets.webp
```

**Descripción de la foto:**
- Mascota saludable y feliz
- Con su dueño si es posible
- Mostrando mejoría/vitalidad
- Ambiente positivo
- Foto emocional

**Texto sugerido en slide:**
```
Tag: "TU MASCOTA MERECE LO MEJOR"
Título: "Mascotas felices, tutores felices"
Subtítulo: "Miles de mascotas ya confían en San Pablo Vet Clínic"
```

---

## 3. SERVICIOS (🟠 ALTA PRIORIDAD)

### Ubicación: `Pages/Servicios.razor` y otras páginas de servicios

---

### Servicio - Consulta General

**Especificaciones:**
- Tamaño: 800x600px
- Formato: WebP
- Peso máximo: 200KB

**Ruta en servidor:**
```
wwwroot/images/gallery/services/service-consulta.webp
```

**Código a actualizar:** `Data/ImagePaths.cs`
```csharp
public const string Consulta = "images/gallery/services/service-consulta.webp";
```

**Descripción de la foto:**
- Veterinario examinando a una mascota
- En consultorio o mesa de examen
- Mostrando auscultación o examen general
- Ambiente clínico profesional
- Mascota tranquila

---

### Servicio - Vacunación

**Especificaciones:**
- Tamaño: 800x600px
- Formato: WebP
- Peso máximo: 200KB

**Ruta en servidor:**
```
wwwroot/images/gallery/services/service-vacunacion.webp
```

**Código a actualizar:** `Data/ImagePaths.cs`
```csharp
public const string Vacunacion = "images/gallery/services/service-vacunacion.webp";
```

**Descripción de la foto:**
- Veterinario aplicando vacuna
- Mascota (perro o gato) recibiendo la inyección
- Ambiente tranquilo
- Aguja visible pero sin dramatismo
- Profesionalismo patente

---

## 4. EQUIPAMIENTO (🟡 MEDIA PRIORIDAD)

### Ubicación: `Pages/Examenes.razor`

---

### Equipo - Máquina de Ecografía

**Especificaciones:**
- Tamaño: 400x400px
- Formato: WebP
- Peso máximo: 100KB

**Ruta en servidor:**
```
wwwroot/images/gallery/equipment/equipment-ecografia.webp
```

**Código a actualizar:** `Data/ImagePaths.cs`
```csharp
public const string Ecografia = "images/gallery/gallery/equipment/equipment-ecografia.webp";
```

**Descripción de la foto:**
- Máquina de ecografía
- Puede estar en uso o en reposo
- Mostrando profesionalismo
- Buena definición

---

## 📋 TABLA RESUMEN

| Imagen | Tipo | Ubicación en Código | Ruta Archivo | Tamaño | Peso | Prioridad |
|--------|------|-------------------|-------------|--------|------|-----------|
| Dr. Vargas | Especialista | ImagePaths.Team.DrVargas | `gallery/team/team-dr-vargas.webp` | 400x400 | <100KB | 🔴 Crítica |
| Dra. Muñoz | Especialista | ImagePaths.Team.DraMunoz | `gallery/team/team-dra-munoz.webp` | 400x400 | <100KB | 🔴 Crítica |
| Hero Recepción | Hero | (No implementado) | `gallery/hero/hero-reception.webp` | 1920x1080 | <500KB | 🟠 Alta |
| Hero Equipo | Hero | (No implementado) | `gallery/hero/hero-team.webp` | 1920x1080 | <500KB | 🟠 Alta |
| Hero Mascotas | Hero | (No implementado) | `gallery/hero/hero-happy-pets.webp` | 1920x1080 | <500KB | 🟠 Alta |
| Servicio Consulta | Servicio | ImagePaths.Services.Consulta | `gallery/services/service-consulta.webp` | 800x600 | <200KB | 🟠 Alta |
| Servicio Vacunación | Servicio | ImagePaths.Services.Vacunacion | `gallery/services/service-vacunacion.webp` | 800x600 | <200KB | 🟠 Alta |
| Equipo Ecografía | Equipo | ImagePaths.Equipment.Ecografia | `gallery/equipment/equipment-ecografia.webp` | 400x400 | <100KB | 🟡 Media |

---

## 🛠️ INSTRUCCIONES PARA AGREGAR IMÁGENES

### Paso 1: Obtener las Fotos

1. Solicitar al cliente las fotos necesarias según especificaciones
2. Verificar que están en formato digital (JPG o PNG)
3. Revisar que son fotos profesionales y claras

### Paso 2: Optimizar las Fotos

**Opciones:**
- Google Squoosh: https://squoosh.app/
- TinyPNG: https://tinypng.com/
- ImageMagick (línea de comando)

**Proceso:**
1. Cargar imagen original
2. Redimensionar a tamaño exacto (ver tabla arriba)
3. Convertir a WebP para mejor compresión
4. Verificar peso final <límite especificado
5. Descargar imagen optimizada

### Paso 3: Subir Archivos

1. Navegar a `wwwroot/images/gallery/`
2. Copiar imagen a carpeta correcta:
   - `team/` para especialistas
   - `hero/` para hero carousel
   - `services/` para servicios
   - `equipment/` para equipos
3. Verificar nombre de archivo

### Paso 4: Actualizar Código

**Archivo:** `Data/ImagePaths.cs`

Ejemplo:
```csharp
// Antes (vacío)
public const string DrVargas = "";

// Después (con ruta)
public const string DrVargas = "images/gallery/team/team-dr-vargas.webp";
```

### Paso 5: Compilar y Probar

```powershell
# En la terminal del proyecto
dotnet build

# Si hay errores, revisar ImagePaths.cs
# Si compila, probar en navegador
# F5 en Visual Studio o dotnet watch run
```

### Paso 6: Validar en Navegador

1. Ir a cada página que usa la imagen
2. Verificar que imagen aparece correctamente
3. Verificar que no hay errores en DevTools (F12 → Console)
4. Verificar que imagen no está pixelada

---

## 🎨 GUÍA DE ESTILO PARA FOTOS

### Fotos de Especialistas

**DO ✅**
- Retrato profesional
- Bata blanca o uniforme médico
- Fondo limpio (blanco, gris o azul claro)
- Iluminación frontal clara
- Expresión amigable pero profesional
- Foto clara, nítida, sin movimiento

**DON'T ❌**
- Fotos casuales o ropa casual
- Fondos desorden
- Iluminación pobre
- Foto pixelada o borrosa
- Filtros excesivos

### Fotos de Hero

**DO ✅**
- Foto de calidad profesional
- Composición clara y atractiva
- Colores vibrantes pero naturales
- Sujeto claro y centrado
- Formato horizontal 16:9
- Sin texto superpuesto

**DON'T ❌**
- Fotos borrosas
- Fondos distraída
- Colores desteñidos
- Formato portrait (vertical)
- Demasiado oscuro o brillante

### Fotos de Servicios

**DO ✅**
- Acción clara del servicio
- Profesionalismo evidente
- Mascota cómoda y tranquila
- Ambiente limpio y moderno
- Iluminación buena
- Composición balanceada

**DON'T ❌**
- Mascota asustada o incómoda
- Ambiente desorden
- Profesional con mala apariencia
- Foto artística vs. informativa

---

## 📞 CHECKLIST PARA ENVIAR AL CLIENTE

**Enviar al cliente este mensaje:**

---

*Hola,*

*Necesitamos las siguientes imágenes para completar la página web antes de publicación:*

### **CRÍTICAS (indispensables):**

- [ ] Foto profesional Dr. Hernán Vargas (400x400px mínimo)
- [ ] Foto profesional Dra. [nombre] (400x400px mínimo)

### **RECOMENDADAS (mejoran la experiencia):**

- [ ] Foto interior/recepción de la clínica (1920x1080px)
- [ ] Foto equipo médico en consultorio (1920x1080px)
- [ ] Foto paciente feliz con dueño (1920x1080px)
- [ ] Foto consulta general en proceso (800x600px)
- [ ] Foto vacunación en proceso (800x600px)
- [ ] Foto máquina de ecografía (400x400px)

**Especificaciones técnicas:**
- Formato: JPG o PNG (no es problema, nosotros optimizamos)
- Tamaño: Mínimo el indicado en px
- Calidad: Profesional, clara, bien iluminada
- Plazo: Antes de publicación

*Recibiremos las fotos, las optimizamos y las subimos al servidor.*

*¿Cuándo pueden proporcionar estas imágenes?*

---

---

## 🎯 PRÓXIMOS PASOS

1. ✅ Enviar esta guía al cliente
2. ⏳ Esperar fotos del cliente
3. 🛠️ Optimizar fotos
4. 📤 Subir a servidor
5. 💻 Actualizar ImagePaths.cs
6. ✔️ Compilar y testear
7. 🚀 Publicar

---

**Documento de referencia para:**
- Cliente (qué fotos necesita)
- Equipo técnico (cómo procesarlas)
- Fotógrafo (qué estilo y formato)

**Fecha:** 2024
**Válido hasta:** Publicación
