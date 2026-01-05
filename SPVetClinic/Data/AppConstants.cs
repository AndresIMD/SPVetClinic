namespace SPVetClinic.Data;

/// <summary>
/// Constantes y datos de configuración de la clínica.
/// Centraliza toda la información de contacto y redes sociales
/// para facilitar actualizaciones futuras.
/// </summary>
public static class AppConstants
{
    /// <summary>
    /// Información general de la clínica
    /// </summary>
    public static class Clinic
    {
        public const string Name = "San Pablo Vet Clínic";
        public const string ShortName = "San Pablo";
        public const string City = "Rancagua";
        public const string Country = "Chile";
        public const string Address = "Av. Central 265";
        public const string FullAddress = "Av. Central 265, Rancagua, Chile";
        public const string Schedule = "Urgencias 24 horas, todos los días";
        public const string YearsOfService = "más de 10 años";
        public const string BookingUrl = "https://vetsanpablo.crmveterinario.com/reserva_online";
    }

    /// <summary>
    /// Números de teléfono
    /// </summary>
    public static class Phone
    {
        /// <summary>WhatsApp principal de la clínica</summary>
        public const string MainWhatsApp = "56961900401";
        public const string MainWhatsAppFormatted = "+56 9 6190 0401";

        /// <summary>WhatsApp del servicio veterinario móvil</summary>
        public const string MobileVetWhatsApp = "56983835867";
        public const string MobileVetWhatsAppFormatted = "+56 9 8383 5867";

        /// <summary>Contacto directo Hospital (info pacientes hospitalizados)</summary>
        public const string HospitalWhatsApp = "56983835841";
        public const string HospitalWhatsAppFormatted = "+56 9 8383 5841";

        /// <summary>Teléfono fijo de la clínica</summary>
        public const string Landline = "722904717";
        public const string LandlineFormatted = "72 290 4717";

        /// <summary>Todos los teléfonos formateados para mostrar</summary>
        public const string AllPhonesFormatted = "+56 9 6190 0401 / 72 290 4717";
    }

    /// <summary>
    /// Información de Hospitalización
    /// </summary>
    public static class Hospital
    {
        public const string CallsSchedule = "09:00 a 22:00 hrs";
        public const string VisitsSchedule = "16:00 a 19:00 hrs";
        public const string DischargeSchedule = "11:00 a 13:00 hrs";
        public const string MaxVisitDuration = "10 minutos";
        public const string InfoPolicy = "Información del paciente se le dará solo al tutor responsable registrado en ficha";
    }

    /// <summary>
    /// Redes sociales
    /// </summary>
    public static class Social
    {
        public const string InstagramHandle = "spvetclinic";
        public const string InstagramUrl = "https://www.instagram.com/spvetclinic";

        public const string FacebookHandle = "sanpablovetclinic";
        public const string FacebookUrl = "https://www.facebook.com/sanpablovetclinic";
    }

    /// <summary>
    /// URLs de Google Maps
    /// </summary>
    public static class Maps
    {
        public const string EmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.0876!2d-70.7399!3d-34.1701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662e4ee8a70a5e1%3A0x5e5e5e5e5e5e5e5e!2sAv.%20Central%20265%2C%20Rancagua%2C%20Chile!5e0!3m2!1ses!2scl!4v1701432000000!5m2!1ses!2scl";
        public const string DirectionsUrl = "https://maps.google.com/?q=Av.+Central+265,+Rancagua,+Chile";
    }

    /// <summary>
    /// Helpers para generar URLs
    /// </summary>
    public static class Urls
    {
        public static string WhatsAppLink(string phoneNumber) => $"https://wa.me/{phoneNumber}";
        public static string WhatsAppMainLink => WhatsAppLink(Phone.MainWhatsApp);
        public static string WhatsAppMobileVetLink => WhatsAppLink(Phone.MobileVetWhatsApp);
        public static string WhatsAppHospitalLink => WhatsAppLink(Phone.HospitalWhatsApp);
        public static string TelLink(string phoneNumber) => $"tel:+{phoneNumber}";
    }
}
