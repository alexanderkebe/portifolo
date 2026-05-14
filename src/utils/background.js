import * as THREE from 'three';

export function initBackground(containerId = 'hero-canvas') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Particles
  const particlesCount = 200;
  const positions = new Float32Array(particlesCount * 3);
  const scales = new Float32Array(particlesCount);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    scales[i] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x60a5fa,
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Abstract Shapes
  const shapesGroup = new THREE.Group();
  scene.add(shapesGroup);

  const shapeCount = 5;
  for (let i = 0; i < shapeCount; i++) {
    const geom = new THREE.IcosahedronGeometry(Math.random() * 0.5 + 0.2, 0);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8
    );
    mesh.rotation.set(Math.random(), Math.random(), Math.random());
    shapesGroup.add(mesh);
  }

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  camera.position.z = 5;

  // Mouse Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  const animate = () => {
    requestAnimationFrame(animate);

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;
    
    shapesGroup.rotation.y += 0.002;
    shapesGroup.children.forEach(child => {
      child.rotation.x += 0.01;
      child.rotation.z += 0.01;
    });

    scene.rotation.y = targetX * 0.2;
    scene.rotation.x = -targetY * 0.2;

    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
