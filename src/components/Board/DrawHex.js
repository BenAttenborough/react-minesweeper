export default function createHex(
    ctx,
    width,
    offSetX,
    offSetY,
    fillColour,
    strokeColours,
    item
) {
    filledHex(ctx, width, offSetX, offSetY, fillColour, item);
}

function filledHex(ctx, width, offSetX, offSetY, fillColour, item) {
    const thisShape = item.shape;
    const effectiveWidth = width - 2;
    drawHex(ctx, fillColour, thisShape, offSetX, offSetY, effectiveWidth);
    // drawFromContext(item, ctx, thisShape, offSetX, offSetY, width);
}

function drawHex(ctx, fillColour, thisShape, offSetX, offSetY, effectiveWidth) {
    console.log("offSetX", offSetX);
    console.log("offSetY", offSetY);
    console.log("effectiveWidth", effectiveWidth);
    thisShape.fillStyle = fillColour;

    // console.log("expect to be 9:", offSetX + effectiveWidth / 2);
    // console.log("expect to be 18:", effectiveWidth);
    console.log(
        `Shape starts at ${offSetX + effectiveWidth / 2} ${effectiveWidth}`
    );
    const sideLength = effectiveWidth / 2;

    thisShape.moveTo(offSetX + sideLength, offSetY);
    thisShape.lineTo(offSetX + effectiveWidth, offSetY + sideLength);
    thisShape.lineTo(offSetX + effectiveWidth, offSetY + sideLength * 2);
    thisShape.lineTo(offSetX + sideLength, offSetY + sideLength * 3);
    thisShape.lineTo(offSetX, offSetY + sideLength * 2);
    thisShape.lineTo(offSetX, offSetY + sideLength);
    thisShape.closePath();
    ctx.stroke(thisShape);
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
