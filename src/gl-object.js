export class GLObject {
    constructor(program, buffer, uniformMatrixLocation, uniformFudgeFactor,
        attribVertexLocation, attribColorLocation, countVertices) {
        this.program = program;
        this.buffer = buffer;
        this.uniformMatrixLocation = uniformMatrixLocation;
        this.uniformFudgeFactor = uniformFudgeFactor;
        this.attribVertexLocation = attribVertexLocation;
        this.attribColorLocation = attribColorLocation;
        this.countVertices = countVertices;
    }
}