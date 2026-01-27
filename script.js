/**
 * POLKASSEMBLY IMPACT - Interactive Scripts
 * Cypherpunk Edition
 */

// ============================================
// MATRIX RAIN BACKGROUND
// ============================================

class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.init());
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }
    
    draw() {
        // Semi-transparent black to create fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Pink/magenta text color (Polkadot theme)
        this.ctx.fillStyle = '#e6007a';
        this.ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            
            // Draw character
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);
            
            // Reset drop if it's past the canvas height
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Number counter removed - metrics are now static

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll(
            '.stat-card, .timeline-item, .team-category, .network-card, .partner-card, .github-card'
        );
        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.init();
    }
    
    init() {
        // Add reveal class to elements
        this.elements.forEach(el => el.classList.add('reveal'));
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered animation
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 50);
                }
            });
        }, this.options);
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// Timeline animation removed - static memoir page

// Tree animation removed - Governance Tree section deleted

// ============================================
// SMOOTH SCROLL
// ============================================

class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Parallax effect removed - static memoir page

// Typewriter effect removed - static text in hero

// Glitch effect removed - static memoir page (CSS glitch animation remains)

// Card hover effects removed - static memoir page

// Particle system removed - static memoir page

// Animation styles removed - static memoir page

// ============================================
// INITIALIZE ALL COMPONENTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain (background only)
    const canvas = document.getElementById('matrix-bg');
    if (canvas) {
        new MatrixRain(canvas);
    }
    
    // Minimal effects - static memoir page
    new ScrollReveal();
    new SmoothScroll();
    
    // Console easter egg
    console.log('%c🏛️ POLKASSEMBLY', 'font-size: 24px; font-weight: bold; color: #e6007a;');
    console.log('%cArchived as a public record.', 'font-size: 14px; color: #00b2ff;');
});

// ============================================
// PRELOADER (Optional)
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
