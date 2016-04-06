function setup(){

THREE.ImageUtils.crossOrigin='';
var textura = THREE.ImageUtils.loadTexture('http://akata93.github.io/r2d2.jpg');
var material = new THREE.MeshPhongMaterial({map: textura });
var pared=new THREE.BoxGeometry(500, 100, 10);
var pared1=new THREE.BoxGeometry(10, 100, 500);

var ladrillo = THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/brick_diffuse.jpg');
var material2 = new THREE.MeshLambertMaterial({map: ladrillo });

var Pared1= new THREE.Mesh(pared, material2);
var Pared2= new THREE.Mesh(pared, material2);
var Pared3= new THREE.Mesh(pared, material2);
var Pared4= new THREE.Mesh(pared, material2);

Pared1.position.x=250;
Pared2.position.x=-250;
Pared3.position.z=250;
Pared4.position.z=-250;

escena=new THREE.Scene();

escena.add(Pared1);
//escena.add(Pared2);
//escena.add(Pared3);
//escena.add(Pared4);

camara=new THREE.PerspectiveCamera();
camara.position.z=1100;
//camara.position.x=900;

renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
document.body.appendChild(renderer.domElement);
}

function loop(){
  requestAnimationFrame(loop);
  //camara.rotation.y = 20 * Math.PI / 180;
  //camara.rotation.z = 10 * Math.PI / 180;
  renderer.render(escena,camara);
}
  
var escena, camara, renderer;
setup();
loop();
  
