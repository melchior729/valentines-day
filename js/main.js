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

// Track if scary penguin has been shown
let scaryPenguinShown = false;

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
    // FOR TESTING: Skip countdown
    startGame();
    return;
    
    /* Original countdown code - uncomment when ready to use
    showScreen('countdown');
    let count = 5;
    const countdownNumber = document.getElementById('countdownNumber');
    
    const interval = setInterval(() => {
        countdownNumber.textContent = count;
        countdownNumber.style.animation = 'none';
        setTimeout(() => {
            countdownNumber.style.animation = 'countdownPulse 1s ease-in-out';
        }, 10);
        
        count--;
        
        if (count < 0) {
            clearInterval(interval);
            countdownNumber.textContent = 'GO!';
            setTimeout(() => {
                startGame();
            }, 1000);
        }
    }, 1000);
    */
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
});
