function Wall(size,x,y){
  THREE.Mesh.call(this, new THREE.BoxGeometry(size,size,size), new THREE.MeshNormalMaterial());
  this.size=size;
  this.position.x=x;
  this.position.z=y;
}
 
Wall.prototype= new THREE.Mesh();
Environment.prototype.setMap= function(map){
  var _offset= Math.floor(map.length/2);
  for(var i=0; i< map.length; i++)
  for(var j=0; j< map.length; j++){
    if (map[i][j]==="x")
    this.add(new Wall(1,j-_offset,-(i-_offset)));
    else if (map[i][j]==="r")
    this.add(new Robot(0.5,j-_offset,-(i-_offset)));
  }
}

function setup(){
THREE.ImageUtils.crossOrigin='';
  var mapa=new Array();
  mapa[0]="xxxxxxxxxxxxxxxxxxxxxxxx";
  mapa[1]="x                      x";
  mapa[2]="x                      x";
  mapa[3]="x    xxxxxxxxxx        x";
  mapa[4]="x                      x";
  mapa[5]="x         xxxx         x";
  mapa[6]="x                      x";
  mapa[7]="x          r           x";
  mapa[8]="x               xx     x";
  mapa[9]="x               xx     x";
  mapa[10]="x       xxx            x";
  mapa[11]="x       xxx      r    x";
  mapa[12]="x                      x";
  mapa[13]="xxxxxxxxxxxxxxxxxxxxxxxx";
  mapa[14]="x r   xxxxxxx    xxxxx x";
  mapa[15]="x                      x";
  mapa[16]="x        r            x";
  mapa[17]="x                      x";
  mapa[18]="xxxxxxxxxxxxxxxxx    x x";
  mapa[19]="x                      x";
  mapa[20]="x       xx  r          x";
  mapa[21]="x       xx             x";
  mapa[22]="x                      x";
  mapa[23]="xxxx  r    xxxxx    x  x";
  mapa[24]="xxxxxxxxxxxxxxxxxxxxxxxx";
  
  environment = new Environment();
  environment.setMap(mapa);
  camera=new THREE.PerspectiveCamera();
  camera.position.y=30;
  camera.rotation.x=-1.57;
  renderer= new THREE.WebGLRenderer();
  renderer.setSize(window.innerHeight*.95,window.innerHeight*.95);
  document.body.appendChild(renderer.domElement);
  
  environment.add(camera);
}

function loop(){
  requestAnimationFrame(loop);
  environment.sense();
  environment.plan();
  environment.act();
  
  renderer.render(environment, camera);
}

var environment, camera, renderer;

setup();
loop();
