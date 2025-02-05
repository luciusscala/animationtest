// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("webgl"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("assets/texture.jpg");

// Load shaders
const vertexShader = await fetch('shaders/vertexShader.glsl').then(res => res.text());
const fragmentShader = await fetch('shaders/fragmentShader.glsl').then(res => res.text());

// Create plane with shader material
const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTexture: { value: texture },
    uMouse: { value: { x: 0.5, y: 0.5 } },
    uTime: { value: 0 }
  },
  vertexShader,
  fragmentShader
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Update mouse position
document.addEventListener("mousemove", (e) => {
  material.uniforms.uMouse.value.x = e.clientX / window.innerWidth;
  material.uniforms.uMouse.value.y = 1.0 - e.clientY / window.innerHeight;
});

// Animation loop
function animate() {
  material.uniforms.uTime.value += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

gsap.to(".title", {
    y: -200,
    scrollTrigger: {
      trigger: ".content",
      scrub: true
    }
  });
  