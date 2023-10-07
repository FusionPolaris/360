
// Initialize variables
let camera, scene, renderer, textureLoader, geometry, material, mesh;

// Set up the scene
function init() {
    const viewer = document.getElementById('viewer');

    // Camera
    camera = new THREE.PerspectiveCamera(75, viewer.offsetWidth / viewer.offsetHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);

    // Scene
    scene = new THREE.Scene();

    // Texture loader
    textureLoader = new THREE.TextureLoader();
    textureLoader.load('eso0932a.jpg', function(texture) {
        // Geometry and material
        geometry = new THREE.SphereBufferGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1); // Invert the geometry on the x-axis
        material = new THREE.MeshBasicMaterial({
            map: texture
        });

        // Mesh
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    });

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(viewer.offsetWidth, viewer.offsetHeight);
    viewer.appendChild(renderer.domElement);

    // Event listeners
    document.getElementById('fileInput').addEventListener('change', onFileChange);
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('deviceorientation', onDeviceOrientation);
}

// Update the scene and camera
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Handle device orientation for mobile
function onDeviceOrientation(event) {
    const alpha = THREE.MathUtils.degToRad(event.alpha);
    const beta = THREE.MathUtils.degToRad(event.beta);
    const gamma = THREE.MathUtils.degToRad(event.gamma);

    camera.rotation.set(beta, alpha - 0.5 * Math.PI, gamma);
}

// Handle file input change
function onFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function() {
        textureLoader.load(reader.result, function(texture) {
            mesh.material.map = texture;
        });
    });
    reader.readAsDataURL(file);
}

// Initialize and animate
init();
animate();
