export class GLContext {
    constructor(glContext) {
        this._glContext = glContext;
    }

    getCanvasWidth() {
        return this._glContext.canvas.width;
    }

    getCanvasHeight() {
        return this._glContext.canvas.height;
    }

    setUniformValueMatrix4f(uniformLocation, matrix4f) {
        this._glContext.uniformMatrix4fv(uniformLocation, false, matrix4f);
    }

    setUniformValue1f(uniformLocation, value) {
        this._glContext.uniform1f(uniformLocation, value);
    }

    createVertexShader(src) {
        return this._createShader(this._glContext.VERTEX_SHADER, src);
    }

    createFragmentShader(src) {
        return this._createShader(this._glContext.FRAGMENT_SHADER, src);
    }

    createProgram(vertexShader, fragmentShader) {
        const program = this._glContext.createProgram();

        this._glContext.attachShader(program, vertexShader);
        this._glContext.attachShader(program, fragmentShader);

        this._glContext.linkProgram(program);

        const success = this._glContext.getProgramParameter(program, this._glContext.LINK_STATUS);
        if (success) {
            return program;
        }

        const infoLog = this._glContext.getProgramInfoLog(program);
        this._glContext.deleteProgram(program);
        throw new Error(infoLog);
    }

    createBuffer() {
        return this._glContext.createBuffer();
    }

    bindArrayBuffer(buffer) {
        this._glContext.bindBuffer(this._glContext.ARRAY_BUFFER, buffer);
    }

    arrayBufferData(float32Array) {
        this._glContext.bufferData(this._glContext.ARRAY_BUFFER, float32Array, this._glContext.STATIC_DRAW);
    }

    enableCullFace() {
        this._glContext.enable(this._glContext.CULL_FACE);
    }

    enableDepthTest() {
        this._glContext.enable(this._glContext.DEPTH_TEST);
    }

    resize() {
        const displayWidth  = this._glContext.canvas.clientWidth;
        const displayHeight = this._glContext.canvas.clientHeight;

        if (this._glContext.canvas.width  !== displayWidth ||
            this._glContext.canvas.height !== displayHeight) {

            this._glContext.canvas.width  = displayWidth;
            this._glContext.canvas.height = displayHeight;
        }
    }

    clearViewport() {
        this._glContext.viewport(0, 0, this._glContext.canvas.width, this._glContext.canvas.height);
        this._glContext.clearColor(0, 0, 0, 0);
        this._glContext.clear(this._glContext.COLOR_BUFFER_BIT | this._glContext.DEPTH_BUFFER_BIT);
    }

    getUniformLocation(program, name) {
        return this._glContext.getUniformLocation(program, name);
    }

    getAttribLocation(program, name) {
        return this._glContext.getAttribLocation(program, name);
    }

    useProgram(program) {
        this._glContext.useProgram(program);
    }

    enableVertexAttribArray(attribLocation) {
        this._glContext.enableVertexAttribArray(attribLocation);
    }

    vertexAttribPointer(attribLocation, size, normalized, stride, offset) {
        this._glContext.vertexAttribPointer(attribLocation, size, this._glContext.FLOAT, normalized, stride, offset);
    }

    drawArrays(first, count) {
        this._glContext.drawArrays(this._glContext.TRIANGLES, first, count)
    }

    _createShader(type, src) {
        const shader = this._glContext.createShader(type);
        this._glContext.shaderSource(shader, src);
        this._glContext.compileShader(shader);

        const success = this._glContext.getShaderParameter(shader, this._glContext.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        const infoLog = this._glContext.getShaderInfoLog(shader);
        this._glContext.deleteShader(shader);
        throw new Error(infoLog);
    }
}