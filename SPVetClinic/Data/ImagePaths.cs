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
    public const string Logo = "images/SP_Logo.png";

    /// <summary>Imágenes para el hero / carrusel principal</summary>
    public static class Hero
    {
        public const string Frontage = "images/gallery/hero/hero-frontage.webp";
        public const string FrontageLogo = "images/gallery/hero/hero-frontage-logo.webp";
    }

    /// <summary>Fotos de servicios en ejecución</summary>
    public static class Services
    {
        public const string Cirugia = "images/gallery/services/service-cirugia.webp";
        public const string SurgerySuite = "images/gallery/services/service-surgery-suite.webp";
        public const string Examenes = "images/gallery/services/service-examenes.webp";
        public const string Laboratory = "images/gallery/services/service-laboratory.webp";
        public const string VetMovil = "images/gallery/services/service-vetmovil.webp";
        public const string Grooming = "images/gallery/services/service-grooming.webp";

        // Pendientes — asignar la ruta cuando se tenga la foto
        public const string Consulta = "";
        public const string Vacunacion = "";
    }

    /// <summary>Fotos de equipos e instrumentos</summary>
    public static class Equipment
    {
        public const string Surgical = "images/gallery/equipment/equipment-surgical.webp";

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
        public const string Reception = "images/gallery/clinic/clinic-reception.webp";
        public const string ReceptionDesk = "images/gallery/clinic/clinic-reception-desk.webp";
        public const string SpecialistReception = "images/gallery/clinic/clinic-specialist-reception.webp";

        /// <summary>Fachada de la clínica (usa la foto del hero)</summary>
        public const string Fachada = Hero.Frontage;

        // Pendiente — asignar la ruta cuando se tenga la foto
        public const string Mapa = "";
    }

    /// <summary>Fotos de pacientes felices</summary>
    public static class Patients
    {
        public const string DogCloseup = "images/gallery/patients/patient-dog-closeup.webp";
        public const string CatCloseup = "images/gallery/patients/patient-cat-closeup.webp";
        public const string DogBox = "images/gallery/patients/patient-dog-box.webp";
    }

    /// <summary>Verifica si una ruta de imagen está disponible (no vacía).</summary>
    public static bool HasImage(string path) => !string.IsNullOrEmpty(path);
}
