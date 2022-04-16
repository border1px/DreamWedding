import { ERenderType } from '../interface/interface';
import Rect from '../core/shapes/Rect';
import Circle from '../core/shapes/Circle';
import Grid from '../core/shapes/Grid';
import Ellipse from '../core/shapes/Ellipse';
import Line from '../core/shapes/Line';
import ConvexPolygon from '../core/shapes/ConvexPolygon';
import Scale9Grid from '../core/shapes/Scale9Grid';
import Bone from '../core/shapes/Bone';
import BezierPath from '../core/shapes/BezierPath';
import EndClipShape from '../core/shapes/EndClipShape';
import Container from '../core/shapes/Container';
import ShapeImage from '../core/shapes/Image';
import { Sprite } from '../core/Sprite';
export class ShapeFactory {
    static createGrid(w, h, xStep = 10, yStep = 10) {
        return new Grid(w, h, xStep, yStep);
    }
    static createCircle(radius) {
        return new Circle(radius);
    }
    static createRect(w, h, u = 0, v = 0) {
        return new Rect(w, h, u, v);
    }
    static createEllipse(radiusX, radiusY) {
        return new Ellipse(radiusX, radiusY);
    }
    static createPolygon(points) {
        if (points.length < 3) {
            throw new Error('多边形顶点数量必须大于或等于3!!!');
        }
        return new ConvexPolygon(points);
    }
    static createScale9Grid(data, width, height, u = 0, v = 0) {
        return new Scale9Grid(data, width, height, u, v);
    }
    static createLine(start, end) {
        let line = new Line();
        line.start = start;
        line.end = end;
        return line;
    }
    static createXLine(len = 10, t = 0) {
        return new Line(len, t);
    }
    static createBone(len = 10, t = 0) {
        return new Bone(len, t);
    }
    static createBezierPath(points, isCubic = false) {
        return new BezierPath(points, isCubic);
    }
}
export class SpriteFactory {
    static createClipSprite() {
        let spr = new Sprite(SpriteFactory.endCLipShape, name);
        spr.renderType = ERenderType.CLIP;
        return spr;
    }
    static createMiniSprite(shape, name = ' ') {
        let spr = new Sprite(shape, name);
        return spr;
    }
    static createSprite(shape, x = 0, y = 0, rotation = 0, scaleX = 1.0, scaleY = 1.0, name = ' ') {
        let spr = new Sprite(shape, name);
        spr.x = x;
        spr.y = y;
        spr.rotation = rotation;
        spr.scaleX = scaleX;
        spr.scaleY = scaleY;
        return spr;
    }
    static createContainer(x = 0, y = 0, width, height, name) {
        let spr = new Sprite(new Container(width, height), name ? name : 'container');
        spr.x = x;
        spr.y = y;
        spr.width = width;
        spr.height = width;
        return spr;
    }
    static createSprite2(img, x = 0, y = 0, width, height, name) {
        let spr = new Sprite(new ShapeImage(img, width, height), name ? name : 'sprite');
        spr.x = x;
        spr.y = y;
        spr.width = width;
        spr.height = width;
        return spr;
    }
}
SpriteFactory.endCLipShape = new EndClipShape();
