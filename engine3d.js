/**
 * TRIONN Studio Luxury Three.js WebGL Engine & Interaction System
 * Target: #three-canvas
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Scroll Reveal System
    // ----------------------------------------------------
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal');
        if (!revealElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    };

    initScrollReveal();

    // ----------------------------------------------------
    // 2. Three.js Background Engine
    // ----------------------------------------------------
    const initThreeJSEngine = () => {
        // Graceful degradation if Three.js is missing
        if (typeof window.THREE === 'undefined') {
            console.warn('Three.js is not loaded.');
            return;
        }

        const canvas = document.getElementById('three-canvas');
        if (!canvas) {
            console.warn('Canvas element #three-canvas not found.');
            return;
        }

        // Scene Setup
        const scene = new THREE.Scene();
        scene.background = null;
        scene.fog = new THREE.Fog(0x0a0a0a, 2, 8); // Fog near for depth fade

        // Camera Setup
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 5;

        // Renderer Setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Geometries & Materials
        // Main Mesh
        const mainGeometry = new THREE.IcosahedronGeometry(2.2, 1);
        const mainWireframe = new THREE.WireframeGeometry(mainGeometry);
        const mainMaterial = new THREE.LineBasicMaterial({
            color: 0x1E2026,
            opacity: 0.5,
            transparent: true
        });
        const mainMesh = new THREE.LineSegments(mainWireframe, mainMaterial);

        // Inner Mesh
        const innerGeometry = new THREE.IcosahedronGeometry(1.4, 2);
        const innerWireframe = new THREE.WireframeGeometry(innerGeometry);
        const innerMaterial = new THREE.LineBasicMaterial({
            color: 0x2F323B,
            opacity: 0.25,
            transparent: true
        });
        const innerMesh = new THREE.LineSegments(innerWireframe, innerMaterial);

        scene.add(mainMesh);
        scene.add(innerMesh);

        // Interaction State
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        const onDocumentMouseMove = (event) => {
            // Normalized coordinates: -1 to +1
            mouseX = (event.clientX - windowHalfX) / windowHalfX;
            mouseY = (event.clientY - windowHalfY) / windowHalfY;
        };
        document.addEventListener('mousemove', onDocumentMouseMove, false);

        // Resize Handling (Debounced)
        let resizeTimeout;
        const onWindowResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;
                
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }, 200);
        };
        window.addEventListener('resize', onWindowResize, false);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Base autonomous elegant rotation
            mainMesh.rotation.x += 0.0008;
            mainMesh.rotation.y += 0.0012;

            innerMesh.rotation.x -= 0.0006;
            innerMesh.rotation.y += 0.001;

            // Target rotation for mouse following (dampened by 0.15)
            targetX = mouseX * 0.15;
            targetY = mouseY * 0.15;

            // Apply lerp for smooth mouse following (factor 0.03) to scene
            scene.rotation.y += (targetX - scene.rotation.y) * 0.03;
            scene.rotation.x += (targetY - scene.rotation.x) * 0.03;

            renderer.render(scene, camera);
        };

        animate();
    };

    initThreeJSEngine();
});
