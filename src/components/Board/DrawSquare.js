/**
 *
 * @param {Object} ctx - The canvas context
 * @param {Number} width
 * @param {Number} offSetX
 * @param {Number} offSetY
 * @param {String} colour
 */
function filledSquare(
    ctx,
    width,
    offSetX,
    offSetY,
    fillColour,
    clickCords,
    item
) {
    // console.log("filledSquare item", item);
    const effectiveWidth = width - 2;
    ctx.beginPath();
    ctx.strokeStyle = "";
    ctx.fillStyle = fillColour;
    ctx.moveTo(offSetX, offSetY);
    ctx.lineTo(effectiveWidth + offSetX, offSetY);
    ctx.lineTo(effectiveWidth + offSetX, effectiveWidth + offSetY);
    ctx.lineTo(offSetX, effectiveWidth + offSetY);
    ctx.closePath();
    ctx.fill();
    if (clickCords && ctx.isPointInPath(clickCords.x, clickCords.y)) {
        console.log("Cell clicked");
        // ctx.fillStyle = "green";
        console.log(`x: ${item.x}, y: ${item.y} clicked`);
        // console.log("data", data);
        // console.log("data[item.x][item.y]", data[item.x][item.y]);
        // const clickedCell = data[item.x][item.y];
        // if (!clickedCell.revealed) {
        // console.log(`x: ${item.x}, y: ${item.y} not revealed`);
        // setClickCords(null);
        // updateGrid(item.x, item.y);
        // }
    }
    // ctx.fill();
}

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

// export default function createSquare(
//     ctx,
//     width,
//     offSetX,
//     offSetY,
//     fillColour,
//     strokeColours,
//     clickCords,
//     item
// ) {
//     // console.log("item", item);
//     filledSquare(ctx, width, offSetX, offSetY, fillColour, clickCords, item);
//     strokedSquare(ctx, width, offSetX, offSetY, strokeColours);
// }

function newFilledSquare(
    ctx,
    width,
    offSetX,
    offSetY,
    fillColour,
    clickCords,
    item
) {
    // console.log("item.shape", item.shape);
    const thisShape = item.shape;
    const effectiveWidth = width - 2;
    ctx.fillStyle = fillColour;
    thisShape.moveTo(offSetX, offSetY);
    thisShape.lineTo(effectiveWidth + offSetX, offSetY);
    thisShape.lineTo(effectiveWidth + offSetX, effectiveWidth + offSetY);
    thisShape.lineTo(offSetX, effectiveWidth + offSetY);
    thisShape.closePath();
    ctx.fill(thisShape);
}

export default function createSquare(
    ctx,
    width,
    offSetX,
    offSetY,
    fillColour,
    strokeColours,
    clickCords,
    item
) {
    // console.log("item", item);
    newFilledSquare(ctx, width, offSetX, offSetY, fillColour, clickCords, item);
    strokedSquare(ctx, width, offSetX, offSetY, strokeColours);
}
