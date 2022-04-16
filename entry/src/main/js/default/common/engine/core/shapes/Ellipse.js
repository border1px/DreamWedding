import { BaseShape2D } from '../Shape';
import { Math2D } from '../../utils/math2d';
export default class Ellipse extends BaseShape2D {
    constructor(radiusX = 10, radiusY = 10) {
        super();
        this.radiusX = radiusX;
        this.radiusY = radiusY;
    }
    hitTest(localPt, transform) {
        let isHitted = Math2D.isPointInEllipse(localPt.x, localPt.y, 0, 0, this.radiusX, this.radiusY);
        return isHitted;
    }
    draw(transform, state, context) {
        context.beginPath();
        context.ellipse(0, 0, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
        super.draw(transform, state, context);
    }
    get type() {
        return 'Ellipse';
    }
}
