const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const scale = new Scale(1, 10);
const engine = new PhysEngine(context, scale);

const ball = new Circle("black", 1, 1, new Vec2(10, 10), new Vec2(0, 0), new Vec2(0, 9.8));

engine.objects.push(ball);

function clearBoard() {
    // background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'black';

    context.beginPath();
    context.moveTo(10, 0);
    context.lineTo(10, 10);
    context.stroke();
}

function wait(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

async function gameLoop() {
    while (true) {
        clearBoard();
        engine.update(0.005);
        // console.log(engine.objects[0].pos)
        await wait(1);
    }
}

gameLoop();