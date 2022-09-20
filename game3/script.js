var myGamePiece;
var myObstacles = [];

function startGame() {
  myGamePiece = new component(50, 50, "../img/mobil.png", 10, 190, "image");
  // myObstacles = new component(80, 45, "image/pesawat.png", 300, 120, "image")
  myGameArea.start();
}
let canvas = DOCzzz
var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");

    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener("keydown", function (e) {
      myGameArea.key = e.keyCode;
    });
    window.addEventListener("keyup", function (e) {
      myGameArea.key = false;
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
};

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.gravity = 0.02;
  this.gravitySpeed = 0;
  this.bounce = 0.6;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.movement = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.hitTop();
    this.hitBottom();
    this.hitRight();
    this.hitLeft();
  };

  this.crashWith = function (otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  };

  // function hit untuk memberi batasan agar karakter dan obstcales tidak melewati batas canvas
  this.hitTop = function () {
    let objTop = 230 - this.height;
    if (this.y < objTop) {
      this.y = objTop;
    }
  };

  this.hitBottom = function () {
    let objBottom = 230 - this.height;
    if (this.y > objBottom) {
      this.y = objBottom;
    }
  };

  this.hitLeft = function () {
    let objLeft = 480 - this.width;
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

function updateGameArea() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    minGap = 50;
    maxGap = 200;
    // gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    gap = Math.floor(Math.random() * (1080 - 200 + 5) + 100);
    // gap = 0
    myObstacles.push(
      new component(80, 45, "../img/mobil2.png", height, gap, "image")
    );
    // myObstacles.push(new component(80, 45, "../img/mobil2.png", height, gap, "image" ));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].speedX -= 0.01;
    myObstacles[i].movement();
    myObstacles[i].update();
    myGamePiece.movement();
    myGamePiece.update();
  }
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (myGameArea.key && myGameArea.key == 37) {
    myGamePiece.speedX -= 1;
  }
  if (myGameArea.key && myGameArea.key == 39) {
    myGamePiece.speedX += 1;
  }
  if (myGameArea.key && myGameArea.key == 38) {
    myGamePiece.speedY -= 1;
  }
  if (myGameArea.key && myGameArea.key == 40) {
    myGamePiece.speedY += 1;
  }
  myGamePiece.movement();
  myGamePiece.update();
}
