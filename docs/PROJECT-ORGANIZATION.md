# 📁 ESTRUCTURA ORGANIZACIONAL DEL PROYECTO

## 🎯 Filosofía de Organización

Este proyecto sigue los principios de **Clean Architecture** y **Separation of Concerns (SoC)** con una estructura de carpetas clara que facilita:
- ✅ Mantenibilidad a largo plazo
- ✅ Escalabilidad sin desorden
- ✅ Navegación intuitiva
- ✅ Colaboración en equipo
- ✅ Separación clara de responsabilidades

---

## 📂 Estructura de Carpetas

```
SPVetClinic/
│
├── docs/                           # 📚 Documentación del proyecto
│   ├── planning/                   # 📋 Planificación y roadmaps
│   ├── checklists/                 # ✅ Checklists de tareas
│   │   └── PRODUCTION-CHECKLIST.md
│   ├── reports/                    # 📊 Reportes e informes
│   │   └── PROJECT-STATUS-REPORT.md
│   └── deployment/                 # 🚀 Guías de deployment
│
├── scripts/                        # 🔧 Scripts de automatización
│   ├── build/                      # 🔨 Scripts de compilación
│   ├── deployment/                 # 🚀 Scripts de deploy
│   │   └── deploy-ghpages.ps1
│   └── optimization/               # ⚡ Scripts de optimización
│
├── SPVetClinic/                    # 🎯 Proyecto principal Blazor
│   ├── Components/                 # 🧩 Componentes reutilizables
│   │   ├── Hero/
│   │   └── Icon/
│   ├── Data/                       # 📊 Modelos y constantes
│   │   ├── AppConstants.cs
│   │   └── ImagePaths.cs
│   ├── Layout/                     # 🎨 Layouts y navegación
│   │   ├── MainLayout.razor
│   │   ├── TopNav.razor
│   │   ├── Footer.razor
│   │   ├── EmergencyBar.razor
│   │   └── EmergencyFab.razor
│   ├── Pages/                      # 📄 Páginas del sitio
│   │   ├── Home.razor
│   │   ├── Servicios.razor
│   │   ├── Examenes.razor
│   │   ├── Especialistas.razor
│   │   ├── VetMovil.razor
│   │   ├── Vacunacion.razor
│   │   ├── Peluqueria.razor
│   │   ├── Hospitalizacion.razor
│   │   ├── Parvovirus.razor
│   │   ├── Conocenos.razor
│   │   └── Contacto.razor
│   ├── Properties/                 # ⚙️ Configuración del proyecto
│   │   └── bundleconfig.json
│   ├── wwwroot/                    # 🌐 Assets públicos
│   │   ├── css/                    # 🎨 Hojas de estilo
│   │   │   ├── app.css
│   │   │   ├── carousel.css
│   │   │   ├── pages.css
│   │   │   ├── new-pages.css
│   │   │   ├── bundle.min.css
│   │   │   └── bundle.min.css.gz
│   │   ├── images/                 # 🖼️ Imágenes
│   │   │   ├── SP_Logo.png
│   │   │   └── gallery/
│   │   │       ├── hero/           # Imágenes de hero
│   │   │       ├── services/       # Imágenes de servicios
│   │   │       ├── equipment/      # Equipamiento
│   │   │       ├── clinic/         # Instalaciones
│   │   │       ├── patients/       # Pacientes felices
│   │   │       └── team/           # Equipo médico
│   │   ├── favicon.png
│   │   ├── index.html
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── Program.cs                  # 🚀 Punto de entrada
│   └── SPVetClinic.csproj          # 📦 Configuración del proyecto
│
├── .copilot/                       # 🤖 Configuración de Copilot
│   └── assistant-context.md
│
├── .git/                           # 🔀 Control de versiones
├── .gitignore                      # 🚫 Archivos ignorados
└── README.md                       # 📖 Documentación principal

```

---

## 📋 Reglas de Organización

### 1️⃣ **Documentación (`docs/`)**
- **NUNCA** dejar documentos en la raíz del proyecto
- Separar por tipo:
  - `planning/` - Roadmaps, planes, wireframes
  - `checklists/` - Listas de tareas, verificación
  - `reports/` - Informes de estado, análisis
  - `deployment/` - Guías de despliegue, configuración

### 2️⃣ **Scripts (`scripts/`)**
- **NUNCA** dejar scripts en la raíz o mezclados con código
- Separar por función:
  - `build/` - Compilación, limpieza
  - `deployment/` - Deploy, publicación
  - `optimization/` - Compresión, minificación

### 3️⃣ **Código Fuente (`SPVetClinic/`)**
- Seguir estructura estándar de Blazor
- Componentes reutilizables en `Components/`
- Lógica de negocio en `Data/`
- Layouts separados de páginas
- Assets organizados por tipo en `wwwroot/`

### 4️⃣ **Assets (`wwwroot/`)**
- CSS agrupado en una carpeta
- Imágenes organizadas por categoría en subcarpetas
- Archivos de configuración (robots, sitemap) en la raíz de wwwroot

### 5️⃣ **Configuración (`Properties/`, `.copilot/`)**
- Configuraciones específicas del proyecto en `Properties/`
- Configuraciones de herramientas en carpetas ocultas (`.copilot/`, `.git/`)

---

## 🚫 Anti-Patrones (NO HACER)

❌ **Scripts sueltos en la raíz:**
```
SPVetClinic/
├── deploy.ps1          ❌ MAL
├── optimize.ps1        ❌ MAL
└── build.sh            ❌ MAL
```

✅ **Scripts organizados:**
```
SPVetClinic/
└── scripts/
    ├── deployment/
    │   └── deploy-ghpages.ps1  ✅ BIEN
    └── optimization/
        └── optimize-images.ps1  ✅ BIEN
```

---

❌ **Documentos mezclados:**
```
SPVetClinic/
├── TODO.md             ❌ MAL
├── checklist.txt       ❌ MAL
└── status.md           ❌ MAL
```

✅ **Documentos organizados:**
```
SPVetClinic/
└── docs/
    ├── planning/
    │   └── TODO.md             ✅ BIEN
    ├── checklists/
    │   └── production.md       ✅ BIEN
    └── reports/
        └── status.md           ✅ BIEN
```

---

❌ **Imágenes desorganizadas:**
```
wwwroot/images/
├── img1.jpg            ❌ MAL
├── photo.png           ❌ MAL
├── hero-bg.jpg         ❌ MAL
└── doctor.jpeg         ❌ MAL
```

✅ **Imágenes categorizadas:**
```
wwwroot/images/
└── gallery/
    ├── hero/
    │   └── hero-frontage.webp  ✅ BIEN
    ├── services/
    │   └── service-surgery.webp ✅ BIEN
    └── team/
        └── team-doctor.webp     ✅ BIEN
```

---

## 🔄 Proceso de Agregar Nuevos Archivos

### Pregúntate ANTES de crear un archivo:

1. **¿Es documentación?**
   → Va en `docs/` en la subcarpeta correcta

2. **¿Es un script?**
   → Va en `scripts/` en la subcarpeta correcta

3. **¿Es código fuente?**
   → Va en `SPVetClinic/` en la carpeta de componentes/páginas/data

4. **¿Es un asset (CSS, imagen, etc.)?**
   → Va en `wwwroot/` en la subcarpeta de su tipo

5. **¿Es configuración?**
   → Va en `Properties/` o raíz del proyecto SI ES NECESARIO

### Si no encaja en ninguna categoría:
- **CREA UNA NUEVA SUBCARPETA** lógica
- **NO LO DEJES EN LA RAÍZ** "temporalmente"
- Temporal → Permanente = Desorden

---

## 📊 Beneficios de Esta Estructura

✅ **Escalabilidad**
- Agregar 100 páginas más no crea desorden
- Estructura se mantiene clara sin importar el tamaño

✅ **Colaboración**
- Cualquier desarrollador entiende dónde está cada cosa
- Onboarding más rápido para nuevos miembros

✅ **Mantenimiento**
- Fácil encontrar y modificar archivos específicos
- Reducción de "¿dónde dejé ese script?"

✅ **Profesionalismo**
- Proyectos se ven organizados y maduros
- Facilita presentación a clientes o stakeholders

✅ **Automatización**
- Scripts pueden referenciar rutas predecibles
- CI/CD más fácil de configurar

---

## 🎯 Próximos Pasos para Este Proyecto

1. ✅ **Estructura base creada**
2. ✅ **Archivos reorganizados**
3. ⏳ **Agregar más documentación** según necesidad
4. ⏳ **Crear subcarpetas** para nuevas páginas si el proyecto crece mucho

---

## 💡 Filosofía

> "Un lugar para cada cosa, y cada cosa en su lugar"

Mantener esta filosofía desde el inicio evita:
- Refactorings masivos futuros
- Pérdida de archivos importantes
- Desorden acumulativo incontrolable
- Estrés al buscar archivos

**Invierte 30 segundos pensando dónde va un archivo, ahorra 30 minutos buscándolo después.**
