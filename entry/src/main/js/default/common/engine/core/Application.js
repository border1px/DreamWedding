import { BaseApplication } from './BaseApplication';
import { SpriteNodeManager } from './SpriteNode';
export * from './BaseApplication';
export * from '../interface/interface';
export * from '../utils/Math2d';
export default class Application extends BaseApplication {
    constructor(canvas) {
        super(canvas);
        this.context2D = this.canvas.getContext('2d');
        this._dispatcher = new SpriteNodeManager(this.canvas.getBoundingClientRect().width, this.canvas.getBoundingClientRect().height);
    }
    get rootContainer() {
        return this._dispatcher.container;
    }
    update(msec, diff) {
        this._dispatcher.dispatchUpdate(msec, diff);
    }
    render() {
        if (this.context2D) {
            this.context2D.clearRect(0, 0, this.canvas.getBoundingClientRect().width, this.canvas.getBoundingClientRect().height);
            this._dispatcher.dispatchDraw(this.context2D);
        }
    }
    dispatchTouchStart(evt) {
        super.dispatchTouchStart(evt);
        this._dispatcher.dispatchTouchEvent(evt);
    }
    dispatchTouchMove(evt) {
        super.dispatchTouchMove(evt);
        this._dispatcher.dispatchTouchEvent(evt);
    }
    dispatchTouchEnd(evt) {
        super.dispatchTouchEnd(evt);
        this._dispatcher.dispatchTouchEvent(evt);
    }
}
