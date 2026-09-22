/* ============================================================
   IDREES QURASHI — 3D Spatial Canvas & Physical Tilt Engine
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Interactive 3D Particle Mesh (Three.js) ────────────
  const canvas = document.getElementById('three-canvas');
  if (canvas && window.THREE) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle nodes
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 450;
      positions[i + 1] = (Math.random() - 0.5) * 350;
      positions[i + 2] = (Math.random() - 0.5) * 200;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xC9A96E, // Gold tone
      size: 3.5,
      transparent: true,
      opacity: 0.75
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle line connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x9BA5B7,
      transparent: true,
      opacity: 0.12
    });

    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    }, { passive: true });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      requestAnimationFrame(animate);
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      particles.rotation.y += 0.0008;
      particles.rotation.x = targetY * 0.008;
      camera.position.x = targetX * 0.2;

      renderer.render(scene, camera);
    }
    animate();
  }

  // ── 2. Hardware Accelerated 3D Card Tilt ──────────────────
  const cards = document.querySelectorAll('.card-3d');
  cards.forEach(card => {
    let glare = card.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      glare.style.background = 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.04), transparent 70%)';
    });
  });
});
