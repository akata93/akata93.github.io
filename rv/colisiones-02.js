function setup() {
  cubo1=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
                       new THREE.MeshNormalMaterial());
  cubo2=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
                       new THREE.MeshNormalMaterial());
  pelota1= new THREE.Mesh(new THREE.SphereGeometry(0.5),new THREE.MeshNormalMaterial())
  pelota2= new THREE.Mesh(new THREE.SphereGeometry(0.5),new THREE.MeshNormalMaterial())
  cubo1.position.x=7;
  cubo2.position.x=-7;
  
  camara=new THREE.PerspectiveCamera();
  camara.position.z=20;
  
  raycaster1= new THREE.Raycaster(pelota1.position , new THREE.Vector3(1,0,0));
  raycaster2= new THREE.Raycaster(pelota1.position , new THREE.Vector3(-1,0,0));
  raycaster3= new THREE.Raycaster(pelota2.position , new THREE.Vector3(1,0,0));
  raycaster4= new THREE.Raycaster(pelota2.position , new THREE.Vector3(-1,0,0));
  
  
  
  escena=new THREE.Scene();
  escena.add(cubo1);
  escena.add(cubo2);
  escena.add(pelota1);
  escena.add(pelota2);
  escena.add(camara);
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerHeight*0.95,window.innerHeight*0.95);
  document.body.appendChild(renderer.domElement);
  step=0.1;
}
function loop(){
  obstaculo1 = raycaster1.intersectObject(cubo1);
  obstaculo2 = raycaster2.intersectObject(pelota1);
  obstaculo3 = raycaster3.intersectObject(cubo2);
  obstaculo4 = raycaster4.intersectObject(pelota2);
  
  if ((obstaculo1.length>0 && (obstaculo1[0].distance <=0.5)) || (obstaculo2.length>0 && (obstaculo2[0].distance <=0.1))
  || (obstaculo3.length>0 && (obstaculo3[0].distance <=0.5))|| (obstaculo4.length>0 && (obstaculo4[0].distance <=0.1)))
  step=-step;
  
  pelota1.position.x+=step;
  pelota2.position.x+=-step;
  
  renderer.render(escena,camara);
  requestAnimationFrame(loop);
  
}
var cubo1,cubo2,pelota1, pelota2,escena,camara,renderer;
var raycaster1, raycaster2 ,raycaster3, raycaster4,step;

setup();
loop();
