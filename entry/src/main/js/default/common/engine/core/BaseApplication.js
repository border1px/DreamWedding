import { vec2 } from '../utils/Math2d';
export var EInputEventType;
(function (EInputEventType) {
    EInputEventType[EInputEventType["MOUSEEVENT"] = 0] = "MOUSEEVENT";
    EInputEventType[EInputEventType["MOUSEDOWN"] = 1] = "MOUSEDOWN";
    EInputEventType[EInputEventType["MOUSEUP"] = 2] = "MOUSEUP";
    EInputEventType[EInputEventType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
    EInputEventType[EInputEventType["MOUSEDRAG"] = 4] = "MOUSEDRAG";
    EInputEventType[EInputEventType["KEYBOARDEVENT"] = 5] = "KEYBOARDEVENT";
    EInputEventType[EInputEventType["KEYUP"] = 6] = "KEYUP";
    EInputEventType[EInputEventType["KEYDOWN"] = 7] = "KEYDOWN";
    EInputEventType[EInputEventType["KEYPRESS"] = 8] = "KEYPRESS";
    EInputEventType[EInputEventType["TOUCHSTART"] = 9] = "TOUCHSTART";
    EInputEventType[EInputEventType["TOUCHMOVE"] = 10] = "TOUCHMOVE";
    EInputEventType[EInputEventType["TOUCHEND"] = 11] = "TOUCHEND";
})(EInputEventType || (EInputEventType = {}));

export class CanvasInputEvent {
    constructor(type, altKey = false, ctrlKey = false, shiftKey = false) {
        this.altKey = altKey;
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
        this.type = type;
    }
}
class Timer {
    constructor(callback) {
        this.id = -1;
        this.enabled = false;
        this.callbackData = undefined;
        this.countdown = 0;
        this.timeout = 0;
        this.onlyOnce = false;
        this.callback = callback;
    }
}

export class CanvasTouchEvent extends CanvasInputEvent {
    constructor(type, canvasPos) {
        super(type);
        this.canvasPosition = canvasPos;
        this.hasLocalPosition = false;
        this.localPosition = vec2.create();
    }
}

//function requestAnimationFrame2(fn) {
//    setTimeout(() => {
//        fn(new Date().getTime())
//    }, 1)
//}

export class BaseApplication {
    constructor(canvas) {
        this.timers = [];
        this._timeId = -1;
        this._fps = 0;
        this._start = false;
        this._requestId = -1;
        this.canvas = canvas;
        this.canvas.ontouchstart = this.handleEvent.bind(this);
        this.canvas.ontouchmove = this.handleEvent.bind(this);
        this.canvas.ontouchend = this.handleEvent.bind(this)
        this._isMouseDown = false;
        this.isSupportMouseMove = false;
    }
    isRunning() {
        return this._start;
    }
    get fps() {
        return this._fps;
    }
    start() {
        if (!this._start) {
            this._start = true;
            this._lastTime = -1;
            this._startTime = -1;
            this._requestId = requestAnimationFrame((msec) => {
                this.step(msec);
            });
        }
    }
    step(timeStamp) {
//        console.log(timeStamp)
        if (this._startTime === -1)
            this._startTime = timeStamp;
        if (this._lastTime === -1)
            this._lastTime = timeStamp;
        let elapsedMsec = timeStamp - this._startTime;
        let intervalSec = timeStamp - this._lastTime;
//        console.log(intervalSec)
        if (intervalSec !== 0) {
            this._fps = 1000.0 / intervalSec;
        }
        intervalSec /= 1000.0;
        this._lastTime = timeStamp;
        this.update(elapsedMsec, intervalSec);
        this.render();
        requestAnimationFrame((elapsedMsec) => {
            this.step(elapsedMsec);
        });
    }
    stop() {
        if (this._start) {
            cancelAnimationFrame(this._requestId);
            this._lastTime = -1;
            this._startTime = -1;
            this._start = false;
        }
    }
    update(elapsedMsec, intervalSec) { }
    render() { }
    handleEvent(evt) {
        switch (evt.type) {
            case 'touchstart':
                this.dispatchTouchStart(this._toCanvasTouchEvent(evt, EInputEventType.TOUCHSTART));
                break;
            case 'touchmove':
                this.dispatchTouchMove(this._toCanvasTouchEvent(evt, EInputEventType.TOUCHMOVE));
                break;
            case 'touchend':
                this.dispatchTouchEnd(this._toCanvasTouchEvent(evt, EInputEventType.TOUCHEND));
                break;
        }
    }
    dispatchTouchStart(evt) {
        return;
    }
    dispatchTouchMove(evt) {
        return;
    }
    dispatchTouchEnd(evt) {
        return;
    }
    _viewportToCanvasCoordinate(evt) {
        if (this.canvas) {
            let rect = this.canvas.getBoundingClientRect();
            if (evt.target) {
                let borderLeftWidth = 0;
                let borderTopWidth = 0;
                let paddingLeft = 0;
                let paddingTop = 0;
//                let decl = window.getComputedStyle(evt.target);
                let decl = {
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                    paddingLeft: 0,
                    paddingTop: 0
                }
                let strNumber = decl.borderLeftWidth;
                if (strNumber !== null) {
                    borderLeftWidth = parseInt(strNumber, 10);
                }
                if (strNumber !== null) {
                    borderTopWidth = parseInt(strNumber, 10);
                }
                strNumber = decl.paddingLeft;
                if (strNumber !== null) {
                    paddingLeft = parseInt(strNumber, 10);
                }
                strNumber = decl.paddingTop;
                if (strNumber !== null) {
                    paddingTop = parseInt(strNumber, 10);
                }
                // 硬编码，未考虑mouse事件
                let x = 0;
                let y = 0;
                x = evt.touches[0].globalX - rect.left - borderLeftWidth - paddingLeft;
                y = evt.touches[0].globalY - rect.top - borderTopWidth - paddingTop;
                let pos = vec2.create(x, y);
                return pos;
            }
            alert('canvas为null');
            throw new Error('canvas为null');
        }
        alert('evt . target为null');
        throw new Error('evt . target为null');
    }
    _toCanvasTouchEvent(evt, type) {
        let event = evt;
        let touchPosition = this._viewportToCanvasCoordinate(event);
        let canvasTouchEvent = new CanvasTouchEvent(type, touchPosition);
        return canvasTouchEvent;
    }
}
