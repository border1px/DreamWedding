export default class EndClipShape {
    hitTest(localPt, transform) {
        return false;
    }
    beginDraw(transformable, state, context) { }
    draw(transformable, state, context) { }
    endDraw(transformable, state, context) {
        context.restore();
    }
    get type() {
        return 'EndCLipShape';
    }
}
