import { EInputEventType, vec2 } from './engine/core/Application'
import { mat2d, Math2D } from './engine/utils/Math2d'
import { SpriteFactory } from './engine/utils/Factory'
import ShapeImage from './engine/core/shapes/Image'

export const SPRITE_MAP = {
  "b-clothes1.png": {
    "width": 460,
    "height": 600
  },
  "b-clothes2.png": {
    "width": 460,
    "height": 600
  },
  "b-clothes3.png": {
    "width": 460,
    "height": 600
  },
  "b-clothes4.png": {
    "width": 460,
    "height": 600
  },
  "b-clothes5.png": {
    "width": 460,
    "height": 600
  },
  "b-clothes6.png": {
    "width": 460,
    "height": 600
  },
  "b-hair1.png": {
    "width": 300,
    "height": 372
  },
  "b-hair2.png": {
    "width": 300,
    "height": 372
  },
  "b-hair3.png": {
    "width": 300,
    "height": 372
  },
  "b-hair4.png": {
    "width": 300,
    "height": 372
  },
  "b-hair5.png": {
    "width": 300,
    "height": 372
  },
  "b-hair6.png": {
    "width": 300,
    "height": 372,
  },
  "bg-clothes1.png": {
    "width": 340,
    "height": 540
  },
  "bg-clothes2.png": {
    "width": 340,
    "height": 540
  },
  "bg-clothes3.png": {
    "width": 340,
    "height": 540
  },
  "bg-clothes4.png": {
    "width": 340,
    "height": 540
  },
  "bg-clothes5.png": {
    "width": 340,
    "height": 540
  },
  "bg-clothes6.png": {
    "width": 340,
    "height": 540
  },
  "bg-hair1.png": {
    "width": 124,
    "height": 120
  },
  "bg-hair2.png": {
    "width": 124,
    "height": 120
  },
  "bg-hair3.png": {
    "width": 124,
    "height": 120
  },
  "bg-hair4.png": {
    "width": 124,
    "height": 120
  },
  "bg-hair5.png": {
    "width": 124,
    "height": 120
  },
  "bg-hair6.png": {
    "width": 124,
    "height": 120
  },
  "bg1.png": {
    "width": 750,
    "height": 1334
  },
  "bg2.png": {
    "width": 750,
    "height": 1334
  },
  "bg3.png": {
    "width": 750,
    "height": 1334
  },
  "bg4.png": {
    "width": 750,
    "height": 1334
  },
  "bg5.png": {
    "width": 750,
    "height": 1334
  },
  "bg6.png": {
    "width": 750,
    "height": 1334
  },
  "bg7.png": {
    "width": 750,
    "height": 1334
  },
  "bg8.png": {
    "width": 750,
    "height": 1334
  },
  "bg9.png": {
    "width": 750,
    "height": 1334
  },
  "bm1.png": {
    "width": 300,
    "height": 650
  },
  "bm2.png": {
    "width": 300,
    "height": 650
  },
  "bm3.png": {
    "width": 300,
    "height": 650
  },
  "bmm1.png": {
    "width": 240,
    "height": 650
  },
  "bmm2.png": {
    "width": 240,
    "height": 650
  },
  "bmm3.png": {
    "width": 240,
    "height": 650
  },
  "bride-face.png": {
    "width": 134,
    "height": 164
  },
  "bridegroom-face.png": {
    "width": 130,
    "height": 164
  },
  "btn-del.png": {
    "width": 50,
    "height": 50
  },
  "btn-generate.png": {
    "width": 80,
    "height": 80
  },
  "btn-resize.png": {
    "width": 50,
    "height": 50
  },
  "cf1.png": {
    "width": 320,
    "height": 530
  },
  "cf2.png": {
    "width": 320,
    "height": 530
  },
  "cf3.png": {
    "width": 320,
    "height": 530
  },
  "cm1.png": {
    "width": 240,
    "height": 600
  },
  "cm2.png": {
    "width": 240,
    "height": 600
  },
  "cm3.png": {
    "width": 240,
    "height": 600
  },
  "dec1.png": {
    "width": 352,
    "height": 323
  },
  "dec2.png": {
    "width": 275,
    "height": 454
  },
  "dec3.png": {
    "width": 352,
    "height": 460
  },
  "dec4.png": {
    "width": 750,
    "height": 900
  },
  "dec5.png": {
    "width": 330,
    "height": 250
  },
  "dec6.png": {
    "width": 330,
    "height": 410
  },
  "dec7.png": {
    "width": 380,
    "height": 430
  },
  "dec8.png": {
    "width": 80,
    "height": 267
  },
  "dec9.png": {
    "width": 350,
    "height": 480
  },
  "dec10.png": {
    "width": 285,
    "height": 430
  },
  "dec11.png": {
    "width": 281,
    "height": 420
  },
  "dec12.png": {
    "width": 155,
    "height": 200
  },
  "fn-desc.png": {
    "width": 750,
    "height": 244
  },
  "nav-arrow.png": {
    "width": 60,
    "height": 60
  },
  "nav-dec.png": {
    "width": 60,
    "height": 60
  },
  "nav-human.png": {
    "width": 60,
    "height": 60
  },
  "nav-pet.png": {
    "width": 60,
    "height": 60
  },
  "nav-place.png": {
    "width": 60,
    "height": 60
  },
  "pet1.png": {
    "width": 197,
    "height": 300
  },
  "pet2.png": {
    "width": 200,
    "height": 255
  },
  "pet3.png": {
    "width": 300,
    "height": 240
  },
  "pet4.png": {
    "width": 300,
    "height": 320
  },
  "pet5.png": {
    "width": 229,
    "height": 300
  },
  "pet6.png": {
    "width": 270,
    "height": 240
  },
  "thumb-b-clothes1(1).png": {
    "width": 80,
    "height": 80
  },
  "thumb-b-clothes2.png": {
    "width": 80,
    "height": 80
  },
  "thumb-b-clothes3.png": {
    "width": 80,
    "height": 80
  },
  "thumb-b-clothes4.png": {
    "width": 80,
    "height": 80
  },
  "thumb-b-clothes5.png": {
    "width": 80,
    "height": 80
  },
  "thumb-b-clothes6.png": {
    "width": 80,
    "height": 80
  },
  "thumb-b-hair1.png": {
    "width": 80,
    "height": 80
  },
  "thumb-b-hair2.png": {
    "width": 80,
    "height": 80
  },
  "thumb-b-hair3.png": {
    "width": 80,
    "height": 80
  },
  "thumb-b-hair4.png": {
    "width": 80,
    "height": 80
  },
  "thumb-b-hair5.png": {
    "width": 80,
    "height": 80
  },
  "thumb-b-hair6.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bg-clothes1.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bg-clothes2.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bg-clothes3.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bg-clothes4.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bg-clothes5.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bg-clothes6.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bg-hair1.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bg-hair2.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bg-hair3.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bg-hair4.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bg-hair5.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bg-hair6.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bm1.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bm2.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bm3.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bmm1.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bmm2.png": {
    "width": 80,
    "height": 80
  },
  "thumb-bmm3.png": {
    "width": 80,
    "height": 80
  },
  "thumb-chf1.png": {
    "width": 80,
    "height": 80
  },
  "thumb-chf2.png": {
    "width": 80,
    "height": 80
  },
  "thumb-chf3.png": {
    "width": 80,
    "height": 80
  },
  "thumb-chm1.png": {
    "width": 80,
    "height": 80
  },
  "thumb-chm2.png": {
    "width": 80,
    "height": 80
  },
  "thumb-chm3.png": {
    "width": 80,
    "height": 80
  },
  "thumb-d1.png": {
    "width": 150,
    "height": 150
  },
  "thumb-d2.png": {
    "width": 150,
    "height": 150
  },
  "thumb-d3.png": {
    "width": 150,
    "height": 150
  },
  "thumb-d4.png": {
    "width": 150,
    "height": 150
  },
  "thumb-d5.png": {
    "width": 150,
    "height": 150
  },
  "thumb-d6.png": {
    "width": 150,
    "height": 150
  },
  "thumb-d7.png": {
    "width": 150,
    "height": 150
  },
  "thumb-d8.png": {
    "width": 150,
    "height": 150
  },
  "thumb-d9.png": {
    "width": 150,
    "height": 150
  },
  "thumb-d10.png": {
    "width": 150,
    "height": 150
  },
  "thumb-d11.png": {
    "width": 150,
    "height": 150
  },
  "thumb-d12.png": {
    "width": 150,
    "height": 150
  },
  "thumb-hm1.png": {
    "width": 150,
    "height": 150
  },
  "thumb-hm2.png": {
    "width": 150,
    "height": 150
  },
  "thumb-hm3.png": {
    "width": 150,
    "height": 150
  },
  "thumb-hm4.png": {
    "width": 150,
    "height": 150
  },
  "thumb-hm5.png": {
    "width": 151,
    "height": 151
  },
  "thumb-hm6.png": {
    "width": 150,
    "height": 150
  },
  "thumb-p1.png": {
    "width": 150,
    "height": 150
  },
  "thumb-p2.png": {
    "width": 150,
    "height": 150
  },
  "thumb-p3.png": {
    "width": 150,
    "height": 150
  },
  "thumb-p4.png": {
    "width": 150,
    "height": 150
  },
  "thumb-p5.png": {
    "width": 150,
    "height": 150
  },
  "thumb-p6.png": {
    "width": 150,
    "height": 150
  },
  "thumb-s1.png": {
    "width": 150,
    "height": 150,
  },
  "thumb-s2.png": {
    "width": 150,
    "height": 150
  },
  "thumb-s3.png": {
    "width": 150,
    "height": 150
  },
  "thumb-s4.png": {
    "width": 150,
    "height": 150
  },
  "thumb-s5.png": {
    "width": 150,
    "height": 150
  },
  "thumb-s6.png": {
    "width": 150,
    "height": 150
  },
  "thumb-s7.png": {
    "width": 150,
    "height": 150
  },
  "thumb-s8.png": {
    "width": 150,
    "height": 150
  },
  "thumb-s9.png": {
    "width": 150,
    "height": 150
  }
}
let resizeStartPosX = 0

export function touchEventHandler(s, evt) {
  let targetContainer = null
  let mat = mat2d.create()
  let dest = vec2.create()
  let src = vec2.create(evt.canvasPosition.x, evt.canvasPosition.y)

  if (evt.type === EInputEventType.TOUCHSTART) {
    if (s.name === 'root') {
      this._hittedSprite = null
      this.handleChoiceContainer()
    } else if (s.type === 'container') {
      this._hittedSprite = s
    } else if (s.name === 'delete') {
      this._app.rootContainer.removeSprite(s.owner.getParentSprite())
      this.changeItem('root')
      this._hittedSprite = null
    } else {
      targetContainer = s.owner.getParentSprite()
      mat = targetContainer.getLocalMatrix()
      Math2D.transform(mat, src, dest)
      targetContainer.deltaX = dest.x
      targetContainer.deltaY = dest.y
      this._hittedSprite = targetContainer
      this.handleChoiceContainer()
    }
  } else if (evt.type === EInputEventType.TOUCHEND) {
    if (this._hittedSprite.name === 'delete') {
      this._app.rootContainer.removeSprite(this._hittedSprite.owner.getParentSprite())
    }
  } else if (evt.type === EInputEventType.TOUCHMOVE) {
    if (this._hittedSprite) {
      if (s.name === 'container') {
        this._hittedSprite.x = evt.canvasPosition.x - this._hittedSprite.deltaX * this._hittedSprite.scaleX
        this._hittedSprite.y = evt.canvasPosition.y - this._hittedSprite.deltaY * this._hittedSprite.scaleY
      } else if (s.name === 'resize') {
        this.resizeTouchMove(evt)
      } else {
        this._hittedSprite.x = evt.canvasPosition.x - this._hittedSprite.deltaX * this._hittedSprite.scaleX
        this._hittedSprite.y = evt.canvasPosition.y - this._hittedSprite.deltaY * this._hittedSprite.scaleY
      }
    }
  }
}

export function handleChoiceContainer() {
  if (!this._app.rootContainer.children) return;
  this._app.rootContainer.children.forEach(item => {
    if (item.children.length == 5) {
      item.children[3].data.isVisible = false
      item.children[4].data.isVisible = false
    } else {
      item.children[1].data.isVisible = false
      item.children[2].data.isVisible = false
    }
    item.data.shape.selected = false
  })

  if (this._hittedSprite) {
    this._hittedSprite.shape.selected = true

    if (this._hittedSprite.owner.children.length === 5) {
      this._hittedSprite.owner.children[3].data.isVisible = true
      this._hittedSprite.owner.children[4].data.isVisible = true
    } else {
      this._hittedSprite.owner.children[1].data.isVisible = true
      this._hittedSprite.owner.children[2].data.isVisible = true
    }

    this.changeItem();
    return;
  }
  this.changeItem('root')
}

export function handleClearAllSelected() {
  this._hittedSprite = null
  if (!this._app.rootContainer) return;
  if (!this._app.rootContainer.children) return;

  this._app.rootContainer.children.forEach(item => {
    if (item.children.length == 5) {
      item.children[3].data.isVisible = false
      item.children[4].data.isVisible = false
    } else {
      item.children[1].data.isVisible = false
      item.children[2].data.isVisible = false
    }
    item.data.shape.selected = false
  })
}

export function resizeTouchMove(evt){
  let tempPosX = evt.canvasPosition.x

  let dur = tempPosX - resizeStartPosX
  resizeStartPosX = tempPosX

  if(dur > 0){
    //放大
    let scale1 = this._hittedSprite.scaleX + 0.05
    if(this._hittedSprite.scaleX <= 1.5){
      this._hittedSprite.scaleX = scale1
      this._hittedSprite.scaleY = scale1
    }
  }

  if(dur < 0){
    //缩小
    if(this._hittedSprite.scaleX >= 0.5){
      let scale2 = this._hittedSprite.scaleX - 0.05
      this._hittedSprite.scaleX = scale2
      this._hittedSprite.scaleY = scale2
    }
  }
}

export function createBoy() {
  // 清除选中
  this.handleClearAllSelected()

  let boy = SpriteFactory.createContainer(60, 60, 340 / 2, 680 / 2, 'boy')
  boy.touchEvent = this.touchEventHandler.bind(this)
  boy.shape.selected = true
  this._app.rootContainer.addSprite(boy)

  let body = SpriteFactory.createSprite2('common/images/img/bg-clothes1.png', 0, 148 / 2, 340 / 2, 540 / 2, 'body')
  boy.owner.addSprite(body)
  body.touchEvent = this.touchEventHandler.bind(this)

  let face = SpriteFactory.createSprite2('common/images/img/bridegroom-face.png', 135 / 2, 2, 130 / 2, 164 / 2, 'face')
  boy.owner.addSprite(face)
  face.touchEvent = this.touchEventHandler.bind(this)

  let hair = SpriteFactory.createSprite2('common/images/img/bg-hair1.png', 137 / 2, 0, 124 / 2, 120 / 2, 'hair')
  boy.owner.addSprite(hair)
  hair.touchEvent = this.touchEventHandler.bind(this)

  let btnResize = SpriteFactory.createSprite2('common/images/btn-resize.png', boy.width - 25, -25, 50, 50, 'resize')
  btnResize.isVisible = true
  boy.owner.addSprite(btnResize)
  btnResize.touchEvent = this.touchEventHandler.bind(this)

  let btnDelete = SpriteFactory.createSprite2('common/images/btn-del.png', -25, -25, 50, 50, 'delete')
  btnDelete.isVisible = true
  boy.owner.addSprite(btnDelete)
  btnDelete.touchEvent = this.touchEventHandler.bind(this)

  this._hittedSprite = boy
}

export function createGirl() {
  // 清除选中
  this.handleClearAllSelected()

  let girl = SpriteFactory.createContainer(100, 100, 460 / 2, 806 / 2, 'girl')
  girl.touchEvent = this.touchEventHandler.bind(this)
  girl.shape.selected = true
  this._app.rootContainer.addSprite(girl)

  let body = SpriteFactory.createSprite2('common/images/img/b-clothes1.png', 0, 200 / 2, 460 / 2, 600 / 2, 'body')
  girl.owner.addSprite(body)
  body.touchEvent = this.touchEventHandler.bind(this)

  let face = SpriteFactory.createSprite2('common/images/img/bride-face.png', 140 / 2, 60 / 2, 134 / 2, 164 / 2, 'face')
  girl.owner.addSprite(face)
  face.touchEvent = this.touchEventHandler.bind(this)

  let hair = SpriteFactory.createSprite2('common/images/img/b-hair1.png', 60 / 2, 0, 300 / 2, 372 / 2, 'hair')
  girl.owner.addSprite(hair)
  hair.touchEvent = this.touchEventHandler.bind(this)

  let btnResize = SpriteFactory.createSprite2('common/images/btn-resize.png', girl.width - 25, -25, 50, 50, 'resize')
  btnResize.isVisible = true
  girl.owner.addSprite(btnResize)
  btnResize.touchEvent = this.touchEventHandler.bind(this)

  let btnDelete = SpriteFactory.createSprite2('common/images/btn-del.png', -25, -25, 50, 50, 'delete')
  btnDelete.isVisible = true
  girl.owner.addSprite(btnDelete)
  btnDelete.touchEvent = this.touchEventHandler.bind(this)

  this._hittedSprite = girl
}

export function makeContainerName(name) {
  let res_name = 'container'
  Object.keys(this.submenu).forEach(group => {
    this.submenu[group].forEach(item => {
      if (item.name.includes(name)) res_name = group
    })
  })
  return res_name
}

export function createElement(name, options) {
  // 清除选中
  this.handleClearAllSelected()
  let newName = this.makeContainerName(name)
  let newWidth = options.width
  let newHeight = options.height
  if (newName !== 'container') {
    newWidth = newWidth / 2
    newHeight = newHeight / 2
  }

  let element = SpriteFactory.createContainer(60, 60, newWidth, newHeight, newName)
  element.touchEvent = this.touchEventHandler.bind(this)
  this._app.rootContainer.addSprite(element)

  let body = SpriteFactory.createSprite2(`common/images/img/${name}`, 0, 0, newWidth, newHeight, 'body')
  element.owner.addSprite(body)
  body.touchEvent = this.touchEventHandler.bind(this)

  let btnResize = SpriteFactory.createSprite2('common/images/btn-resize.png', newWidth - 25, -25, 50, 50, 'resize')
  btnResize.isVisible = true
  element.owner.addSprite(btnResize)
  btnResize.touchEvent = this.touchEventHandler.bind(this)

  let btnDelete = SpriteFactory.createSprite2('common/images/btn-del.png', -25, -25, 50, 50, 'delete')
  btnDelete.isVisible = true
  element.owner.addSprite(btnDelete)
  btnDelete.touchEvent = this.touchEventHandler.bind(this)

  element.shape.selected = true
  this._hittedSprite = element
}

export function changeItem(name) {
//  console.info(this._hittedSprite.name)
  if (name === 'root') {
    this.submenuIndex = 0
  } else if (name === 'thumb-hm1.png' || (this._hittedSprite && this._hittedSprite.name === 'boy')) {
    this.submenuIndex = 0 + 1 // list组件默认为空，所以idx:0用来标识默认情况
  } else if (name === 'thumb-hm2.png' || (this._hittedSprite && this._hittedSprite.name === 'girl')) {
    this.submenuIndex = 3 + 1
  } else if (name === 'thumb-hm4.png' || (this._hittedSprite && this._hittedSprite.name === 'boy2')) {
    this.submenuIndex = 1 + 1 // 伴郎
  } else if (name === 'thumb-hm5.png' || (this._hittedSprite && this._hittedSprite.name === 'girl2')) {
    this.submenuIndex = 4 + 1 // 伴娘
  } else if (name === 'thumb-hm3.png' || (this._hittedSprite && this._hittedSprite.name === 'boy3')) {
    this.submenuIndex = 2 + 1 // 男童
  } else if (name === 'thumb-hm6.png' || (this._hittedSprite && this._hittedSprite.name === 'girl3')) {
    this.submenuIndex = 5 + 1 // 女童
  }
}

export function createItem(name) {
  if (name === 'thumb-hm1.png') {
    this.createBoy()
  } else if (name === 'thumb-hm2.png') {
    this.createGirl()
  } else if (name === 'thumb-hm4.png') {
    // 伴郎
    this.changeItem('thumb-hm4.png')
    let group = this.submenu['boy2']
    this.createElement(group[0].oname, group[0])
  } else if (name === 'thumb-hm5.png') {
    // 伴娘
    this.changeItem('thumb-hm5.png')
    let group = this.submenu['girl2']
    this.createElement(group[0].oname, group[0])
  } else if (name === 'thumb-hm3.png') {
    // 男童
    this.changeItem('thumb-hm3.png')
    let group = this.submenu['boy3']
    this.createElement(group[0].oname, group[0])
  } else if (name === 'thumb-hm6.png') {
    // 女童
    this.changeItem('thumb-hm6.png')
    let group = this.submenu['girl3']
    this.createElement(group[0].oname, group[0])
  } else {
    this.createElement(name, SPRITE_MAP[name])
  }
  this.changeItem(name)
}

export function handleTriggerTabVisbile(e) {
  this.handleClearAllSelected()
  if (this.sheetVisible) {
    this.animationHideSheet.play()
  } else {
//      this.animationShowSheet.play()
  }
  this.sheetVisible = !this.sheetVisible
}

export function handleTriggerTabHide(e) {
  if (this.sheetVisible) {
    this.handleClearAllSelected()
    this.animationHideSheet.play()
    this.sheetVisible = false
  }
}

export function handleChangeBg(bgName) {
  this._app.rootContainer.data.shape = new ShapeImage(
    `common/images/img/${bgName.slice(6)}`,
    this._app.canvas.getBoundingClientRect().width,
    this._app.canvas.getBoundingClientRect().height
  )
}

export function handleChangeItem(name, group_name) {
  if (this._hittedSprite) {
    if (group_name === 'boy' || group_name === 'girl') {
      let group = this.submenu[group_name]
      let sprite = group.find(item => item.name === name)
      let origin_name = name.slice(6)
      this._hittedSprite.owner.children[sprite.posIdx].data.shape = new ShapeImage(`common/images/img/${origin_name}`, sprite.width / 2, sprite.height / 2)
    } else if (['boy2','boy3','girl2','girl3'].includes(group_name) ){
      let group = this.submenu[group_name]
      let sprite = group.find(item => item.name === name)
      let origin_name = name.slice(6)
      this._hittedSprite.owner.children[0].data.shape = new ShapeImage(`common/images/img/${origin_name}`, sprite.width / 2, sprite.height / 2)
    }
  } else {
    let group = this.submenu[group_name]
    let sprite = group.find(item => item.name === name)
    let origin_name = name.slice(6)
    this.createElement(origin_name, sprite)
  }
}
