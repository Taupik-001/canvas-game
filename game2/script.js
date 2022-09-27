let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
// variable untuk lebar dan panjang dari canvas
let gameWidth = canvas.width;
let gameHeight = canvas.height;
// variable kosong yang akan menampung backgroun image, karakter, dan obstacles
let gameHome;
let levelOne;
let karakter;
let musuh;
let score = [];
// variable untuk kontrol
// const left = 37;
// const right = 39;
// const up = 38;
// const down = 40;
const up = 87;
const left = 65;
const down = 83;
const right = 68;

// addeventlistener untuk bisa mengendalikan karakter
window.addEventListener("keydown", move);
window.addEventListener("keyup", stopMove);

function mulai() {
  gameHome = new property(0, 0, 1200, 600, "bgfarish1.png", "background");
  run();
}

function run() {
  // untuk membuat frame
  this.frameNo = 0;
  // untuk melakukan looping pada game
  this.interval = setTimeout(main, 20);
}

function main() {
  clear();
  gameHome.update();
}

// function play button untuk ketika button dipencet maka mulai permainan
function PlayButton() {
  var btnplay = document.getElementById("playbtn");
  if (btnplay.style.display == "none") {
    btnplay.style.display = "block";
  } else {
    btnplay.style.display = "none";
  }
  level1();
}

// function level yang berisi gambar gambar untuk karakter, background dan obstacle untuk level tersebut
function level1() {
  // levelOne = new property(0, 0, 1200, 600, "../img/yadzka.jpeg", "background");
  levelOne = new property(0, 0, 1200, 600, "bgfarish1.png", "background");
  karakter = new property(10, 600, 80, 120, "mobil.png", "image");
  musuh = new property(1000, 865, 120, 90, "../img/mobil2.png", "image");
  gameRunning();
}

function gameRunning() {
  this.frame = 0;
  this.interval = setInterval(isi, 20);
}

// funciton yang berisi banyak hal yang diperlukan untuk gamenya
function property(x, y, width, height, color, type) {
  this.x = x;
  this.y = y;
  this.objX = 0;
  this.objY = 0;
  this.width = width;
  this.height = height;
  this.color = color;
  this.type = type;

  // function untuk memberi  limit agar karakter tidak menembus obstacle
  this.crash = function (otherobj) {
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
      mybottom < otherbottom ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  };

  // untuk menampilkan gambar sebagai karakter dan backgrond
  if (type == "image" || type == "background") {
    this.image = new Image();
    this.image.src = color;
  }

  // function update untuk mengupdate gameplay mulai dari looping background
  this.update = function () {
    if (type == "image" || type == "background") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    if (type == "background") {
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }

    //   var x, y;
    //   for (i = 0; i < score.length; i += 1) {
    //     if (karakter.crash(score[i])) {
    //       return;
    //     }
    //   }
    //   level1.frameNo += 1;
    //   if (level1.frameNo == 1 || everyinterval(150)) {
    //     x = level1.canvas.width;
    //     y = level1.canvas.height - 200;
    //     score.push(new property(10, 200, "../img/koin.png", x, y, "image"));
    //   }
    //   for (i = 0; i < score.length; i += 1) {
    //     score[i].x += -1;
    //     score.movement();
    //     score[i].update();
    //   }

    //     function everyinterval(n) {
    //   if ((level1.frameNo / n) % 1 == 0) {
    //     return true;
    //   }
    //   return false;
    // }
  };

  this.newBg = function () {
    this.x += this.objX;
    this.y += this.objY;
    if (this.type == "background") {
      if (this.x == -this.width) {
        this.x = 0;
      }
    }
  };

  // movement untuk membuat karakter bisa bergerak sesuai dengan yang sudah diprogram
  this.movement = function () {
    this.x += this.objX;
    this.y += this.objY;
    this.hitTop();
    this.hitBottom();
    this.hitRight();
    this.hitLeft();
  };

  (this.stop = function () {
    clearInterval(this.interval);
  }),
    // function hit untuk memberi batasan agar karakter dan obstcales tidak melewati batas canvas
    (this.hitTop = function () {
      let objTop = 527 - this.height;
      if (this.y < objTop) {
        this.y = objTop;
      }
    });

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

// function clear untuk clear object pada canvas
function clear() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
}

// function move agar kita bisa menggerakkan karakter
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

// function stop move untuk memberi batasan pergerakan pada karakter
function stopMove(event) {
  const keyPressed = event.keyCode;
  if (keyPressed == left) {
    karakter.objX = 0;
  } else if (keyPressed == right) {
    karakter.objX = 0;
  } else if (keyPressed == up) {
    karakter.objY = 1;
  } else if (keyPressed == down) {
    karakter.objY = 0;
  }
}

// function utama yang berisi gabungan function yang sudah ada dijadikan satu
function isi() {
  if (karakter.crash(musuh)) {
    levelOne.stop();
  } else {
    karakter.movement();
    karakter.update();
    clear();
    levelOne.objX = -5;
    levelOne.newBg();
    levelOne.update();
    // levelOne.update();
    karakter.movement();
    karakter.objX += 0.01;
    karakter.update();
    musuh.objX -= 0.1;
    musuh.update();
    musuh.movement();
  }
}
