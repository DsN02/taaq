
onload = () => {
    // Quitar la clase que bloquea las animaciones generales
    document.body.classList.remove("container");

    // Animación del título (si existe el elemento)
    const titleElement = document.getElementById('title');
    if (titleElement) {
        const text = 'te quiero mi precioso cielo ;3';
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                titleElement.innerHTML += text[index];
                index++;
                setTimeout(typeWriter, 300);
            }
        }
        typeWriter();
    }
};
