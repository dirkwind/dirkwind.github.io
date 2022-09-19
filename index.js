const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Vector {

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * 
     * @param {number|Vector} x 
     * @param {number|undefined} y 
     */
    add(x, y) {
        if (y !== undefined) {
            this.x += x;
            this.y += y;
        } else { // x is a vector
            this.x += x.x;
            this.y += x.y;
        }
    }

    /**
     * 
     * @param {number|Vector} x 
     * @param {number?} y 
     */
    sub(x, y) {
        if (y !== undefined) {
            this.x -= x;
            this.y -= y;
        } else { // x is a vector
            this.x -= x.x;
            this.y -= x.y;
        }
    }

    inverse() {
        return new Vector(-this.x, -this.y);
    }

    scale(x, y) {
        this.x *= x;
        this.y *= y;
    }

    dot(other) {
        return this.x * other.x + this.y * other.y;
    }

    unit() {
        const mag = this.magnitude();
        return new Vector(this.x / mag, this.y / mag);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    } 

    copy() {
        return new Vector(this.x, this.y);
    }

    print() {
        console.log(`(${this.x}, ${this.y})`);
    }
}

class Rectangle {

    /**
     * creates a rectangle centered at (x, y) as opposed the the top left corner being at (x, y)
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {string} color 
     * @returns 
     */
    static centeredAt(x, y, width, height, color = 'white') {
        return new this(x - width/2, y - height/2, width, height, color);
    }

    constructor(x, y, width, height, color = 'white') {
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    centerAt(x, y) {
        this.pos.set(x - this.width/2, y - this.height/2);
    }

    center() {
        this.centerAt(this.pos.x, this.pos.y);
    }

    setVel(x, y) {
        this.vel.set(x, y);
    }

    setSpeed(speed, dir) {
        this.vel.set(speed * Math.cos(dir), speed * Math.sin(dir),)
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    move() {
        this.pos.add(this.vel);
    }

    update() {
        this.move();
        this.draw();
    }

    checkCollision(other) {
        const dx = (this.pos.x + this.width/2) - (other.pos.x + other.width/2),
            dy = (this.pos.y + this.height/2) - (other.pos.y + other.height/2),
            width = (this.width + other.width)/2,
            height = (this.height + other.height)/2,
            crossWidth = width * dy,
            crossHeight = height * dx;

        let collision = 'none';
        //
        if (Math.abs(dx) <= width && Math.abs(dy) <= height){
            if (crossWidth > crossHeight) {
                collision = (crossWidth >(-crossHeight)) ? 'bottom' : 'left';
            } else {
                collision = (crossWidth >-(crossHeight)) ? 'right' : 'top';
            }
        }
        return collision;
    }
}

class Ball extends Rectangle {
    /**
     * Creats a ball object.
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {LinkedInput} color 
     * @param {boolean} startLeft If true, this ball will initially spawn moving left.
     */
    constructor(x, y, width, height, color, startLeft = false) {
        super(x, y, width, height);
        this.startLeft = startLeft;
        this._color = color;

        // collision grace period ticks to prevent it from getting stack in players
        this.collisionGrace = 0;
        
    }

    get color() {
        return this._color.val;
    }

    set color(newHex) {
        if (this._color !== undefined) {
            this._color.val = newHex;
        }
    }

    reset() {
        this.pos.set((canvas.width - this.width)/2, (canvas.height - this.height)/2);
        this.setSpeed(ballSpeed.val/2, -Math.PI/4 + (Math.random() * Math.PI/2) + (Math.PI * !!this.startLeft));
        this.startLeft = !this.startLeft;        
    }

    update() {
        for (const entity of entities) {
            if (entity == this) continue;

            const collision = this.checkCollision(entity);
            const thing = (this.pos.y + this.height/2 - entity.pos.y - entity.height/2) / entity.height;

           
            if (collision != "none" && !(entity instanceof Ball)) {
                if (entity instanceof Player) {
                    if (this.collisionGrace !== 0) continue;
                    const mag = ballSpeed.val;
                    const unit = this.vel.unit();
                    const dir = unit.x / Math.abs(unit.x);
                    
                    this.vel.set(-dir * mag * Math.cos((Math.PI/4) * thing), mag * Math.sin((Math.PI/4)*thing));
                    this.collisionGrace = Math.round(50 * (1/mag));
                } else if (entity instanceof ScoreZone) {
                    this.reset();
                    entity.player.score(1);
                } else {
                    switch (collision) {
                        case 'bottom':
                        case 'top':
                            this.vel.scale(1, -1);
                            break;
                        case 'left':
                        case 'right':
                            this.vel.scale(-1, 1);
                            break;
                    }
                }
            }
            }
            
        super.update();
        if (this.collisionGrace > 0) this.collisionGrace -= 1;
    }
}

class Player extends Rectangle {
    /**
     * Creates a Player object.
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {number} scoreTextX 
     * @param {number} scoreTextY 
     * @param {LinkedInput} name
     * @param {LinkedInput} color 
     */
    constructor(x, y, width, height, scoreTextX, scoreTextY, name, color) {
        super(x, y, width, height);
        this.centerAt(x, y);
        this._color = color;
        this._score = 0;
        this._name = name;
        this.startPos = new Vector(x, y);
        this.scorePos = new Vector(scoreTextX, scoreTextY);
    }

    get name() {
        return this._name.val;
    }

    set name(newName) {
        this._name.val = newName;
    }

    get color() {
        return this._color.val;
    }

    set color(newHex) {
        if (this._color !== undefined) {
            this._color.val = newHex;
        }
    }

    move() {
        super.move();
        for (const wall of walls) {
            if (this.checkCollision(wall) != 'none') {
                // basically, if our move makes us collide, undo that move
                this.pos.sub(this.vel);
            }
        }
    }

    draw() {
        super.draw();
        ctx.fillStyle = this.color;
        ctx.font = "20px Helvetica";
        ctx.textAlign = "center";
        ctx.fillText(this._score.toString().padStart(2, '0'), this.scorePos.x, this.scorePos.y);
    }

    /**
     * Adds points to this player's score.
     * @param {number} points 
     */
    score(points) {
        this._score += points;
        if (this._score >= winningScore.val) gameWin(this);
    }

    reset() {
        this.centerAt(this.startPos.x, this.startPos.y);
        this._score = 0;
    }
}

class ScoreZone extends Rectangle {
    /**
     * 
     * @param {Player} player 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(player, x, y, width, height) {
        super(x, y, width, height, 'rgba(0, 0, 0, 0)');
        this.player = player;
    }

    draw() {
        // doesn't need to be drawn
    }
}

class LinkedInput {
    /**
     * 
     * @param {string} inputID 
     * @param {*} val 
     */
    constructor(inputID, val) {
        this._element = document.getElementById(inputID);
        if (val !== undefined) this.val = val;
    }

    get val() {
        if (this._element.type === 'number') {
            return Number.parseFloat(this._element.value);
        }
        return this._element.value;6
    }

    set val(newValue) {
        this._element.setAttribute('value', newValue);
    }
}

function clearBoard() {
    // background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dashed line
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.setLineDash([5]);
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
}

function dimBoard(alpha = 0.5) {
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
}

function togglePause() {
    paused = !paused;

    // restart game loop to continue playing
    if (!paused) {
        gameLoop();
    } else {
        dimBoard();
        
        // write "paused" on the screen
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.font = "20px Helvetica";
        ctx.fillText("Paused", canvas.width/2, canvas.height/2)
    }
}

function reset() {
    if (paused) togglePause();
    entities.length = 0;
    entities.push(...permanentEntities);

    ball.reset();
    player1.reset();
    player2.reset();
}

function renderFrame() {
    clearBoard();
    entities.forEach(entity => entity.update());
}

/**
 * Wins the game for a player.
 * @param {Player} player 
 */
async function gameWin(player) {
    paused = true;
    await wait(2);
    renderFrame();
    dimBoard();

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.font = "30px Helvetica";
    ctx.fillText(`${player.name} Wins!`, canvas.width/2, canvas.height/2)
}

async function gameLoop() {
    while (!paused) {
        renderFrame();
        await wait(1);
    }
}

function wait(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

function addBall() {
    const b = new Ball(canvas.width/2, canvas.height/2, 10, 10, ballColor, Math.round(Math.random()) == 0);
    b.center();
    b.reset();
    entities.push(b);
}

document.addEventListener('keydown', (event) => {
    if (focused) return;
    event.preventDefault();
    switch (event.key) {
        case controls.p1Down:
            player1.vel.y = playerSpeed.val;
            break;
        case controls.p1Up:
            player1.vel.y = -playerSpeed.val;
            break;
        case controls.p2Down:
            player2.vel.y = playerSpeed.val;
            break;
        case controls.p2Up:
            player2.vel.y = -playerSpeed.val;
            break;
        case controls.pause:
            togglePause();
            break;
        case controls.reset:
            reset();
            break;
    }
});

document.addEventListener('keyup', (event) => {
    if (focused) return;
    event.preventDefault();
    switch (event.key) {
        case controls.p1Down:
        case controls.p1Up:
            player1.vel.y = 0;
            break;
        case controls.p2Down:
        case controls.p2Up:
            player2.vel.y = 0;
            break;
    }
});

document.addEventListener('focusin', (event) => {
    focused = true;
});

document.addEventListener('focusout', (event) => {
    focused = false;
});

const controls = {
    p1Up: 'w',
    p1Down:'s',
    p2Up: 'ArrowUp',
    p2Down: 'ArrowDown',
    pause: ' ',
    reset: 'r'
}

let paused = false;
let focused = false; // true if an input is focused

const player1Name = new LinkedInput('player1Name', 'Player 1');
const player2Name = new LinkedInput('player2Name', 'Player 2');
const player1Color = new LinkedInput('player1Color', '#ffffff');
const player2Color = new LinkedInput('player2Color', '#ffffff');
const ballSpeed = new LinkedInput('ballSpeed', 1.5);
const ballColor = new LinkedInput('ballColor', '#ffffff');
const playerSpeed = new LinkedInput('playerSpeed', 1);
const winningScore = new LinkedInput('winningScore', 10);

const ball = Ball.centeredAt(canvas.width/2, canvas.height/2, 10, 10);
const player1 = new Player(canvas.width/10, canvas.height/2, 10, 50, canvas.width/2 - canvas.width/12, canvas.height/10, player1Name, player1Color);
const player2 = new Player(canvas.width/10 * 9, canvas.height/2, 10, 50, canvas.width/2 + canvas.width/12, canvas.height/10, player2Name, player2Color);

const topWall = new Rectangle(0, 0, canvas.width, 10);
const bottomWall = new Rectangle(0, canvas.height - 10, canvas.width, 10);
const walls = [topWall, bottomWall];

const p2ScoreZone = new ScoreZone(player2, -10, -10, 10, canvas.height);
const p1ScoreZone = new ScoreZone(player1, canvas.width, -10, 10, canvas.height);

const permanentEntities = [player1, player2, ball, p1ScoreZone, p2ScoreZone].concat(walls);
const entities = [];


reset();
gameLoop();