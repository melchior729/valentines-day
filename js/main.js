// ========== State Management ==========
const GameState = {
    currentScreen: 'intro',
    score: 0,
    totalHearts: 20,
    heartsSpawned: 0,
    gameActive: false,
    penguinX: 0,
    hearts: [],
    penguinDirection: 'idle' // 'left', 'right', or 'idle'
};

// Movement control intervals (global scope for proper cleanup)
let moveLeftInterval = null;
let moveRightInterval = null;

// Penguin images for canvas
const penguinImages = {
    left: new Image(),
    right: new Image(),
    bored: new Image()
};

// Load penguin images
penguinImages.left.src = 'imgs/penguin-looking-left.png';
penguinImages.right.src = 'imgs/penguin-looking-right.png';
penguinImages.bored.src = 'imgs/penguin-bored.png';

// Audio management
const gameplayMusic = document.getElementById('gameplayMusic');
const celebrationMusic = document.getElementById('celebrationMusic');
const collectSound = document.getElementById('collectSound');

// Simple flag to prevent audio lag on mobile
let canPlayCollectSound = true;

// Play collect sound with throttling to prevent lag
function playCollectSound() {
    if (collectSound && canPlayCollectSound) {
        // Clone the audio node for simultaneous playback without lag
        const sound = collectSound.cloneNode();
        sound.volume = 0.6;
        sound.play().catch(() => {}); // Silently fail if blocked
    }
}

// Track penguin state on question screen
let penguinIsAngry = false;

// ========== Screen Management ==========
function showScreen(screenId) {
    // Clear any active movement intervals when switching screens
    if (moveLeftInterval) {
        clearInterval(moveLeftInterval);
        moveLeftInterval = null;
    }
    if (moveRightInterval) {
        clearInterval(moveRightInterval);
        moveRightInterval = null;
    }
    
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId + 'Screen').classList.add('active');
    GameState.currentScreen = screenId;
}

// ========== Snowflake Animation ==========
function createSnowflakes() {
    const container = document.getElementById('snowflakes');
    const snowflakeChars = ['❄', '❅', '❆'];
    
    for (let i = 0; i < 20; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        container.appendChild(snowflake);
    }
}

// ========== Countdown Logic ==========
function startCountdown() {
    showScreen('countdown');
    let count = 5;
    const countdownNumber = document.getElementById('countdownNumber');
    
    // Set initial count immediately
    countdownNumber.textContent = count;
    countdownNumber.style.animation = 'countdownPulse 1s ease-in-out';
    
    const interval = setInterval(() => {
        count--;
        
        if (count >= 0) {
            countdownNumber.textContent = count;
            // Reset animation
            countdownNumber.style.animation = 'none';
            setTimeout(() => {
                countdownNumber.style.animation = 'countdownPulse 1s ease-in-out';
            }, 10);
        } else {
            clearInterval(interval);
            countdownNumber.textContent = 'GO!';
            countdownNumber.style.animation = 'none';
            setTimeout(() => {
                countdownNumber.style.animation = 'countdownPulse 1s ease-in-out';
            }, 10);
            setTimeout(() => {
                startGame();
            }, 1000);
        }
    }, 1000);
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    
    // Try to start gameplay music from the very beginning
    if (gameplayMusic) {
        gameplayMusic.play().catch(err => {
            console.log('Music autoplay blocked - will play on user interaction:', err);
        });
    }
    
    // Also ensure music plays when Play button is clicked (fallback for autoplay block)
    const playButton = document.getElementById('btnPlay');
    if (playButton) {
        playButton.addEventListener('click', () => {
            if (gameplayMusic && gameplayMusic.paused) {
                gameplayMusic.play().catch(err => {
                    console.log('Music play failed:', err);
                });
            }
        }, { once: false });
    }
});
