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

// ============================================
// NUMBER COUNTER ANIMATION
// ============================================

class NumberCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number[data-target]');
        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, this.options);
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        const easeOutQuad = t => t * (2 - t);
        
        let frame = 0;
        
        const counter = setInterval(() => {
            frame++;
            const progress = easeOutQuad(frame / totalFrames);
            const currentCount = Math.round(target * progress);
            
            element.textContent = this.formatNumber(currentCount);
            element.classList.add('counting');
            
            if (frame === totalFrames) {
                clearInterval(counter);
                element.textContent = this.formatNumber(target);
                element.classList.remove('counting');
            }
        }, frameDuration);
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return num.toLocaleString();
        }
        return num.toString();
    }
}

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

// ============================================
// TIMELINE ANIMATION
// ============================================

class TimelineAnimation {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate marker
                    const marker = entry.target.querySelector('.timeline-marker');
                    if (marker) {
                        marker.style.animation = 'pulse-marker 1s ease-out';
                    }
                }
            });
        }, { threshold: 0.3 });
        
        this.timelineItems.forEach(item => observer.observe(item));
    }
}

// ============================================
// TREE SVG ANIMATION
// ============================================

class TreeAnimation {
    constructor() {
        this.treeSvg = document.querySelector('.tree-svg');
        if (!this.treeSvg) return;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateTree();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(this.treeSvg);
    }
    
    animateTree() {
        // Paths are animated via CSS, but we can add additional effects
        const fruits = this.treeSvg.querySelectorAll('.fruit');
        
        fruits.forEach((fruit, index) => {
            fruit.addEventListener('mouseenter', () => {
                fruit.style.transform = 'scale(1.2)';
                fruit.style.filter = 'brightness(1.3)';
            });
            
            fruit.addEventListener('mouseleave', () => {
                fruit.style.transform = 'scale(1)';
                fruit.style.filter = 'brightness(1)';
            });
        });
    }
}

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

// ============================================
// PARALLAX EFFECT
// ============================================

class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (this.hero && scrolled < window.innerHeight) {
                const opacity = 1 - (scrolled / window.innerHeight);
                this.hero.style.opacity = Math.max(opacity, 0);
                this.hero.querySelector('.hero-content').style.transform = 
                    `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
}

// ============================================
// TYPEWRITER EFFECT
// ============================================

class TypewriterEffect {
    constructor() {
        this.element = document.querySelector('.typewriter');
        if (!this.element) return;
        
        this.text = this.element.textContent;
        this.element.textContent = '';
        this.index = 0;
        
        this.init();
    }
    
    init() {
        // Wait for page load
        setTimeout(() => this.type(), 1000);
    }
    
    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), 50);
        } else {
            // Blinking cursor effect
            this.element.classList.add('cursor-blink');
        }
    }
}

// ============================================
// GLITCH EFFECT ENHANCEMENT
// ============================================

class GlitchEffect {
    constructor() {
        this.glitchElement = document.querySelector('.glitch');
        if (!this.glitchElement) return;
        
        this.init();
    }
    
    init() {
        // Random glitch intensity
        setInterval(() => {
            if (Math.random() > 0.95) {
                this.triggerGlitch();
            }
        }, 100);
    }
    
    triggerGlitch() {
        this.glitchElement.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00b2ff,
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #e6007a
        `;
        
        setTimeout(() => {
            this.glitchElement.style.textShadow = `
                0 0 10px #e6007a,
                0 0 20px #e6007a,
                0 0 40px #e6007a
            `;
        }, 100);
    }
}

// ============================================
// HOVER CARD EFFECTS
// ============================================

class CardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.stat-card, .network-card, .partner-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
}

// ============================================
// PARTICLE SYSTEM
// ============================================

class ParticleSystem {
    constructor() {
        this.container = document.querySelector('.hero');
        if (!this.container) return;
        
        this.particles = [];
        this.particleCount = 30;
        
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${Math.random() > 0.5 ? '#e6007a' : '#00b2ff'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-random ${Math.random() * 10 + 10}s linear infinite;
            pointer-events: none;
        `;
        
        this.container.appendChild(particle);
    }
}

// Add CSS for floating particles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float-random {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        25% {
            transform: translate(100px, -100px) rotate(90deg);
        }
        50% {
            transform: translate(50px, -200px) rotate(180deg);
        }
        75% {
            transform: translate(-50px, -300px) rotate(270deg);
        }
    }
    
    .cursor-blink::after {
        content: '_';
        animation: blink 1s step-end infinite;
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    
    @keyframes pulse-marker {
        0% {
            transform: translateX(-50%) scale(1);
            box-shadow: 0 0 0 0 rgba(230, 0, 122, 0.7);
        }
        70% {
            transform: translateX(-50%) scale(1.2);
            box-shadow: 0 0 0 20px rgba(230, 0, 122, 0);
        }
        100% {
            transform: translateX(-50%) scale(1);
            box-shadow: 0 0 0 0 rgba(230, 0, 122, 0);
        }
    }
    
    .timeline-item.visible .timeline-content {
        animation: slide-in 0.6s ease forwards;
    }
    
    .timeline-item:nth-child(odd).visible .timeline-content {
        animation: slide-in-right 0.6s ease forwards;
    }
    
    @keyframes slide-in {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slide-in-right {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(particleStyles);

// ============================================
// INITIALIZE ALL COMPONENTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain
    const canvas = document.getElementById('matrix-bg');
    if (canvas) {
        new MatrixRain(canvas);
    }
    
    // Initialize all effects
    new NumberCounter();
    new ScrollReveal();
    new TimelineAnimation();
    new TreeAnimation();
    new SmoothScroll();
    new ParallaxEffect();
    new TypewriterEffect();
    new GlitchEffect();
    new CardEffects();
    new ParticleSystem();
    
    // Console easter egg
    console.log('%c🏛️ POLKASSEMBLY', 'font-size: 24px; font-weight: bold; color: #e6007a;');
    console.log('%cThank you for 6 years of decentralized governance.', 'font-size: 14px; color: #00b2ff;');
    console.log('%cDecentralization is not a destination, it is a journey.', 'font-size: 12px; font-style: italic; color: #888;');
    console.log('%c\n👋 Farewell from the Polkassembly Team\n', 'font-size: 12px; color: #00ff88;');
});

// ============================================
// PRELOADER (Optional)
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
