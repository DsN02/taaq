// Configura aquí tus imágenes y textos
const images = [
    {src: "img/1.jpeg", text: "Esos hermosos ojos q miraria durante horas "},
    {src: "img/5.jpeg", text: "Esa carita tan hermosa y tierna q consentiria toda mi vida"},
    {src: "img/6.jpeg", text: "Algo q haremos hoy"},
    {src: "img/39.jpg", text:"En realidad tu voz, desde el primer momento me dejo claro q no tendria soledad mientras estuvieras tu "},
    {src: "img/7.jpeg", text: "Tu pelo siempre me parece q es preciosooo, no importa como lo tengas, es muy lindo y cuidado"},
    {src: "img/8.jpeg", text: "El cielo aunque no se compare con tu belleza, siempre me recuerda a ti"},
    {src: "img/9.jpeg", text: "Aunque yo deberia ser ese, desde ahi me di cuenta de q eras muy linda como persona:3"},
    {src: "img/20.jpeg", text: "AYYYYYY!!!!! YO QUIERO DARLE 3 MILLONES DE BESOS A ESOS LABIOS TAN HERMOSOOOOOOOS"},
    {src: "img/22.jpeg", text: "Minino tambien es una cosita preciosa"},
    {src: "img/23.jpeg", text: "Una un poco mas casual, te veias mas chiquita y al instante quise apapacharte pero no te podia decir SJJSJS"},
    {src: "img/24.jpeg", text: "Sienceramente yo a ti te doy un mundo entero, la vi mientras hacia esto y ahhhhhhhh. ME VOLVI ENAMORAR"},
    {src: "img/25.jpeg", text: "Ser quien eres con quien amas es algo q no puedo ni definir lo especial q se siente. Somos lo q somos"},
    {src: "img/26.jpeg", text: "no c por q hice esto pero JSJSJSJJS me perdonas? JSJSJSJJS chale estoy muy enamorado"},
    {src: "img/27.jpeg", text: "Me sorprendio muchisimo q quisieras tener una foto nuestra de perfil. Me hiciste sentir tan importante y feliz"},
    {src: "img/28.jpeg", text: "Entendi q realmente siempre me ponias atencion a cada pequeña cosa, q para ti no era cualquier cosa (iremos por la noche)"},
    {src: "img/29.jpeg", text: "Fue ese mismo dia pero enrealidad ya lo habia escrito amor SJJSJSJSJ solo queria q vieras q lo habia escrito"},
    {src: "img/30.jpeg", text: "No esperaba esto pero era un dia bastante pesado y solo con esto me calme bastante.(este fue de los primero q puse en mi fondo como una burbuja)"},
    {src: "img/31.jpeg", text: "Por favor no olvides tu, eres alguien maravillosa esme. en todo sentido"},
    {src: "img/32.jpeg", text: "Me hiciste un stiker. Q te crees q por me fascinas y estoy completamente enamorado de ti lo iba a permitir...... PUES SI "},
    {src: "img/33.jpeg", text: "Aunque ya te lo habia dicho muchas veces (lo decia por q realmente me gustabas y me gustas, queria q lo supieras y supieras q queria estar junto a ti:3. pero q me mandaras eso, ay! ME ENCANTAAAAAAAAAAAAAAS LA QUIERO MUCHISIMOOOOOOOOOOOOOOOOOOOOOO"},
    {src: "img/34.jpeg", text: "De las primeras cosas q hablamos fue de nuestros gustos aunque nos enfocamos muchisimo en la naturaleza de repente hablamos de varias historias y lugares, solamente hablando de esos lugares especiales"},
    {src: "img/35.jpeg", text: "Aquellos lugares q en algun momento visitaremos juntos"},
    {src: "img/38.jpeg", text: "Lo q vendria a ser nuestra hija:3, esa gordita q reacciono al instante a tu hermosa voz"},
    {src: "img/36.jpeg", text: "Texto para la imagen 36"},
    {src: "img/37.jpeg", text: "Nunca fue como estuvieras. Yo me enamore de algo mas. Algo mucho mas hermoso q cualquier cosa externa "},
    {src: "img/4.jpeg", text: "Este lugar se q es especial, no se si vayas a ir sola antes pero prometo q te llevare mi niña 🖤"},
    {src: "img/40.png", text: "Yo te amo.Pero sabes por q me enamore de ti?"},

];

const visibleCount = 3;
let startIdx = 0;

const gallery = document.getElementById('gallery');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

// Modal elements
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalText = document.getElementById('modalText');
const modalClose = document.getElementById('modalClose');

function mod(n, m) {
    return ((n % m) + m) % m;
}

function renderGallery() {
    gallery.innerHTML = '';
    for (let i = 0; i < visibleCount; i++) {
        const idx = mod(startIdx + i, images.length);
        const img = document.createElement('img');
        img.src = images[idx].src;
        img.className = 'gallery-item';
        img.alt = (idx + 1).toString();
        img.setAttribute('data-text', images[idx].text);
        if (i === Math.floor(visibleCount/2)) img.classList.add('active');
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modalText.textContent = img.getAttribute('data-text') || '';
            modal.classList.add('open');
        });
        gallery.appendChild(img);
    }
}

// Navegación circular
btnLeft.addEventListener('click', () => {
    startIdx = mod(startIdx - visibleCount, images.length);
    renderGallery();
});

btnRight.addEventListener('click', () => {
    startIdx = mod(startIdx + visibleCount, images.length);
    renderGallery();
});

window.addEventListener('load', renderGallery);
window.addEventListener('resize', renderGallery);

// Modal logic
modalClose.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
});d
