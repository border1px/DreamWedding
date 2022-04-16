import { TreeNode, NodeEnumeratorFactory } from '../core/TreeNode';
import { EInputEventType, } from './BaseApplication';
import { EOrder, ERenderType, } from '../interface/interface';
import { vec2, Math2D } from '../utils/Math2d';
import { SpriteFactory } from '../utils/Factory';
export class SpriteNode extends TreeNode {
    constructor(sprite, parent = undefined, name = 'spriteNode') {
        super(sprite, parent, name);
    }
    addSprite(sprite) {
        let node = new SpriteNode(sprite, this, sprite.name);
        return node;
    }
    removeSprite(sprite) {
        let idx = this.getSpriteIndex(sprite);
        if (idx === -1) {
            return false;
        }
        if (this.removeChildAt(idx) === undefined) {
            return false;
        }
        else {
            return true;
        }
    }
    removeAll(includeThis) {
        let iter = NodeEnumeratorFactory.create_bf_r2l_b2t_iter(this);
        let current = undefined;
        while (iter.moveNext()) {
            current = iter.current;
            if (current !== undefined) {
                {
                    if (current.data !== undefined) {
                        if (current === this) {
                            if (includeThis === true) {
                                current.data = undefined;
                                current = current.remove();
                            }
                        }
                        else {
                            current.data = undefined;
                            current = current.remove();
                        }
                    }
                }
            }
        }
    }
    getSprite(idx) {
        if (idx < 0 || idx > this.childCount - 1) {
            throw new Error('参数idx越界!!');
        }
        let spr = this.getChildAt(idx).sprite;
        if (spr === undefined) {
            alert('sprite 为undefined，请检查原因!!!');
            throw new Error('sprite 为undefined，请检查原因!!!');
        }
        return spr;
    }
    getParentSprite() {
        let parent = this.parent;
        if (parent !== undefined) {
            return parent.sprite;
        }
        else {
            return undefined;
        }
    }
    getSpriteCount() {
        return this.childCount;
    }
    getSpriteIndex(sprite) {
        for (let i = 0; i < this.childCount; i++) {
            let child = this.getChildAt(i);
            if (child !== undefined) {
                if (child.sprite !== undefined) {
                    if (child.sprite === sprite) {
                        return i;
                    }
                }
            }
        }
        return -1;
    }
    addChildAt(child, index) {
        let ret = super.addChildAt(child, index);
        if (ret !== undefined) {
            if (ret.data) {
                ret.data.owner = ret;
            }
        }
        return ret;
    }
    get sprite() {
        return this.data;
    }
    removeChildAt(index) {
        let ret = super.removeChildAt(index);
        return ret;
    }
    findSprite(src, localPoint = null) {
        let iter = NodeEnumeratorFactory.create_bf_r2l_b2t_iter(this.root);
        let current = undefined;
        let mat;
        let dest = vec2.create();
        while (iter.moveNext()) {
            current = iter.current;
            if (current !== undefined) {
                if (current.data !== undefined) {
                    mat = current.data.getLocalMatrix();
                    {
                        Math2D.transform(mat, src, dest);
                        // 修正拖拽式的局部坐标偏移量
                        current.data.deltaX = dest.x;
                        current.data.deltaY = dest.y;
                        if (current.data.hitTest(dest)) {
                            // console.log(current.data)
                            if (localPoint !== null) {
                                localPoint.x = dest.x;
                                localPoint.y = dest.y;
                            }
                            return current.data;
                        }
                    }
                }
            }
        }
        return undefined;
    }
    draw(context) {
        if (this.sprite !== undefined) {
            this.sprite.draw(context);
            this._drawChildren(context);
        }
    }
    _drawChildren(context) {
        for (let i = 0; i < this.childCount; i++) {
            let child = this.getChildAt(i);
            if (child !== undefined) {
                let spriteNode = child;
                spriteNode.draw(context);
            }
        }
    }
    update(msec, diffSec) {
        if (this.sprite !== undefined) {
            this.sprite.update(msec, diffSec, EOrder.PREORDER);
            this._updateChildren(msec, diffSec);
            this.sprite.update(msec, diffSec, EOrder.POSTORDER);
        }
    }
    _updateChildren(msec, diffSec) {
        for (let i = 0; i < this.childCount; i++) {
            let child = this.getChildAt(i);
            if (child !== undefined) {
                let spriteNode = child;
                spriteNode.update(msec, diffSec);
            }
        }
    }
}

export class SpriteNodeManager {
    constructor(width, height) {
        this._dragSprite = undefined;
        let spr = SpriteFactory.createSprite2('common/images/img/bg1.png', 0, 0, width, height, 'root');
        spr.renderType = ERenderType.STROKE_FILL;
        this._rootNode = new SpriteNode(spr, undefined, spr.name);
        spr.owner = this._rootNode;
    }
    get container() {
        return this._rootNode;
    }
    checkExistByName(name) {
//        console.info('check')
//        console.info(JSON.stringify(this.container.))
    }
    dispatchTouchEvent(evt) {
//        if (evt.type === EInputEventType.TOUCHEND) {
//            this._dragSprite = undefined;
//        }
         if (evt.type === EInputEventType.TOUCHMOVE) {
            if (this._dragSprite !== undefined) {
                if (this._dragSprite.touchEvent !== null) {
                    this._dragSprite.touchEvent(this._dragSprite, evt);
                    return;
                }
            }
        }

        let spr = this._rootNode.findSprite(evt.canvasPosition, evt.localPosition);
        // 当前点击sprite
        if (spr !== undefined) {
            evt.hasLocalPosition = true;
            if (evt.type === EInputEventType.TOUCHSTART) {
                this._dragSprite = spr;
            } else if  (evt.type === EInputEventType.TOUCHMOVE){
                return;
            } else if (evt.type === EInputEventType.TOUCHEN) {
                this._dragSprite = undefined;
            }

            if (spr.touchEvent) {
                spr.touchEvent(spr, evt);
                return;
            }
        }
        else {
            evt.hasLocalPosition = false;
        }
    }
    dispatchUpdate(msec, diffSec) {
        this._rootNode.update(msec, diffSec);
    }
    dispatchDraw(context) {
        this._rootNode.draw(context);
    }
}
