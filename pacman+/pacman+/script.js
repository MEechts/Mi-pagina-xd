document.getElementById("jugarBtn").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("startSound").play();
    iniciarJuego(); // Llamamos a la función que inicia el juego
});

// Variables del juego
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let pacman = { x: 50, y: 50, size: 20, dx: 0, dy: 0, speed: 5 };
let ghost = { x: 200, y: 200, size: 20, dx: 2, dy: 0 };

// Mapa básico del laberinto (1 son paredes, 0 es espacio libre)
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
];

// Función para dibujar el laberinto
function drawMaze() {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                ctx.fillStyle = "blue";
                ctx.fillRect(col * 40, row * 40, 40, 40);
            }
        }
    }
}

// Dibujar a Pac-Man
function drawPacman() {
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.size, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

// Dibujar al fantasma
function drawGhost() {
    ctx.fillStyle = "red";
    ctx.fillRect(ghost.x, ghost.y, ghost.size, ghost.size);
}

// Actualizar posición de Pac-Man
function updatePacman() {
    pacman.x += pacman.dx;
    pacman.y += pacman.dy;
}

// Movimiento básico del fantasma
function updateGhost() {
    ghost.x += ghost.dx;
    if (ghost.x > canvas.width - ghost.size || ghost.x < 0) {
        ghost.dx *= -1;
    }
}

// Detectar teclas
document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "ArrowUp") {
        pacman.dx = 0;
        pacman.dy = -pacman.speed;
    } else if (key === "ArrowDown") {
        pacman.dx = 0;
        pacman.dy = pacman.speed;
    } else if (key === "ArrowLeft") {
        pacman.dx = -pacman.speed;
        pacman.dy = 0;
    } else if (key === "ArrowRight") {
        pacman.dx = pacman.speed;
        pacman.dy = 0;
    }
});

// Función principal del juego
function iniciarJuego() {
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMaze();
        drawPacman();
        drawGhost();
        updatePacman();
        updateGhost();
        requestAnimationFrame(gameLoop);
    }
    gameLoop();
}
