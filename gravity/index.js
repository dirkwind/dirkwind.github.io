const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const scale = new Scale(1000000, 1);
const engine = new PhysEngine(context, scale);

const earth = new Circle("black", 6378100*2, 5.97219e24, new Vec2(500e6, 400e6));
const moon = new Circle("black", 1740e3*2, 7.34767309e22, new Vec2(500e6, 400e6 + 3.4e8), new Vec2(1070.23721343, 0));

engine.objects.push(earth, moon);

function clearBoard() {
    // background
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
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
        engine.update(1000);
        // console.log(engine.objects[0].pos)
        await wait(1);
    }
}

gameLoop();