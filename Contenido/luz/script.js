document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const audio = document.getElementById('lamp-audio');
    const desktopBtn = document.getElementById('desktop-btn');
    const mobileBtn = document.getElementById('mobile-btn');
    const lampGlow = document.getElementById('lamp-glow');
    const lampBulb = document.getElementById('lamp-bulb');
    const lampContainer = document.getElementById('lamp-container');
    const loveMessage = document.getElementById('love-message');

    // Variables de estado
    let lampOn = false;
    let lampAnimated = false;

    // Texto original del mensaje
    const originalMessage = loveMessage ? loveMessage.textContent : '';

    // Nueva función para el efecto máquina de escribir por líneas con desvanecimiento
    let typeTimeouts = [];
    function typeLoveMessage() {
        if (!loveMessage) return;
        loveMessage.innerHTML = '';
        loveMessage.style.opacity = '1';
        const lines = originalMessage.split(/\r?\n/).filter(line => line.trim() !== '');
        let currentLine = 0;
        function typeLine() {
            if (currentLine < lines.length) {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'love-line';
                loveMessage.appendChild(lineDiv);
                let charIndex = 0;
                function typeChar() {
                    if (charIndex <= lines[currentLine].length) {
                        lineDiv.textContent = lines[currentLine].slice(0, charIndex);
                        charIndex++;
                        typeTimeouts.push(setTimeout(typeChar, 80)); // Un poco más rápido
                    } else {
                        currentLine++;
                        const allLines = loveMessage.querySelectorAll('.love-line');
                        if (allLines.length > 3) {
                            const toFade = allLines[0];
                            // Fijar altura antes de desvanecer
                            const height = toFade.offsetHeight;
                            toFade.style.height = height + 'px';
                            toFade.style.marginTop = getComputedStyle(toFade).marginTop;
                            toFade.style.marginBottom = getComputedStyle(toFade).marginBottom;
                            toFade.style.transition = 'opacity 0.8s, filter 0.8s';
                            // Desvanecer
                            toFade.classList.add('faded');
                            // Tras el fade, eliminar del DOM y subir el resto
                            typeTimeouts.push(setTimeout(() => {
                                if (toFade.parentNode) {
                                    toFade.parentNode.removeChild(toFade);
                                }
                                typeLine(); // Solo después de eliminar, escribe la siguiente línea
                            }, 800)); // Justo al terminar el fade
                        } else {
                            typeTimeouts.push(setTimeout(typeLine, 1200)); // Un poco más rápido entre líneas
                        }
                    }
                }
                typeChar();
            }
        }
        typeTimeouts.push(setTimeout(typeLine, 800)); // Más tiempo antes de empezar a escribir
    }

    // Función para resetear el mensaje y limpiar timeouts
    function resetLoveMessage() {
        if (!loveMessage) return;
        loveMessage.textContent = '';
        loveMessage.style.opacity = '0';
        // Limpiar timeouts activos
        if (typeTimeouts && typeTimeouts.length) {
            typeTimeouts.forEach(t => clearTimeout(t));
            typeTimeouts = [];
        }
    }

    // Función principal para alternar lámpara y música
    function toggleLampAndMusic() {
        lampOn = !lampOn;

        // Sincronizar ambos botones
        const buttons = [desktopBtn, mobileBtn].filter(btn => btn);
        buttons.forEach(btn => {
            if (lampOn) {
                btn.classList.add('on');
                btn.querySelector('span').textContent = 'ON';
            } else {
                btn.classList.remove('on');
                btn.querySelector('span').textContent = 'OFF';
            }
        });

        // Control de las clases del body y lámpara
        if (lampOn) {
            document.body.classList.add('lamp-on', 'light-on');
            lampContainer.classList.add('lamp-on');
            
            // Reproducir música
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(e => console.log('Error reproduciendo audio:', e));
            }

            // Animación de la lámpara en móvil
            if (window.innerWidth <= 600) {
                if (!lampAnimated) {
                    lampAnimated = true;
                    lampContainer.classList.add('lamp-down');
                }
            }

            // Mostrar mensaje con delay
            setTimeout(() => {
                typeLoveMessage();
            }, window.innerWidth <= 600 ? 3000 : 1000);

        } else {
            document.body.classList.remove('lamp-on', 'light-on');
            lampContainer.classList.remove('lamp-on');
            
            // Pausar música
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }

            // Resetear mensaje
            resetLoveMessage();
        }
    }

    // Event listeners para ambos botones
    if (desktopBtn) {
        desktopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLampAndMusic();
        });
    }

    if (mobileBtn) {
        // Event listener para click regular
        mobileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleLampAndMusic();
        });

        // Event listener adicional para touch en móvil
        mobileBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleLampAndMusic();
        });
    }

    // Inicializar mensaje oculto
    resetLoveMessage();
});
