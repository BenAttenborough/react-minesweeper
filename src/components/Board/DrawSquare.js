function strokedSquare(ctx, width, offSetX, offSetY, strokeColours) {
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

function filledSquare(ctx, width, offSetX, offSetY, fillColour, item) {
    const thisShape = item.shape;
    const effectiveWidth = width - 2;
    drawSquare(ctx, fillColour, thisShape, offSetX, offSetY, effectiveWidth);
    drawFromContext(item, ctx, thisShape, offSetX, offSetY, width);
}

function drawSquare(
    ctx,
    fillColour,
    thisShape,
    offSetX,
    offSetY,
    effectiveWidth
) {
    ctx.fillStyle = fillColour;
    // 0, 0
    thisShape.moveTo(offSetX, offSetY);
    // 18, 0
    thisShape.lineTo(effectiveWidth + offSetX, offSetY);
    thisShape.lineTo(effectiveWidth + offSetX, effectiveWidth + offSetY);
    thisShape.lineTo(offSetX, effectiveWidth + offSetY);
    thisShape.closePath();
    ctx.fill(thisShape);
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

export default function createSquare(
    ctx,
    width,
    offSetX,
    offSetY,
    fillColour,
    strokeColours,
    item
) {
    // console.log("item", item);
    filledSquare(ctx, width, offSetX, offSetY, fillColour, item);
    strokedSquare(ctx, width, offSetX, offSetY, strokeColours);
}
