import { BaseShape2D } from '../Shape';
export default class BezierPath extends BaseShape2D {
    constructor(points, isCubic = false) {
        super();
        this.points = points;
        this.isCubic = isCubic;
        this.data = points;
    }
    get type() {
        return 'BezierPath';
    }
    hitTest(localPt, transform) {
        return false;
    }
    draw(transformable, state, context) {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        if (this.isCubic) {
            for (let i = 1; i < this.points.length; i += 3) {
                context.bezierCurveTo(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y, this.points[i + 2].x, this.points[i + 2].y);
            }
        }
        else {
            for (let i = 1; i < this.points.length; i += 2) {
                context.quadraticCurveTo(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y);
            }
        }
        super.draw(transformable, state, context);
    }
}
