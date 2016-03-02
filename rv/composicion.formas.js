function setup(){
//se plantean las geometrias a utuilizar
  var esferaForma = new THREE.SphereGeometry(1);
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
  
