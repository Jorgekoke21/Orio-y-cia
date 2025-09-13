# Script para aplicar el menú móvil a todos los archivos HTML
$htmlFiles = @(
    "material-contraincendios.html",
    "senalizacion-imo.html", 
    "cartas-nauticas.html",
    "servicios.html",
    "quienes.html",
    "contacto.html",
    "productos.html"
)

$mobileMenuHTML = @"
        <!-- Mobile Dropdown Menu -->
        <div class="mobile-dropdown-menu" id="mobile-menu">
            <div class="mobile-menu-header">
                <div class="mobile-logo">
                    <img src="img/logo dibujo (1).png" alt="ORIO Y CIA" class="mobile-logo-img">
                    <span class="mobile-logo-text">ORIO Y CIA</span>
                </div>
                <button class="mobile-menu-close" id="mobile-menu-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="nav-grid">
                <a href="index.html" class="nav-card home-card">
                    <div class="nav-card-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <div class="nav-card-content">
                        <h3>Inicio</h3>
                        <p>Página principal</p>
                    </div>
                </a>
                
                <a href="productos.html" class="nav-card products-card">
                    <div class="nav-card-icon">
                        <i class="fas fa-box"></i>
                    </div>
                    <div class="nav-card-content">
                        <h3>Productos</h3>
                        <p>Material náutico</p>
                    </div>
                </a>
                
                <a href="servicios.html" class="nav-card services-card">
                    <div class="nav-card-icon">
                        <i class="fas fa-tools"></i>
                    </div>
                    <div class="nav-card-content">
                        <h3>Servicios</h3>
                        <p>Mantenimiento</p>
                    </div>
                </a>
                
                <a href="quienes.html" class="nav-card about-card">
                    <div class="nav-card-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="nav-card-content">
                        <h3>Nosotros</h3>
                        <p>Conócenos</p>
                    </div>
                </a>
                
                <a href="contacto.html" class="nav-card contact-card">
                    <div class="nav-card-icon">
                        <i class="fas fa-phone"></i>
                    </div>
                    <div class="nav-card-content">
                        <h3>Contacto</h3>
                        <p>Hablemos</p>
                    </div>
                </a>
                
                <a href="tel:+1234567890" class="nav-card phone-card">
                    <div class="nav-card-icon">
                        <i class="fas fa-phone-alt"></i>
                    </div>
                    <div class="nav-card-content">
                        <h3>Llamar</h3>
                        <p>+1 (555) 123-4567</p>
                    </div>
                </a>
            </div>
        </div>
        
        <!-- Menu Overlay -->
        <div class="menu-overlay" id="menu-overlay"></div>
"@

$mobileMenuJS = @"

    <script src="mobile-menu.js"></script>
"@

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Write-Host "Procesando $file..."
        
        # Leer el archivo
        $content = Get-Content $file -Raw
        
        # Buscar el patrón del header-cta y reemplazarlo
        $pattern = '(\s+</div>\s+</header>)'
        $replacement = "`n$mobileMenuHTML`n    </header>"
        
        if ($content -match $pattern) {
            $newContent = $content -replace $pattern, $replacement
            
            # Buscar el patrón del footer y añadir el script
            $footerPattern = '(\s+</footer>\s+</body>\s+</html>)'
            $footerReplacement = "`n$mobileMenuJS`n</body>`n</html>"
            
            if ($newContent -match $footerPattern) {
                $newContent = $newContent -replace $footerPattern, $footerReplacement
                
                # Escribir el archivo modificado
                Set-Content $file -Value $newContent -NoNewline
                Write-Host "✓ $file actualizado correctamente"
            } else {
                Write-Host "⚠ No se encontró el patrón del footer en $file"
            }
        } else {
            Write-Host "⚠ No se encontró el patrón del header en $file"
        }
    } else {
        Write-Host "✗ Archivo $file no encontrado"
    }
}

Write-Host "`nProceso completado!"
