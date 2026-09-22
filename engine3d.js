/**
 * TRIONN Studio High-Fidelity 3D WebGL Engine
 * Exact replica of the dark metallic geometric sculpture from trionn.com
 * Features:
 * - Beveled obsidian metallic architectural geometry
 * - Internal warm amber/orange point light reflections
 * - Cold blue/cyan rim light specular highlights
 * - 3D laser guide lines with glowing vertex markers
 * - Floating spark particles
 * - Smooth inertial mouse parallax & scroll-driven rotation
 * - "HOLD TO BLAST" interactive click/touch physics
 */

document.addEventListener('DOMContentLoaded', () => {
  // === 1. SCROLL REVEAL OBSERVER ===
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => obs.observe(el));
  }

  // === 2. THREE.JS 3D ENGINE ===
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 7.2);

  // WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;

  // === 3. LIGHTING RIG ===
  // Ambient fill
  const ambient = new THREE.AmbientLight(0x0e1017, 1.2);
  scene.add(ambient);

  // Intense Warm Amber Core Light (recreates the burning orange inner glow)
  const coreAmber = new THREE.PointLight(0xFF4500, 6.0, 14, 1.2);
  coreAmber.position.set(0.2, -0.1, 0.8);
  scene.add(coreAmber);

  const secondaryAmber = new THREE.PointLight(0xFFA500, 3.5, 10, 1.5);
  secondaryAmber.position.set(-0.4, 0.6, 0.5);
  scene.add(secondaryAmber);

  // Cool Cyan / Blue Rim Light (sharp specular on outer facets)
  const blueRim = new THREE.DirectionalLight(0x3B82F6, 3.2);
  blueRim.position.set(-6, 5, 4);
  scene.add(blueRim);

  // White Silhouette Backlight
  const backLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
  backLight.position.set(5, -4, -4);
  scene.add(backLight);

  // === 4. LUXURY OBSIDIAN METALLIC MATERIALS ===
  const obsidianMetal = new THREE.MeshPhysicalMaterial({
    color: 0x090a0f,
    metalness: 0.96,
    roughness: 0.18,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    reflectivity: 0.95,
    envMapIntensity: 1.4,
    side: THREE.DoubleSide
  });

  const facetedAccentMetal = new THREE.MeshPhysicalMaterial({
    color: 0x12141a,
    metalness: 0.92,
    roughness: 0.28,
    clearcoat: 0.5,
    reflectivity: 0.8,
    side: THREE.DoubleSide
  });

  // Master sculpture group
  const sculpture = new THREE.Group();

  // Helper to create beveled extruded beams
  function createBeveledBeam(shapePoints, depth, material) {
    const shape = new THREE.Shape();
    shape.moveTo(shapePoints[0][0], shapePoints[0][1]);
    for (let i = 1; i < shapePoints.length; i++) {
      shape.lineTo(shapePoints[i][0], shapePoints[i][1]);
    }
    shape.closePath();

    const extrudeSettings = {
      steps: 1,
      depth: depth,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.07,
      bevelOffset: 0,
      bevelSegments: 4
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return new THREE.Mesh(geom, material);
  }

  // Beam 1: Left Angled Upright (slanted upwards to peak)
  const leftBeam = createBeveledBeam([
    [-0.32, -1.9],
    [0.32, -1.9],
    [0.28, 1.8],
    [-0.28, 1.8]
  ], 0.38, obsidianMetal);
  leftBeam.position.set(-0.75, 0.0, 0.15);
  leftBeam.rotation.z = -0.32;
  leftBeam.rotation.y = 0.12;
  sculpture.add(leftBeam);

  // Beam 2: Right Angled Upright (slanted downwards from peak)
  const rightBeam = createBeveledBeam([
    [-0.32, -1.9],
    [0.32, -1.9],
    [0.28, 1.8],
    [-0.28, 1.8]
  ], 0.38, obsidianMetal);
  rightBeam.position.set(0.75, -0.05, -0.15);
  rightBeam.rotation.z = 0.36;
  rightBeam.rotation.y = -0.14;
  sculpture.add(rightBeam);

  // Beam 3: Horizontal / Angled Crossbar with stepped notch
  const crossBeam = createBeveledBeam([
    [-1.25, -0.22],
    [1.25, -0.22],
    [1.15, 0.22],
    [-1.15, 0.22]
  ], 0.42, facetedAccentMetal);
  crossBeam.position.set(0.05, -0.85, 0.22);
  crossBeam.rotation.z = 0.04;
  sculpture.add(crossBeam);

  // Beam 4: Central Faceted Apex Prism (interlocks at the top peak)
  const apexPrism = createBeveledBeam([
    [-0.45, -0.6],
    [0.45, -0.6],
    [0.25, 0.6],
    [-0.25, 0.6]
  ], 0.46, obsidianMetal);
  apexPrism.position.set(0.02, 1.45, 0.1);
  apexPrism.rotation.z = -0.05;
  sculpture.add(apexPrism);

  // Inner Accent 1: Internal floating shard (catches core amber light)
  const innerShard = createBeveledBeam([
    [-0.18, -0.9],
    [0.18, -0.9],
    [0.12, 0.9],
    [-0.12, 0.9]
  ], 0.24, facetedAccentMetal);
  innerShard.position.set(-0.15, 0.1, 0.28);
  innerShard.rotation.z = 0.22;
  innerShard.rotation.y = 0.3;
  sculpture.add(innerShard);

  // Inner Accent 2: Stepped base footing
  const baseFoot = createBeveledBeam([
    [-0.55, -0.2],
    [0.55, -0.2],
    [0.45, 0.2],
    [-0.45, 0.2]
  ], 0.5, obsidianMetal);
  baseFoot.position.set(-1.3, -1.6, 0.1);
  baseFoot.rotation.z = -0.15;
  sculpture.add(baseFoot);

  // === 5. RADIATING 3D LASER LINES & GLOWING VERTICES ===
  const laserLinesGroup = new THREE.Group();

  const laserConfigs = [
    { start: [-3.5, 2.2, -1.0], end: [3.8, -2.4, 1.2], color: 0xFF5500, glowColor: 0xFFA500 },
    { start: [-2.8, -2.0, 1.5], end: [3.2, 2.6, -1.2], color: 0x3B82F6, glowColor: 0x60A5FA },
    { start: [-1.2, 3.2, 0.8], end: [1.6, -3.2, -0.6], color: 0xFF7700, glowColor: 0xFDBA74 },
    { start: [3.4, 1.2, 1.4], end: [-3.6, -1.0, -1.0], color: 0x93C5FD, glowColor: 0xDBEAFE },
    { start: [-2.0, 0.4, -2.0], end: [2.5, 0.2, 2.2], color: 0xF97316, glowColor: 0xFDBA74 }
  ];

  laserConfigs.forEach(cfg => {
    // Thin laser line
    const lineMat = new THREE.LineBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0.55,
      linewidth: 1
    });
    const lineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...cfg.start),
      new THREE.Vector3(...cfg.end)
    ]);
    const line = new THREE.Line(lineGeom, lineMat);
    laserLinesGroup.add(line);

    // Glowing vertex points at endpoints
    [cfg.start, cfg.end].forEach(pt => {
      const dotGeom = new THREE.SphereGeometry(0.035, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({
        color: cfg.glowColor,
        transparent: true,
        opacity: 0.85
      });
      const dot = new THREE.Mesh(dotGeom, dotMat);
      dot.position.set(...pt);
      laserLinesGroup.add(dot);
    });
  });

  sculpture.add(laserLinesGroup);

  // === 6. FLOATING SPARK DUST PARTICLES ===
  const particleCount = 75;
  const particleGeom = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particlePos[i * 3] = (Math.random() - 0.5) * 8;
    particlePos[i * 3 + 1] = (Math.random() - 0.5) * 6;
    particlePos[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }
  particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xF97316,
    size: 0.035,
    transparent: true,
    opacity: 0.6
  });
  const particles = new THREE.Points(particleGeom, particleMat);
  sculpture.add(particles);

  // Position sculpture in hero viewport (shifted slightly right to match TRIONN reference)
  sculpture.position.set(0.65, 0.05, 0);
  scene.add(sculpture);

  // === 7. MOUSE & TOUCH PHYSICS WITH INERTIA ===
  const mouse = { x: 0, y: 0 };
  const targetRot = { x: 0, y: 0 };
  let isBlasting = false;
  let blastFactor = 0;

  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // "HOLD TO BLAST" Interaction
  function startBlast() {
    isBlasting = true;
  }
  function endBlast() {
    isBlasting = false;
  }

  window.addEventListener('mousedown', startBlast);
  window.addEventListener('mouseup', endBlast);
  window.addEventListener('touchstart', startBlast, { passive: true });
  window.addEventListener('touchend', endBlast, { passive: true });

  // === 8. SCROLL INTERACTION ===
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  // === 9. 60FPS ANIMATION LOOP ===
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    // Damped mouse follow
    targetRot.x += (mouse.y * 0.45 - targetRot.x) * 0.045;
    targetRot.y += (mouse.x * 0.7 - targetRot.y) * 0.045;

    // Base subtle continuous rotation + mouse parallax + scroll tilt
    const scrollOffset = scrollY * 0.0012;
    sculpture.rotation.y = targetRot.y + Math.sin(elapsed * 0.25) * 0.08 + scrollOffset;
    sculpture.rotation.x = -targetRot.x + Math.cos(elapsed * 0.3) * 0.05;

    // Organic floating levitation
    sculpture.position.y = 0.05 + Math.sin(elapsed * 0.8) * 0.12 - scrollY * 0.002;

    // Laser lines subtle breathing
    laserLinesGroup.rotation.y = Math.sin(elapsed * 0.35) * 0.06;
    laserLinesGroup.rotation.z = Math.cos(elapsed * 0.4) * 0.04;

    // Particles subtle orbit
    particles.rotation.y = elapsed * 0.03;
    particles.rotation.x = elapsed * 0.015;

    // Blast physics (flares core amber light & expands geometry on hold)
    if (isBlasting) {
      blastFactor += (1 - blastFactor) * 0.15;
    } else {
      blastFactor += (0 - blastFactor) * 0.08;
    }

    coreAmber.intensity = 6.0 + blastFactor * 8.0;
    coreAmber.distance = 14 + blastFactor * 6.0;
    sculpture.scale.setScalar(1.0 + blastFactor * 0.09);

    // Subtle dynamic lighting drift
    coreAmber.position.x = 0.2 + Math.sin(elapsed * 0.9) * 0.15;
    coreAmber.position.y = -0.1 + Math.cos(elapsed * 0.7) * 0.15;

    renderer.render(scene, camera);
  }

  animate();

  // === 10. RESIZE HANDLER ===
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      // Adjust camera distance for mobile screens
      if (window.innerWidth < 768) {
        camera.position.set(0, 0, 9.5);
        sculpture.position.set(0, 0.4, 0);
      } else {
        camera.position.set(0, 0, 7.2);
        sculpture.position.set(0.65, 0.05, 0);
      }
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 60);
  });

  // Initial mobile calibration
  if (window.innerWidth < 768) {
    camera.position.set(0, 0, 9.5);
    sculpture.position.set(0, 0.4, 0);
    camera.updateProjectionMatrix();
  }
});
