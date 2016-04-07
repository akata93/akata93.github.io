function setup(){

THREE.ImageUtils.crossOrigin='';

var pared=new THREE.BoxGeometry(500, 100, 10);
var ladrillo = THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/brick_diffuse.jpg');
var material2 = new THREE.MeshLambertMaterial({map: ladrillo });

var Pared1= new THREE.Mesh(pared, material2);
var Pared2= new THREE.Mesh(pared, material2);

Pared1.position.z=250;
Pared1.position.z=-250;
var luzPuntual = new THREE.PointLight(0xffffff);
  luzPuntual.position.x=500;
  luzPuntual.position.y=500;
  luzPuntual.position.z=500;
  
  var luzPuntual1 = new THREE.PointLight(0xffffff);
  luzPuntual1.position.x=-500;
  luzPuntual1.position.y=-500;
  luzPuntual1.position.z=500;
  var luzPuntual2 = new THREE.PointLight(0xffffff);
  luzPuntual2.position.x=0;
  luzPuntual2.position.y=500;
  luzPuntual2.position.z=0;

escena=new THREE.Scene();

escena.add(Pared1);
escena.add(luzPuntual);
escena.add(luzPuntual1);
escena.add(luzPuntual2);
escena.add(Pared2);
//escena.add(Pared3);
//escena.add(Pared4);

camara=new THREE.PerspectiveCamera();
camara.position.z=3000;
//camara.position.y=;
camara.rotation.x = -90 * Math.PI / 180;
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
  