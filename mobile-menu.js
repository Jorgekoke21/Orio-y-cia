// Mobile Menu Manager - Reusable JavaScript
class MobileMenuManager {
    constructor() {
        this.mobileMenu = document.getElementById('mobile-menu');
        this.menuOverlay = document.getElementById('menu-overlay');
        this.mobileMenuClose = document.getElementById('mobile-menu-close');
        this.logoDibujo = document.querySelector('.logo-dibujo');
        this.isOpen = false;
        this.isMobile = window.innerWidth <= 1024;
        
        this.init();
    }
    
    init() {
        // Solo inicializar en móvil/tablet
        if (this.isMobile) {
            this.setupEventListeners();
            this.addMobileClickableClass();
        }
        
        // Escuchar cambios de tamaño de ventana
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    setupEventListeners() {
        // Click en el logo-dibujo para abrir menú (solo en móvil)
        if (this.logoDibujo) {
            this.logoDibujo.addEventListener('click', (e) => {
                if (this.isMobile) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.openMenu();
                }
            });
        }
        
        // Click en el logo-escritura para navegar al index (siempre)
        const logoEscritura = document.querySelector('.logo-escritura');
        if (logoEscritura) {
            logoEscritura.addEventListener('click', (e) => {
                // No prevenir el comportamiento por defecto - permitir navegación
                // Solo en móvil, asegurar que no se abra el menú
                if (this.isMobile) {
                    e.stopPropagation(); // Evitar que se propague al logo-link
                }
            });
        }
        
        // El logo-link solo debe funcionar en desktop
        const logoLink = document.querySelector('.logo-link');
        if (logoLink && !this.isMobile) {
            // En desktop, el enlace funciona normalmente
        }
        
        // Click en el botón de cerrar
        if (this.mobileMenuClose) {
            this.mobileMenuClose.addEventListener('click', () => {
                this.closeMenu();
            });
        }
        
        // Click en el overlay para cerrar
        if (this.menuOverlay) {
            this.menuOverlay.addEventListener('click', () => {
                this.closeMenu();
            });
        }
        
        // Tecla ESC para cerrar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
        
        // Click en las tarjetas de navegación para cerrar el menú
        const navCards = document.querySelectorAll('.nav-card');
        navCards.forEach(card => {
            card.addEventListener('click', () => {
                // Pequeño delay para permitir la navegación
                setTimeout(() => {
                    this.closeMenu();
                }, 100);
            });
        });
    }
    
    addMobileClickableClass() {
        if (this.logoDibujo) {
            this.logoDibujo.classList.add('mobile-clickable');
        }
    }
    
    openMenu() {
        if (!this.isMobile) return;
        
        this.isOpen = true;
        this.mobileMenu.classList.add('active');
        this.menuOverlay.classList.add('active');
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        // Feedback táctil si está disponible
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Animación escalonada de las tarjetas
        this.animateCards();
    }
    
    closeMenu() {
        this.isOpen = false;
        this.mobileMenu.classList.remove('active');
        this.menuOverlay.classList.remove('active');
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
    }
    
    animateCards() {
        const cards = document.querySelectorAll('.nav-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 1024;
        
        // Si cambió de móvil a desktop, cerrar menú
        if (wasMobile && !this.isMobile) {
            this.closeMenu();
        }
        
        // Si cambió de desktop a móvil, añadir clase clickeable
        if (!wasMobile && this.isMobile) {
            this.addMobileClickableClass();
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenuManager();
});
