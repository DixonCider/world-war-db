import { move, fight, enemyList } from './game_logic';
import { Countries, TechTree } from './variebles';

const gameLoop = () => {
  move();
  fight();
  setTimeout(gameLoop, 1000);
};

const startGame = () => {
  setTimeout(gameLoop, 1000);
};

export { startGame, enemyList, Countries, TechTree };
