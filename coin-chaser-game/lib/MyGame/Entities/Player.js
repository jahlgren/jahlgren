import { GameObject } from "../../../vendor/EasyGameEngine/GameObject.js";
import { CircleShape } from "../../../vendor/EasyGameEngine/Graphics/CircleShape.js";
import { KeyCodes } from "../../../vendor/EasyGameEngine/Input.js";
import { Vector2d } from "../../../vendor/EasyGameEngine/Geom/Vector2d.js";
import { Colors } from "../../../vendor/EasyGameEngine/Graphics/Color.js";
import { Circle } from "../../../vendor/EasyGameEngine/Geom/Circle.js";
import { BoxShape } from "../../../vendor/EasyGameEngine/Graphics/BoxShape.js";
import { Box } from "../../../vendor/EasyGameEngine/Geom/Box.js";

export class Player extends GameObject {

  constructor(x, y) {
    super(x, y);
    
    this.acceleration = 1500;
    this.drag = 5;
    this.velocity = new Vector2d();

    //this.body = new Box(0, 0, 50, 50);
    this.body = new Circle(0, 0, 30);
    this.body.position = this.transform.position;
    
    //this.graphic = new BoxShape(this.body.size.x, this.body.size.y, Colors.dodgerBlue());
    this.graphic = new CircleShape(this.body.radius, Colors.dodgerBlue());

    this._moveDirection = new Vector2d();
  }

  update(deltaTime, elapsedTime) {
    this._updateMovementDirection();
    this._handleVelocity(deltaTime);
  }

  _updateMovementDirection() {
    this._moveDirection.set(0, 0);

    this._moveDirection.x += this.input.getKey(KeyCodes.leftArrow)  ? -1 : 0;
    this._moveDirection.x += this.input.getKey(KeyCodes.rightArrow) ? 1 : 0;
    this._moveDirection.y += this.input.getKey(KeyCodes.upArrow)    ? -1 : 0;
    this._moveDirection.y += this.input.getKey(KeyCodes.downArrow)  ? 1 : 0;

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
}