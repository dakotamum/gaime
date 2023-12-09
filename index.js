const canvas = document.getElementById("gameboard");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = 0.25;
    this.goingDown = false;
    this.goingUp = false;
    this.goingLeft = false;
    this.goingRight = false;
  }
  update(delta) {
    if (this.goingUp && this.goingRight) {
      this.x += Math.cos(Math.PI / 4) * this.velocity * delta;
      this.y += -Math.sin(Math.PI / 4) * this.velocity * delta;
    } else if (this.goingUp && this.goingLeft) {
      this.x += Math.cos((3 * Math.PI) / 4) * this.velocity * delta;
      this.y += -Math.sin((3 * Math.PI) / 4) * this.velocity * delta;
    } else if (this.goingDown && this.goingLeft) {
      this.x += Math.cos((5 * Math.PI) / 4) * this.velocity * delta;
      this.y += -Math.sin((5 * Math.PI) / 4) * this.velocity * delta;
    } else if (this.goingDown && this.goingRight) {
      this.x += Math.cos((7 * Math.PI) / 4) * this.velocity * delta;
      this.y += -Math.sin((7 * Math.PI) / 4) * this.velocity * delta;
    } else if (this.goingUp) {
      this.y += -this.velocity * delta;
    } else if (this.goingDown) {
      this.y -= -this.velocity * delta;
    } else if (this.goingLeft) {
      this.x -= this.velocity * delta;
    } else if (this.goingRight) {
      this.x += this.velocity * delta;
    }
  }
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath(); // begin drawing on screen
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  keyupHandler(event) {
    if (event.key === "w") {
      this.goingUp = false;
    }
    if (event.key === "s") {
      this.goingDown = false;
    }
    if (event.key === "a") {
      this.goingLeft = false;
    }
    if (event.key === "d") {
      this.goingRight = false;
    }
  }
  keydownHandler(event) {
    if (event.key === "w") {
      this.goingUp = true;
    }
    if (event.key === "s") {
      this.goingDown = true;
    }
    if (event.key === "a") {
      this.goingLeft = true;
    }
    if (event.key === "d") {
      this.goingRight = true;
    }
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class ProjectileManager {
  constructor() {
    this.projectiles = [];
  }
  addProjectile(projectile) {
    this.projectiles.push(projectile);
  }
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    let proj = this.projectiles[0];
    ctx.arc(proj.x, proj.y, proj.radius, 0, proj.PI * 2, false);
    ctx.fillStyle = proj.color;
    ctx.fill();
    for (let i = 0; i < this.projectiles; i++) {
      let proj = this.projectiles[i];
    }
  }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, "magenta");
// const projectileManager = new ProjectileManager();

function globDraw() {
  player.draw();
}

function globUpdate(delta) {
  player.update(delta);
  // projectileManager.draw();
}

addEventListener("keyup", (event) => {
  player.keyupHandler(event);
});

addEventListener("keydown", (event) => {
  player.keydownHandler(event);
});

let lastFrameTime = performance.now();

function gameLoop() {
  let currentTime = performance.now();
  let delta = currentTime - lastFrameTime;
  lastFrameTime = currentTime;
  globUpdate(delta);
  globDraw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
