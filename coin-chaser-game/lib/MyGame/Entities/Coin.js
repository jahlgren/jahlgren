import { GameObject } from "../../../vendor/EasyGameEngine/GameObject.js";
import { CircleShape } from "../../../vendor/EasyGameEngine/Graphics/CircleShape.js";
import { Colors} from '../../../vendor/EasyGameEngine/Graphics/Color.js';
import { Circle } from "../../../vendor/EasyGameEngine/Geom/Circle.js";
import { BoxShape } from "../../../vendor/EasyGameEngine/Graphics/BoxShape.js";
import { Box } from "../../../vendor/EasyGameEngine/Geom/Box.js";
import { Vector2d } from "../../../vendor/EasyGameEngine/Geom/Vector2d.js";

export class Coin extends GameObject {

  constructor(x, y) {
    super(x, y);
    
    //this.body = new Box(0, 0, 25, 25);
    this.body = new Circle(0, 0, 15);
    this.body.position = this.transform.position;

    //this.graphic = new BoxShape(this.body.size.x - 4, this.body.size.y - 4, Colors.gold());
    this.graphic = new CircleShape(this.body.radius - 4, Colors.gold());
    this.graphic.setBorder(4, Colors.orange());
  }
}