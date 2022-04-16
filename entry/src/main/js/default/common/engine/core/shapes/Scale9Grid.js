import Rect from './Rect';
import { vec2, Rectangle, Size } from '../../utils/math2d';
import { EImageFillType } from '../../interface/interface';
export class Scale9Data {
    constructor(image, inset) {
        this.image = image;
        this._inset = inset;
    }
    set inset(value) {
        this._inset = value;
    }
    get leftMargin() {
        return this._inset.leftMargin;
    }
    get rightMargin() {
        return this._inset.rightMargin;
    }
    get topMargin() {
        return this._inset.topMargin;
    }
    get bottomMargin() {
        return this._inset.bottomMargin;
    }
}
export default class Scale9Grid extends Rect {
    constructor(data, width, height, u, v) {
        super(width, height, u, v);
        this.data = data;
        this._calcDestRects();
    }
    get type() {
        return 'Scale9Grid';
    }
    _calcDestRects() {
        this.destRects = [];
        this.srcRects = [];
        let rc;
        rc = new Rectangle();
        rc.origin = vec2.create(0, 0);
        rc.size = Size.create(this.data.leftMargin, this.data.topMargin);
        this.srcRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.x, this.y);
        rc.size = Size.create(this.data.leftMargin, this.data.topMargin);
        this.destRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.data.image.width - this.data.rightMargin, 0);
        rc.size = Size.create(this.data.rightMargin, this.data.topMargin);
        this.srcRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.right - this.data.rightMargin, this.y);
        rc.size = Size.create(this.data.rightMargin, this.data.topMargin);
        this.destRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.data.image.width - this.data.rightMargin, this.data.image.height - this.data.bottomMargin);
        rc.size = Size.create(this.data.rightMargin, this.data.bottomMargin);
        this.srcRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.right - this.data.rightMargin, this.bottom - this.data.bottomMargin);
        rc.size = Size.create(this.data.rightMargin, this.data.bottomMargin);
        this.destRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(0, this.data.image.height - this.data.bottomMargin);
        rc.size = Size.create(this.data.leftMargin, this.data.bottomMargin);
        this.srcRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.x, this.bottom - this.data.bottomMargin);
        rc.size = Size.create(this.data.leftMargin, this.data.bottomMargin);
        this.destRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(0, this.data.topMargin);
        rc.size = Size.create(this.data.leftMargin, this.data.image.height - this.data.topMargin - this.data.bottomMargin);
        this.srcRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.x, this.y + this.data.topMargin);
        rc.size = Size.create(this.data.leftMargin, this.height - this.data.topMargin - this.data.bottomMargin);
        this.destRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.data.leftMargin, 0);
        rc.size = Size.create(this.data.image.width - this.data.leftMargin - this.data.rightMargin, this.data.topMargin);
        this.srcRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.x + this.data.leftMargin, this.y);
        rc.size = Size.create(this.width - this.data.leftMargin - this.data.rightMargin, this.data.topMargin);
        this.destRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.data.image.width - this.data.rightMargin, this.data.topMargin);
        rc.size = Size.create(this.data.rightMargin, this.data.image.height - this.data.topMargin - this.data.bottomMargin);
        this.srcRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.right - this.data.rightMargin, this.y + this.data.topMargin);
        rc.size = Size.create(this.data.rightMargin, this.height - this.data.topMargin - this.data.bottomMargin);
        this.destRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.data.leftMargin, this.data.image.height - this.data.bottomMargin);
        rc.size = Size.create(this.data.image.width - this.data.leftMargin - this.data.rightMargin, this.data.bottomMargin);
        this.srcRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.x + this.data.leftMargin, this.bottom - this.data.bottomMargin);
        rc.size = Size.create(this.width - this.data.leftMargin - this.data.rightMargin, this.data.bottomMargin);
        this.destRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.data.leftMargin, this.data.topMargin);
        rc.size = Size.create(this.data.image.width - this.data.leftMargin - this.data.rightMargin, this.data.image.height - this.data.topMargin - this.data.bottomMargin);
        this.srcRects.push(rc);
        rc = new Rectangle();
        rc.origin = vec2.create(this.x + this.data.leftMargin, this.y + this.data.topMargin);
        rc.size = Size.create(this.width - this.data.leftMargin - this.data.rightMargin, this.height - this.data.topMargin - this.data.bottomMargin);
        this.destRects.push(rc);
    }
    _drawImage(context, img, destRect, srcRect, fillType = EImageFillType.STRETCH) {
        if (srcRect.isEmpty()) {
            return false;
        }
        if (destRect.isEmpty()) {
            return false;
        }
        if (fillType === EImageFillType.STRETCH) {
            context.drawImage(img, srcRect.origin.x, srcRect.origin.y, srcRect.size.width, srcRect.size.height, destRect.origin.x, destRect.origin.y, destRect.size.width, destRect.size.height);
        }
        else {
            let rows = Math.ceil(destRect.size.width / srcRect.size.width);
            let colums = Math.ceil(destRect.size.height / srcRect.size.height);
            let left = 0;
            let top = 0;
            let right = 0;
            let bottom = 0;
            let width = 0;
            let height = 0;
            let destRight = destRect.origin.x + destRect.size.width;
            let destBottom = destRect.origin.y + destRect.size.height;
            if (fillType === EImageFillType.REPEAT_X) {
                colums = 1;
            }
            else if (fillType === EImageFillType.REPEAT_Y) {
                rows = 1;
            }
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < colums; j++) {
                    left = destRect.origin.x + i * srcRect.size.width;
                    top = destRect.origin.y + j * srcRect.size.height;
                    width = srcRect.size.width;
                    height = srcRect.size.height;
                    right = left + width;
                    bottom = top + height;
                    if (right > destRight) {
                        width = srcRect.size.width - (right - destRight);
                    }
                    if (bottom > destBottom) {
                        height = srcRect.size.height - (bottom - destBottom);
                    }
                    context.drawImage(img, srcRect.origin.x, srcRect.origin.y, width, height, left, top, width, height);
                }
            }
        }
        return true;
    }
    draw(transformable, state, context) {
        for (let i = 0; i < this.srcRects.length; i++) {
            this._drawImage(context, this.data.image, this.destRects[i], this.srcRects[i], EImageFillType.STRETCH);
        }
    }
}
