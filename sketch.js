let winWidth = window.innerWidth;
let winHeight = window.innerHeight;
let score = {
    left: 0,
    right: 0
};

class Paddle {
    constructor(xpos, winHeight) {
        this.winHeight = winHeight;
        this.dimensions = {
            x: 20,
            y: (winHeight)/5
        };
        this.position = {
            x: xpos,
            y: (winHeight)/3
        };
        this.speed = 0;
        this.maxspeed = 5;
    }
    
    update() {
        rect(this.position.x, this.position.y, this.dimensions.x, this.dimensions.y);
        if (this.position.y + this.dimensions.y + this.speed < this.winHeight && this.position.y + this.speed > 0) {
            this.position.y += this.speed;
        }
    }
}

class Ball {
    constructor(winHeight, winWidth) {
        this.winHeight = winHeight;
        this.winWidth = winWidth;
        this.radius = 10;
        this.position = {
            x: winWidth/2,
            y: winHeight/2
        };
        this.speed = {
            x: 9,
            y: -6
        };
    }
    
    update() {
        ellipse(this.position.x, this.position.y, 2*this.radius, 2*this.radius);
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
}

function collision(ball, right, left) {
    if ((ball.position.y - ball.radius < 0) || (ball.position.y + ball.radius > ball.winHeight)) {
        ball.speed.y *= -1;
    } else if (ball.position.x - ball.radius < left.position.x + left.dimensions.x) {
        if (ball.position.y < left.position.y + left.dimensions.y && ball.position.y > left.position.y) {
            ball.speed.x *= -1;
            ball.speed.y = ball.speed.y - 3*(0.5 + Math.random());
        } else {
            score.right++;
            ball.position = {
                x: right.position.x - ball.radius,
                y: winHeight/2
            };
            ball.speed = {
                x: -Math.abs(ball.speed.x),
                y: -6
            };
        }
    } else if (ball.position.x + ball.radius > right.position.x) {
        if (ball.position.y < right.position.y + right.dimensions.y && ball.position.y > right.position.y) {
            ball.speed.x *= -1;
            ball.speed.y = ball.speed.y - 3*(0.5 + Math.random());
        } else {
            score.left++;
            ball.position = {
                x: left.position.x + left.dimensions.x + ball.radius,
                y: winHeight/2
            };
            ball.speed = {
                x: Math.abs(ball.speed.x),
                y: 6
            };
        }
    }
}

function scoreboard(score) {
    text(`${score.left}-${score.right}`, winWidth/2, winHeight/2);
}

let left;
let right;
let ball;

function setup() {
    createCanvas(winWidth, winHeight);
    frameRate(90);
    
    left = new Paddle(20, winHeight);
    right = new Paddle(winWidth - 40, winHeight);
    ball = new Ball(winHeight, winWidth);
    
    textAlign(CENTER, CENTER);
    textSize(winHeight/2);
}

function draw() {
    clear();
    background(244,12,133);
    if (score.left + score.right <= 2) {
        textAlign(LEFT, CENTER);
        textSize(winHeight/24);
        text("↑w", 50, 40);
        text("↓s", 50, 80);
        textAlign(RIGHT, CENTER);
        text("up arrow↑", winWidth-50, 40);
        text("down arrow↓", winWidth-50, 80);
        textSize(winHeight/2);
        textAlign(CENTER, CENTER);
    }
    scoreboard(score);
    left.update();
    right.update();
    ball.update();
    collision(ball, right, left);
}

function keyPressed() {
    if (keyCode == 87) {
        left.speed = -left.maxspeed;
    } else if (keyCode == 83) {
        left.speed = left.maxspeed;
    } else if (keyCode == 38) {
        right.speed = -right.maxspeed;
    } else if (keyCode == 40) {
        right.speed = right.maxspeed;
    }
}

function keyReleased() {
    if ((keyCode == 87 && left.speed < 0) || (keyCode == 83 && left.speed > 0)) {
        left.speed = 0;
    } else if ((keyCode == 38 && right.speed < 0) || (keyCode == 40 && right.speed > 0)) {
        right.speed = 0;
    }
}