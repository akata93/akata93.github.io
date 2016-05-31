function Wall(size,x,y){
  THREE.Mesh.call(this, new THREE.BoxGeometry(size,size,size), new THREE.MeshNormalMaterial());
  this.size=size;
  this.position.x=x;
  this.position.z=y;
}
function Wall1(size,x,y){
  THREE.Mesh.call(this, new THREE.BoxGeometry(size,size,size), new THREE.MeshNormalMaterial({color: 0xE60026}));
  this.size=size;
  this.position.x=x;
  this.position.z=y;
}
Wall1.prototype= new THREE.Mesh(); 
Wall.prototype= new THREE.Mesh();
Environment.prototype.setMap= function(map){
  var _offset= Math.floor(map.length/2);
  for(var i=0; i< map.length; i++)
  for(var j=0; j< map.length; j++){
    if (map[i][j]==="x")
    this.add(new Wall(1,j-_offset,(i-_offset)));
    else if (map[i][j]==="r")
    this.add(new Robot(0.5,j-_offset,(i-_offset)));
	else if (map[i][j]==="y")
	{
	a=j-_offset;
	b=i-_offset;
    this.add(new Wall1(1,j-_offset,(i-_offset))); 
	}
  }
}

function setup(){
THREE.ImageUtils.crossOrigin='';
  var mapa=new Array();
  mapa[0]="xxxxxxxxxxxxxx xxxxxxxxx";
  mapa[1]="x              x r     x";
  mapa[2]="x xxxxxxxxxxxxxxxxxxxx x";
  mapa[3]="x                    x x";
  mapa[4]="x                    x x";
  mapa[5]="x xxxxxxxxxxxxxxxxxxxx x";
  mapa[6]="x         xxxxxx       x";
  mapa[7]="x  xxxxxxxxxxxxxxxxxx  x";
  mapa[8]="x               x   x  x";
  mapa[9]="x               x   x  x";
  mapa[10]="xxx            x xxxx  x";
  mapa[11]="x            xxx x     x";
  mapa[12]="x  xxxxxxxxxx    x  xxxx";
  mapa[13]="x  xxxxxxxxxx       xxxx";
  mapa[14]="x     xxxxxxx    xxxxx x";
  mapa[15]="x              x       x";
  mapa[16]="x              x       x";
  mapa[17]="x              xxxxx   x";
  mapa[18]="x  xxxxxxxxxxxxxx    x x";
  mapa[19]="x       x              x";
  mapa[20]="xxxxxx  xx             x";
  mapa[21]="x       xxxxxxxxxxx    x";
  mapa[22]="x   xxxxxx        x    x";
  mapa[23]="x            xxxx      x";
  mapa[24]="xxxxxxxxxxxxxxxxxxxxxxxx";  
  
 /*  mapa[0]="xxxxxxxxxxxxxxxxxxxxxxxx";
  mapa[1]="x            x         x";
  mapa[2]="x          xx          x";
  mapa[3]="x                      x";
  mapa[4]="x                      x";
  mapa[5]="x                      x";
  mapa[6]="x                      x";
  mapa[7]="x                      x";
  mapa[8]="x                      x";
  mapa[9]="x                      x";
  mapa[10]="x                      x";
  mapa[11]="x                      x";
  mapa[12]="x                      x";
  mapa[13]="x         x            x";
  mapa[14]="x         x            x";
  mapa[15]="x         x            x";
  mapa[16]="x   y     x            x";
  mapa[17]="x         x           rx";
  mapa[18]="x         x            x";
  mapa[19]="x         x            x";
  mapa[20]="x         x            x";
  mapa[21]="x         x            x";
  mapa[22]="x         x            x";
  mapa[23]="x         x            x";
  mapa[24]="xxxxxxxxxxxxxxxxxxxxxxxx"; */
  
  environment = new Environment();
  environment.setMap(mapa);
  camera=new THREE.PerspectiveCamera();
  // camera= new THREE.OrthographicCamera();
  camera.position.y=30;
  camera.rotation.x=-1.57;
  //var light = new THREE.AmbientLight( 0xFFF000 ); // soft white light
  //environment.add( light );
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  var cube = new THREE.Mesh( geometry, material );
  cube.position.x=2;
  cube.position.y=0;
  cube.position.z=-11;
  //environment.add( cube );
  
  
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
var a,b;
var pfin;
setup();
loop();
