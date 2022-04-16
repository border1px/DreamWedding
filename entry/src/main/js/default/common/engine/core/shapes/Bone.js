import Line from './Line';
export default class Bone extends Line {
    get type() {
        return 'Bone';
    }
    draw(transformable, state, context) {
        super.draw(transformable, state, context);
        let mat = transformable.getWorldMatrix();
        context.save();
        context.setTransform(1, 0, 0, 1, mat.values[4], mat.values[5]);
        context.beginPath();
        context.fillStyle = 'blue';
        context.arc(this.start.x, this.start.y, 5, 0, Math.PI * 2);
        context.fill();
        context.restore();
    }
}
