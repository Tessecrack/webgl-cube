import { GLContext } from "./gl-context.js";
import { GLEngine } from "./gl-engine.js";
import {getCubeArray, getRectangleVerticesColors} from "./utils/geometry-utils.js";
import {UserInput} from "./user-input.js";

function main() {
    const canvas = document.getElementById("main-canvas");
    if (!canvas) {
        throw new Error("There is no canvas");
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const webGlContext = canvas.getContext("webgl");
    if (!webGlContext) {
        throw new Error("There is no WebGL");
    }
    const glContext = new GLContext(webGlContext);
    const userInput = new UserInput();
    const glEngine = new GLEngine(glContext, userInput);

    const sliderTranslationX = document.getElementById("input-range-x");
    const sliderTranslationY = document.getElementById("input-range-y");
    const sliderTranslationZ = document.getElementById("input-range-z");

    const spanTransX = document.getElementById("input-range-value-x");
    const spanTransY = document.getElementById("input-range-value-y");
    const spanTransZ = document.getElementById("input-range-value-z");

    const sliderRotationX = document.getElementById("input-range-rotation-x");
    const sliderRotationY = document.getElementById("input-range-rotation-y");
    const sliderRotationZ = document.getElementById("input-range-rotation-z");

    const spanRotX = document.getElementById("input-range-rotation-value-x");
    const spanRotY = document.getElementById("input-range-rotation-value-y");
    const spanRotZ = document.getElementById("input-range-rotation-value-z");

    const sliderScalingX = document.getElementById("input-range-scaling-x");
    const sliderScalingY = document.getElementById("input-range-scaling-y");
    const sliderScalingZ = document.getElementById("input-range-scaling-z");

    const sliderFieldOfView = document.getElementById("input-range-field-of-view");
    const spanFieldOfView = document.getElementById("input-range-field-of-view-value");

    sliderScalingX.value = 1;
    sliderScalingY.value = 1;
    sliderScalingZ.value = 1;

    const spanScaleX = document.getElementById("input-range-scaling-value-x");
    const spanScaleY = document.getElementById("input-range-scaling-value-y");
    const spanScaleZ = document.getElementById("input-range-scaling-value-z");

    spanScaleX.textContent = "1";
    spanScaleY.textContent = "1";
    spanScaleZ.textContent = "1";

    const sliderCameraAngle = document.getElementById("input-range-camera-angle");
    const spanCameraAngle = document.getElementById("input-range-camera-angle-value");

    spanCameraAngle.textContent = 0
/*
    sliderTranslationX.min = 0;
    sliderTranslationX.max = webGlContext.canvas.width;

    sliderTranslationY.min = 0;
    sliderTranslationY.max = webGlContext.canvas.height;
*/

    sliderTranslationX.addEventListener("input", (e) => {
        const number = Number(e.target.value);
        spanTransX.textContent = e.target.value;
        userInput.translationX = number;
        glEngine.render();
    });
    sliderTranslationY.addEventListener("input", (e) => {
        const number = Number(e.target.value);
        spanTransY.textContent = e.target.value;
        userInput.translationY = number;
        glEngine.render();
    });
    sliderTranslationZ.addEventListener("input", (e) => {
        const number = Number(e.target.value);
        spanTransZ.textContent = e.target.value;
        userInput.translationZ = number;
        glEngine.render();
    });

    sliderRotationX.addEventListener("input", (e) => {
        const number = Number(e.target.value);
        spanRotX.textContent = e.target.value;
        userInput.rotationX = number;
        glEngine.render();
    });
    sliderRotationY.addEventListener("input", (e) => {
        const number = Number(e.target.value);
        spanRotY.textContent = e.target.value;
        userInput.rotationY = number;
        glEngine.render();
    });
    sliderRotationZ.addEventListener("input", (e) => {
        const number = Number(e.target.value);
        spanRotZ.textContent = e.target.value;
        userInput.rotationZ = number;
        glEngine.render();
    });

    sliderScalingX.addEventListener("input", (e) => {
        const number = Number(e.target.value);
        spanScaleX.textContent = e.target.value;
        userInput.scalingX = number;
        glEngine.render();
    });
    sliderScalingY.addEventListener("input", (e) => {
        const number = Number(e.target.value);
        spanScaleY.textContent = e.target.value;
        userInput.scalingY = number;
        glEngine.render();
    });
    sliderScalingZ.addEventListener("input", (e) => {
        const number = Number(e.target.value);
        spanScaleZ.textContent = e.target.value;
        userInput.scalingZ = number;
        glEngine.render();
    });

    sliderFieldOfView.addEventListener("input", (e) => {
        const number = Number(e.target.value);
        spanFieldOfView.textContent = e.target.value;
        userInput.fieldOfView = number;
        glEngine.render();
    });

    sliderCameraAngle.addEventListener("input", (e) => {
        const number = Number(e.target.value);
        spanCameraAngle.textContent = e.target.value;
        userInput.cameraAngle = number;
        glEngine.render();
    });

    for (let i = 0; i < 5; ++i) {
        const verticesColors = getCubeArray(100, 100, 100);
        glEngine.createObject(verticesColors, 36);
    }

    userInput.cameraAngle = 0;
    
    userInput.fieldOfView = 60;

    userInput.translationX = -100;
    userInput.translationY = -100;
    userInput.translationZ = -430;

    userInput.rotationX = 0;
    userInput.rotationY = 0;
    userInput.rotationZ = 0;



    glEngine.render();
}

try {
    main();
} catch (e) {
    console.error(e);
}