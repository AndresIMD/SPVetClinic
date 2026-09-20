namespace SPVetClinic.Data;

/// <summary>
/// Fuente única de especialidades para Home y /especialistas.
/// Los horarios NO van aquí: viven en el calendario del sistema externo de reservas.
/// </summary>
public record Specialty(string Name, string Icon, string Description, string[] Doctors);

public static class Specialties
{
    public static readonly Specialty[] All =
    [
        new("Cardiología", "heart", "Evaluación del corazón y sistema circulatorio de tu mascota.", ["Dra. Rosa Rojas"]),
        new("Endocrinología", "flask", "Diabetes, tiroides y otros desórdenes hormonales y metabólicos.", ["Dra. Daniella Díaz"]),
        new("Neurología", "brain", "Convulsiones, problemas de equilibrio, dolor de columna y movimientos anormales.", ["Dr. Hernán Vargas"]),
        new("Gastroenterología", "utensils", "Diagnóstico y tratamiento de enfermedades del sistema digestivo.", ["Dra. Natalia Vargas"]),
        new("Mascotas Exóticas", "bird", "Atención especializada para aves, reptiles y otras mascotas no convencionales.", ["Dra. Catalina Danús"]),
        new("Medicina Interna", "stethoscope", "Diagnóstico y manejo de enfermedades complejas y crónicas.", ["Dr. Jorge Barriga"]),
        new("Oncología", "microscope", "Diagnóstico y tratamiento de tumores y cáncer en mascotas.", ["Dra. Scarlett Chamorro"]),
        new("Ecografía", "eye", "Imagenología por ultrasonido para diagnósticos precisos y no invasivos.", ["Dra. María José Chandía", "Dr. Christopher Herrera"]),
    ];
}
