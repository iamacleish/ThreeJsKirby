/*
* Starter code:
* http://www.html5canvastutorials.com/three/html5-canvas-webgl-ambient-lighting-with-three-js/
* Adding a frag shader to the 3d model:
* http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/
* Info about shaders and how to use three.js
* http://aerotwist.com/tutorials/an-introduction-to-shaders-part-1/
*
*/

var renderer; //Renders the shaders
var camera; //Location the render is viewed from
var scene;	//The scene with the objects in it
var kirby; //The object to hold all of Kirby's body parts.

main(); //Run the main function.

function main(){
	//Initialization including renderer setup and camera positioning.
	init();
	
	//Scene with objects (Kirby) in it
	scene = new THREE.Scene();
	
	//Kirby object with Kirby's body parts in it.
	kirby = new THREE.Group();
	
	//Draws Kirby and all of his body parts.
	drawKirby();
	
	//Adds the Kirby object to the scene
	scene.add(kirby);

	//Adds both ambient and directional lighting.
	addLighting();

	//Start animation including rendering
	animate();
};

//Initialization function. Setup for rendering and camera.
function init(){
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// camera
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 500;
}


// This is animation loop function and is executed on each animation frame 
function animate(){
	//Rotates kirby .1 times a second based on the time and date.
	rotateKirby();

	//Render the scene and it's changes.
	renderer.render(scene, camera);

	// request new frame/loop animation
	requestAnimationFrame(function(){
		animate();
	});
};

//Rotates the Kirby object
function rotateKirby(){
	//revolutions per second
	var angularSpeed = 0.1;
	var time = (new Date()).getTime();
	var angleChange = angularSpeed * time * 2 * Math.PI / 1000;
	kirby.rotation.y = angleChange;
};

//Draws all of Kirby's bodyparts (Feet, Arms, Head)
function drawKirby(){
	drawBody();
	drawFeet();
};

function drawBody(){
	//Kirby's main body/head and face
	var kirbyBodyGeometry = new THREE.SphereGeometry(100, 200, 200);
	var kirbyBodyMaterial = new THREE.MeshLambertMaterial();
	var kirbyBody;
	var bodyStartingRotX = -0.1;
	var bodyStartingRotY = -0.4;
	
	kirbyBodyMaterial.map = THREE.ImageUtils.loadTexture('images/kirbyface.png');
	kirbyBody = new THREE.Mesh(kirbyBodyGeometry, kirbyBodyMaterial);
	kirbyBody.overdraw = true;
	kirbyBody.rotation.x = Math.PI * bodyStartingRotX;
	kirbyBody.rotation.y = Math.PI * bodyStartingRotY;
	kirby.add(kirbyBody);
};

function drawFeet(){
	//Kirby's main body/head and face
	var kirbyFootGeometry = new THREE.SphereGeometry(50, 200, 200);
	var kirbyFootMaterial = new THREE.MeshLambertMaterial({
		color: 'red'
	});
	var kirbyRightFoot;
	
	kirbyFoot = new THREE.Mesh(kirbyFootGeometry, kirbyFootMaterial);
	kirbyFoot.overdraw = true;
	kirbyFoot.position.x = 110;
	kirby.add(kirbyFoot);
};

function addLighting(){
	var ambientLight
	var directionalLight
	
	// Add subtle grey ambient lighting
	ambientLight= new THREE.AmbientLight(0x444444);
	scene.add(ambientLight);

	// Add pure white directional lighting
	directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(0.5, 0.5, 1).normalize();
	scene.add(directionalLight);
};