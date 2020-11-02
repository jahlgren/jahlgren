import { EasyGameEngine } from './vendor/EasyGameEngine/EasyGameEngine.js';
import { PlayScene } from './lib/MyGame/Scenes/PlayScene.js';

const game = new EasyGameEngine(600, 480);
document.body.appendChild(game.canvas.element);

game.changeScene(new PlayScene());
