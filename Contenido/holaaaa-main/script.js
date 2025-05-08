const buttonNo = document.querySelector('#no')
const buttonYes = document.querySelector('#yes')

let fontSize = 2

let messages = [
  'Estas segura?',
  'Piensalo bien',
  'Piensalo muy bien',
  'Piensalo',
  'Mira el otro botón'
]

buttonNo.addEventListener('click', () => {
  fontSize = fontSize + .5
  buttonYes.style.fontSize = `${fontSize}rem`

  const indexRandom = Math.floor(Math.random() * messages.length)

  buttonNo.textContent = messages[indexRandom]
})

buttonYes.addEventListener('click', () => {
  document.querySelector('#message').style.display = 'flex';
  document.querySelector('#dino-image').style.display = 'block';
  document.querySelector('#extra-image').style.display = 'block';
    document.querySelector('#message').style.display = 'flex'; // Muestra el mensaje
    document.querySelector('#message img').style.display = 'block'; // Muestra las imágenes dentro del mensaje
    // Oculta la pregunta y las opciones sin afectar #message
    document.querySelectorAll('main h1, .options, main > img').forEach(el => el.style.display = 'none');
});

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var starDensity = .216;
var speedCoeff = .1;
var width;
var height;
var starCount;
var circleRadius;
var circleCenter;
var first = true;
var giantColor = '180,184,240';
var starColor = '226,225,142';
var cometColor = '226,225,224';
var canva = document.getElementById('universe');
var stars = [];

function windowResizeHandler() {
    width = window.innerWidth;
    height = window.innerHeight;
    starCount = width * starDensity;
    circleRadius = (width > height ? height / 2 : width / 2);
    circleCenter = { x: width / 2, y: height / 2 };
    canva.width = width;
    canva.height = height;
}

function drawStars() {
    let ctx = canva.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
        ctx.fillStyle = `rgb(${starColor})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(drawStars);
}

function createStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2,
        });
    }
}

windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
createStars();
drawStars();

