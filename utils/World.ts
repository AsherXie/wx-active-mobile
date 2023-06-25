import {
  BoxGeometry,
  Color,
  DirectionalLight,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  // 能和光源做出交互的
  MeshStandardMaterial,
  Clock,
  MathUtils,
} from 'three';

const clock = new Clock();

interface MyMesh extends Mesh {
  tick?: any;
}
// 渲染器
function createRender() {
  //   const render = new WebGLRenderer();
  const renderer = new WebGLRenderer({ antialias: true });

  //   renderer.physicallyCorrectLights = true;
  return renderer;
}

// 场景
function createScence() {
  const scene = new Scene();

  scene.background = new Color('#000000');

  return scene;
}

// 相机
function createCamare() {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100 // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(0, 0, 10);

  return camera;
}

// 添加几何体
function createCube() {
  const geometry = new BoxGeometry();
  // 材质
  //   const material = new MeshBasicMaterial();
  const material = new MeshStandardMaterial({ color: 'purple' });
  material.color = new Color('red');

  const cube: MyMesh = new Mesh(geometry, material);
  cube.rotation.set(-0.5, -0.1, 0.8);

  const radiansPerSecond = MathUtils.degToRad(30);
  // 定义一个动画对象
  cube.tick = (delta: number) => {
    cube.rotation.z += delta * radiansPerSecond;
    cube.rotation.x += delta * radiansPerSecond;
    cube.rotation.y += delta * radiansPerSecond;
  };
  return cube;
}

// 添加光线
function cerateLight() {
  // DirectionalLight 为直线光源 只有直接光类型可以投射阴影，环境光不能。
  const light = new DirectionalLight('white', 8);

  light.position.set(0, 0, 10);
  return light;
}

// 动画循环;
class Loop {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  updatables: Array<MyMesh> = [];
  constructor(
    scene: Scene,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
  }

  start() {
    // requestAnimationFrame 类似于这个函数根据显示器刷新率去更新渲染场景
    this.renderer.setAnimationLoop(() => {
      this.tick();
      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = clock.getDelta();

    for (let i = 0; i < this.updatables.length; i++) {
      this.updatables[i].tick(delta);
    }
  }
}

class Resize {
  constructor(
    container: HTMLDivElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    // update the size of the renderer AND the canvas
    renderer.setSize(container.clientWidth, container.clientHeight);

    // set the pixel ratio (for mobile devices)
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}

class World {
  static camera: PerspectiveCamera;
  static scene: Scene;
  static renderer: WebGLRenderer;
  static loop: Loop;
  constructor(container: HTMLDivElement) {
    World.camera = createCamare();
    World.scene = createScence();
    World.renderer = createRender();
    const cube = createCube();
    World.scene.add(cube);
    container.appendChild(World.renderer.domElement);

    World.loop = new Loop(World.scene, World.camera, World.renderer);

    World.loop.updatables.push(cube);

    // 开始添加光源
    const light = cerateLight();

    const light2 = new DirectionalLight('white', 8);
    light2.position.set(-0, -0, -10);
    World.scene.add(cube, light, light2);

    new Resize(container, World.camera, World.renderer);
  }

  render() {
    World.renderer.render(World.scene, World.camera);
  }

  start() {
    World.loop.start();
    World.loop.tick();
  }

  stop() {
    World.loop.stop();
  }
}

export { World };
