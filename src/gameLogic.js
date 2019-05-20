// function getCursorPosition(canvas, event, cellWidth) {
//     var rect = canvas.getBoundingClientRect();
//     var x = event.clientX - rect.left;
//     var y = event.clientY - rect.top;
//     // console.log("x: " + x + " y: " + y);
//     // console.log("x:", Math.floor(x / cellWidth));
//     // console.log("y:", Math.floor(y / cellWidth));
//     return { x: Math.floor(x / cellWidth), y: Math.floor(y / cellWidth) };
// }

export default function handleCanvasClick(
    event,
    canvasRef,
    cellWidth,
    setClickCords,
    board,
    setBoard
) {
    console.log("Handling canvas click", event);
    event.preventDefault();
    var rect = canvasRef.current.getBoundingClientRect();
    var rawX = event.clientX - rect.left;
    var rawY = event.clientY - rect.top;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    board.forEach(x => {
        x.forEach(y => {
            const isInPath = ctx.isPointInPath(y.shape, rawY, rawX);
            if (isInPath) {
                console.log("In path:", y);
                // updateBoard
            }
        });
    });

    console.log("rawX:", rawX);
    console.log("rawY:", rawY);
    // setClickCords({ x: rawX, y: rawY, clickType: "LEFT" });
}
