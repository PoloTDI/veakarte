import './style.css'

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';

//Camera and scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
for (let i = 1; i <=7; i++){
  camera.layers.enable( i );
}
camera.position.set(-1, 1.4, -1.9);

let stats = new Stats();

//Renderer setup
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
document.body.appendChild( stats.dom );

//Screensize updating
window.addEventListener('resize', function( ) {
  var width = this.window.innerWidth;
  var height = this.window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
} );


//Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 3;
controls.minDistance = 1;


//Lights
const pointLight = new THREE.PointLight(0xdfdfe0);// e9e9ea light gray //xa7c7bb light green
pointLight.position.set(4,1,0)

const pointLight1 = new THREE.PointLight(0xdfdfe0); //light gray
pointLight1.position.set(-3,2,-2)

const pointLight2 = new THREE.DirectionalLight(0xdfdfe0); //light gray
pointLight2.position.set(-2,1,3)

const pointLight3 = new THREE.DirectionalLight(0xdfdfe0);
pointLight3.position.set(0,0,-3)

const bottomLight = new THREE.PointLight(0xdfdfe0);
bottomLight.position.set(0,-2,0)

for (let i = 1; i <=7; i++){
  pointLight.layers.enable( i );
  pointLight1.layers.enable( i );
  pointLight2.layers.enable( i );
  pointLight3.layers.enable( i );
  bottomLight.layers.enable( i ); 
}

scene.add(pointLight, pointLight1, pointLight2, bottomLight, pointLight3);


//Background colour
scene.background = new THREE.Color( 0xdfdfe0 );


//Model import
var loader = new GLTFLoader();

for (let i = 0; i <= 2; i++){//hardcoded for loop for model import and less copy paste
  loader.load( '/VeaModel'+ (i + 1) +'.glb', function ( gltf ) {
  
    gltf.scene.traverse( function( object ) {
  
      object.layers.set( i );

    } );
    scene.add( gltf.scene );
  
  }, undefined, function ( error ) {
  
    console.error( error );
  
    } );
}

//"Pathfinder" models
loader.load( '/BtoA.glb', function ( gltf ) {
  
  gltf.scene.traverse( function( object ) {

    object.layers.set( 3 );//3

} );
  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );

loader.load( '/BtoC.glb', function ( gltf ) {
  
  gltf.scene.traverse( function( object ) {

    object.layers.set( 4 );//4

} );
  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );

loader.load( '/BtoDEntrance.glb', function ( gltf ) {
  
  gltf.scene.traverse( function( object ) {

    object.layers.set( 5 );//5

} );
  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );

loader.load( '/BtoE.glb', function ( gltf ) {
  
  gltf.scene.traverse( function( object ) {

    object.layers.set( 6 );//6

} );
  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );

loader.load( '/BtoD104.glb', function ( gltf ) {
  
  gltf.scene.traverse( function( object ) {

    object.layers.set( 7 );//7
    

} );
  scene.add( gltf.scene );

}, undefined, function ( error ) {

  console.error( error );

} );


//Floor selection
var value = {
  Stāvs : 'VeA map',
  floors: ['1. stāvs', '2. stāvs', '3. stāvs', 'Visi stāvi'],
};

var value1 = {
  Ceļš: 'Paths',
  pathfinders: ['B līdz A', 'B līdz C', 'B līdz D ieejai', 'B līdz E', 'B līdz D104']
}


//GUI setup
var gui = new GUI()

//Floor selection
let dropdown = gui.add(value, 'Stāvs', value.floors).onChange(function() {
  if(value.Stāvs == "Visi stāvi"){
    camera.layers.enableAll();
    for (let i = 3; i <=7; i++){
      camera.layers.disable(i);
    }
    return;
  }
  camera.layers.disableAll();
  camera.layers.toggle(value.floors.indexOf(value.Stāvs));
  console.log(value)
  console.log(value.Stāvs)
  });
dropdown.setValue("Visi stāvi");

//Path selection
gui.add(value1, 'Ceļš', value1.pathfinders).onChange(function(){
  console.log(value1)
  console.log(value1.Ceļš)
  camera.layers.disableAll();
  camera.layers.enable(0);
  camera.layers.enable(value1.pathfinders.indexOf(value1.Ceļš)+3);
});

//Functions

function animate() {
  requestAnimationFrame(animate);
  //console.log(camera.position)
  controls.update();
  stats.update();
  render()
}

function render() {
  renderer.render( scene, camera );
  renderer.toneMappingExposure = Math.pow(1.2, 7.0);
  renderer.physicallyCorrectLights = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.type = THREE.PCFShadowMap;
}



//To animate the rest of the owl
animate();

