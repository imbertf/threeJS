import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const light = new THREE.AmbientLight( 0x404040, 100 );
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

camera.position.z = 5;
scene.background = new THREE.Color( 0xd3d3d3 );

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const loader = new GLTFLoader();

loader.load("./public/mclaren/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error('Error loading GLB file:', error);
});

scene.add( light );

function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
}

animate();