// Zero Torque Golf Putter Portfolio - Interactive Animations

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll animations on page load
    animateElementsOnLoad();
    
    // Initialize Three.js viewer if exists
    initThreeJSViewer();
    
    // Add scroll observers for fade-in animations
    setupScrollAnimations();
});

// Animate elements as they come into view
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-on-scroll-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-on-scroll').forEach(el => {
        el.classList.add('fade-on-scroll');
        observer.observe(el);
    });
}

// Animate elements on page load with stagger effect
function animateElementsOnLoad() {
    const cards = document.querySelectorAll('.metric-card, .project-card, .problem-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Three.js viewer for putter 3D model
function initThreeJSViewer() {
    const container = document.getElementById('putter-viewer');
    if (!container) return;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121214);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 100);
    camera.position.z = 5;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x3b82f6, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);
    
    // Create placeholder geometry (represent the putter)
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 3);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x3b82f6,
        metalness: 0.7,
        roughness: 0.3
    });
    
    const putterMesh = new THREE.Mesh(geometry, material);
    scene.add(putterMesh);
    
    // Orbit controls
    try {
        const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.05;
    } catch (e) {
        console.log('OrbitControls not loaded, using basic rotation');
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        putterMesh.rotation.x += 0.002;
        putterMesh.rotation.y += 0.005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', function() {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

// Intersection Observer for scroll animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-on-scroll-visible');
        }
    });
}, { threshold: 0.1 });

// Add to existing elements
document.querySelectorAll('.metric-card, .project-card').forEach(el => {
    fadeObserver.observe(el);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 11, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 11, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Parallax effect on hero text
const heroText = document.querySelector('.hero h1');
if (heroText) {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        if (scrolled < 800) {
            heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroText.style.opacity = 1 - (scrolled / 800);
        }
    });
}

// Add hover effect to gallery images
document.querySelectorAll('.gallery-item').forEach(item => {
    const img = item.querySelector('img');
    if (img) {
        item.addEventListener('mouseenter', function() {
            img.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            img.style.transform = 'scale(1)';
        });
    }
});

// Metric cards counter animation
const metricValues = document.querySelectorAll('.metric-value');
if (metricValues.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent.replace(/[^0-9]/g, '');
                
                let current = 0;
                const increment = finalValue / 50;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < finalValue) {
                        target.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = finalValue.toLocaleString();
                    }
                };
                
                updateCounter();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    metricValues.forEach(el => observer.observe(el));
}

// Console welcome message
console.log('%c🏗️  Zero Torque Golf Putter Portfolio', 'font-size: 24px; font-weight: bold; color: #3b82f6');
console.log('%cFrom concept to production — I take engineering projects from market research through CNC machining.', 'font-size: 14px; color: #a0a0a0; margin-top: 8px;');
