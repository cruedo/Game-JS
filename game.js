let canvas = document.getElementById("my_canvas");
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

canvas.width = String(GAME_WIDTH);
canvas.height = String(GAME_HEIGHT);



// Assets

class Paddle {
    constructor(ctx) {
        this.width = 150;
        this.height = 30;
        this.pos = {
            x: GAME_WIDTH/2 - this.width/2,
            y: GAME_HEIGHT - this.height - 10
        };
        this.speed = 0;
        this.maxSpeed = 10;
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }
    moveRight() {
        this.speed = this.maxSpeed;
    }

    draw() {
        ctx.fillStyle = '#0ff';
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    update(deltaTime) {
        if(!deltaTime) return ;
        this.pos.x += this.speed;
        if(this.pos.x < 0) this.pos.x = 0;
        if(this.pos.x+this.width > GAME_WIDTH) this.pos.x = GAME_WIDTH - this.width;

        // this.pos.x += 5/deltaTime;
    }

    stop() {
        this.speed = 0;
    }

}

class inputHandler {
    constructor(pad) {
        document.addEventListener('keydown', (event) => {
            switch(event.keyCode) {
                case 37:
                    pad.moveLeft();
                    break;
                case 39:
                    pad.moveRight();
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch(event.keyCode) {
                case 37:
                    if(pad.speed < 0)
                        pad.stop();
                    break;
                case 39:
                    if(pad.speed > 0)
                        pad.stop();
                    break;
            }
        });
    }
}


// The main Logic
let np = new Paddle(ctx);
new inputHandler(np);
np.draw();

let lastTime = 0;

function gameloop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    np.update(deltaTime);
    np.draw();

    requestAnimationFrame(gameloop);
}

gameloop();