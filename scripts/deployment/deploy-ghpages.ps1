# Deploy automático a GitHub Pages
# Ejecuta este script cuando quieras publicar una nueva versión

Write-Host "🚀 Iniciando deploy a GitHub Pages..." -ForegroundColor Cyan

# 1. Limpiar build anterior
Write-Host "`n📦 Limpiando builds anteriores..." -ForegroundColor Yellow
dotnet clean -c Release

# 2. Publicar versión de producción
Write-Host "`n🔨 Compilando versión de producción..." -ForegroundColor Yellow
dotnet publish -c Release -o publish

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Error en la compilación" -ForegroundColor Red
    exit 1
}

# 3. Verificar que se creó la carpeta wwwroot
if (!(Test-Path "publish/wwwroot")) {
    Write-Host "`n❌ No se encontró la carpeta wwwroot" -ForegroundColor Red
    exit 1
}

# 4. Agregar .nojekyll para GitHub Pages
New-Item -Path "publish/wwwroot/.nojekyll" -ItemType File -Force | Out-Null

# 5. Configurar base path para GitHub Pages (si es necesario)
$indexPath = "publish/wwwroot/index.html"
if (Test-Path $indexPath) {
    $content = Get-Content $indexPath -Raw
    # Si tu repo se llama SPVetClinic, descomentar la siguiente línea:
    # $content = $content -replace '<base href="/" />', '<base href="/SPVetClinic/" />'
    Set-Content $indexPath $content
}

Write-Host "`n✅ Build completado exitosamente" -ForegroundColor Green
Write-Host "`n📁 Archivos listos en: publish/wwwroot" -ForegroundColor Cyan
Write-Host "`n📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host "  1. Copia el contenido de publish/wwwroot/ a la rama gh-pages" -ForegroundColor White
Write-Host "  2. O usa GitHub Actions para deploy automático" -ForegroundColor White
Write-Host "  3. Configura GitHub Pages en Settings > Pages" -ForegroundColor White

# Opcional: Abrir carpeta de publicación
$openFolder = Read-Host "`n¿Abrir carpeta de publicación? (S/N)"
if ($openFolder -eq "S" -or $openFolder -eq "s") {
    Invoke-Item "publish/wwwroot"
}
