// http://www.html5canvastutorials.com/three/html5-canvas-webgl-ambient-lighting-with-three-js/
//http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/

// revolutions per second
//var angularSpeed = 0.2;
//var lastTime = 0;

// this function is executed on each animation frame
function animate(){
	// update
	//var time = (new Date()).getTime();
	//var timeDiff = time - lastTime;
	//var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
	//cube.rotation.y += angleChange;
	//lastTime = time;

	// render
	renderer.render(scene, camera);

	// request new frame
	requestAnimationFrame(function(){
		animate();
	});
}

// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 500;

// scene
var scene = new THREE.Scene();

// cube
var kirbyBodyGeometry = new THREE.SphereGeometry(100, 200, 200);
var kirbyBodyMaterial = new THREE.MeshLambertMaterial();
kirbyBodyMaterial.map = THREE.ImageUtils.loadTexture('images/kirbyface.jpg');

var kirbyBody = new THREE.Mesh(kirbyBodyGeometry, kirbyBodyMaterial);

kirbyBody.overdraw = true;
kirbyBody.rotation.y = Math.PI * 1.6;
scene.add(kirbyBody);

// add subtle blue ambient lighting
var ambientLight = new THREE.AmbientLight(0x444444);
scene.add(ambientLight);

// directional lighting
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0.5, 0.5, 1).normalize();
scene.add(directionalLight);

// start animation
animate();
