import { BaseShape2D } from '../Shape';
import { Math2D } from '../../utils/math2d';
export default class Rect extends BaseShape2D {
    constructor(w = 1, h = 1, u = 0, v = 0) {
        super();
        this.width = w;
        this.height = h;
        this.x = -this.width * u;
        this.y = -this.height * v;
    }
    get right() {
        return this.x + this.width;
    }
    get bottom() {
        return this.y + this.height;
    }
    get type() {
        return 'Rect';
    }
    hitTest(localPt, transform) {
        return Math2D.isPointInRect(localPt.x, localPt.y, this.x, this.y, this.width, this.height);
    }
    draw(transformable, state, context) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.width, this.y);
        context.lineTo(this.x + this.width, this.y + this.height);
        context.lineTo(this.x, this.y + this.height);
        context.closePath();
        super.draw(transformable, state, context);
    }
}
