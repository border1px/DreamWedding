export default class Sprite {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  print() {
    console.info(this.x, this.y, this.width, this.height)
  }
}