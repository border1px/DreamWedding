import { mat2d, Transform2D } from '../utils/math2d';
import { EOrder, ERenderType, } from '../interface/interface';
import { SpriteNode } from './SpriteNode';
export class Sprite {
    constructor(shape, name) {
        this.showCoordSystem = false;
        this.renderType = ERenderType.FILL;
        this.isVisible = true;
        this.fillStyle = 'white';
        this.strokeStyle = 'black';
        this.lineWidth = 1;
        this.width = 0;
        this.height = 0;
        // 鼠标全局坐标点，相对于局部坐标系圆点的偏移。
        // 元素移动，需要用 canvasPosition 减去这个局部偏移量
        this.deltaX = 0;
        this.deltaY = 0;
        this.transform = new Transform2D();
        this.mouseEvent = null;
        this.keyEvent = null;
        this.updateEvent = null;
        this.renderEvent = null;
        this.touchEvent = null;
        this.name = name;
        this.shape = shape;
    }
    set x(x) {
        this.transform.position.x = x;
    }
    get x() {
        return this.transform.position.x;
    }
    set y(y) {
        this.transform.position.y = y;
    }
    get y() {
        return this.transform.position.y;
    }
    set rotation(rotation) {
        this.transform.rotation = rotation;
    }
    get rotation() {
        return this.transform.rotation;
    }
    set scaleX(s) {
        this.transform.scale.x = s;
    }
    get scaleX() {
        return this.transform.scale.x;
    }
    set scaleY(s) {
        this.transform.scale.y = s;
    }
    get scaleY() {
        return this.transform.scale.y;
    }
    getWorldMatrix() {
        if (this.owner instanceof SpriteNode) {
            let arr = [];
            let curr = this.owner;
            while (curr !== undefined) {
                arr.push(curr);
                curr = curr.parent;
            }
            let out = mat2d.create();
            let currMat;
            for (let i = arr.length - 1; i >= 0; i--) {
                curr = arr[i];
                if (curr.data) {
                    currMat = curr.data.transform.toMatrix();
                    mat2d.multiply(out, currMat, out);
                }
            }
            return out;
        }
        else {
            return this.transform.toMatrix();
        }
    }
    getLocalMatrix() {
        let src = this.getWorldMatrix();
        let out = mat2d.create();
        if (mat2d.invert(src, out)) {
            return out;
        }
        else {
            alert('矩阵求逆失败');
            throw new Error('矩阵求逆失败');
        }
    }
    update(mesc, diff, order) {
        if (this.updateEvent) {
            this.updateEvent(this, mesc, diff, order);
        }
    }
    hitTest(localPt) {
        if (this.isVisible) {
            return this.shape.hitTest(localPt, this);
        }
        else {
            return false;
        }
    }
    draw(context) {
        if (this.isVisible) {
            this.shape.beginDraw(this, this, context);
            if (this.renderEvent !== null) {
                this.renderEvent(this, context, EOrder.PREORDER);
            }
            this.shape.draw(this, this, context);
            if (this.renderEvent !== null) {
                this.renderEvent(this, context, EOrder.POSTORDER);
            }
            this.shape.endDraw(this, this, context);
        }
    }
}
