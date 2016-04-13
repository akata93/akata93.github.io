
Robot.prototype.act= function (environment){
  var command= this.actuator.commands.pop();
  console.los('Undefined command');
  else if (command in this operations)
  this.operations[command](this);
  else
  console.log('Unknown command');
};

Robot.prototype.operations()={ };
Robot.prototype.operations.goStraight= function(robot,distance){
  if (distance===undefined)
  distance=0.05;
  robot.position.x+=distance*Math.cos(robot.rotation.z);
  robot.position.y=distance*Math.sinbot.rotation.z):
};

Robot.prototype.operations.rotateCW= function(robot,angle){
  if (angle===undefined)
  angle=-Math.PI/2;
  robot.rotation.z+=angle;
};

Robot.prototype.operations.rotateCCW= function(robot,angle){
  if (angle===undefined)
  angle=Math.PI/2;
  robot.rotation.z+=angle;
};
