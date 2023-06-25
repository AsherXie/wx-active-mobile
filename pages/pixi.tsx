import * as PIXI from 'pixi.js';
import { useEffect, createElement } from 'react';
function Pixi() {
  useEffect(() => {
    const app = new PIXI.Application({
      width: 256,
      height: 256,
    });
    document.body.appendChild(app.view);
    PIXI.Assets.load();
    PIXI.Loader.shared.add('texture', 'images/texture.png');

    // 加载器开始加载
    PIXI.Loader.shared.load((loader, resources) => {
      // 加载完成后执行的回调函数
      const texture = resources.texture.texture;
      const sprite = new PIXI.Sprite(texture);
      app.stage.addChild(sprite);
    });

    console.log(app);
  }, []);
  return createElement('canvas');
}
export default Pixi;
