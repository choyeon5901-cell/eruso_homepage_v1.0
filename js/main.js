// ============================================
// (주)이루스 AI DDS - 스마트 약배송 시스템
// JavaScript
// ============================================

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const contactForm = document.getElementById('contactForm');
const scrollTopBtn = document.getElementById('scrollTop');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll to top button
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

// Mobile Menu Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close Mobile Menu on Link Click & Smooth Scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Close mobile menu
        navMenu.classList.remove('active');
        if (navToggle) {
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // Smooth scroll to section
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            showNotification('모든 필드를 입력해주세요.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('올바른 이메일 주소를 입력해주세요.', 'error');
            return;
        }

        // Phone validation
        const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
        if (!phoneRegex.test(formData.phone)) {
            showNotification('올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)', 'error');
            return;
        }

        // Success
        showNotification('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
        contactForm.reset();
        
        console.log('Form Data:', formData);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 20px 25px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.4s ease;
            max-width: 400px;
            border-left: 4px solid;
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .notification-content i:first-child {
            font-size: 24px;
        }

        .notification-content span {
            flex: 1;
            color: #333;
        }

        .notification-close {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            font-size: 16px;
            padding: 5px;
            transition: color 0.3s ease;
        }

        .notification-close:hover {
            color: #333;
        }

        .notification-success {
            border-left-color: #4caf50;
        }

        .notification-success i:first-child {
            color: #4caf50;
        }

        .notification-error {
            border-left-color: #f44336;
        }

        .notification-error i:first-child {
            color: #f44336;
        }

        .notification-info {
            border-left-color: #2196f3;
        }

        .notification-info i:first-child {
            color: #2196f3;
        }

        @keyframes slideIn {
            from {
                transform: translateX(450px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(450px);
                opacity: 0;
            }
        }

        .notification.removing {
            animation: slideOut 0.4s ease;
        }
    `;

    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('removing');
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 5000);
}

// Phone Number Formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        let formatted = '';
        if (value.length <= 3) {
            formatted = value;
        } else if (value.length <= 7) {
            formatted = value.slice(0, 3) + '-' + value.slice(3);
        } else {
            formatted = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7);
        }
        
        e.target.value = formatted;
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll(`
    .about-card,
    .tech-card,
    .contact-card,
    .stat-card
`);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (target) {
                    stat.textContent = '0';
                    animateCounter(stat, target);
                }
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Console Welcome Message
console.log(`
%c🚁 (주)이루소 AI DDS %c
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%cAI 기반 스마트 약배송 시스템
%cWebsite: https://www.eruso.co.kr
%cEmail: info@eruso.co.kr
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
'background: linear-gradient(135deg, #1C63EE 0%, #00bfa5 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;',
'',
'color: #999;',
'color: #333; font-weight: bold;',
'color: #1C63EE;',
'color: #00bfa5;',
'color: #999;'
);

console.log('✅ (주)이루소 AI DDS 시스템이 정상적으로 로드되었습니다.');
