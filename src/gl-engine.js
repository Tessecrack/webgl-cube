import { GLObject } from "./gl-object.js";
import {getFragmentShaderSrc, getVertexShaderSrc} from "./utils/webgl-utils.js";
import { m4 } from "./utils/math-utils.js";


export class GLEngine {
    constructor(GLContext, UserInput) {
        this._glContext = GLContext;
        this._userInput = UserInput;
        this._previousTimeRender = 0;
        this._objects = [];
    }

    render(tick) {
        this._glContext.resize();
        this._glContext.clearViewport();
        this._glContext.enableCullFace();
        this._glContext.enableDepthTest();
        
        const nowTime = tick * 0.001;
        const deltaTime = nowTime - this._previousTimeRender;
        this._previousTimeRender = nowTime;
        const aspect = this._glContext.getCanvasWidth() / this._glContext.getCanvasHeight();
        const zNear = 1;
        const zFar = 2000;
        const fieldOfViewRadians = this._userInput.fieldOfView * Math.PI / 180;

        let projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
        
        const cameraAngleXRadians = this._userInput.cameraAngleX * Math.PI / 180;
        const cameraAngleYRadians = this._userInput.cameraAngleY * Math.PI / 180;

        const radius = 200;

        const pointCameraView = [this._userInput.translationX, this._userInput.translationY, 0];
        
        let cameraMatrix = m4.yRotation(cameraAngleYRadians);
        cameraMatrix = m4.rotateX(cameraMatrix, cameraAngleXRadians);
        cameraMatrix = m4.translate(cameraMatrix, 0, 0, radius * 1.5);
        
        const cameraPosition = [
            cameraMatrix[12], cameraMatrix[13], cameraMatrix[14]
        ];
        const up = [0, 1, 0];

        cameraMatrix = m4.lookAt(cameraPosition, pointCameraView, up);
        const viewMatrix = m4.inverse(cameraMatrix);
        projectionMatrix = m4.multiply(viewMatrix, projectionMatrix);
        const rotationSpeed = 1.2;
        for (let i = 0; i < this._objects.length; ++i) {
            const object = this._objects[i];
            const attribVertexLocation = object.attribVertexLocation;
            const attribColorLocation = object.attribColorLocation;
            const uniformMatrixLocation = object.uniformMatrixLocation;
            const uniformFudgeFactorLocation = object.uniformFudgeFactor;

            const countVertices = object.countVertices;
            const program = object.program;
            const buffer = object.buffer;
            
            const angle = i * Math.PI * 2 / this._objects.length;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            let angleRadiansX = this._userInput.rotationX * Math.PI / 180;
            let angleRadiansY = this._userInput.rotationY * Math.PI / 180;
            let angleRadiansZ = this._userInput.rotationZ * Math.PI / 180;

            let translationX = this._userInput.translationX + x;
            let translationY = this._userInput.translationY;
            let translationZ = this._userInput.translationZ + z;

            if (object.isAnimate) {
                object.rotationValueX += rotationSpeed * deltaTime;
                angleRadiansX = object.rotationValueX;
            }

            if (object.isPlane) {
                angleRadiansX = -Math.PI / 2;
                angleRadiansY = 0;
                angleRadiansZ = 0;

                translationY = -100;
            }

            let objectProjectionMatrix = m4.translate(projectionMatrix,
                translationX,
                translationY,
                translationZ);

            objectProjectionMatrix = m4.rotateX(objectProjectionMatrix, angleRadiansX);
            objectProjectionMatrix = m4.rotateY(objectProjectionMatrix, angleRadiansY);
            objectProjectionMatrix = m4.rotateZ(objectProjectionMatrix, angleRadiansZ);

            objectProjectionMatrix = m4.scale(objectProjectionMatrix,
                this._userInput.scalingX,
                this._userInput.scalingY,
                this._userInput.scalingZ);

            this._glContext.useProgram(program);

            this._glContext.enableVertexAttribArray(attribVertexLocation);
            this._glContext.enableVertexAttribArray(attribColorLocation);

            this._glContext.bindArrayBuffer(buffer);

            this._glContext.setUniformValue1f(uniformFudgeFactorLocation, this._userInput.fudgeFactor);

            this._glContext.vertexAttribPointer(attribVertexLocation, 3,  false, 7 * 4, 0);
            this._glContext.vertexAttribPointer(attribColorLocation, 4, false, 7 * 4, 3 * 4);

            this._glContext.setUniformValueMatrix4f(uniformMatrixLocation, objectProjectionMatrix);

            this._glContext.drawArrays(0, countVertices);
        }

        requestAnimationFrame(this.render.bind(this));
    }

    createObject(arrayVerticesColors, countVertices) {
        this._createAndAddObject(arrayVerticesColors, countVertices, false, false);
    }

    createAnimatedObject(arrayVerticesColors, countVertices) {
        this._createAndAddObject(arrayVerticesColors, countVertices, true, false);
    }

    createPlaneObject(arrayVerticesColors, countVertices) {
        this._createAndAddObject(arrayVerticesColors, countVertices, false, true);
    }

    _createAndAddObject(arrayVerticesColors, countVertices, isAnimate, isPlane) {
        const vertexShaderSrc = getVertexShaderSrc();
        const fragmentShaderSrc = getFragmentShaderSrc();

        const vertexShader = this._glContext.createVertexShader(vertexShaderSrc);
        const fragmentShader = this._glContext.createFragmentShader(fragmentShaderSrc);

        const program = this._glContext.createProgram(vertexShader, fragmentShader);
        const buffer = this._glContext.createBuffer();

        this._glContext.bindArrayBuffer(buffer);
        this._glContext.arrayBufferData(new Float32Array(arrayVerticesColors));

        const vertexPositionAttribLocation = this._glContext.getAttribLocation(program, "a_vertex");
        const colorAttribLocation = this._glContext.getAttribLocation(program, "a_color");
        const matrixUniformLocation = this._glContext.getUniformLocation(program, "u_matrix");
        const fudgeFactorUniformLocation = this._glContext.getUniformLocation(program, "u_fudgeFactor");

        const glObject = new GLObject(program, buffer, matrixUniformLocation, fudgeFactorUniformLocation,
            vertexPositionAttribLocation, colorAttribLocation, countVertices, isAnimate, isPlane);

        this._objects.push(glObject);
    }
}