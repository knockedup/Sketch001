/**
 * Concepts taken from
 * https://github.com/wagerfield/flat-surface-shader
 * The MIT License (MIT)
 * @author Matthew Wagerfield
 * &
 * https://github.com/msurguy/triangles
 * The MIT License (MIT)
 * @author Maksim Surguy
 */
(function(){

  var MESH = {
    width: 1.2,
    height: 1.2,
    segments: 12,
    slices: 9,
    ambient: '#27292c',
    diffuse: '#4d4d48'
  };

  var LIGHT = {
    ambient: '#363034',
    diffuse: '#4d4d48'
  };

  var LIGHT2 = {
    ambient: '#000',
    diffuse: '#ffffff'
  };


    var container = document.getElementById('container');
    var renderer = new FSS.CanvasRenderer();
    var scene = new FSS.Scene();
    var light = new FSS.Light(LIGHT.ambient, LIGHT.diffuse);
    var light2 = new FSS.Light(LIGHT2.ambient, LIGHT2.diffuse);
    var geometry;
    var material;
    var mesh;

    var now, start = Date.now();
    var center = FSS.Vector3.create();
    var attractor = FSS.Vector3.create();

    function createMesh() {
      scene.remove(mesh);
      renderer.clear();
      geometry = new FSS.Plane(MESH.width*renderer.width, MESH.height*renderer.height, MESH.segments, MESH.slices);
      material = new FSS.Material(MESH.ambient, MESH.diffuse);
      mesh = new FSS.Mesh(geometry, material);
      scene.add(mesh);
    }


    function init() {
      scene.add(mesh);

      createMesh();
      scene.add(light);
      scene.add(light2);

      container.appendChild(renderer.element);
      window.addEventListener('resize', resize);
    }


    function update(){
      scene.remove(mesh);
      renderer.clear();
      geometry = new FSS.PlaneUpdate();
      material = new FSS.Material(MESH.ambient, MESH.diffuse);
      mesh = new FSS.Mesh(geometry, material);
      scene.add(mesh);
    }



    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
      createMesh();
    }


    function animate() {
      now = Date.now() - start;
      update();

      light.setPosition(300*Math.sin(now*0.001), 200*Math.cos(now*0.0005), 60);
      light2.setPosition(300*Math.cos(now*0.001), 200*Math.sin(now*0.0005), 60);
      renderer.render(scene);

      requestAnimationFrame(animate);
    }


    function debugTxt(str){
      var debug_txt = document.getElementById('debug_txt_p');
      debug_txt.textContent = str;
    }

    init();
    resize();
    animate();




})();
