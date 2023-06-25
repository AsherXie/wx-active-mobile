import { useEffect } from 'react';
import {
  Color,
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
} from 'three';
function World() {
  useEffect(() => {
    console.log(99);
    const container = document.querySelector('#scene');
    if (!container) return;
    (container as HTMLDivElement).style.width = '100vw';
    (container as HTMLDivElement).style.height = '100vh';
    // 创建场景
    const scene = new Scene();
    // 给场景添加颜色
    scene.background = new Color('#000000');
    // 相机
    const camera = new PerspectiveCamera(
      35, // 视野宽度，就好像你能看到180度的视野,
      container?.clientWidth / container?.clientHeight, // 纵横比
      0.1,
      100
    );

    // 设置相机位置
    camera.position.set(0, 0, 10);

    const geomatry = new BoxGeometry(2, 2, 2);

    // 材质
    const material = new MeshBasicMaterial();
    material.color = new Color('red');

    // 把材质添加到
    const mesh = new Mesh(geomatry, material);
    scene.add(mesh);

    // 渲染器
    const renderer = new WebGLRenderer();
    // next, set the renderer to the same size as our container element
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.append(renderer.domElement);

    renderer.render(scene, camera);
  }, []);
  return <div id='scene'></div>;
}

export default World;
