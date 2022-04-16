import Application, { EInputEventType, ISprite, vec2, CanvasMouseEvent, CanvasTouchEvent } from './core/Application'
import { SpriteFactory } from './utils/Factory'
import { mat2d, Math2D } from './utils/Math2d'
import Container from './core/shapes/Container'
import ShapeImage from './core/shapes/Image'

let resizeStartPosX = 0
class App {
  public _app: Application
  public _hittedSprite: Container | null = null

  public constructor(app: Application) {
    this._app = app

    this.createBoy()
    this.createGirl()

    this._app.rootContainer.sprite.touchEvent = this.touchEventHandler.bind(this)
    this._app.start()
  }

  public createBoy() {
    let boy = SpriteFactory.createContainer(60, 60, 340, 680)
    boy.touchEvent = this.touchEventHandler.bind(this)
    this._app.rootContainer.addSprite(boy)

    let body = SpriteFactory.createSprite2('./images/img/bg-clothes1.png', 0, 148, 340, 540, 'body')
    boy.owner.addSprite(body)
    body.touchEvent = this.touchEventHandler.bind(this)

    let face = SpriteFactory.createSprite2('./images/img/bridegroom-face.png', 135, 2, 130, 164, 'face')
    boy.owner.addSprite(face)
    face.touchEvent = this.touchEventHandler.bind(this)

    let hair = SpriteFactory.createSprite2('./images/img/bg-hair1.png', 137, 0, 124, 120, 'hair')
    boy.owner.addSprite(hair)
    hair.touchEvent = this.touchEventHandler.bind(this)

    let btnResize = SpriteFactory.createSprite2('./images/btn-resize.png', boy.width - 25, -25, 50, 50, 'resize')
    btnResize.isVisible = false
    boy.owner.addSprite(btnResize)
    btnResize.touchEvent = this.touchEventHandler.bind(this)

    let btnDelete = SpriteFactory.createSprite2('./images/btn-del.png', -25, -25, 50, 50, 'delete')
    btnDelete.isVisible = false
    boy.owner.addSprite(btnDelete)
    btnDelete.touchEvent = this.touchEventHandler.bind(this)
  }

  public createGirl() {
    let girl = SpriteFactory.createContainer(100, 100, 460, 806)
    girl.touchEvent = this.touchEventHandler.bind(this)
    this._app.rootContainer.addSprite(girl)

    let body = SpriteFactory.createSprite2('./images/img/b-clothes1.png', 0, 200, 460, 600, 'body')
    girl.owner.addSprite(body)
    body.touchEvent = this.touchEventHandler.bind(this)

    let face = SpriteFactory.createSprite2('./images/img/bride-face.png', 140, 60, 134, 164, 'face')
    girl.owner.addSprite(face)
    face.touchEvent = this.touchEventHandler.bind(this)

    let hair = SpriteFactory.createSprite2('./images/img/b-hair1.png', 60, 0, 300, 372, 'hair')
    girl.owner.addSprite(hair)
    hair.touchEvent = this.touchEventHandler.bind(this)

    let btnResize = SpriteFactory.createSprite2('./images/btn-resize.png', girl.width - 25, -25, 50, 50, 'resize')
    btnResize.isVisible = false
    girl.owner.addSprite(btnResize)
    btnResize.touchEvent = this.touchEventHandler.bind(this)

    let btnDelete = SpriteFactory.createSprite2('./images/btn-del.png', -25, -25, 50, 50, 'delete')
    btnDelete.isVisible = false
    girl.owner.addSprite(btnDelete)
    btnDelete.touchEvent = this.touchEventHandler.bind(this)
  }

  private touchEventHandler(s: ISprite, evt: CanvasTouchEvent): void {
    let targetContainer: ISprite | null = null
    let mat: mat2d = mat2d.create()
    let dest: vec2 = vec2.create()
    let src: vec2 = vec2.create(evt.canvasPosition.x, evt.canvasPosition.y)

    if (evt.type === EInputEventType.TOUCHSTART) {
      if (s.name === 'root') {
        this._hittedSprite = null
        this.handleChoiceContainer()
      } else if (s.name === 'container' || s.name === 'delete') {
        this._hittedSprite = s
      } else {
        targetContainer = s.owner.getParentSprite() as ISprite
        mat = targetContainer!.getLocalMatrix()
        Math2D.transform(mat, src, dest)
        targetContainer!.deltaX = dest.x
        targetContainer!.deltaY = dest.y
        this._hittedSprite = targetContainer
        this.handleChoiceContainer()
      }

    } else if (evt.type === EInputEventType.TOUCHEND) {
      if (this._hittedSprite?.name === 'delete') {
        this._app.rootContainer.removeSprite(this._hittedSprite.owner.getParentSprite())
      }
      // this._hittedSprite = null
    } else if (evt.type === EInputEventType.TOUCHMOVE) {
      if (this._hittedSprite) {
        if (s.name === 'container') {
          this._hittedSprite.x = evt.canvasPosition.x - this._hittedSprite.deltaX * this._hittedSprite.scaleX
          this._hittedSprite.y = evt.canvasPosition.y - this._hittedSprite.deltaY * this._hittedSprite.scaleY
        } else if (s.name === 'resize') {
          this.resizeTouchMove(evt)
        } else {
          this._hittedSprite.x = evt.canvasPosition.x - this._hittedSprite!.deltaX * this._hittedSprite.scaleX
          this._hittedSprite.y = evt.canvasPosition.y - this._hittedSprite!.deltaY * this._hittedSprite.scaleY
        }
      }
    }
    
  }

  handleChoiceContainer() {
    // console.log(this._app.rootContainer.children)
    this._app.rootContainer.children.forEach(item => {
      item.children[3].data.isVisible = false
      item.children[4].data.isVisible = false
      item.data.shape.selected = false
    })
    if (this._hittedSprite) {
      this._hittedSprite.shape.selected = true
      this._hittedSprite.owner.children[3].data.isVisible = true
      this._hittedSprite.owner.children[4].data.isVisible = true
    }
  }

  resizeTouchMove(evt: CanvasTouchEvent){
    let tempPosX = evt.canvasPosition.x

    let dur = tempPosX - resizeStartPosX
    resizeStartPosX = tempPosX

    if(dur > 0){
      //放大
      let scale1 = this._hittedSprite!.scaleX + 0.01
      if(this._hittedSprite!.scaleX <= 1.5){
        this._hittedSprite!.scaleX = scale1
        this._hittedSprite!.scaleY = scale1
      }
    }

    if(dur < 0){
      //缩小
      if(this._hittedSprite!.scaleX >= 0.5){
        let scale2 = this._hittedSprite!.scaleX - 0.01
        this._hittedSprite!.scaleX = scale2
        this._hittedSprite!.scaleY = scale2      
      }
    }
  }
}


var canvas = document.createElement('canvas');
canvas.id = 'canvas';
document.body.appendChild(canvas);
canvas.width = document.body.offsetWidth
canvas.height = document.body.offsetHeight;
let app = new App(new Application(canvas))

document.getElementById('btn')?.addEventListener('click', () => {
  let shape = app._hittedSprite.owner.children[0].data.shape
  app._hittedSprite.owner.children[0].data.shape = new ShapeImage('./images/img/b-clothes2.png', shape.width, shape.height)
})
