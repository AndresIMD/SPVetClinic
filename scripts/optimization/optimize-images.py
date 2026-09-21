#!/usr/bin/env python3
"""
Convierte las fotos originales (assets-source/gallery/*.jpg) a AVIF liviano
dentro de SPVetClinic/wwwroot/images/<carpeta>/<nombre>.avif

Uso (desde la raíz del repo):
    pip install Pillow
    python scripts/optimization/optimize-images.py            # convierte lo que falte o cambió
    python scripts/optimization/optimize-images.py --force    # reconvierte todo

Para agregar una foto nueva:
  1. Dejar el original en assets-source/gallery/ (no se sube a git ni se publica)
  2. Añadir una línea en MAPA con su carpeta y nombre final
  3. Ejecutar el script y declarar la ruta en SPVetClinic/Data/ImagePaths.cs

Resultado típico: 5-18 MB por original -> 40-150 KB (máx. 1920 px de lado largo, AVIF calidad 50).
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parents[2]
ORIGEN = RAIZ / "assets-source" / "gallery"
DESTINO = RAIZ / "SPVetClinic" / "wwwroot" / "images"

MAX_LADO = 1920   # px; sobra para un hero a pantalla completa
CALIDAD = 50      # AVIF: indistinguible del original a 100% en las pruebas
VELOCIDAD = 6     # 0 = más lento y más chico; 10 = más rápido

# original (sin extensión) -> carpeta/nombre final. Las carpetas agrupan por área de la clínica.
MAPA = {
    # clinic/exterior — fachada y entorno
    "sp_clinic_frontage": "clinic/exterior/frontage",
    "sp_clinic_frontage_2": "clinic/exterior/frontage-2",
    "sp_clinic_frontage_3": "clinic/exterior/frontage-3",
    "sp_clinic_frontage_4": "clinic/exterior/frontage-4",
    "sp_clinic_frontage-logo_close_up": "clinic/exterior/frontage-logo-close-up",
    "sp_saint_pablo_sculture": "clinic/exterior/saint-pablo-sculpture",
    # clinic/interior — recepción y salas de espera
    "sp_reception_area": "clinic/interior/reception-area",
    "sp_reception_desk": "clinic/interior/reception-desk",
    "sp_reception_desk-sucursal": "clinic/interior/reception-desk-sucursal",
    "sp_waiting_room-cat": "clinic/interior/waiting-room-cat",
    "sp_waiting_room-sucursal": "clinic/interior/waiting-room-sucursal",
    "sp_waiting_room-sucursal_2": "clinic/interior/waiting-room-sucursal-2",
    # consult — consultas y boxes de atención
    "sp_consult-dog": "consult/consult-dog",
    "sp_consult-general": "consult/consult-general",
    "sp_dog_in_consult": "consult/dog-in-consult",
    "sp_cat_in_consult": "consult/cat-in-consult",
    # diagnostics — imagenología
    "sp_equipment-xray": "diagnostics/xray",
    "sp_equipment-ultrasound_left": "diagnostics/ultrasound-left",
    "sp_equipment-ultrasound_right": "diagnostics/ultrasound-right",
    "sp_ultrasound-procedure": "diagnostics/ultrasound-procedure",
    # lab — laboratorio
    "sp_lab-wide_shot": "lab/wide-shot",
    "sp_lab-idexx_monitor_close_up": "lab/idexx-monitor-close-up",
    "sp_lab-idexx_snap_close_up": "lab/idexx-snap-close-up",
    # surgery — pabellón
    "sp_operating_room-procedure": "surgery/procedure",
    "sp_operating_room-procedure_2": "surgery/procedure-2",
    "sp_operating_room-procedure_close_up": "surgery/procedure-close-up",
    "sp_operating_room-monitor": "surgery/monitor",
    "sp_operating_room-surgical_light": "surgery/surgical-light",
    "sp_operating_room-endotracheal_tube": "surgery/endotracheal-tube",
    # hospital, grooming, vet móvil
    "sp_hospital-dog_kennels_close_up": "hospital/dog-kennels-close-up",
    "sp_hair_salon": "grooming/hair-salon",
    "sp_vetmovil-left_side": "vetmovil/left-side",
    "sp_vetmovil-right_back_side": "vetmovil/right-back-side",
    "sp_vetmovil-back_side": "vetmovil/back-side",
    # brand — logo cuadrado (el logo principal es un PNG con transparencia: images/brand/logo.png)
    "sp-logo": "brand/logo-square",
    # patients — pacientes
    "sp_cat_extreme_close_up": "patients/cat-extreme-close-up",
    "sp_cat_play_room": "patients/cat-play-room",
}

EXTENSIONES = {".jpg", ".jpeg", ".png", ".jfif"}


def convertir(origen: Path, destino: Path) -> tuple[int, int]:
    with Image.open(origen) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")  # respeta la rotación de la cámara
        im.thumbnail((MAX_LADO, MAX_LADO), Image.LANCZOS)  # solo reduce, nunca amplía
        destino.parent.mkdir(parents=True, exist_ok=True)
        im.save(destino, "AVIF", quality=CALIDAD, speed=VELOCIDAD)
    return origen.stat().st_size, destino.stat().st_size


def main() -> int:
    forzar = "--force" in sys.argv
    if not ORIGEN.is_dir():
        print(f"No existe {ORIGEN}")
        return 1

    fuentes = {p.stem: p for p in ORIGEN.iterdir() if p.suffix.lower() in EXTENSIONES}
    total_in = total_out = hechos = 0

    for stem, ruta in sorted(MAPA.items()):
        origen = fuentes.get(stem)
        if origen is None:
            print(f"  FALTA   {stem}  (esperado en {ORIGEN})")
            continue
        destino = DESTINO / f"{ruta}.avif"
        if destino.exists() and not forzar and destino.stat().st_mtime >= origen.stat().st_mtime:
            continue
        a, b = convertir(origen, destino)
        total_in, total_out, hechos = total_in + a, total_out + b, hechos + 1
        print(f"  {ruta + '.avif':52} {a / 1048576:6.1f} MB -> {b / 1024:5.0f} KB")

    for stem in sorted(set(fuentes) - set(MAPA)):
        print(f"  SIN MAPA  {stem}: agregar a MAPA para convertirla")

    if hechos:
        print(f"\n{hechos} imágenes: {total_in / 1048576:.0f} MB -> {total_out / 1048576:.1f} MB "
              f"({100 - 100 * total_out / total_in:.1f}% menos)")
    else:
        print("Nada que convertir.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
