let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let gameWidth = canvas.width;
let gameHeight = canvas.height;
let gameHome;
let levelOne;
let karakter;
const left = 37;
const right = 39;
const up = 38;
const down = 40;
const w = 87;
const a = 65;
const s = 83;
const d = 68;

window.addEventListener("keydown", move);
window.addEventListener("keyup", stopMove);

function mulai() {
  gameHome = new property(0, 0, 1200, 600, "yadzka.jpeg", "image");
  run();
}

function run() {
  this.frameNo = 0;
  this.interval = setTimeout(main, 20);
}

function main() {
  clear();
  gameHome.update();
}

function PlayButton() {
  var btnplay = document.getElementById("playbtn");
  if (btnplay.style.display == "none") {
    btnplay.style.display = "block";
  } else {
    btnplay.style.display = "none";
  }
  level1();
}

function level1() {
  kometOne = new property(10, 10, 100, 100, "img/bg1.png", "image");
  karakter = new property(0, 400, 80, 120, "img/foto1.png", "image");
  levelOne = new property(0, 0, 1200, 600, "img/yadzka.jpeg", "image");
  gameRunning();
}

function gameRunning() {
  this.frame = 0;
  this.interval = setInterval(isi, 20);
}

function property(x, y, width, height, color, type) {
  this.x = x;
  this.y = y;
  this.objX = 0;
  this.objY = 0;
  this.width = width;
  this.height = height;
  this.color = color;
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }

  this.update = function () {
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  this.movement = function () {
    this.x += this.objX;
    this.y += this.objY;
    this.hitTop();
    this.hitBottom();
    this.hitRight();
    this.hitLeft();
  };

  this.hitTop = function () {
    let objTop = this.height - this.height;
    if (this.y < objTop) {
      this.y = objTop;
    }
  };

  this.hitBottom = function () {
    let objBottom = 600 - this.height;
    if (this.y > objBottom) {
      this.y = objBottom;
    }
  };

  this.hitLeft = function () {
    let objLeft = 1200 - this.width;
    if (this.x > objLeft) {
      this.x = objLeft;
    }
  };

  this.hitRight = function () {
    let objRight = this.width - this.width;
    if (this.x < objRight) {
      this.x = objRight;
    }
  };
}

function clear() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
}

function move(event) {
  const keyPressed = event.keyCode;
  if (keyPressed == left) {
    karakter.objX = -5;
  } else if (keyPressed == right) {
    karakter.objX = 5;
  } else if (keyPressed == up) {
    karakter.objY = -5;
  } else if (keyPressed == down) {
    karakter.objY = 5;
  }
}

function stopMove(event) {
  const keyPressed = event.keyCode;
  if (keyPressed == left) {
    karakter.objX = 0;
  } else if (keyPressed == right) {
    karakter.objX = 0;
  } else if (keyPressed == up) {
    karakter.objY = 2;
  } else if (keyPressed == down) {
    karakter.objY = 0;
  }
}

function isi() {
  clear();
  levelOne.update();
  karakter.movement();
  karakter.update();
}
