import { Scene } from "../../../vendor/EasyGameEngine/Scene.js";
import { Coin } from "../Entities/Coin.js";
import { Player } from './../Entities/Player.js';
import { randomInt } from "../../../vendor/EasyGameEngine/Utils/MathUtils.js";
import { Enemy } from "../Entities/Enemy.js";

export class PlayScene extends Scene {
  start() {
    this.coin = this.add(new Coin(this.width/2, this.height/2));
    this.player = this.add(new Player(50, this.height/2));
    
    this.enemies = [];
    this.enemies.push(this.add(new Enemy(this.width-50, 50, 500)));
    this.enemies.push(this.add(new Enemy(this.width-50, this.height / 2, 500)));
    this.enemies.push(this.add(new Enemy(this.width-50, this.height - 50, 500)));
  }

  update(deltaTime, elapsedTime) {
    super.update(deltaTime, elapsedTime);

    // Check coin and player collision.
    //if(this.coin.body.overlapBox(this.player.body)) {
    if(this.coin.body.overlapCircle(this.player.body)) {
      this.coin.transform.position.x = randomInt(25, this.width - 50);
      this.coin.transform.position.y = randomInt(25, this.height - 50);
    }

    // Find closest enemy to the player.
    let enemyIndex, distance = 999, tmpDistance;
    for(let i = 0; i < this.enemies.length; i++) {
      tmpDistance = this.enemies[i].transform.position.distance(this.player.transform.position);
      if(tmpDistance < distance) {
        distance = tmpDistance;
        enemyIndex = i;
      }
    }

    // Set new target for the closest enemy.
    this.enemies[enemyIndex].target.x = this.player.transform.position.x;
    this.enemies[enemyIndex].target.y = this.player.transform.position.y;
  }
}