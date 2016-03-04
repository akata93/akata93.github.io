function setup(){
//se plantean las geometrias a utuilizar
  var esferaForma = new THREE.SphereGeometry( 1,20,20);
  var cilindroForma = new THREE.CylinderGeometry(0.5,0.5,4);
  // para generar una forma combinada se requiere de las mallas para oider desplazar 
  //las formas en el espacio virtual
  var esfera1= new THREE.Mesh (esferaForma);
  var esfera2= new THREE.Mesh (esferaForma);
  var cilindro= new THREE.Mesh (cilindroForma);
  
  //se desplazan las mallas
  
  esfera1.position.y=2;
  esfera2.position.y=-2;
  
  //se genera una forma abstracta
  
  var forma = new THREE.Geometry();
  
  // se utiliza el paquete GeometryUrils para conjuntar las formas
  
  THREE.GeometryUtils.merge(forma, esfera1);
  THREE.GeometryUtils.merge(forma, esfera2);
  THREE.GeometryUtils.merge(forma, cilindro);
  
  // se genera la malla a partir de la forma nueva
  
  malla = new THREE.Mesh (forma);
  
  // se inicializa la escena y se agrega la malla a esta
  
  escena = new THREE.Scene();
  escena.add(malla);
   
   //se inicializa la camara y el renderer
   
  camara= new THREE.PerspectiveCamera();
  camara.position.z=10;
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerHeight*.95, window.innerHeight*.95);
  document.body.appendChild (renderer.domElement);
}

function loop(){
  requestAnimationFrame(loop);
  malla.rotation.x+=0.01;
  malla.rotation.y+=0.01;
  renderer.render(escena , camara);
}

var escena,camara,renderer,malla;

setup();
loop();
