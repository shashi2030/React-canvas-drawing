import React from "react";
require('./style.css');
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawingColor: '#00ff00',
            ctx: null,
            w: 0,
            h: 0
        }
    }

    handleChange = (e) => {
        let canvas, ctx, flag = false,
            prevX = 0,
            currX = 0,
            prevY = 0,
            currY = 0,
            dot_flag = false,
            y = 2;

        canvas = document.getElementById('imageCanvas');
        let w = canvas.width;
        let h = canvas.height;
        ctx = canvas.getContext('2d');
        let reader = new FileReader();
        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

            }
            img.src = event.target.result;

        }
        this.setState({
            ctx: ctx,
            w: w,
            h: h
        })
        reader.readAsDataURL(e.target.files[0]);

        canvas.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function (e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function (e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function (e) {
            findxy('out', e)
        }, false);

        const draw = () => {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.strokeStyle = this.state.drawingColor;
            ctx.lineWidth = y;
            ctx.stroke();
            ctx.closePath();
        }
        const findxy = (res, e) => {
            if (res === 'down') {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;

                flag = true;
                dot_flag = true;
                if (dot_flag) {
                    ctx.beginPath();
                    ctx.fillStyle = this.state.drawingColor;
                    ctx.fillRect(currX, currY, 2, 2);
                    ctx.closePath();
                    dot_flag = false;
                }
            }
            if (res === 'up' || res === "out") {
                flag = false;
            }
            if (res === 'move') {
                if (flag) {
                    prevX = currX;
                    prevY = currY;
                    currX = e.clientX - canvas.offsetLeft;
                    currY = e.clientY - canvas.offsetTop;
                    draw();
                }
            }
        }
    }

    downloadImage = () => {
        var canvas = document.getElementById("imageCanvas");
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = "my-image.png";
        link.href = image;
        link.click();
    }


    colorChange = (e) => {
        this.setState({
            drawingColor: e.target.value
        })
    }
    render() {
        return (
            <div className="container">
                <div className="imagepreview">
                    <label>Image File:</label>
                    <input type="file" id="imageLoader" name="imageLoader" onChange={this.handleChange} />
                </div>
                {this.state.ctx && <div>Select Color <input type="color" id="favcolor" onChange={(e) => this.colorChange(e)} name="favcolor" value={this.state.drawingColor} /></div>}

                {this.state.ctx && <div><button onClick={this.downloadImage}>Download</button></div>}
                <div className="canvaswrapper">
                    <canvas id="imageCanvas"></canvas>
                </div>
            </div>
        );
    }
}

export default Dashboard;