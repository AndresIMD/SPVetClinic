# Script para publicar SPVetClinic en GitHub Pages (rama gh-pages separada)
# Uso: Ejecuta este archivo desde PowerShell
# El código fuente permanece en 'main', la versión compilada va a 'gh-pages'

$ErrorActionPreference = "Stop"
$originalLocation = Get-Location

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Publicando San Pablo Vet Clinic" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Compilar el proyecto
Write-Host "[1/6] Compilando proyecto..." -ForegroundColor Yellow
Set-Location "SPVetClinic"
dotnet publish -c Release -o "..\publish"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al compilar. Abortando." -ForegroundColor Red
    Set-Location $originalLocation
    Read-Host "Presiona Enter para salir"
    exit 1
}
Write-Host "Compilacion exitosa!" -ForegroundColor Green
Set-Location $originalLocation

# 2. Preparar carpeta temporal para gh-pages
Write-Host "[2/6] Preparando archivos para GitHub Pages..." -ForegroundColor Yellow
$tempDir = "..\spvetclinic-gh-pages-temp"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
Copy-Item "publish\wwwroot" -Destination $tempDir -Recurse

# 3. Arreglar el index.html - Eliminar la seccion "integrity" del importmap
Write-Host "[3/6] Corrigiendo index.html..." -ForegroundColor Yellow
$indexPath = "$tempDir\index.html"
$content = Get-Content $indexPath -Raw
$pattern = ',\s*"scopes"\s*:\s*\{\s*\}\s*,\s*"integrity"\s*:\s*\{[^}]+\}'
$content = $content -replace $pattern, ''
Set-Content $indexPath $content -NoNewline
Write-Host "index.html corregido!" -ForegroundColor Green

# 4. Crear archivos necesarios para GitHub Pages
Write-Host "[4/6] Creando archivos para GitHub Pages..." -ForegroundColor Yellow
New-Item -ItemType File -Path "$tempDir\.nojekyll" -Force | Out-Null
Copy-Item "$tempDir\index.html" -Destination "$tempDir\404.html" -Force
Write-Host "Archivos creados!" -ForegroundColor Green

# 5. Inicializar git en la carpeta temporal y subir a gh-pages
Write-Host "[5/6] Subiendo a rama gh-pages..." -ForegroundColor Yellow
Set-Location $tempDir
git init
git add .
git commit -m "Deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git branch -M gh-pages
git remote add origin https://github.com/AndresIMD/SPVetClinic.git
git push -f origin gh-pages

$pushSuccess = $LASTEXITCODE -eq 0

# 6. Limpiar carpeta temporal
Set-Location $originalLocation
Write-Host "[6/6] Limpiando archivos temporales..." -ForegroundColor Yellow
Remove-Item $tempDir -Recurse -Force
Write-Host "Limpieza completada!" -ForegroundColor Green

if ($pushSuccess) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  PUBLICACION EXITOSA!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Tu sitio estara disponible en 1-2 minutos en:" -ForegroundColor White
    Write-Host "https://andresimd.github.io/SPVetClinic/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Recuerda configurar GitHub Pages:" -ForegroundColor Yellow
    Write-Host "  1. Ve a Settings > Pages en tu repositorio" -ForegroundColor White
    Write-Host "  2. Source: Deploy from a branch" -ForegroundColor White
    Write-Host "  3. Branch: gh-pages / (root)" -ForegroundColor White
    Write-Host ""
}
else {
    Write-Host "Error al subir a GitHub." -ForegroundColor Red
}

Read-Host "Presiona Enter para salir"
