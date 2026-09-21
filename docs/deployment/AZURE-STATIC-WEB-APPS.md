# Alojamiento en Azure Static Web Apps (plan Free)

Guía para probar el sitio en Azure. GitHub Pages sigue funcionando en paralelo: **no se quitó nada**, así que se
puede volver atrás en cualquier momento.

> Estado: el repositorio está **preparado**, pero **no se ha desplegado nada en Azure** (requiere tu cuenta).
> Lo probado hasta ahora es con servidores locales que imitan a Azure y a GitHub Pages, no con Azure real.

---

## 1. Por qué encaja

El sitio es 100 % estático (Blazor WebAssembly, sin API ni base de datos). Medido con `dotnet publish`:
**200 archivos, 19 MB**.

Límites del plan Free (documentación oficial de Microsoft, verificados en septiembre de 2026):

| | Free | Nuestro sitio |
|---|---|---|
| Ancho de banda | 100 GB/mes (sin excedente posible) | — |
| Tamaño por entorno | 250 MB | 19 MB |
| Almacenamiento total (todos los entornos) | 500 MB | — |
| Cantidad de archivos | 15 000 | 200 |
| Dominios propios | 2 | — |
| Certificado SSL | Gratis, se renueva solo | — |
| Entornos de vista previa | 3 | — |
| **SLA** | **Ninguno** | — |

**Dos cosas a considerar:**
- Microsoft describe el plan Free como "para proyectos personales" y el Standard como "para aplicaciones de producción". Para
  el sitio de un cliente, revisa si te sirve un plan sin SLA. El Standard cuesta unos **US$ 9 por app al mes** (dato de un
  hilo de soporte de Microsoft, abril 2026; confirma el precio en la página oficial antes de decidir).
- Crear una cuenta de Azure suele pedir una tarjeta aunque el plan Free no cobre. Configura una **alerta de presupuesto**
  (ver §5). Hay reportes de facturación errónea en el plan Standard; no en el Free.

---

## 2. Lo que ya está en el repositorio

| Archivo | Para qué |
|---|---|
| `SPVetClinic/wwwroot/staticwebapp.config.json` | Fallback a `index.html` (sin esto, entrar directo a `/contacto` da 404), y tipo MIME de `.avif` |
| `.github/workflows/azure-static-web-apps.yml` | Compila con .NET 10 y sube el resultado. **Solo manual** hasta que exista el token |
| `SPVetClinic/wwwroot/index.html` | `<base href="/" />` (antes `./`). Ver nota abajo |

**Nota sobre `base href`:** antes era `./`, que solo funciona con rutas de un nivel (`/contacto`, pero no `/a/b`). Con `/`
funciona en la raíz de un dominio (Azure o dominio propio). El workflow de GitHub Pages ya reescribía `/` por `/SPVetClinic/`;
con `./` esa línea nunca hacía nada, ahora sí. Probado con emuladores locales: URLs directas de 1 y 3 niveles cargan en los dos.

---

## 3. Pasos para desplegar (los haces tú, ~15 min)

1. **Cuenta de Azure:** https://portal.azure.com (con la cuenta gratuita/de prueba).
2. **Crear el recurso:** *Create a resource → Static Web App → Create*.
   - Plan type: **Free**
   - Region: cualquiera. Solo afecta a APIs y entornos de vista previa; el contenido estático se distribuye globalmente
   - Deployment source: **Other** ← importante. Con "GitHub", el portal genera su propio workflow que intenta compilar
     con el compilador de Azure; usamos el nuestro (ya compila con .NET 10).
3. **Copiar el token:** en el recurso, *Overview → Manage deployment token → Copy*.
4. **Guardarlo en GitHub:** repositorio → *Settings → Secrets and variables → Actions → New repository secret*.
   - Nombre: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Valor: el token
5. **Desplegar:** GitHub → *Actions → Deploy to Azure Static Web Apps → Run workflow*.
6. **Verificar:** la URL `https://<nombre>.azurestaticapps.net` (aparece en *Overview*). Probar entrar **directo** a
   `/contacto`, `/vet-movil` y una ruta inventada (debe mostrar la página 404 del sitio, no un error de Azure).

Cuando funcione y quieras publicar en cada push: en `azure-static-web-apps.yml`, cambiar el `on:` a
`push: branches: [main]` (y dejar `workflow_dispatch`).

---

## 4. Dominio propio

*Static Web App → Custom domains → Add*. Permite 2 (por ejemplo `dominio.cl` y `www.dominio.cl`).
Azure muestra en pantalla qué registros DNS crear y dónde (se hacen en el panel de quien vendió el dominio; el dominio raíz
y `www` suelen requerir registros distintos).
El certificado SSL se emite y renueva solo.

**Al tener dominio, actualizar dos archivos** (hoy apuntan a `andresimd.github.io/SPVetClinic`):
- `SPVetClinic/wwwroot/robots.txt` (línea `Sitemap:`)
- `SPVetClinic/wwwroot/sitemap.xml` (todas las `<loc>`)

Y en la ficha de Google Business / redes, la nueva URL.

---

## 5. Alertas de presupuesto (recomendado)

Azure → *Cost Management + Billing → Budgets → Add*. Ponerle un tope bajo (p. ej. US$ 5/mes) con alerta por correo.
Si todo va bien, no debería llegar nunca.

---

## 6. Alternativas (no evaluadas a fondo)

Si Azure no convence, otros servicios gratuitos de sitios estáticos que suelen usarse con Blazor WebAssembly:
**Cloudflare Pages** y **Netlify**; y **GitHub Pages**, que es el que ya está en uso. Antes de decidir conviene comparar
límites y condiciones de uso comercial de cada uno (no se verificaron para este documento).

---

## Fuentes

- Planes: https://learn.microsoft.com/en-us/azure/static-web-apps/plans
- Cuotas: https://learn.microsoft.com/en-us/azure/static-web-apps/quotas
- Configuración (`staticwebapp.config.json`): https://learn.microsoft.com/en-us/azure/static-web-apps/configuration
- Compilar tú mismo / `skip_app_build`: https://learn.microsoft.com/en-us/azure/static-web-apps/build-configuration
- Blazor en Static Web Apps: https://learn.microsoft.com/en-us/azure/static-web-apps/deploy-blazor
