// ========== LOADER ==========
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    const statPercent = document.querySelector('.stat-percent');
    const statLoading = document.querySelector('.stat-loading');
    
    const messages = [
        'INITIALIZING KERNEL',
        'LOADING MODULES',
        'INJECTING DLL',
        'READY TO EXECUTE'
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    const loadInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        statPercent.textContent = Math.floor(progress) + '%';
        
        if (progress >= 25 && messageIndex < 1) {
            messageIndex = 1;
            statLoading.textContent = messages[1];
        } else if (progress >= 50 && messageIndex < 2) {
            messageIndex = 2;
            statLoading.textContent = messages[2];
        } else if (progress >= 75 && messageIndex < 3) {
            messageIndex = 3;
            statLoading.textContent = messages[3];
        }
        
        if (progress >= 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        }
    }, 150);
});

// ========== NAVIGATION ==========
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========== MATRIX EFFECT ==========
const matrixCanvas = document.getElementById('matrix');
const mtx = matrixCanvas.getContext('2d');

matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
const fontSize = 14;
const columns = matrixCanvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    mtx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    mtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    mtx.fillStyle = '#ffffff';
    mtx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        mtx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// ========== PARTICLES ==========
const particlesCanvas = document.getElementById('particles');
const pctx = particlesCanvas.getContext('2d');

particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 80;

class Particle {
    constructor() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > particlesCanvas.width) this.x = 0;
        if (this.x < 0) this.x = particlesCanvas.width;
        if (this.y > particlesCanvas.height) this.y = 0;
        if (this.y < 0) this.y = particlesCanvas.height;
    }
    
    draw() {
        pctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        pctx.beginPath();
        pctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                pctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - distance / 800})`;
                pctx.lineWidth = 1;
                pctx.beginPath();
                pctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                pctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                pctx.stroke();
            }
        }
    }
}

function animateParticles() {
    pctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    
    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ========== 3D TILT EFFECT FOR EXECUTOR ==========
const executorFrame = document.querySelector('.executor-frame');

if (executorFrame) {
    executorFrame.addEventListener('mousemove', (e) => {
        const rect = executorFrame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        executorFrame.style.transform = `
            perspective(1500px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale3d(1.02, 1.02, 1.02)
        `;
    });
    
    executorFrame.addEventListener('mouseleave', () => {
        executorFrame.style.transform = `
            perspective(1500px) 
            rotateX(0deg) 
            rotateY(0deg) 
            scale3d(1, 1, 1)
        `;
    });
}

// ========== COUNTER ANIMATION ==========
const dataValues = document.querySelectorAll('.data-value');
let countersAnimated = false;

const animateCounters = () => {
    dataValues.forEach(value => {
        const target = parseInt(value.getAttribute('data-count'));
        if (!target || isNaN(target)) return;
        
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                value.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                value.textContent = target;
            }
        };
        
        updateCounter();
    });
};

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
    threshold: 0.3
};

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            setTimeout(() => {
                animateCounters();
                countersAnimated = true;
            }, 800);
        }
    });
}, observerOptions);

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// AOS-like animation for elements
const scrollElements = document.querySelectorAll('[data-aos]');

const elementInView = (el, offset = 0.3) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        (window.innerHeight || document.documentElement.clientHeight) * (1 - offset)
    );
};

const displayScrollElement = (element) => {
    element.classList.add('aos-animate');
};

const hideScrollElement = (element) => {
    element.classList.remove('aos-animate');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initial check
handleScrollAnimation();

// ========== PROGRESS BARS ANIMATION ==========
const specProgressBars = document.querySelectorAll('.spec-progress-bar');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width') + '%';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
            progressObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

specProgressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ========== BAR FILLS IN HERO ==========
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.width = entry.target.style.width;
            }, 500);
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

barFills.forEach(bar => {
    barObserver.observe(bar);
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== RESIZE HANDLER ==========
window.addEventListener('resize', () => {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
    initParticles();
});

// ========== GLITCH EFFECT ON TITLE ==========
const glitchElements = document.querySelectorAll('.glitch');

glitchElements.forEach(element => {
    setInterval(() => {
        if (Math.random() > 0.95) {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = '';
            }, 50);
        }
    }, 2000);
});

// ========== CONSOLE LOG ==========
console.log('%c██████╗  █████╗ ██╗   ██╗ ██████╗ ███╗   ██╗██████╗ ', 'color: #ffffff; font-size: 12px; font-weight: bold;');
console.log('%c██╔══██╗██╔══██╗╚██╗ ██╔╝██╔═══██╗████╗  ██║██╔══██╗', 'color: #ffffff; font-size: 12px; font-weight: bold;');
console.log('%c██████╔╝███████║ ╚████╔╝ ██║   ██║██╔██╗ ██║██║  ██║', 'color: #ffffff; font-size: 12px; font-weight: bold;');
console.log('%c██╔══██╗██╔══██║  ╚██╔╝  ██║   ██║██║╚██╗██║██║  ██║', 'color: #ffffff; font-size: 12px; font-weight: bold;');
console.log('%c██████╔╝██║  ██║   ██║   ╚██████╔╝██║ ╚████║██████╔╝', 'color: #ffffff; font-size: 12px; font-weight: bold;');
console.log('%c╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ', 'color: #ffffff; font-size: 12px; font-weight: bold;');
console.log('%c                                                      ', 'color: #ffffff; font-size: 12px;');
console.log('%c🚀 BAYOND EXECUTOR v2.5.1 - INITIALIZED', 'color: #27c93f; font-size: 14px; font-weight: bold;');
console.log('%cAdvanced Script Execution Engine', 'color: #909090; font-size: 12px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #505050; font-size: 10px;');
console.log('%cUNC: 96% | sUNC: 81% | Decompiler: ACTIVE', 'color: #ffffff; font-size: 11px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #505050; font-size: 10px;');

// ========== EASTER EGG - KONAMI CODE ==========
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'none';
        document.body.offsetHeight; // trigger reflow
        document.body.style.animation = 'matrixRain 10s linear';
        
        console.log('%c🎮 KONAMI CODE ACTIVATED!', 'color: #27c93f; font-size: 20px; font-weight: bold;');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

// Matrix rain easter egg animation
const style = document.createElement('style');
style.textContent = `
    @keyframes matrixRain {
        0%, 100% { filter: hue-rotate(0deg) brightness(1); }
        50% { filter: hue-rotate(360deg) brightness(1.5); }
    }
`;
document.head.appendChild(style);

// ========== PERFORMANCE OPTIMIZATION ==========
let ticking = false;

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== TYPING EFFECT ==========
const typingElements = document.querySelectorAll('.typing-text');

typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(() => {
        typeWriter();
    }, 1000);
});

console.log('%c⚡ All systems operational', 'color: #27c93f; font-size: 12px;');
