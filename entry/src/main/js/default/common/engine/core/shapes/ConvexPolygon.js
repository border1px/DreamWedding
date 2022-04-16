import { BaseShape2D } from '../Shape';
import { Math2D } from '../../utils/math2d';
export default class ConvexPolygon extends BaseShape2D {
    constructor(points) {
        if (points.length < 3) {
            alert('多边形顶点必须大于3或等于3!!');
            new Error('多边形顶点必须大于3或等于3!!');
        }
        if (Math2D.isConvex(points) === false) {
            alert('当前多边形不是凸多边形!!');
            new Error('当前多边形不是凸多边形!!');
        }
        super();
        this.points = points;
    }
    hitTest(localPt, transform) {
        return Math2D.isPointInPolygon(localPt, this.points);
    }
    draw(transformable, state, context) {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
            context.lineTo(this.points[i].x, this.points[i].y);
        }
        context.closePath();
        super.draw(transformable, state, context);
    }
    get type() {
        return 'Polygon';
    }
}
