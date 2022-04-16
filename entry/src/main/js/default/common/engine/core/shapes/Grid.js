import Rect from './Rect';
import { ERenderType } from '../../interface/interface';
export default class Grid extends Rect {
    constructor(w = 10, h = 10, xStep = 10, yStep = 10) {
        super(w, h, 0, 0);
        this.xStep = xStep;
        this.yStep = yStep;
    }
    draw(transformable, state, context) {
        state.renderType = ERenderType.CUSTOM;
        context.fillRect(0, 0, this.width, this.height);
        context.beginPath();
        for (var i = this.xStep + 0.5; i < this.width; i += this.xStep) {
            context.moveTo(i, 0);
            context.lineTo(i, this.height);
        }
        context.stroke();
        context.beginPath();
        for (var i = this.yStep + 0.5; i < this.height; i += this.yStep) {
            context.moveTo(0, i);
            context.lineTo(this.width, i);
        }
        context.stroke();
    }
    get type() {
        return 'Grid';
    }
}
