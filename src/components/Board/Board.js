import React, { useState, useEffect } from "react";
import "./board.css";
import Counter from "../Counter/Counter";
import "typeface-vt323";
import smiley from "../../img/Smiley.png";
import smileyHit from "../../img/SmileyHit.png";

const Board = ({ height, width, numBombs, type }) => {
    // canvas must be declared here so the ref can refer to it
    let canvasRef = React.useRef(null);

    const [gameRunning, setGameState] = useState(true);
    const [clickCords, setClickCords] = useState(null);
    const numSquares = height * width;
    const font = "bold 16px sans-serif";

    // Game logic

    const cells = createBoard();
    const [data, setData] = useState(cells);

    const numRevealed = getNumRevealed();

    const numFlags = getNumFlags();

    const setNumColour = num => {
        switch (num) {
            case 1:
                return "#0b24fb";
            case 2:
                return "#228224";
            case 3:
                return "#fc0d1b";
            case 4:
                return "#020b79";
            case 5:
                return "#86272b";
            case 6:
                return "#007b7b";
            case 7:
                return "#090002";
            case 8:
                return "#7b7b7b";
            default:
                return "#000";
        }
    };

    useEffect(() => {
        // clickCords
        // setClickCords
        console.log("UPDATING COMPONENT");
        console.log("data", data);

        console.log("clickCords", clickCords);

        const numRows = data.length;
        const numCols = data[0].length;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Drawing squares
        function drawSquare(width, offSetX, offSetY, item) {
            // console.log('item', item)
            const effectiveWidth = width - 2;
            let content = "";
            if (item.bomb) {
                content = "X";
            } else {
                content = item.count || "";
            }
            ctx.beginPath();
            // ctx.strokeStyle = "rgb(1, 1, 1)";
            ctx.strokeStyle = "";
            ctx.fillStyle = item.revealed
                ? "rgb(182, 182, 182)"
                : "rgb(152, 152, 152)";
            ctx.moveTo(offSetX, offSetY);
            ctx.lineTo(effectiveWidth + offSetX, offSetY);
            ctx.lineTo(effectiveWidth + offSetX, effectiveWidth + offSetY);
            ctx.lineTo(offSetX, effectiveWidth + offSetY);
            // ctx.lineTo(offSetX, offSetY);
            ctx.closePath();
            if (clickCords && ctx.isPointInPath(clickCords.x, clickCords.y)) {
                // ctx.fillStyle = 'green';
                console.log(`x: ${item.x}, y: ${item.y} clicked`);
                console.log("data", data);
                console.log("data[item.x][item.y]", data[item.x][item.y]);
                const clickedCell = data[item.x][item.y];
                if (!clickedCell.revealed) {
                    console.log(`x: ${item.x}, y: ${item.y} not revealed`);
                    setClickCords(null);
                    updateGrid(item.x, item.y);
                }
            }
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(offSetX, offSetY);
            ctx.lineTo(effectiveWidth + offSetX, offSetY);
            ctx.stroke();
            ctx.strokeStyle = item.revealed ? "white" : "black";
            ctx.beginPath();
            ctx.moveTo(effectiveWidth + offSetX, offSetY);
            ctx.lineTo(effectiveWidth + offSetX, effectiveWidth + offSetY);
            ctx.lineTo(offSetX, effectiveWidth + offSetY);
            ctx.stroke();
            ctx.strokeStyle = item.revealed ? "black" : "white";
            ctx.beginPath();
            ctx.moveTo(offSetX, effectiveWidth + offSetY);
            ctx.lineTo(offSetX, offSetY);
            ctx.stroke();

            if (item.revealed) {
                ctx.fillStyle = "black";
                ctx.font = "16px sans-serif";
                ctx.fillText(content, offSetX + 4, offSetY + width - 5);
                if (item.bomb) {
                    ctx.beginPath();
                    ctx.strokeStyle = "rgb(1, 1, 1)";
                    ctx.fillStyle = "red";
                    ctx.moveTo(offSetX, offSetY);
                    ctx.lineTo(effectiveWidth + offSetX, offSetY);
                    ctx.lineTo(
                        effectiveWidth + offSetX,
                        effectiveWidth + offSetY
                    );
                    ctx.lineTo(offSetX, effectiveWidth + offSetY);
                    ctx.lineTo(offSetX, offSetY);
                    ctx.fill();
                }
            }
        }

        function drawHex(fullWidth, offsetX, offsetY, item) {
            const width = fullWidth - 2;
            let content = "";
            if (item.bomb) {
                content = "X";
            } else {
                content = item.count || "";
            }
            ctx.fillStyle = item.revealed
                ? "rgb(212, 212, 212)"
                : "rgb(152, 152, 152)";

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

        data.map((rows, x) => {
            return rows.map((item, y) => {
                if (type === "HEX") {
                    if (y % 2 === 0) {
                        drawHex(
                            20,
                            width * x + inset + width / 2,
                            width * y + inset,
                            item
                        );
                    } else {
                        drawHex(20, width * x + inset, width * y + inset, item);
                    }
                } else {
                    drawSquare(20, width * x + inset, width * y + inset, item);
                }
            });
        });
    });

    return (
        <div className="app">
            <div>
                <div className="controlContainer">
                    <div
                        onClick={() => {
                            resetGame();
                        }}
                        className="button"
                    >
                        {gameRunning ? (
                            <img src={smiley} alt="Reset game" />
                        ) : (
                            <img src={smileyHit} alt="Reset game" />
                        )}
                    </div>
                    <p className="numberBox">{numBombs - numFlags}</p>
                </div>
            </div>
            <canvas
                ref={canvasRef}
                width={width * 20 + (type === "HEX" ? width / 2 : 0)}
                height={height * 20 + (type === "HEX" ? height / 2 : 0)}
                className="board"
                onClick={event => {
                    event.preventDefault();
                    console.log("Canvas clicked");
                    console.log("Event type:", event.type);
                    const { x, y } = getCursorPosition(
                        canvasRef.current,
                        event
                    );
                    console.log("x:", x);
                    console.log("y:", y);
                    var rect = canvasRef.current.getBoundingClientRect();
                    var rawX = event.clientX - rect.left;
                    var rawY = event.clientY - rect.top;

                    setClickCords({ x: rawX, y: rawY, clickType: "LEFT" });
                    // handleCanvasClick(event);
                }}
                onContextMenu={event => {
                    handleRightClick(event);
                }}
            />
            <div className="announce">
                {gameRunning ? null : numSquares - (numRevealed + numBombs) ===
                  0 ? (
                    <p>Win!</p>
                ) : (
                    <p>Game over!</p>
                )}
            </div>
        </div>
    );
};

export default Board;
