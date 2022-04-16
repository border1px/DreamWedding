import { Math2D, vec2 } from '../../utils/math2d';
import { ERenderType } from '../../interface/interface';
export default class Line {
    constructor(len = 10, t = 0) {
        if (t < 0.0 || t > 1.0) {
            alert('参数t必须处于 [ 0 , 1 ]之间!!');
            throw new Error('参数t必须处于 [ 0 , 1 ]之间!!');
        }
        this.start = vec2.create(-len * t, 0);
        this.end = vec2.create(len * (1.0 - t), 0);
        this.data = undefined;
    }
    hitTest(localPt, transform) {
        return Math2D.isPointOnLineSegment(localPt, this.start, this.end);
    }
    beginDraw(transformable, state, context) {
        context.save();
        context.lineWidth = state.lineWidth;
        context.strokeStyle = state.strokeStyle;
        let mat = transformable.getWorldMatrix();
        context.setTransform(mat.values[0], mat.values[1], mat.values[2], mat.values[3], mat.values[4], mat.values[5]);
    }
    draw(transformable, state, context) {
        state.renderType = ERenderType.STROKE;
        context.beginPath();
        context.moveTo(this.start.x, this.start.y);
        context.lineTo(this.end.x, this.end.y);
        context.stroke();
    }
    endDraw(transformable, state, context) {
        context.restore();
    }
    get type() {
        return 'Line';
    }
}
