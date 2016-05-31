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
	this.camara= new THREE.PerspectiveCamera();
	this.camara.position.x+=-1;
	this.camara.position.y+=-1;
	this.sensor1=new Sensor();
	this.sensor2=new Sensor();
	this.sensor3=new Sensor();
	this.actuator= new THREE.Mesh(forma,material);
	this.actuator.scale.set(0.04,0.04,0.04);
	this.actuator.rotation.y=-90*(Math.PI)/180;
	this.actuator.commands=[];
	//this.luz = new THREE.SpotLight(0xffffff,100,20,.20,.8,2)
    //this.luz.position.x -= 2;
    //this.luz.position.y -= 1;
	
    //this.luz.target.position.set(0,0,0);
	this.add(this.actuator);
	//this.add(this.luz);
    //this.add(this.luz.target);
}

Robot.prototype=new Agent();

Robot.prototype.sense=function(environment){
	this.sensor1.set(this.position,
		new THREE.Vector3(Math.cos(this.rotation.y),
			0,
			Math.sin(this.rotation.y)));  //Sensor de frente
	//Math.sin(this.rotation.y)	-  1
	//Math.cos(this.rotation.y) -  0
	this.sensor2.set(this.position,
		new THREE.Vector3(Math.sin(this.rotation.y),
			0,
			-Math.cos(this.rotation.y)));  //Sensor izquiero

	this.sensor3.set(this.position,
		new THREE.Vector3(-Math.sin(this.rotation.y),
			0,
			Math.cos(this.rotation.y)));  //Sensor derecho	
	
	var obstaculo1=this.sensor1.intersectObjects(environment.children,true);
	var obstaculo2=this.sensor2.intersectObjects(environment.children,true);
	var obstaculo3=this.sensor3.intersectObjects(environment.children,true);
	//Sensor frente
	if((obstaculo1.length > 0 &&
	(obstaculo1[0].distance<=0.55	)))
	{
		this.sensor1.colision=true;
		var audio = document.createElement('audio');
		var source = document.createElement('source');
		source.src = 'CartoonDonk.mp3';
		audio.appendChild(source);
		audio.play();		
	}
	else
		this.sensor1.colision=false;
	// Sensor Izquiero
	if((obstaculo2.length > 0 &&
	(obstaculo2[0].distance<=0.55	)))
		this.sensor2.colision=true;
	else
		this.sensor2.colision=false;
	// sensor derecho
	if((obstaculo3.length > 0 &&
	(obstaculo3[0].distance<=0.55)))
		this.sensor3.colision=true;
	else
		this.sensor3.colision=false;
	
};
Robot.prototype.plan=function(environment){
	this.actuator.commands=[];
	// Condiciones de giro
	if(this.sensor1.colision==true && this.sensor2.colision==true && this.sensor3.colision==false)
	this.actuator.commands.push('rotateCCW');
	else if (this.sensor1.colision==false && this.sensor2.colision==true && this.sensor3.colision==false)
	this.actuator.commands.push('goStraight');
	else if (this.sensor1.colision==false && this.sensor2.colision==true && this.sensor3.colision==true)
	this.actuator.commands.push('goStraight');
	//else if (this.sensor1.colision==false && this.sensor2.colision==false && this.sensor3.colision==false)
	//this.actuator.commands.push('findWall'); 
	else if (this.sensor1.colision==true && this.sensor2.colision==false && this.sensor3.colision==false)
	this.actuator.commands.push('rotateCCW');
	else if (this.sensor1.colision==false && this.sensor2.colision==false && this.sensor3.colision==true)
	this.actuator.commands.push('goStraight');
	else if (this.sensor1.colision==true && this.sensor2.colision==false && this.sensor3.colision==true)
	this.actuator.commands.push('rotateCW');
	else if (this.sensor1.colision==true && this.sensor2.colision==true && this.sensor3.colision==false)
	this.actuator.commands.push('goStraight');
	/* cube.position.x=2;
    cube.position.y=0;
    cube.position.z=-11; */


	else if (this.actuator.position.x>1.5 && this.actuator.position.x<2.5 && this.actuator.position.z<-10.5 && this.actuator.position.z>-11.5)
	this.actuator.commands.push('stop');
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
  //robot.position.x+=Math.cos(robot.rotation.y);
  //robot.position.z+=Math.sin(robot.rotation.y);
};

Robot.prototype.operations.rotateCCW= function(robot,angle){
  if (angle===undefined)
  angle=Math.PI/2;
  robot.rotation.y+=angle;
  //robot.position.x+=Math.cos(robot.rotation.y);
  //robot.position.z+=Math.sin(robot.rotation.y);
};

Robot.prototype.operations.findWall= function(robot,angle){
  if (angle===undefined)
  angle=-Math.PI/2;
  robot.rotation.y+=angle;
  robot.position.x+=Math.cos(robot.rotation.y);
  robot.position.z+=Math.sin(robot.rotation.y);
};

Robot.prototype.operations.stop= function(robot,angle){
  if (angle===undefined)
  
  robot.position.x+=0;
  robot.position.z+=0;
};
