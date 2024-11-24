const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;

// Variables del mensaje
const message = "Ella me habla de sus sueños, de construir un mundo juntos, y yo en silencio la admiro, viendo a mi sueño hablar.";
let messageIndex = 0;
let messageDisplay = "";
let lines = [];
const lineHeight = 50; // Espaciado entre líneas
const maxWidth = 700; // Ancho máximo para texto
let frameCounter = 0; // Contador de fotogramas para ralentizar el mensaje
const framesPerLetter = 5;

// Gradiente de color para el texto
const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0, '#FF5733');
gradient.addColorStop(0.5, '#FFC300');
gradient.addColorStop(1, '#FF5733');

// Fuente personalizada
ctx.font = "40px 'Dancing Script', cursive";
ctx.textAlign = "center";

// Variables para animaciones de la carita
let angle = 0;

// Variables para los fuegos artificiales
let fireworks = [];

// Función para dividir el texto en líneas
function wrapText(text, maxWidth) {
    const words = text.split(' ');
    let line = '';
    let result = [];

    for (let word of words) {
        let testLine = line + word + ' ';
        let testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxWidth && line !== '') {
            result.push(line.trim());
            line = word + ' ';
        } else {
            line = testLine;
        }
    }
    result.push(line.trim());
    return result;
}

// Función para mostrar el mensaje gradualmente
function drawMessage() {
    frameCounter++;
    if (frameCounter >= framesPerLetter && messageIndex < message.length) {
        messageDisplay += message[messageIndex];
        messageIndex++;
        frameCounter = 0; // Reiniciar contador
        lines = wrapText(messageDisplay, maxWidth);
    }

    ctx.fillStyle = gradient;
    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2;

    // Dibujar cada línea
    let y = canvas.height - 200;
    lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, y + index * lineHeight);
    });
}

// Función para dibujar la carita animada
function drawFace() {
    const centerX = canvas.width / 2 + Math.sin(angle) * 10;
    const centerY = canvas.height / 2 - 50;

    // Cabeza
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 100, 0, 2 * Math.PI);
    ctx.fill();

    // Ojos
    ctx.fillStyle = 'red';
    const eyeOffsetX = 35;
    const eyeOffsetY = 30;
    const eyeSize = Math.abs(Math.sin(angle)) * 10 + 15;
    ctx.beginPath();
    ctx.arc(centerX - eyeOffsetX, centerY - eyeOffsetY, eyeSize, 0, 2 * Math.PI);
    ctx.arc(centerX + eyeOffsetX, centerY - eyeOffsetY, eyeSize, 0, 2 * Math.PI);
    ctx.fill();

    // Boca
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(centerX, centerY + 20, 50, 0, Math.PI, false);
    ctx.fill();
}

// Función para los fuegos artificiales
function drawFireworks() {
    if (Math.random() < 0.1) {
        fireworks.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height / 2,
            radius: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            lifetime: 100
        });
    }

    fireworks.forEach((firework, index) => {
        ctx.fillStyle = firework.color;
        ctx.beginPath();
        ctx.arc(firework.x, firework.y, firework.radius, 0, 2 * Math.PI);
        ctx.fill();

        firework.lifetime--;
        firework.radius += 0.5;

        if (firework.lifetime <= 0) {
            fireworks.splice(index, 1);
        }
    });
}

// Animación principal
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar elementos
    drawFireworks();
    drawFace();
    drawMessage();

    // Actualizar ángulo para animación
    angle += 0.05;

    requestAnimationFrame(animate);
}

// Iniciar animación
animate();
