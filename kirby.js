/*
* Engineering Test
* Ian MacLeish iamacleish@gmail.com
* To enable rotation, uncomment rotateKirby(); on line 64 in the animate function.
* This program was written using the three.js library which is a javascript implementation of
* WebGL, which is based on OpenGL ES 2.0
*
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


//Run the main function.
new function main(){
	//Initialization including renderer setup and camera positioning.
	init();
	
	//Scene with objects (Kirby) in it
	scene = new THREE.Scene();
	
	//Kirby object which will contain his body parts.
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
	//Creates the renderer to render the shaders.
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//Camera setup with a distance of 500 from origin.
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 500;
}


// This is animation loop function and is executed on each animation frame 
function animate(){
	//Rotates Kirby .1 times a second based on the time and date.
	//rotateKirby();

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
	var rotationSpeedScaler = 500;
	var time = (new Date()).getTime();
	var angleChange = angularSpeed * time * Math.PI / rotationSpeedScaler;
	kirby.rotation.y = angleChange;
};


//Draws all of Kirby's bodyparts (Feet, Arms, Head)
function drawKirby(){
	drawBody();
	drawFeet();
	drawArms();
};


//Draws Kirby's main body/head and face
function drawBody(){
	
	var bodyRadius = 100;
	var bodyWidthResolution = 200; //how many segments for width
	var bodyHeightResolution = 200; //how many segments for height
	var kirbyBodyGeometry = new THREE.SphereGeometry(bodyRadius, bodyWidthResolution , bodyHeightResolution);
	var kirbyBodyMaterial = new THREE.MeshLambertMaterial();
	var kirbyBody;
	
	//initial x and y rotation of the body
	var bodyStartingRotX = -0.1;
	var bodyStartingRotY = -0.4;
	
	kirbyBodyMaterial.map = THREE.ImageUtils.loadTexture('images/kirbyface.png');
	kirbyBody = new THREE.Mesh(kirbyBodyGeometry, kirbyBodyMaterial);
	kirbyBody.overdraw = true;
	kirbyBody.rotation.x = Math.PI * bodyStartingRotX;
	kirbyBody.rotation.y = Math.PI * bodyStartingRotY;
	kirby.add(kirbyBody);
};


//Function for drawing both of Kirby's feet using a lathe geometry.
function drawFeet(){
	//Kirby's feet
	var points = [];
	var scaleByRing = .0641; 
	var scaleSin = 60;
	var positionZ = -5;
	
	//Iterates through the 'rings' in the shape as a lathe would.
	for ( var ring = 0; ring < 50; ring ++ ) {
		points.push( new THREE.Vector3( Math.sin( ring * scaleByRing ) * scaleSin , 0, ( ring + positionZ )) );
	}
	
	var kirbyFeetColor = new THREE.Color( 0xcc0000 ); //Dark red
	var kirbyFootGeometry = new THREE.LatheGeometry(points);
	var kirbyFootMaterial = new THREE.MeshLambertMaterial({
		color: kirbyFeetColor
	});
	
	var footOffsetX = 60; //Both feet
	var footOffsetY = -100; //Both feet
	var footOffsetZ = -70; //Left foot only
	
	new function drawRightFoot(){
		var kirbyRightFoot;
		var rightFootRotX = 0.15;
		var rightFootRotY = 0.3;
		kirbyRightFoot = new THREE.Mesh(kirbyFootGeometry, kirbyFootMaterial);
		kirbyRightFoot.overdraw = true;
		kirbyRightFoot.position.x = footOffsetX;
		kirbyRightFoot.position.y = footOffsetY;
		kirbyRightFoot.rotation.x = Math.PI * rightFootRotX;
		kirbyRightFoot.rotation.y = Math.PI * rightFootRotY;
		
		kirby.add(kirbyRightFoot);
	};
	
	new function drawLeftFoot(){
		var kirbyLeftFoot;
		var leftFootRotX = -0.1;
		var leftFootRotY = 0.1;
		kirbyLeftFoot = new THREE.Mesh(kirbyFootGeometry, kirbyFootMaterial);
		kirbyLeftFoot.overdraw = true;
		kirbyLeftFoot.position.x = -footOffsetX;
		kirbyLeftFoot.position.y = footOffsetY;
		kirbyLeftFoot.position.z = footOffsetZ;
		kirbyLeftFoot.rotation.x = Math.PI * leftFootRotX;
		kirbyLeftFoot.rotation.y = Math.PI * leftFootRotY;
		
		kirby.add(kirbyLeftFoot);
	};
};


//Function for drawing both of Kirby's arms using a sphere geometry.
function drawArms(){
	//Kirby's Arms
	var kirbyArmColor = new THREE.Color( 0xdd7590 ); //Kirby pink
	var armRadius = 40;
	var armWidthResolution = 200; //how many segments for width
	var armHeightResolution = 200; //how many segments for height
	var kirbyArmGeometry = new THREE.SphereGeometry(armRadius, armWidthResolution, armHeightResolution);
	var kirbyArmMaterial = new THREE.MeshLambertMaterial({
		color: kirbyArmColor
	});
	
	new function drawRightArm(){
		var kirbyRightArm;
		//positioning
		var rightArmOffsetX = 90; 
		var rightArmOffsetY = 50;
		
		kirbyRightArm = new THREE.Mesh(kirbyArmGeometry, kirbyArmMaterial);
		kirbyRightArm.overdraw = true;
		kirbyRightArm.position.x = rightArmOffsetX;
		kirbyRightArm.position.y = rightArmOffsetY;

		kirby.add(kirbyRightArm);
	};
	
	new function drawLeftArm(){
		var kirbyLeftArm;
		//positioning
		var leftArmOffsetX = 90;
		var leftArmOffsetY = 50; 
		
		kirbyLeftArm = new THREE.Mesh(kirbyArmGeometry, kirbyArmMaterial);
		kirbyLeftArm.overdraw = true;
		kirbyLeftArm.position.x = -leftArmOffsetX;
		kirbyLeftArm.position.y = leftArmOffsetY;
		//kirbyLeftArm.position.z = armOffsetZ;
		
		kirby.add(kirbyLeftArm);
	};
};


function addLighting(){
	var ambientLight
	var directionalLight
	var ambientLightColor = 0x333333;
	var directionalLightColor = 0xffffff;
	var lightX = 0.5;
	var lightY = 0.5;
	var lightZ = 1;
	
	// Add subtle grey ambient lighting
	ambientLight= new THREE.AmbientLight(ambientLightColor);
	scene.add(ambientLight);

	// Add pure white directional lighting
	directionalLight = new THREE.DirectionalLight(directionalLightColor);
	directionalLight.position.set(lightX, lightY, lightZ).normalize();
	scene.add(directionalLight);
};