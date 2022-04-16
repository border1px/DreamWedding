import { ERenderType } from '../interface/interface';
export class BaseShape2D {
    constructor() {
        this.axisXStyle = 'rgba( 255 , 0 , 0 , 128 ) ';
        this.axisYStyle = 'rgba( 0 , 255 , 0 , 128 ) ';
        this.axisLineWidth = 1;
        this.axisLength = 100;
        this.data = undefined;
    }
    drawLine(ctx, style, isAxisX = true) {
        ctx.save();
        ctx.strokeStyle = style;
        ctx.lineWidth = this.axisLineWidth;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        if (isAxisX) {
            ctx.lineTo(this.axisLength, 0);
        }
        else {
            ctx.lineTo(0, this.axisLength);
        }
        ctx.stroke();
        ctx.restore();
    }
    beginDraw(transformable, state, context) {
        context.save();
        context.lineWidth = state.lineWidth;
        context.strokeStyle = state.strokeStyle;
        context.fillStyle = state.fillStyle;
        let mat = transformable.getWorldMatrix();
        context.setTransform(mat.values[0], mat.values[1], mat.values[2], mat.values[3], mat.values[4], mat.values[5]);
    }
    draw(transformable, state, context) {
        if (state.renderType === ERenderType.STROKE) {
            context.stroke();
        }
        else if (state.renderType === ERenderType.FILL) {
            context.fill();
        }
        else if (state.renderType === ERenderType.STROKE_FILL) {
            context.stroke();
            context.fill();
        }
        else if (state.renderType === ERenderType.CLIP) {
            context.clip();
        }
    }
    endDraw(transformable, state, context) {
        if (state.renderType !== ERenderType.CLIP) {
            if (state.showCoordSystem) {
                this.drawLine(context, this.axisXStyle, true);
                this.drawLine(context, this.axisYStyle, false);
            }
            context.restore();
        }
    }
}
