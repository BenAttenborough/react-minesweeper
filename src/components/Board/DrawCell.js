function strokedCell(type, ctx, width, offSetX, offSetY, strokeColours) {
    switch (type) {
        case "SQUARE":
            drawStrokedSquare(width, ctx, strokeColours, offSetX, offSetY);
            break;
        case "HEX":
            drawStrokedHex(width, ctx, strokeColours, offSetX, offSetY);
            break;
        default:
            drawStrokedSquare(width, ctx, strokeColours, offSetX, offSetY);
    }
}

function drawStrokedSquare(width, ctx, strokeColours, offSetX, offSetY) {
    const effectiveWidth = width - 2;
    // Top
    ctx.strokeStyle = strokeColours[0];
    ctx.beginPath();
    ctx.moveTo(offSetX, offSetY);
    ctx.lineTo(effectiveWidth + offSetX, offSetY);
    ctx.stroke();
    // Right
    ctx.strokeStyle = strokeColours[1];
    ctx.beginPath();
    ctx.moveTo(effectiveWidth + offSetX, offSetY);
    ctx.lineTo(effectiveWidth + offSetX, effectiveWidth + offSetY);
    ctx.stroke();
    // Bottom
    ctx.strokeStyle = strokeColours[2];
    ctx.beginPath();
    ctx.moveTo(effectiveWidth + offSetX, effectiveWidth + offSetY);
    ctx.lineTo(offSetX, effectiveWidth + offSetY);
    ctx.stroke();
    // Left
    ctx.strokeStyle = strokeColours[3];
    ctx.beginPath();
    ctx.moveTo(offSetX, effectiveWidth + offSetY);
    ctx.lineTo(offSetX, offSetY);
    ctx.stroke();
}

function drawStrokedHex(width, ctx, strokeColours, offSetX, offSetY) {
    const effectiveWidth = width - 2;
    const sideLength = effectiveWidth / 2;
    ctx.strokeStyle = strokeColours[0];
    ctx.beginPath();
    ctx.moveTo(offSetX + sideLength, offSetY);
    ctx.lineTo(offSetX + effectiveWidth, offSetY + sideLength);
    ctx.stroke();
    ctx.strokeStyle = strokeColours[1];
    ctx.beginPath();
    ctx.lineTo(offSetX + effectiveWidth, offSetY + sideLength * 2);
    ctx.lineTo(offSetX + sideLength, offSetY + sideLength * 3);
    ctx.lineTo(offSetX, offSetY + sideLength * 2);
    ctx.stroke();
    ctx.strokeStyle = strokeColours[0];
    ctx.beginPath();
    ctx.lineTo(offSetX, offSetY + sideLength);
    ctx.stroke();
}

function filledCell(type, ctx, width, offSetX, offSetY, fillColour, item) {
    const thisShape = item.shape;
    const effectiveWidth = width - 2;
    drawCell(
        type,
        ctx,
        fillColour,
        thisShape,
        offSetX,
        offSetY,
        effectiveWidth
    );
    drawFromContext(item, ctx, thisShape, offSetX, offSetY, width);
}

function drawCell(
    type,
    ctx,
    fillColour,
    thisShape,
    offSetX,
    offSetY,
    effectiveWidth
) {
    ctx.fillStyle = fillColour;
    switch (type) {
        case "SQUARE":
            drawSquare(thisShape, offSetX, offSetY, effectiveWidth);
            break;
        case "HEX":
            drawHex(thisShape, offSetX, offSetY, effectiveWidth);
            break;
        default:
            drawSquare(thisShape, offSetX, offSetY, effectiveWidth);
    }

    ctx.fill(thisShape);
}

function drawSquare(thisShape, offSetX, offSetY, effectiveWidth) {
    thisShape.moveTo(offSetX, offSetY);
    thisShape.lineTo(effectiveWidth + offSetX, offSetY);
    thisShape.lineTo(effectiveWidth + offSetX, effectiveWidth + offSetY);
    thisShape.lineTo(offSetX, effectiveWidth + offSetY);
    thisShape.closePath();
}

function drawHex(thisShape, offSetX, offSetY, effectiveWidth) {
    const sideLength = effectiveWidth / 2;
    thisShape.moveTo(offSetX + sideLength, offSetY);
    thisShape.lineTo(offSetX + effectiveWidth, offSetY + sideLength);
    thisShape.lineTo(offSetX + effectiveWidth, offSetY + sideLength * 2);
    thisShape.lineTo(offSetX + sideLength, offSetY + sideLength * 3);
    thisShape.lineTo(offSetX, offSetY + sideLength * 2);
    thisShape.lineTo(offSetX, offSetY + sideLength);
    thisShape.closePath();
}

function drawFromContext(item, ctx, thisShape, offSetX, offSetY, width) {
    ctx.font = "16px sans-serif";
    let fillColour = "black";
    switch (item.count) {
        case 1:
            fillColour = "green";
            break;
        case 2:
            fillColour = "blue";
            break;
        case 3:
            fillColour = "yellow";
            break;
        case 4:
            fillColour = "red";
            break;
        default:
            fillColour = "black";
    }
    ctx.fillStyle = fillColour;
    if (item.revealed) {
        if (item.bomb) {
            ctx.fillStyle = "red";
            ctx.fill(thisShape);
        } else {
            if (item.count > 0) {
                ctx.fillText(item.count, offSetX + 4, offSetY + width - 5);
            }
        }
    } else if (item.flag) {
        ctx.fillStyle = "black";
        ctx.fillText("F", offSetX + 4, offSetY + width - 5);
    }
}

export default function createCell(
    type,
    ctx,
    width,
    offSetX,
    offSetY,
    fillColour,
    strokeColours,
    item
) {
    // console.log("item", item);
    filledCell(type, ctx, width, offSetX, offSetY, fillColour, item);
    strokedCell(type, ctx, width, offSetX, offSetY, strokeColours);
}
