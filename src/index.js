import ImageDataReader from '@danehansen/image-data-reader';

let count = 0;
let canvas = document.querySelector('#game');
let gridCanvas = document.querySelector('#grid');
let bashboard = document.querySelector('#score-broad');
let cnavasContext = canvas.getContext('2d');
let gridCanvasContext = gridCanvas.getContext('2d');
canvas.width = 1024;
canvas.height = 1024;
gridCanvas.width = 1024;
gridCanvas.height = 1024;

//document.getElementById("main").appendChild(canvas);;

let data = [{
    p0: { x: 0, y: 0 },
    p1: { x: 1023, y: 1023 }
}];

let imageDataReader;

/**
 * Data test
 */

let image = new Image();
// Wait for the sprite sheet to load
image.onload = () => {
    imageDataReader = new ImageDataReader(image);
    const red = imageDataReader.red(0, 0);
    const green = imageDataReader.green(0, 0);
    const blue = imageDataReader.blue(0, 0);
    cnavasContext.fillStyle = `rgb(${red},${green},${blue})`;
    cnavasContext.fillRect(0, 0, 1024, 1024);
}

// Load the sprite sheet from an image file
image.src = 'image.png';

const update = (x, y) => {
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.p0.x < x && item.p0.y < y &&
            x < item.p1.x && y < item.p1.y) {
            console.log(item);
            const newData = [
                {
                    p0: { x: item.p0.x, y: item.p0.y },
                    p1: {
                        x: Math.floor((item.p1.x + item.p0.x) / 2),
                        y: Math.floor((item.p1.y + item.p0.y) / 2)
                    }
                }, {
                    p0: { x: item.p0.x, y: Math.ceil((item.p1.y + item.p0.y) / 2) },
                    p1: { x: Math.floor((item.p1.x + item.p0.x) / 2), y: item.p1.y }
                }, {
                    p0: { x: Math.ceil((item.p1.x + item.p0.x) / 2), y: item.p0.y },
                    p1: { x: item.p1.x, y: Math.floor((item.p1.y + item.p0.y) / 2) }
                }, {
                    p0: {
                        x: Math.ceil((item.p1.x + item.p0.x) / 2),
                        y: Math.ceil((item.p1.y + item.p0.y) / 2)
                    },
                    p1: { x: item.p1.x, y: item.p1.y }
                }
            ];
            newData.forEach(newItem => {
                const red = imageDataReader.red(newItem.p0.x, newItem.p0.y),
                    green = imageDataReader.green(newItem.p0.x, newItem.p0.y),
                    blue = imageDataReader.blue(newItem.p0.x, newItem.p0.y);
                const width = (newItem.p1.x - newItem.p0.x) + 1,
                    height = (newItem.p1.y - newItem.p0.y) + 1;
                cnavasContext.fillStyle = `rgb(${red},${green},${blue})`;
                cnavasContext.fillRect(newItem.p0.x, newItem.p0.y, width, height);/**/

                //gird
                if(count<100){
                    gridCanvasContext.strokeStyle = "#FF0000";
                    gridCanvasContext.beginPath();
                    gridCanvasContext.rect(newItem.p0.x, newItem.p0.y, width, height);
                    gridCanvasContext.stroke();/**/
                }else if(count===100){
                    gridCanvasContext.clearRect(0,0,1024,1024);
                }
                
            });
            data = [
                ...data.slice(0, i),
                ...data.slice(i + 1, data.length),
                ...newData];
            ;
            bashboard.innerHTML = `你已經點擊了 ${++count} 次。`
            return;
        }
    }
}

gridCanvas.addEventListener('click', event => {
    const rect = canvas.getBoundingClientRect(),
        x = event.offsetX / rect.width * 1024,
        y = event.offsetY / rect.height * 1024;
    update(x, y);
})
canvas.addEventListener('mousemove', event => {
    /*const rect = canvas.getBoundingClientRect(),
        x = event.offsetX / rect.width * 1024,
        y = event.offsetY / rect.height * 1024;
    cnavasContext.strokeStyle = "#FF0000";
    cnavasContext.beginPath();
    cnavasContext.rect(x, y, 1, 1);
    cnavasContext.stroke();/**/
})