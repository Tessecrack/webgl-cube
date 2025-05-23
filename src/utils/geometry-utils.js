export function getRectangleVerticesColors(x, y, width, height) {
    const x1 = x;
    const y1 = y;

    const x2 = x + width;
    const y2 = y + height;

    return [
        x1, y1, 0,  1, 0, 0, 1,
        x1, y2, 0,  0, 1, 0, 1,
        x2, y1, 0,  0, 0, 1, 1,

        x2, y1, 0,  0, 1, 1, 1,
        x2, y2, 0,  1, 0, 1, 1,
        x1, y2, 0,  1, 1, 0, 1
    ]
}

export function getCubeArray(width, height, depth) {
    const x1 = 0;
    const y1 = 0;
    const z1 = 0;

    const x2 = x1 + width;
    const y2 = y1 + height;
    const z2 = z1 + depth;

    const verticesColors = [
        // front
        x1, y2, z1, 1, 0, 0, 1,
        x2, y1, z1, 1, 0, 0, 1,
        x1, y1, z1, 1, 0, 0, 1,

        x2, y1, z1, 1, 0, 0, 1,
        x1, y2, z1, 1, 0, 0, 1,
        x2, y2, z1, 1, 0, 0, 1,

        // down
        x2, y2, z1, 0, 1, 0, 1,
        x1, y2, z1, 0, 1, 0, 1,
        x2, y2, z2, 0, 1, 0, 1,

        x2, y2, z2, 0, 1, 0, 1,
        x1, y2, z1, 0, 1, 0, 1,
        x1, y2, z2, 0, 1, 0, 1,

        // back
        x1, y2, z2, 0, 0, 1, 1,
        x1, y1, z2, 0, 0, 1, 1,
        x2, y2, z2, 0, 0, 1, 1,

        x2, y2, z2, 0, 0, 1, 1,
        x1, y1, z2, 0, 0, 1, 1,
        x2, y1, z2, 0, 0, 1, 1,

        // up
        x2, y1, z2, 1, 0, 1, 1,
        x1, y1, z2, 1, 0, 1, 1,
        x2, y1, z1, 1, 0, 1, 1,

        x2, y1, z1, 1, 0, 1, 1,
        x1, y1, z2, 1, 0, 1, 1,
        x1, y1, z1, 1, 0, 1, 1,

        // left
        x1, y1, z1, 1, 1, 0, 1,
        x1, y1, z2, 1, 1, 0, 1,
        x1, y2, z1, 1, 1, 0, 1,

        x1, y2, z1, 1, 1, 0, 1,
        x1, y1, z2, 1, 1, 0, 1,
        x1, y2, z2, 1, 1, 0, 1,

        // right
        x2, y1, z1, 0, 1, 1, 1,
        x2, y2, z1, 0, 1, 1, 1,
        x2, y2, z2, 0, 1, 1, 1,

        x2, y2, z2, 0, 1, 1, 1,
        x2, y1, z2, 0, 1, 1, 1,
        x2, y1, z1, 0, 1, 1, 1
    ];

    return verticesColors;
}