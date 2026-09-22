/**
 * TRIONN Studio High-End Unified 3D Background Engine
 * Option 1: Monumental Architectural Prism Monolith (TRIONN 1:1 Match)
 * 
 * Features:
 * - Bespoke deconstructivist architectural cluster of 7 chamfered titanium & obsidian monoliths
 * - Micro-beveled edge highlight wireframes in warm amber & cool cyan
 * - Cinematic 3-point lighting rig (Amber top key light + Cyan fill + Rear rim)
 * - Fine 3D coordinate laser lines with luminous vertex nodes
 * - Calibrated normal rotational velocity (0.05 rad/s) with smooth scroll parallax
 * - Zero content occlusion: Positioned in negative space and deep Z plane
 * - Interactive mouse parallax and "HOLD TO BLAST" energy pulse
 */

document.addEventListener('DOMContentLoaded', () => {
  // === 1. BI-DIRECTIONAL DYNAMIC SCROLL SPAWN SYSTEM ===
  // Intense magnetic pulling animation: converts from transparent to translucent obsidian glass
  // Operates continuously on every scroll cycle from top or bottom without page reload
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const vh = window.innerHeight;

    // Immediately prime directional state for all elements based on viewport coordinates
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        // Inside viewport on load
        el.classList.add('visible');
      } else if (rect.top <= 0) {
        // Above viewport on load: prime to pull down when scrolling up
        el.classList.add('spawn-from-top');
      } else {
        // Below viewport on load: prime to pull up when scrolling down
        el.classList.add('spawn-from-bottom');
      }
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const rect = entry.boundingClientRect;

        if (entry.isIntersecting) {
          // Entered viewport: trigger visible pull animation
          el.classList.add('visible');
        } else {
          // Left viewport: remove visible and re-prime direction class based on exit edge
          if (el.style) el.style.transform = '';
          el.classList.remove('visible');

          if (rect.top < 0) {
            // Exited above screen: prime to spawn downwards when scrolling down
            el.classList.remove('spawn-from-bottom');
            el.classList.add('spawn-from-top');
          } else {
            // Exited below screen: prime to spawn upwards when scrolling up
            el.classList.remove('spawn-from-top');
            el.classList.add('spawn-from-bottom');
          }
        }
      });
    }, {
      threshold: 0.02,
      rootMargin: '60px 0px 60px 0px'
    });

    revealEls.forEach(el => obs.observe(el));
  }

  // === 2. 3D CARD TILT & GLARE INTERACTION SYSTEM ===
  const interactiveCards = document.querySelectorAll('.workflow-card, .showcase-featured-card, .facts-item, .contact-form-card, .hero-info-card');
  interactiveCards.forEach(card => {
    let bounds;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      const xPct = mouseX / bounds.width - 0.5;
      const yPct = mouseY / bounds.height - 0.5;

      const rotX = -yPct * 8;
      const rotY = xPct * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px) scale3d(1.012, 1.012, 1.012)`;

      const glare = card.querySelector('.card-glare');
      if (glare) {
        glare.style.opacity = '1';
        glare.style.transform = `translate(${mouseX - 160}px, ${mouseY - 160}px)`;
      }
    }

    function onMouseLeave() {
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
      setTimeout(() => {
        if (!card.matches(':hover') && card.classList.contains('visible')) {
          card.style.transform = '';
        }
      }, 400);
      const glare = card.querySelector('.card-glare');
      if (glare) glare.style.opacity = '0';
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    if (!card.querySelector('.card-glare')) {
      const glareEl = document.createElement('div');
      glareEl.className = 'card-glare';
      card.appendChild(glareEl);
    }
  });

  // === 3. THREE.JS UNIFIED 3D BACKGROUND ENGINE ===
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene setup with atmospheric depth fog
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050609, 0.022);

  // Camera positioned for expansive depth
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  // High-performance WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;

  // === 4. CINEMATIC 3-POINT LIGHTING RIG ===
  // Ambient base (deep moody dark indigo, kept dim to preserve dark obsidian values)
  const ambientLight = new THREE.AmbientLight(0x06080d, 0.7);
  scene.add(ambientLight);

  // Top Key Light: Warm Amber / Solar Orange
  const keyAmberLight = new THREE.PointLight(0xFF6B2B, 8.5, 24, 1.2);
  keyAmberLight.position.set(4.0, 3.8, 2.5);
  scene.add(keyAmberLight);

  // Secondary Warm Accent
  const secondaryAmberLight = new THREE.PointLight(0xF59E0B, 3.0, 16, 1.4);
  secondaryAmberLight.position.set(1.5, 1.0, 1.8);
  scene.add(secondaryAmberLight);

  // Fill Light: Crisp Cool Cyan (Positioned as a rear-side rim light to avoid washing out front faces)
  const coolCyanLight = new THREE.DirectionalLight(0x38BDF8, 1.4);
  coolCyanLight.position.set(-6, 2.5, -3.5);
  scene.add(coolCyanLight);

  // Rim Silhouette Light: Rear White
  const rimBackLight = new THREE.DirectionalLight(0xE2E8F0, 1.2);
  rimBackLight.position.set(0, 4.0, -5);
  scene.add(rimBackLight);

  // === 5. LUXURY METALLIC & CHAMFER MATERIALS ===
  // Polished obsidian titanium material (primary monolith body, deep luxury dark gunmetal)
  const obsidianMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x05070a,
    metalness: 0.94,
    roughness: 0.28,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
    reflectivity: 0.85,
    side: THREE.DoubleSide
  });

  // Brushed dark titanium material (secondary offset slabs)
  const brushedTitaniumMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0a0d14,
    metalness: 0.88,
    roughness: 0.35,
    clearcoat: 0.4,
    clearcoatRoughness: 0.25,
    reflectivity: 0.75,
    side: THREE.DoubleSide
  });

  // Accent warm bronze-gold metallic material (focal prism)
  const bronzeAccentMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x16130e,
    emissive: 0x2a1402,
    emissiveIntensity: 0.25,
    metalness: 0.92,
    roughness: 0.22,
    clearcoat: 0.7,
    side: THREE.DoubleSide
  });

  // Razor-sharp edge highlight materials
  const amberEdgeMaterial = new THREE.LineBasicMaterial({
    color: 0xFBA055,
    transparent: true,
    opacity: 0.85
  });

  const cyanEdgeMaterial = new THREE.LineBasicMaterial({
    color: 0x38BDF8,
    transparent: true,
    opacity: 0.6
  });

  // === 6. MASTER ARCHITECTURAL MONOLITH SCULPTURE ===
  const masterSculpture = new THREE.Group();

  // Helper: Create a beveled architectural block with glowing edge lines
  function createArchitecturalBlock(width, height, depth, material, edgeMaterial, posX, posY, posZ, rotX, rotY, rotZ) {
    const blockGroup = new THREE.Group();
    const geom = new THREE.BoxGeometry(width, height, depth);
    const mesh = new THREE.Mesh(geom, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    blockGroup.add(mesh);

    // Micro-chamfer crisp edge wireframe
    const edgesGeom = new THREE.EdgesGeometry(geom, 25);
    const edgeLines = new THREE.LineSegments(edgesGeom, edgeMaterial);
    blockGroup.add(edgeLines);

    blockGroup.position.set(posX, posY, posZ);
    blockGroup.rotation.set(rotX, rotY, rotZ);
    return blockGroup;
  }

  // Architectural Cluster: 7 Deconstructivist Interlocking Monoliths
  // 1. Central Tall Monolith (Primary Pillar)
  const monolithCore = createArchitecturalBlock(
    0.95, 3.6, 0.75,
    obsidianMaterial, amberEdgeMaterial,
    0, 0, 0,
    0.05, 0.1, -0.08
  );
  masterSculpture.add(monolithCore);

  // 2. Leaning Cantilever Slab (Angled architectural support)
  const slabLeft = createArchitecturalBlock(
    0.85, 3.1, 0.6,
    brushedTitaniumMaterial, cyanEdgeMaterial,
    -0.85, -0.2, 0.35,
    0.12, 0.25, 0.32
  );
  masterSculpture.add(slabLeft);

  // 3. Counter-leaning Monolith (Right wing)
  const slabRight = createArchitecturalBlock(
    0.75, 2.7, 0.55,
    obsidianMaterial, amberEdgeMaterial,
    0.8, 0.25, -0.3,
    -0.2, -0.35, -0.42
  );
  masterSculpture.add(slabRight);

  // 4. Horizontal Bridging Crossbar
  const crossbar = createArchitecturalBlock(
    2.5, 0.45, 0.6,
    bronzeAccentMaterial, amberEdgeMaterial,
    0.1, -0.85, 0.2,
    0.08, 0.05, 0.06
  );
  masterSculpture.add(crossbar);

  // 5. Crown Apex Prism (Top angled facet catching amber light)
  const apexPrism = createArchitecturalBlock(
    0.5, 1.1, 0.4,
    bronzeAccentMaterial, amberEdgeMaterial,
    -0.25, 1.85, 0.15,
    -0.1, 0.15, 0.12
  );
  masterSculpture.add(apexPrism);

  // 6. Sub-surface Diagonal Wedge (Adds structural depth)
  const wedgeGroup = new THREE.Group();
  const wedgeGeom = new THREE.CylinderGeometry(0.3, 0.65, 1.5, 5, 1);
  const wedgeMesh = new THREE.Mesh(wedgeGeom, obsidianMaterial);
  wedgeGroup.add(wedgeMesh);
  const wedgeEdges = new THREE.LineSegments(new THREE.EdgesGeometry(wedgeGeom, 20), amberEdgeMaterial);
  wedgeGroup.add(wedgeEdges);
  wedgeGroup.position.set(0.9, -0.7, 0.45);
  wedgeGroup.rotation.set(0.4, 0.2, Math.PI * 0.65);
  masterSculpture.add(wedgeGroup);

  // 7. Base Foundation Plinth (Ground balance)
  const basePlinth = createArchitecturalBlock(
    1.6, 0.4, 0.9,
    brushedTitaniumMaterial, cyanEdgeMaterial,
    -0.3, -1.9, -0.2,
    0.04, -0.08, 0.02
  );
  masterSculpture.add(basePlinth);

  // === 7. DELICATE 3D COORDINATE LASER LINES ===
  // Hairline geometric coordinates with glowing vertex nodes traversing 3D space
  const laserLinesGroup = new THREE.Group();
  const laserEndpoints = [
    { start: [-3.8, 2.5, -1.5], end: [3.8, -2.4, 1.2], color: 0xFF5E1A, dotColor: 0xFBA055 },
    { start: [-3.2, -2.0, 1.6], end: [3.4, 2.7, -1.2], color: 0x38BDF8, dotColor: 0x93C5FD },
    { start: [-1.2, 3.5, 0.8], end: [1.6, -3.2, -0.9], color: 0xF59E0B, dotColor: 0xFDE68A },
    { start: [3.5, 1.2, 1.5], end: [-3.6, -1.0, -1.4], color: 0x38BDF8, dotColor: 0xBAE6FD }
  ];

  laserEndpoints.forEach(cfg => {
    const lineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...cfg.start),
      new THREE.Vector3(...cfg.end)
    ]);
    const lineMat = new THREE.LineBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0.45
    });
    laserLinesGroup.add(new THREE.Line(lineGeom, lineMat));

    // Luminous vertex dots at terminals
    [cfg.start, cfg.end].forEach(pt => {
      const dotGeom = new THREE.SphereGeometry(0.038, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({
        color: cfg.dotColor,
        transparent: true,
        opacity: 0.85
      });
      const dot = new THREE.Mesh(dotGeom, dotMat);
      dot.position.set(...pt);
      laserLinesGroup.add(dot);
    });
  });
  masterSculpture.add(laserLinesGroup);

  // === 8. THIN ORBITAL VECTOR RINGS ===
  function createOrbitalRing(radius, segments, color, rotX, rotY, opacity) {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      linewidth: 1
    });
    const ring = new THREE.LineLoop(geom, mat);
    ring.rotation.x = rotX;
    ring.rotation.y = rotY;
    return ring;
  }

  const orbitRing1 = createOrbitalRing(2.8, 80, 0xFBA055, Math.PI * 0.32, Math.PI * 0.12, 0.35);
  const orbitRing2 = createOrbitalRing(3.1, 80, 0x38BDF8, -Math.PI * 0.25, Math.PI * 0.35, 0.3);
  masterSculpture.add(orbitRing1);
  masterSculpture.add(orbitRing2);

  // === 9. CELESTIAL AMBIENT DUST PARTICLES ===
  const particleCount = 190;
  const particleGeom = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particlePos[i * 3] = (Math.random() - 0.5) * 16;
    particlePos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    particlePos[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xFBA055,
    size: 0.035,
    transparent: true,
    opacity: 0.5
  });
  const particles = new THREE.Points(particleGeom, particleMat);
  masterSculpture.add(particles);

  // Initial sculpture placement (offset right in hero to frame headline cleanly)
  masterSculpture.position.set(0.55, 0.0, 0);
  scene.add(masterSculpture);

  // === 10. MOUSE & SCROLL REACTION CONTROLLERS ===
  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };
  let isBlasting = false;
  let blastFactor = 0;

  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // "HOLD TO BLAST" Physics
  window.addEventListener('mousedown', () => { isBlasting = true; });
  window.addEventListener('mouseup', () => { isBlasting = false; });
  window.addEventListener('touchstart', () => { isBlasting = true; }, { passive: true });
  window.addEventListener('touchend', () => { isBlasting = false; }, { passive: true });

  let targetScrollY = 0;
  let currentScrollY = 0;
  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
  }, { passive: true });

  // === 11. 60FPS SMOOTH CALIBRATED ANIMATION LOOP ===
  // Rotates at a steady, dignified, normal speed (0.05 rad/s) throughout the entire site
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    // Smooth scroll interpolation
    currentScrollY += (targetScrollY - currentScrollY) * 0.05;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollProgress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);

    // Mouse parallax damping
    targetMouse.x += (mouse.x * 0.35 - targetMouse.x) * 0.04;
    targetMouse.y += (mouse.y * 0.25 - targetMouse.y) * 0.04;

    // Normal, steady, dignified angular velocity (0.045 rad/s base)
    // Angles facets towards camera for rich isometric depth across all sections
    masterSculpture.rotation.y = 0.45 + elapsed * 0.045 + scrollProgress * Math.PI * 0.75 + targetMouse.x;
    masterSculpture.rotation.x = 0.12 + Math.sin(elapsed * 0.1) * 0.05 + scrollProgress * 0.35 - targetMouse.y;
    masterSculpture.rotation.z = 0.06 + Math.cos(elapsed * 0.08) * 0.04;

    // Orbital rings gentle independent drift
    orbitRing1.rotation.z = elapsed * 0.08;
    orbitRing2.rotation.z = -elapsed * 0.09;

    // Laser rays subtle sway
    laserLinesGroup.rotation.y = Math.sin(elapsed * 0.15) * 0.05;
    laserLinesGroup.rotation.x = Math.cos(elapsed * 0.18) * 0.04;

    // Ambient dust motes drift
    particles.rotation.y = elapsed * 0.015;

    // Responsive dynamic spatial framing across scroll:
    // Hero: x = 0.65, frames headline on the left
    // About & Work: glides into depth (z = -2.0) and frames right margin (x = 0.75) to keep editorial text 100% clean
    // Contact: glides towards center behind consultation terminal
    let targetX, targetY, targetZ, targetScale;
    if (scrollProgress < 0.2) {
      const p = scrollProgress / 0.2;
      targetX = 0.65 + p * 0.15;
      targetY = Math.sin(elapsed * 0.35) * 0.06 - p * 0.4;
      targetZ = -p * 1.5;
      targetScale = 1.0 - p * 0.18;
    } else if (scrollProgress < 0.75) {
      const p = (scrollProgress - 0.2) / 0.55;
      targetX = 0.8 - p * 0.45;
      targetY = -0.4 - p * 0.35;
      targetZ = -1.5 - p * 0.8;
      targetScale = 0.82;
    } else {
      const p = (scrollProgress - 0.75) / 0.25;
      targetX = 0.35 - p * 0.35;
      targetY = -0.75 - p * 0.2;
      targetZ = -2.3 + p * 0.6;
      targetScale = 0.82 + p * 0.12;
    }

    masterSculpture.position.set(targetX, targetY, targetZ);

    // Blast physics (smooth lighting intensity flair on hold)
    if (isBlasting) {
      blastFactor += (1 - blastFactor) * 0.14;
    } else {
      blastFactor += (0 - blastFactor) * 0.07;
    }

    keyAmberLight.intensity = 8.5 + blastFactor * 9.0;
    masterSculpture.scale.setScalar(targetScale * (1.0 + blastFactor * 0.08));

    renderer.render(scene, camera);
  }

  animate();

  // === 12. RESPONSIVE VIEWPORT CALIBRATION ===
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      if (window.innerWidth < 768) {
        camera.position.z = 9.8;
        masterSculpture.position.x = 0;
      } else {
        camera.position.z = 7.5;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 60);
  });

  if (window.innerWidth < 768) {
    camera.position.z = 9.8;
    masterSculpture.position.x = 0;
    camera.updateProjectionMatrix();
  }
});
