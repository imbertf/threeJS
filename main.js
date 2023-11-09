import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { STLLoader } from 'three/addons/loaders/STLLoader.js'

const createOptionsForm = () => {
    // create form
    const getOptions = document.getElementById("options")
    const form = document.createElement("form")
    getOptions.appendChild(form)

    // create label
    const getForm = document.querySelector("form")
    const label = document.createElement("label")
    label.htmlFor = "color_select"
    label.textContent = "Color selection"
    getForm.appendChild(label)

    // create options
    const colorOptions = [
        { "value": "#ffffff", "text": "White" },
        { "value": "#000000", "text": "Black" },
        { "value": "#d30000", "text": "Red" },
        { "value": "#008000", "text": "Green" }
    ]

    colorOptions.map((color) => {
        const inputColor = document.createElement("input")
        inputColor.setAttribute("type", "color")
        inputColor.setAttribute("value", `${color.value}`)
        form.appendChild(inputColor)
    });
};

createOptionsForm();

const selectColor = () => {
    // get selected color value when clickin on input color
    const selectedColor = []
    const inputs = document.querySelectorAll("input")
    for (let a of inputs) {
        a.addEventListener("click", function () {
            if (selectedColor.length = 1) {
                selectedColor.push(a.value)
                selectedColor.shift()
                localStorage.setItem("selectedColor", selectedColor)
                location.reload()
            }
        })
    }
}

selectColor();

// DIV for three element
const container = document.getElementById("canvas")

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd3d3d3);

// camera using container size
const camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight);
camera.position.set(2, 5, 10);
camera.lookAt(scene.position);

// insert renderer in container
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setAnimationLoop(animationLoop);
container.appendChild(renderer.domElement);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// light
const ambientLight = new THREE.AmbientLight('white', 0.5);
scene.add(ambientLight);
const light = new THREE.DirectionalLight('white', 0.5);
light.position.set(1, 1, 1);
scene.add(light);

// utils
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


// cube object
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({ color: `${localStorage.getItem("selectedColor")}`, shininess: 10 }),
);
scene.add(cube)

function animationLoop(t) {
    // cube.rotation.x = Math.sin(t / 700);
    // cube.rotation.y = Math.sin(t / 900);

    controls.update();
    light.position.copy(camera.position);
    renderer.render(scene, camera);
}



// GLTF FORMAT
// const loader = new GLTFLoader();
// loader.load("./public/mclaren/scene.gltf", function (gltf) {
//     scene.add(gltf.scene);
// }, undefined, function (error) {
//     console.error('Error loading GLB file:', error);
// });

// STL FORMAT
// const loader = new STLLoader();
// loader.load('./public/oeweo/scene.stl', function (stl) {
//     scene.add(stl.scene);
// }, undefined, function (error) {
//     console.error(error)
// }
// )