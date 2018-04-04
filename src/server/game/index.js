import { move, fight, enemyList, regen } from './game_logic';
import { Countries, TechTree, countrySetting } from './variebles';

const gameLoop = () => {
  move();
  fight();
  regen();
  setTimeout(gameLoop, 1000);
};

const startGame = () => {
  setTimeout(gameLoop, 1000);
};

export { startGame, enemyList, Countries, TechTree, countrySetting };
