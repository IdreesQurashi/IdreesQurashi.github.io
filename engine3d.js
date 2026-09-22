/* ============================================================
   IDREES QURASHI — TRIONN Studio 3D WebGL Engine
   Interactive 3D Geometric Torus Knot & Mouse Dynamics
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('three-canvas');
  if (canvas && window.THREE) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // TRIONN 3D Geometric Object: Torus Knot Wireframe
    const geometry = new THREE.TorusKnotGeometry(22, 6, 120, 16, 2, 3);
    const wireframe = new THREE.WireframeGeometry(geometry);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x2F323B,
      transparent: true,
      opacity: 0.45
    });

    const torusMesh = new THREE.LineSegments(wireframe, lineMaterial);
    scene.add(torusMesh);

    // Dynamic glowing points along vertices
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xD8D8D8,
      size: 1.2,
      transparent: true,
      opacity: 0.65
    });

    const pointsMesh = new THREE.Points(geometry, pointsMaterial);
    scene.add(pointsMesh);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    }, { passive: true });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function renderLoop() {
      requestAnimationFrame(renderLoop);

      targetRotationY += (mouseX - targetRotationY) * 0.05;
      targetRotationX += (mouseY - targetRotationX) * 0.05;

      torusMesh.rotation.x += 0.002 + targetRotationX * 0.4;
      torusMesh.rotation.y += 0.003 + targetRotationY * 0.4;

      pointsMesh.rotation.x = torusMesh.rotation.x;
      pointsMesh.rotation.y = torusMesh.rotation.y;

      renderer.render(scene, camera);
    }

    renderLoop();
  }

  // 3D Card Hover Inertia
  const cards = document.querySelectorAll('.trionn-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;

      const rotX = ((y - midY) / midY) * -5;
      const rotY = ((x - midX) / midX) * 5;

      card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
});
