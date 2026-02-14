// ========== Game Logic ==========
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let animationId;

// Game objects
const penguin = {
    width: 50,
    height: 50,
    x: canvas.width / 2 - 25,
    y: canvas.height - 80,
    speed: 8
};

class Heart {
    constructor() {
        this.width = 30;
        this.height = 30;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height;
        // Faster falling speed for more challenge
        this.speed = 2.5 + Math.random() * 1.5;
        this.caught = false;
    }
    
    update() {
        this.y += this.speed;
    }
    
    draw() {
        ctx.fillStyle = '#FF1493';
        ctx.font = '30px Arial';
        ctx.fillText('❤', this.x, this.y);
    }
    
    isOffScreen() {
        return this.y > canvas.height;
    }
    
    checkCollision(penguin) {
        return this.x < penguin.x + penguin.width &&
               this.x + this.width > penguin.x &&
               this.y < penguin.y + penguin.height &&
               this.y + this.height > penguin.y;
    }
}

function startGame() {
    showScreen('game');
    document.getElementById('gameControls').classList.add('active');
    document.getElementById('gameCounter').classList.add('active');
    
    // Make sure gameplay music is playing (in case it was paused)
    if (gameplayMusic && gameplayMusic.paused) {
        gameplayMusic.play().catch(err => {
            console.log('Gameplay music play failed:', err);
        });
    }
    
    // Clear any existing movement intervals to prevent momentum bug
    clearInterval(moveLeftInterval);
    clearInterval(moveRightInterval);
    moveLeftInterval = null;
    moveRightInterval = null;
    
    // Reset game state completely
    GameState.score = 0;
    GameState.heartsSpawned = 0;
    GameState.hearts = [];
    GameState.gameActive = true;
    GameState.penguinDirection = 'idle';
    
    // Fully reset penguin position
    penguin.x = canvas.width / 2 - 25;
    penguin.y = canvas.height - 80;
    
    updateCounter();
    gameLoop();
}

function gameLoop() {
    if (!GameState.gameActive) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Antarctic background
    drawBackground();
    
    // Spawn new hearts
    if (GameState.heartsSpawned < GameState.totalHearts) {
        if (Math.random() < 0.025) { // 2.5% chance per frame (faster spawn rate)
            GameState.hearts.push(new Heart());
            GameState.heartsSpawned++;
        }
    }
    
    // Update and draw hearts
    for (let i = GameState.hearts.length - 1; i >= 0; i--) {
        const heart = GameState.hearts[i];
        
        if (!heart.caught) {
            heart.update();
            heart.draw();
            
            // Check collision with penguin
            if (heart.checkCollision(penguin)) {
                heart.caught = true;
                GameState.score++;
                updateCounter();
                GameState.hearts.splice(i, 1);
                
                // Play collect sound - simple and reliable
                try {
                    const collectAudio = new Audio('audio/collect.mp3');
                    collectAudio.volume = 0.5;
                    collectAudio.play();
                } catch (e) {
                    // Silently ignore if audio fails
                }
            } else if (heart.isOffScreen()) {
                GameState.hearts.splice(i, 1);
            }
        }
    }
    
    // Draw penguin
    drawPenguin();
    
    // Check if game is over
    if (GameState.heartsSpawned >= GameState.totalHearts && GameState.hearts.length === 0) {
        endGame();
        return;
    }
    
    animationId = requestAnimationFrame(gameLoop);
}

function drawBackground() {
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#B4D7E8');
    gradient.addColorStop(1, '#FFFFFF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Snow ground
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50);
    ctx.quadraticCurveTo(canvas.width / 2, canvas.height - 70, canvas.width, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();
}

function drawPenguin() {
    // Draw penguin image based on direction
    let img;
    if (GameState.penguinDirection === 'left') {
        img = penguinImages.left;
    } else if (GameState.penguinDirection === 'right') {
        img = penguinImages.right;
    } else {
        img = penguinImages.bored; // idle state
    }
    
    // Check if image is loaded, otherwise draw emoji fallback
    if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, penguin.x, penguin.y - 5, penguin.width, penguin.height);
    } else {
        // Fallback to emoji if image not loaded
        ctx.font = '50px Arial';
        ctx.fillText('🐧', penguin.x, penguin.y + penguin.height);
    }
}

function movePenguin(direction) {
    // Only move if game is active
    if (!GameState.gameActive) return;
    
    if (direction === 'left') {
        GameState.penguinDirection = 'left';
        penguin.x = Math.max(0, penguin.x - penguin.speed);
    } else if (direction === 'right') {
        GameState.penguinDirection = 'right';
        penguin.x = Math.min(canvas.width - penguin.width, penguin.x + penguin.speed);
    }
}

function updateCounter() {
    document.getElementById('gameCounter').textContent = `${GameState.score} / ${GameState.totalHearts}`;
}

function endGame() {
    GameState.gameActive = false;
    GameState.penguinDirection = 'idle';
    cancelAnimationFrame(animationId);
    
    // Keep gameplay music playing (continues into results screen)
    // Will only stop when celebration starts or No is pressed
    
    // Clear any active movement intervals
    clearInterval(moveLeftInterval);
    clearInterval(moveRightInterval);
    moveLeftInterval = null;
    moveRightInterval = null;
    
    document.getElementById('gameControls').classList.remove('active');
    document.getElementById('gameCounter').classList.remove('active');
    showResults();
}
