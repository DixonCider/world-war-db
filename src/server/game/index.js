import { move, fight, enemyList, regen } from './game_logic';
import { Countries, TechTree, countrySetting, resourcePoints, troopData } from './variebles';

const gameLoop = () => {
  console.log('\n');
  console.log(''.padStart(39, "-"));
  console.log(`********** ${(new Date).toLocaleDateString()} ${(new Date).toLocaleTimeString()} **********`);
  console.log(' ');
  move();
  fight();
  regen();
  setTimeout(gameLoop, 1000);
};

const startGame = () => {
  setTimeout(gameLoop, 1000);
};

export { startGame, enemyList, Countries, TechTree, countrySetting, resourcePoints, troopData };
