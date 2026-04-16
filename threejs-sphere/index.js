import * as THREE from "three";
import { OrbitControls} from "jsm/controls/OrbitControls.js";
import { FontLoader } from "jsm/loaders/FontLoader.js";
import { TextGeometry } from "jsm/geometries/TextGeometry.js";


// SCENE SETUP
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w /h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// LIGHT
const hemiLight = new THREE.HemisphereLight( 0x0099ff, 0xaa5500);
scene.add(hemiLight);

// WORD POSITIONS
const count = 8;
const radius = 2;

const positions = [];
const spherical = new THREE.Spherical();

const phiSpan = Math.PI / (count + 1);
const thetaSpan = (Math.PI * 2) / count;

for (let i = 1; i < count + 1; i++) {
    for (let j = 0; j < count; j++) {
        const pos = new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phiSpan * i, thetaSpan * j)
        );
        positions.push(pos);  
    }
}

// LOAD FONT + CREATE TEXT
const loader = new FontLoader();

loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
    const words = ["identity", "self", "mask", "digital", "real"];
    positions.forEach((pos, i) => {
        const textGeo = new TextGeometry(words[i % words.length], {
        font: font,
        size: 0.15,
        height: 0.01
        });

        const textMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeo, textMat);

        textMesh.position.copy(pos);
        scene.add(textMesh);
    });
  }
);



function animate() {
    requestAnimationFrame(animate);

    // billboard effect
    scene.traverse((obj) => {
        if (obj.isMesh && obj.geometry.type === "TextGeometry") {
        obj.lookAt(camera.position);
        }
    });

    renderer.render(scene, camera);
    controls.update();
}

animate()