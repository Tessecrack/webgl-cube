export class GLObject {
    constructor(program, buffer, uniformMatrixLocation,
        attribVertexLocation, attribColorLocation, countVertices) {
        this.program = program;
        this.buffer = buffer;
        this.uniformMatrixLocation = uniformMatrixLocation;
        this.attribVertexLocation = attribVertexLocation;
        this.attribColorLocation = attribColorLocation;
        this.countVertices = countVertices;
    }
}