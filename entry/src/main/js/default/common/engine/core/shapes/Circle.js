import { BaseShape2D } from '../Shape';
import { Math2D, vec2 } from '../../utils/math2d';
export default class Circle extends BaseShape2D {
    constructor(radius = 1) {
        super();
        this.radius = radius;
    }
    hitTest(localPt, transform) {
        return Math2D.isPointInCircle(localPt, vec2.create(0, 0), this.radius);
    }
    draw(transformable, state, context) {
        context.beginPath();
        context.arc(0, 0, this.radius, 0.0, Math.PI * 2.0, true);
        super.draw(transformable, state, context);
    }
    get type() {
        return 'Circle';
    }
}
