import { GameObject } from "../../../vendor/EasyGameEngine/GameObject.js";
import { CircleShape } from "../../../vendor/EasyGameEngine/Graphics/CircleShape.js";
import { Vector2d } from "../../../vendor/EasyGameEngine/Geom/Vector2d.js";
import { Colors } from "../../../vendor/EasyGameEngine/Graphics/Color.js";
import { Circle } from "../../../vendor/EasyGameEngine/Geom/Circle.js";
import { randomInt } from "../../../vendor/EasyGameEngine/Utils/MathUtils.js";
import { BoxShape } from "../../../vendor/EasyGameEngine/Graphics/BoxShape.js";
import { Box } from "../../../vendor/EasyGameEngine/Geom/Box.js";

export class Enemy extends GameObject {

  constructor(x, y, speed) {
    super(x, y);

    this.acceleration = speed;
    this.drag = 1.5;
    this.velocity = new Vector2d();

    this.target = new Vector2d();

    //this.body = new Box(0, 0, 50, 50);
    this.body = new Circle(0, 0, 30);
    this.body.position = this.transform.position;

    //this.graphic = new BoxShape(this.body.size.x, this.body.size.y, Colors.red());
    this.graphic = new CircleShape(this.body.radius, Colors.red());

    this._moveDirection = new Vector2d();
  }

  start() {
    this._randomTarget();
  }

  update(deltaTime, elapsedTime) {
    if(this.transform.position.distance(this.target) < 10) {
      this._randomTarget();
    }

    this._updateMovementDirection();
    this._handleVelocity(deltaTime);
  }

  _updateMovementDirection() {
    this._moveDirection.set(
      this.target.x - this.transform.position.x, 
      this.target.y - this.transform.position.y
    );

    if((this._moveDirection.x || this._moveDirection.y) !== 0) {
      this._moveDirection.normalize();
    }
  }

  _handleVelocity(deltaTime) {
    this.velocity.add(this._moveDirection.multiply(this.acceleration * deltaTime));
    this.transform.position.x += this.velocity.x * deltaTime;
    this.transform.position.y += this.velocity.y * deltaTime;
    this.velocity.multiply(Math.max(1 - deltaTime * this.drag, 0));
  }

  _randomTarget() {
    this.target.x = randomInt(25, this.scene.width - 50);
    this.target.y = randomInt(25, this.scene.height - 50);
  }
}