function drawHex(fullWidth, offsetX, offsetY, item) {
    const width = fullWidth - 2;
    let content = "";
    if (item.bomb) {
        content = "X";
    } else {
        content = item.count || "";
    }
    ctx.fillStyle = item.revealed ? "rgb(212, 212, 212)" : "rgb(152, 152, 152)";

    ctx.beginPath();
    ctx.moveTo(offsetX + width / 2, offsetY);
    ctx.lineTo(offsetX + width, offsetY + width / 2);
    ctx.lineTo(offsetX + width, offsetY + width);
    ctx.lineTo(offsetX + width / 2, offsetY + width * 1.5);
    ctx.lineTo(offsetX, offsetY + width);
    ctx.lineTo(offsetX, offsetY + width / 2);
    ctx.closePath();
    if (clickCords && ctx.isPointInPath(clickCords.x, clickCords.y)) {
        if (clickCords.clickType === "LEFT") {
            // ctx.fillStyle = 'green';
            console.log(`x: ${item.x}, y: ${item.y} clicked`);
            console.log("data", data);
            console.log("data[item.x][item.y]", data[item.x][item.y]);
            const clickedCell = data[item.x][item.y];
            if (!clickedCell.revealed && !clickedCell.flag) {
                console.log(`x: ${item.x}, y: ${item.y} not revealed`);
                setClickCords(null);
                updateGrid(item.x, item.y);
            }
        } else if (clickCords.clickType === "RIGHT") {
            console.log("Handle right click transform here");
            const clickedCell = data[item.x][item.y];
            if (!clickedCell.revealed) {
                console.log(`x: ${item.x}, y: ${item.y} not revealed`);
                setClickCords(null);
                // updateGrid(item.x, item.y);
                const dataCopy = data.map(x => {
                    return x.map(y => {
                        return Object.assign({}, y);
                    });
                });
                dataCopy[item.x][item.y] = Object.assign(
                    {},
                    {
                        ...dataCopy[item.x][item.y],
                        flag: !dataCopy[item.x][item.y].flag
                    }
                );
                setData(dataCopy);
            }
        }
    }
    ctx.fill();
    if (item.revealed) {
        ctx.fillStyle = setNumColour(content);
        ctx.font = font;
        ctx.fillText(content, offsetX + 4, offsetY + width);
    } else if (item.flag) {
        ctx.fillStyle = "black";
        ctx.font = font;
        ctx.fillText("F", offsetX + 4, offsetY + width);
    }
    ctx.beginPath();
    ctx.moveTo(offsetX + width / 2, offsetY);
    ctx.strokeStyle = item.revealed ? "rgba(50, 50, 50, 0.2)" : "black";
    ctx.lineTo(offsetX + width, offsetY + width / 2);
    ctx.lineTo(offsetX + width, offsetY + width);
    ctx.lineTo(offsetX + width / 2, offsetY + width * 1.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = item.revealed ? "rgba(50,50,50, 0.2)" : "white";
    ctx.moveTo(offsetX + width / 2, offsetY + width * 1.5);
    ctx.lineTo(offsetX, offsetY + width);
    ctx.lineTo(offsetX, offsetY + width / 2);
    ctx.moveTo(offsetX + width / 2, offsetY);
    ctx.stroke();
}

const inset = 1;
