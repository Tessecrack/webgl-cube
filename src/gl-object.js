export class GLObject {
    constructor(program, buffer, uniformMatrixLocation, uniformFudgeFactor,
        attribVertexLocation, attribColorLocation, countVertices, 
        isAnimate, isPlane) {
        this.program = program;
        this.buffer = buffer;
        this.uniformMatrixLocation = uniformMatrixLocation;
        this.uniformFudgeFactor = uniformFudgeFactor;
        this.attribVertexLocation = attribVertexLocation;
        this.attribColorLocation = attribColorLocation;
        this.countVertices = countVertices;

        this.isAnimate = isAnimate;
        this.rotationValueX = 0;
        this.isPlane = isPlane;
    }
}