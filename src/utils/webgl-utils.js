export function getVertexShaderSrc() {
    const src = `
precision mediump float;
attribute vec4 a_vertex;
attribute vec4 a_color;

uniform mat4 u_matrix;

varying vec4 v_color;

void main() {
    gl_Position = u_matrix * a_vertex;
    v_color = a_color;
}`
    return src;
}

export function getFragmentShaderSrc() {
    const src = `
precision mediump float;
varying vec4 v_color;
void main() {
    gl_FragColor = v_color;
}`
    return src;
}