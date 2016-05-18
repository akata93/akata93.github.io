function setup(){

THREE.ImageUtils.crossOrigin='';

var pared=new THREE.BoxGeometry(500, 100, 10);
var pared_1=new THREE.BoxGeometry(10, 100, 500);
var base=new THREE.BoxGeometry(50,50,50);
var marmol=THREE.ImageUtils.loadTexture('marmol.jpg');
var madera=THREE.ImageUtils.loadTexture('madera.jpg');
var ladrillo = THREE.ImageUtils.loadTexture('http://threejs.org/examples/textures/brick_diffuse.jpg');
var material2 = new THREE.MeshPhongMaterial({map: ladrillo });
var textura = THREE.ImageUtils.loadTexture('http://akata93.github.io/r2d2.jpg');
var material = new THREE.MeshBasicMaterial({map: textura });
var materialmadera=new THREE.MeshBasicMaterial({map: madera })
var materialb= new THREE.MeshBasicMaterial({map: marmol })

Pared1= new THREE.Mesh(pared, material2);
Pared2= new THREE.Mesh(pared, material2);
Pared3= new THREE.Mesh(pared_1, material2);
Pared4= new THREE.Mesh(pared_1, material2);


var figurabasepie=new THREE.Shape();
figurabasepie.moveTo(8,-35);
figurabasepie.lineTo(5,-32);
figurabasepie.lineTo(-5,-32);
figurabasepie.lineTo(-8,-35);
figurabasepie.lineTo(8,-35);
  
var formabasepie=new THREE.ExtrudeGeometry(figurabasepie, {amount:10});
  
var brazo1 = new THREE.CylinderGeometry( 4, 4, 50, 100 );
var brazo2 = new THREE.CylinderGeometry( 4, 4, 50, 100 );
var cabezaForma=new THREE.SphereGeometry(15, 100, 100);
var cuerpoForma=new THREE.CylinderGeometry(15, 15, 40, 100, 10);
var pie1Forma=new THREE.CylinderGeometry(5, 5, 10, 100, 10);

var cabeza= new THREE.Mesh(cabezaForma,material);
var cuerpo= new THREE.Mesh(cuerpoForma,material);
var pie1=new THREE.Mesh(pie1Forma,material);
var mallabasepie=new THREE.Mesh(formabasepie,material);
var mallabrazo1= new THREE.Mesh(brazo1,material);
var mallabrazo2= new THREE.Mesh(brazo2,material);

cabeza.position.y=20;
pie1.position.y=-25;
mallabrazo1.position.x=18;
mallabrazo2.position.x=-18;
mallabrazo1.position.y=-10;
mallabrazo2.position.y=-10;

var forma= new THREE.Geometry();

THREE.GeometryUtils.merge(forma,cabeza);
THREE.GeometryUtils.merge(forma,cuerpo);
THREE.GeometryUtils.merge(forma,pie1);
THREE.GeometryUtils.merge(forma,formabasepie);
THREE.GeometryUtils.merge(forma,mallabrazo1);
THREE.GeometryUtils.merge(forma,mallabrazo2);

malla=new THREE.Mesh(forma, material);

Pared3.position.x=250;
Pared4.position.x=-250;
Pared1.position.z=250;
Pared2.position.z=-250;

/*
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
*/
raycaster1= new THREE.Raycaster(malla.position , new THREE.Vector3(1,0,0));

escena=new THREE.Scene();
escena.add(malla);
escena.add(Pared1);
escena.add(Pared2);
escena.add(Pared3);
escena.add(Pared4);

var offsetx=-250;
var offsetz=-250;
var h=0;
for (var i = 0; i < 10; i++) {
  for (var j= 0; j < 10; j++){
  
    if ((i==1 || i==3 || i==5 || i==7 || i==9) && (j==1 || j==3 || j==5 || j==7 || j==9))
    basecuadro[h]= new THREE.Mesh(base,materialb);
    else
    basecuadro[h]= new THREE.Mesh(base,materialmadera);  
   
    
    basecuadro[h].position.x=offsetx;
    basecuadro[h].position.z=offsetz;
    basecuadro[h].position.y=-50;
    offsetx=offsetx+50;
    escena.add(basecuadro[h]);
    h=h+1;
  }
  offsetz=offsetz+50;
  offsetx=-250;
}
//escena.add(luzPuntual);
//escena.add(luzPuntual1);
//escena.add(luzPuntual2);

spotLight = new THREE.SpotLight(0xffffff,4,100,0.5,0.5,0);
spotLight.position.set(malla.position,new THREE.Vector3(1,0,0));

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

escena.add( spotLight );

camara=new THREE.PerspectiveCamera();
camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );
camara.position.y = 900 ;  
camara.rotation.x=-1.57;

camera.position.y = 300 ;  
camera.rotation.x=-1.57;


renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerHeight*0.95,window.innerHeight*0.95);
document.body.appendChild(renderer.domElement);

step=0.8;


raycaster=new THREE.Raycaster(malla.position,new THREE.Vector3(1,0,0));
}

function loop(){
  
  obspared3=raycaster.intersectObject(Pared3);
  obspared2=raycaster.intersectObject(Pared2);
  obspared1=raycaster.intersectObject(Pared1);
  obspared4=raycaster.intersectObject(Pared4);
  
  if ((obspared3.length>0) && (obspared3[0].distance<=25)){
    dir=2;
    raycaster.set(malla.position,new THREE.Vector3(0,0,1));
    spotLight.position.set(malla.position,new THREE.Vector3(0,0,1));
  }
  
  if ((obspared1.length>0) && (obspared1[0].distance<=17)){
    dir=3;
    raycaster.set(malla.position,new THREE.Vector3(-1,0,0));
    spotLight.position.set(malla.position,new THREE.Vector3(-1,0,0));
  }
 if ((obspared4.length>0) && (obspared4[0].distance<=25)){
    dir=4;
    raycaster.set(malla.position,new THREE.Vector3(0,0,-1));
    spotLight.position.set(malla.position,new THREE.Vector3(0,0,-1));
  }
  
  if ((obspared2.length>0) && (obspared2[0].distance<=17)){
    dir=1;
    raycaster.set(malla.position,new THREE.Vector3(1,0,0));
    spotLight.position.set(malla.position,new THREE.Vector3(1,0,0));
  }

  
  if (dir==1){
    
     malla.position.x+=step;
     malla.rotation.y=90*(Math.PI)/180;
  }
  else if(dir==2){
     malla.position.z+=step;
     malla.rotation.y=180*(Math.PI)/180;
  }
  else if(dir==3){
    malla.position.x-=step;
    malla.rotation.y=-90*(Math.PI)/180;
  }
  else if(dir==4){
    malla.position.z-=step;
    malla.rotation.y=-180*(Math.PI)/180;
  }
  var timer = Date.now() * 0.0001;

camara.position.x = Math.cos( timer ) * 200;
				camara.position.z = Math.sin( timer ) * 200;
				camara.lookAt( escena.position );
  if (keyboard.pressed("P")) {
    
    var timer = Date.now() * 0.0001;

				camera.position.x = Math.cos( timer ) * 200;
				camera.position.z = Math.sin( timer ) * 200;
				camera.lookAt( escena.position );
  renderer.render(escena,camera);
  }
  else renderer.render(escena,camara);
 
  requestAnimationFrame(loop);
}
  
var escena, camara, renderer, malla;
var raycaster;
var spotLight
var dir; 
var Pared1,Pared2,Pared3,Pared4;
var obspared1,obspared2,obspared3,obspared4;
var basecuadro= new Array();
var keyboard = new THREEx.KeyboardState();
dir=1;
setup();
loop();
