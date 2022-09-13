var karakter = document.getElementById("karakter");
var block = document.getElementById("block");
function jump() {
  if (karakter.classList != "animasi") {
    karakter.classList.add("animasi");
  }
  setTimeout(function () {
    karakter.classList.remove("animasi");
  }, 500);
}

var checkdead = setInterval(function () {
  var karakterTop = parseInt(
    window.getComputedStyle(karakter).getPropertyValue("top")
  );
  var blockleft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockleft < 20 && blockleft > 0 && karakterTop >= 130) {
    block.style.animation = "none";
    block.style.display = "none";
    alert("u lose.");
  }
}, 10);
