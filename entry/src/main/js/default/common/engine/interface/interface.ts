import { mat2d, vec2, Inset } from '../utils/math2d'
import { CanvasMouseEvent, CanvasKeyBoardEvent, CanvasTouchEvent } from '../core/BaseApplication'

export enum ERenderType {
  CUSTOM,
  STROKE,
  FILL,
  STROKE_FILL,
  CLIP,
}

export interface ITransformable {
  x: number
  y: number
  rotation: number
  scaleX: number
  scaleY: number
  getWorldMatrix(): mat2d
  getLocalMatrix(): mat2d
}

export interface IRenderState {
  isVisible: boolean
  showCoordSystem: boolean
  lineWidth: number
  fillStyle: string | CanvasGradient | CanvasPattern
  strokeStyle: string | CanvasGradient | CanvasPattern
  renderType: ERenderType
}

export interface IHittable {
  hitTest(localPt: vec2, transform: ITransformable): boolean
}

export interface IDrawable {
  beginDraw(
    transformable: ITransformable,
    state: IRenderState,
    context: CanvasRenderingContext2D
  ): void
  draw(transformable: ITransformable, state: IRenderState, context: CanvasRenderingContext2D): void
  endDraw(
    transformable: ITransformable,
    state: IRenderState,
    context: CanvasRenderingContext2D
  ): void
}

export interface IShape extends IHittable, IDrawable {
  readonly type: string
  data: any
}

export interface ISpriteContainer {
  name: string
  addSprite(sprite: ISprite): ISpriteContainer
  removeSprite(sprite: ISprite): boolean
  removeAll(includeThis: boolean): void
  getSpriteIndex(sprite: ISprite): number
  getSprite(idx: number): ISprite
  getSpriteCount(): number
  getParentSprite(): ISprite | undefined
  readonly sprite: ISprite | undefined
}

export enum EOrder {
  PREORDER,
  POSTORDER,
}

export type UpdateEventHandler = (
  spr: ISprite,
  mesc: number,
  diffSec: number,
  travelOrder: EOrder
) => void
export type MouseEventHandler = (spr: ISprite, evt: CanvasMouseEvent) => void
export type KeyboardEventHandler = (spr: ISprite, evt: CanvasKeyBoardEvent) => void
export type TouchEventHandler = (spr: ISprite, evt: CanvasTouchEvent) => void
export type RenderEventHandler = (
  spr: ISprite,
  context: CanvasRenderingContext2D,
  renderOreder: EOrder
) => void

export interface ISprite extends ITransformable, IRenderState {
  name: string
  shape: IShape
  owner: ISpriteContainer
  data: any,
  width: number,
  height: number,
  deltaX: number,
  deltaY: number

  hitTest(localPt: vec2): boolean
  update(mesc: number, diff: number, order: EOrder): void
  draw(context: CanvasRenderingContext2D): void

  mouseEvent: MouseEventHandler | null
  keyEvent: KeyboardEventHandler | null
  updateEvent: UpdateEventHandler | null
  renderEvent: RenderEventHandler | null
  touchEvent: TouchEventHandler | null
}

export interface IDispatcher {
  readonly container: ISpriteContainer
  dispatchUpdate(msec: number, diffSec: number): void
  dispatchDraw(context: CanvasRenderingContext2D): void
  dispatchMouseEvent(evt: CanvasMouseEvent): void
  dispatchKeyEvent(evt: CanvasKeyBoardEvent): void
  dispatchTouchEvent(evt: CanvasTouchEvent): void
}

export enum EImageFillType {
  NONE,
  STRETCH,
  REPEAT,
  REPEAT_X,
  REPEAT_Y,
}
