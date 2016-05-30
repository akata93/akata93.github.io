function Sensor(position, direction){
	THREE.Raycaster.call(this,position,direction);
	this.colision=false;
}
Sensor.prototype=new THREE.Raycaster();
function Robot(size,x,y){
	Agent.call(this,x,y);
	
	THREE.ImageUtils.crossOrigin='';

	var textura = THREE.ImageUtils.loadTexture('http://akata93.github.io/r2d2.jpg');
	var material = new THREE.MeshBasicMaterial({map: textura });

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
	//forma.scale.x = forma.scale.y = forma.scale.z = 0.0002;
	//forma.updateMatrix();

	this.sensor=new Sensor();
	this.actuator= new THREE.Mesh(forma,material);
	this.actuator.scale.set(0.02,0.02,0.02);
	this.actuator.rotation.y=-90*(Math.PI)/180;
	this.actuator.commands=[];
	this.add(this.actuator);
}

Robot.prototype=new Agent();

Robot.prototype.sense=function(environment){
	this.sensor.set(this.position,
		new THREE.Vector3(Math.cos(this.rotation.y),
			0,
			Math.sin(this.rotation.y)));
	var obstaculo=this.sensor.intersectObjects(environment.children,true);

	if((obstaculo.length > 0 &&
	(obstaculo[0].distance<=0.1)))
		this.sensor.colision=true;
	else
		this.sensor.colision=false;
};
Robot.prototype.plan=function(environment){
	this.actuator.commands=[];

	if(this.sensor.colision==true)
	this.actuator.commands.push('rotateCCW');
	else
	this.actuator.commands.push('goStraight');
};

Robot.prototype.act= function (environment){
  var command= this.actuator.commands.pop();
  if (command===undefined)
  console.log('Undefined command');
  else if (command in this.operations)
  this.operations[command](this);
  else
  console.log('Unknown command');
};

Robot.prototype.operations={ };
Robot.prototype.operations.goStraight= function(robot,distance){
  if (distance===undefined)
  distance=0.05;
  robot.position.x+=distance*Math.cos(robot.rotation.y);
  robot.position.z+=distance*Math.sin(robot.rotation.y);
};

Robot.prototype.operations.rotateCW= function(robot,angle){
  if (angle===undefined)
  angle=-Math.PI/2;
  robot.rotation.y+=angle;
};

Robot.prototype.operations.rotateCCW= function(robot,angle){
  if (angle===undefined)
  angle=Math.PI/2;
  robot.rotation.y+=angle;
};
