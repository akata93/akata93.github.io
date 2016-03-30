function setup() {
  cubo1=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
                       new THREE.MeshNormalMaterial());
  cubo2=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
                       new THREE.MeshNormalMaterial());
  cubo1.position.x=0.7;
}
