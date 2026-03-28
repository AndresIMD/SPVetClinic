namespace SPVetClinic.Data;

/// <summary>
/// Rutas centralizadas de todas las imágenes del sitio.
/// Cuando se agreguen nuevas fotos, actualizar aquí y todas
/// las páginas las usarán automáticamente.
/// 
/// Convención de nombres (ver wwwroot/images/gallery/README.md):
///   hero-1.webp, team-dr-vargas.webp, clinic-recepcion.webp, service-cirugia.webp
/// </summary>
public static class ImagePaths
{
    public const string Logo = "images/logo_pequeno_vet_clinic.png";

    /// <summary>Imágenes para el hero / carrusel principal</summary>
    public static class Hero
    {
        public const string ClinicFrontage = "images/gallery/hero/SP_Clinic_Frontage.JPG";
    }

    /// <summary>Fotos de servicios en ejecución</summary>
    public static class Services
    {
        public const string Cirugia = "images/gallery/services/service-cirugia.jpeg";
        public const string Examenes = "images/gallery/services/service-examenes.jpeg";
        public const string VetMovil = "images/gallery/services/SP_VetMovil_Left_Side.JPG";

        // Pendientes — asignar la ruta cuando se tenga la foto
        public const string Consulta = "";
        public const string Vacunacion = "";
        public const string Peluqueria = "";
    }

    /// <summary>Fotos de equipos e instrumentos</summary>
    public static class Equipment
    {
        // Pendiente — asignar la ruta cuando se tenga la foto
        public const string Ecografia = "";
    }

    /// <summary>Fotos del equipo médico</summary>
    public static class Team
    {
        // Pendientes — asignar la ruta cuando se tengan las fotos
        public const string DrVargas = "";
        public const string DraMunoz = "";
    }

    /// <summary>Fotos de las instalaciones</summary>
    public static class Clinic
    {
        /// <summary>Fachada de la clínica (usa la foto del hero mientras no haya una específica)</summary>
        public const string Fachada = Hero.ClinicFrontage;

        // Pendiente — asignar la ruta cuando se tenga la foto
        public const string Mapa = "";
    }

    /// <summary>Verifica si una ruta de imagen está disponible (no vacía).</summary>
    public static bool HasImage(string path) => !string.IsNullOrEmpty(path);
}
