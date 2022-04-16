import { BaseShape2D } from '../Shape';
import { Math2D } from '../../utils/math2d';
export default class ShapeImage extends BaseShape2D {
    constructor(image, w = 1, h = 1, u = 0, v = 0) {
        super();
        this.width = w;
        this.height = h;
        this.x = -this.width * u;
        this.y = -this.height * v;
        this.image = new Image();
        this.image.src = image;
    }
    hitTest(localPt, transform) {
        return Math2D.isPointInRect(localPt.x, localPt.y, this.x, this.y, this.width, this.height);
    }
//    get type() {
//        return 'Image';
//    }
    draw(transformable, state, context) {
        // console.log(this.data)
        context.save();
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.restore();
    }
}
