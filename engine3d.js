/**
 * TRIONN Studio Full-Page 3D Sky Engine
 * Multi-Stage Atmospheric Universe Floating Behind the Entire Website:
 * - Stage 1 (Hero): Monumental Obsidian Triangular Sculpture with Amber Core Light & Laser Rays
 * - Stage 2 (About & Showcase): Floating Asteroid Monolith with Orbiting Debris (from TRIONN frames 12 & 15)
 * - Stage 3 (Vault & Motion Grid): 3D Infinite Cyber Grid & Drifting Particle Nebula
 * - Stage 4 (Contact & Footer): Ascending Amber Ember Vortex
 * - Camera glides continuously along Y axis as user scrolls through the entire website
 * - 3D Card Hover Physics (Magnetic perspective tilt + specular glare on all cards)
 * - "HOLD TO BLAST" interactive physics on mouse down/touch
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
    }, { threshold: 0.08 });
    revealEls.forEach(el => obs.observe(el));
  }

  // === 2. 3D CARD TILT & GLARE INTERACTION SYSTEM ===
  const interactiveCards = document.querySelectorAll('.workflow-card, .showcase-featured-card, .facts-item, .contact-form-card, .hero-info-card');
  interactiveCards.forEach(card => {
    let bounds;

    function onMouseEnter(e) {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      const xPct = mouseX / bounds.width - 0.5;
      const yPct = mouseY / bounds.height - 0.5;

      // 3D perspective tilt
      const rotX = -yPct * 12; // degrees
      const rotY = xPct * 14;  // degrees

      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-8px) scale3d(1.015, 1.015, 1.015)`;

      // Dynamic glare highlight update
      const glare = card.querySelector('.card-glare');
      if (glare) {
        glare.style.opacity = '1';
        glare.style.transform = `translate(${mouseX - 150}px, ${mouseY - 150}px)`;
      }
    }

    function onMouseLeave() {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
      const glare = card.querySelector('.card-glare');
      if (glare) glare.style.opacity = '0';
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    // Inject glare element if missing
    if (!card.querySelector('.card-glare')) {
      const glareEl = document.createElement('div');
      glareEl.className = 'card-glare';
      card.appendChild(glareEl);
    }
  });

  // === 3. THREE.JS MULTI-STAGE 3D SKY ENGINE ===
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene & Fog (atmospheric sky depth)
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x040508, 0.028);

  // Camera
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 7.5);

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
  renderer.toneMappingExposure = 1.05;
  if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;

  // === 4. SHARED LIGHTING RIG ===
  const ambientLight = new THREE.AmbientLight(0x0e1017, 1.4);
  scene.add(ambientLight);

  // Stage 1 Hero Lights
  const heroCoreAmber = new THREE.PointLight(0xFF4500, 6.5, 16, 1.2);
  heroCoreAmber.position.set(0.3, -0.2, 1.0);
  scene.add(heroCoreAmber);

  const heroSecondaryAmber = new THREE.PointLight(0xFFA500, 3.5, 12, 1.5);
  heroSecondaryAmber.position.set(-0.4, 0.7, 0.6);
  scene.add(heroSecondaryAmber);

  const heroBlueRim = new THREE.DirectionalLight(0x3B82F6, 3.5);
  heroBlueRim.position.set(-6, 5, 4);
  scene.add(heroBlueRim);

  const heroBackLight = new THREE.DirectionalLight(0xFFFFFF, 1.6);
  heroBackLight.position.set(5, -4, -4);
  scene.add(heroBackLight);

  // Stage 2 & 3 Ambient Sky Lights
  const skyLightMid = new THREE.PointLight(0x60A5FA, 4.0, 30);
  skyLightMid.position.set(-4, -16, 3);
  scene.add(skyLightMid);

  const skyLightLower = new THREE.PointLight(0xF97316, 5.0, 35);
  skyLightLower.position.set(4, -32, 2);
  scene.add(skyLightLower);

  // === 5. MATERIALS ===
  const obsidianMetal = new THREE.MeshPhysicalMaterial({
    color: 0x090a0f,
    metalness: 0.96,
    roughness: 0.16,
    clearcoat: 0.85,
    clearcoatRoughness: 0.12,
    reflectivity: 0.96,
    side: THREE.DoubleSide
  });

  const facetedAccentMetal = new THREE.MeshPhysicalMaterial({
    color: 0x12141c,
    metalness: 0.92,
    roughness: 0.25,
    clearcoat: 0.6,
    reflectivity: 0.85,
    side: THREE.DoubleSide
  });

  const asteroidRockMaterial = new THREE.MeshStandardMaterial({
    color: 0x1c1e24,
    roughness: 0.85,
    metalness: 0.25,
    flatShading: true
  });

  // Helper for beveled extruded shapes
  function createBeveledBeam(points, depth, material) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();

    const geom = new THREE.ExtrudeGeometry(shape, {
      steps: 1,
      depth: depth,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.07,
      bevelSegments: 4
    });
    geom.center();
    return new THREE.Mesh(geom, material);
  }

  // === STAGE 1: HERO TRIANGULAR MONUMENT (At Y = 0) ===
  const heroGroup = new THREE.Group();

  // Left upright beam
  const leftBeam = createBeveledBeam([[-0.32, -1.9], [0.32, -1.9], [0.28, 1.8], [-0.28, 1.8]], 0.38, obsidianMetal);
  leftBeam.position.set(-0.75, 0.0, 0.15);
  leftBeam.rotation.z = -0.32;
  leftBeam.rotation.y = 0.12;
  heroGroup.add(leftBeam);

  // Right upright beam
  const rightBeam = createBeveledBeam([[-0.32, -1.9], [0.32, -1.9], [0.28, 1.8], [-0.28, 1.8]], 0.38, obsidianMetal);
  rightBeam.position.set(0.75, -0.05, -0.15);
  rightBeam.rotation.z = 0.36;
  rightBeam.rotation.y = -0.14;
  heroGroup.add(rightBeam);

  // Horizontal crossbar
  const crossBeam = createBeveledBeam([[-1.25, -0.22], [1.25, -0.22], [1.15, 0.22], [-1.15, 0.22]], 0.42, facetedAccentMetal);
  crossBeam.position.set(0.05, -0.85, 0.22);
  crossBeam.rotation.z = 0.04;
  heroGroup.add(crossBeam);

  // Apex interlocking prism
  const apexPrism = createBeveledBeam([[-0.45, -0.6], [0.45, -0.6], [0.25, 0.6], [-0.25, 0.6]], 0.46, obsidianMetal);
  apexPrism.position.set(0.02, 1.45, 0.1);
  apexPrism.rotation.z = -0.05;
  heroGroup.add(apexPrism);

  // Inner floating shard
  const innerShard = createBeveledBeam([[-0.18, -0.9], [0.18, -0.9], [0.12, 0.9], [-0.12, 0.9]], 0.24, facetedAccentMetal);
  innerShard.position.set(-0.15, 0.1, 0.28);
  innerShard.rotation.z = 0.22;
  innerShard.rotation.y = 0.3;
  heroGroup.add(innerShard);

  // Stepped base footing
  const baseFoot = createBeveledBeam([[-0.55, -0.2], [0.55, -0.2], [0.45, 0.2], [-0.45, 0.2]], 0.5, obsidianMetal);
  baseFoot.position.set(-1.3, -1.6, 0.1);
  baseFoot.rotation.z = -0.15;
  heroGroup.add(baseFoot);

  // Radiating 3D laser lines & glowing markers
  const laserLinesGroup = new THREE.Group();
  const laserConfigs = [
    { start: [-3.5, 2.2, -1.0], end: [3.8, -2.4, 1.2], color: 0xFF5500, glowColor: 0xFFA500 },
    { start: [-2.8, -2.0, 1.5], end: [3.2, 2.6, -1.2], color: 0x3B82F6, glowColor: 0x60A5FA },
    { start: [-1.2, 3.2, 0.8], end: [1.6, -3.2, -0.6], color: 0xFF7700, glowColor: 0xFDBA74 },
    { start: [3.4, 1.2, 1.4], end: [-3.6, -1.0, -1.0], color: 0x93C5FD, glowColor: 0xDBEAFE },
    { start: [-2.0, 0.4, -2.0], end: [2.5, 0.2, 2.2], color: 0xF97316, glowColor: 0xFDBA74 }
  ];
  laserConfigs.forEach(cfg => {
    const lineMat = new THREE.LineBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.55 });
    const lineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...cfg.start), new THREE.Vector3(...cfg.end)]);
    laserLinesGroup.add(new THREE.Line(lineGeom, lineMat));

    [cfg.start, cfg.end].forEach(pt => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), new THREE.MeshBasicMaterial({ color: cfg.glowColor, transparent: true, opacity: 0.85 }));
      dot.position.set(...pt);
      laserLinesGroup.add(dot);
    });
  });
  heroGroup.add(laserLinesGroup);

  // Position hero group
  heroGroup.position.set(0.65, 0.05, 0);
  scene.add(heroGroup);

  // === STAGE 2: FLOATING MONOLITHIC ASTEROID / STONE (At Y = -14) ===
  // Directly replicates TRIONN frames 12 & 15 floating stone
  const stage2Group = new THREE.Group();
  stage2Group.position.set(0, -14, -1.5);

  // Central sculpted asteroid block
  const asteroidGeom = new THREE.DodecahedronGeometry(2.4, 1);
  // Deform vertices for natural rock fissures
  const posAttr = asteroidGeom.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vy = posAttr.getY(i);
    const vz = posAttr.getZ(i);
    const noise = Math.sin(vx * 3.0) * Math.cos(vy * 3.0) * Math.sin(vz * 3.0) * 0.25;
    posAttr.setXYZ(i, vx + noise, vy * 1.15 + noise, vz + noise);
  }
  asteroidGeom.computeVertexNormals();

  const asteroidMesh = new THREE.Mesh(asteroidGeom, asteroidRockMaterial);
  stage2Group.add(asteroidMesh);

  // Orbiting crystal shards around the asteroid
  const shardsGroup = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const shardGeom = new THREE.TetrahedronGeometry(0.25 + Math.random() * 0.35);
    const shardMesh = new THREE.Mesh(shardGeom, obsidianMetal);
    const angle = (i / 8) * Math.PI * 2;
    const radius = 3.6 + Math.random() * 1.2;
    shardMesh.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius);
    shardMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    shardsGroup.add(shardMesh);
  }
  stage2Group.add(shardsGroup);
  scene.add(stage2Group);

  // === STAGE 3: DRIFTING CYBER HORIZON GRID (At Y = -26) ===
  const gridHelper = new THREE.GridHelper(40, 40, 0x3B82F6, 0x1E2026);
  gridHelper.position.set(0, -28, -2);
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.22;
  scene.add(gridHelper);

  // === STAGE 4: ASCENDING EMBER VORTEX (At Y = -38) ===
  const emberCount = 200;
  const emberGeom = new THREE.BufferGeometry();
  const emberPositions = new Float32Array(emberCount * 3);
  const emberSpeeds = new Float32Array(emberCount);
  for (let i = 0; i < emberCount; i++) {
    emberPositions[i * 3] = (Math.random() - 0.5) * 16;
    emberPositions[i * 3 + 1] = -45 + Math.random() * 18;
    emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    emberSpeeds[i] = 0.02 + Math.random() * 0.04;
  }
  emberGeom.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
  const emberMat = new THREE.PointsMaterial({
    color: 0xFF5500,
    size: 0.06,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  const emberParticles = new THREE.Points(emberGeom, emberMat);
  scene.add(emberParticles);

  // === GLOBAL STARFIELD NEBULA PARTICLES (Full Sky Coverage) ===
  const skyParticleCount = 350;
  const skyParticleGeom = new THREE.BufferGeometry();
  const skyParticlePos = new Float32Array(skyParticleCount * 3);
  for (let i = 0; i < skyParticleCount; i++) {
    skyParticlePos[i * 3] = (Math.random() - 0.5) * 22;
    skyParticlePos[i * 3 + 1] = 6 - Math.random() * 52; // Extends down across whole page height
    skyParticlePos[i * 3 + 2] = (Math.random() - 0.5) * 14;
  }
  skyParticleGeom.setAttribute('position', new THREE.BufferAttribute(skyParticlePos, 3));
  const skyParticleMat = new THREE.PointsMaterial({
    color: 0xD8D8D8,
    size: 0.035,
    transparent: true,
    opacity: 0.55
  });
  const skyParticles = new THREE.Points(skyParticleGeom, skyParticleMat);
  scene.add(skyParticles);

  // === 6. MOUSE & SCROLL PHYSICS ===
  const mouse = { x: 0, y: 0 };
  const targetRot = { x: 0, y: 0 };
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

  // === 7. 60FPS FLUID ANIMATION LOOP ===
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    // Smooth scroll interpolation (camera flight through sky)
    currentScrollY += (targetScrollY - currentScrollY) * 0.055;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollFraction = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);

    // Camera descends along Y through the multi-stage universe
    camera.position.y = -scrollFraction * 36;

    // Damped mouse follow
    targetRot.x += (mouse.y * 0.35 - targetRot.x) * 0.045;
    targetRot.y += (mouse.x * 0.55 - targetRot.y) * 0.045;

    // Stage 1 Monument rotation & levitation
    heroGroup.rotation.y = targetRot.y + Math.sin(elapsed * 0.25) * 0.08;
    heroGroup.rotation.x = -targetRot.x + Math.cos(elapsed * 0.3) * 0.05;
    heroGroup.position.y = 0.05 + Math.sin(elapsed * 0.8) * 0.12;

    // Stage 2 Asteroid rock continuous slow rotation & shard orbit
    asteroidMesh.rotation.y = elapsed * 0.12;
    asteroidMesh.rotation.x = Math.sin(elapsed * 0.1) * 0.15;
    shardsGroup.rotation.y = -elapsed * 0.18;

    // Stage 4 Ember vortex ascending animation
    const pos = emberGeom.attributes.position.array;
    for (let i = 0; i < emberCount; i++) {
      pos[i * 3 + 1] += emberSpeeds[i];
      if (pos[i * 3 + 1] > -26) {
        pos[i * 3 + 1] = -45;
      }
    }
    emberGeom.attributes.position.needsUpdate = true;

    // Laser lines breathing
    laserLinesGroup.rotation.y = Math.sin(elapsed * 0.35) * 0.06;

    // Sky particles drift
    skyParticles.rotation.y = elapsed * 0.015;

    // Blast physics
    if (isBlasting) {
      blastFactor += (1 - blastFactor) * 0.16;
    } else {
      blastFactor += (0 - blastFactor) * 0.08;
    }

    heroCoreAmber.intensity = 6.5 + blastFactor * 9.0;
    heroGroup.scale.setScalar(1.0 + blastFactor * 0.1);

    renderer.render(scene, camera);
  }

  animate();

  // === 8. RESPONSIVE CALIBRATION ===
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      if (window.innerWidth < 768) {
        camera.position.z = 9.8;
        heroGroup.position.set(0, 0.4, 0);
      } else {
        camera.position.z = 7.5;
        heroGroup.position.set(0.65, 0.05, 0);
      }
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, 60);
  });

  if (window.innerWidth < 768) {
    camera.position.z = 9.8;
    heroGroup.position.set(0, 0.4, 0);
    camera.updateProjectionMatrix();
  }
});
