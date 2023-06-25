import { useEffect } from 'react';
import { World } from '@/utils/World';

import styles from '@/styles/world.module.scss';

function WorldCanvas() {
  useEffect(() => {
    const container = document.querySelector('#container') as HTMLDivElement;
    if (!container) return;
    const world = new World(container);

    world.start();
  }, []);
  return <div className={styles.world} id='container'></div>;
}

export default WorldCanvas;
