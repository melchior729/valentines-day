// ========== Game Control Event Listeners ==========

// Left button - Touch events
document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (moveLeftInterval) clearInterval(moveLeftInterval);
    moveLeftInterval = setInterval(() => movePenguin('left'), 16);
});

document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    clearInterval(moveLeftInterval);
    moveLeftInterval = null;
    GameState.penguinDirection = 'idle';
});

document.getElementById('btnLeft').addEventListener('touchcancel', (e) => {
    e.preventDefault();
    clearInterval(moveLeftInterval);
    moveLeftInterval = null;
    GameState.penguinDirection = 'idle';
});

// Right button - Touch events
document.getElementById('btnRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (moveRightInterval) clearInterval(moveRightInterval);
    moveRightInterval = setInterval(() => movePenguin('right'), 16);
});

document.getElementById('btnRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    clearInterval(moveRightInterval);
    moveRightInterval = null;
    GameState.penguinDirection = 'idle';
});

document.getElementById('btnRight').addEventListener('touchcancel', (e) => {
    e.preventDefault();
    clearInterval(moveRightInterval);
    moveRightInterval = null;
    GameState.penguinDirection = 'idle';
});

// Left button - Mouse events for PC testing
document.getElementById('btnLeft').addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (moveLeftInterval) clearInterval(moveLeftInterval);
    moveLeftInterval = setInterval(() => movePenguin('left'), 16);
});

document.getElementById('btnLeft').addEventListener('mouseup', (e) => {
    e.preventDefault();
    clearInterval(moveLeftInterval);
    moveLeftInterval = null;
    GameState.penguinDirection = 'idle';
});

document.getElementById('btnLeft').addEventListener('mouseleave', (e) => {
    e.preventDefault();
    clearInterval(moveLeftInterval);
    moveLeftInterval = null;
    GameState.penguinDirection = 'idle';
});

// Right button - Mouse events for PC testing
document.getElementById('btnRight').addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (moveRightInterval) clearInterval(moveRightInterval);
    moveRightInterval = setInterval(() => movePenguin('right'), 16);
});

document.getElementById('btnRight').addEventListener('mouseup', (e) => {
    e.preventDefault();
    clearInterval(moveRightInterval);
    moveRightInterval = null;
    GameState.penguinDirection = 'idle';
});

document.getElementById('btnRight').addEventListener('mouseleave', (e) => {
    e.preventDefault();
    clearInterval(moveRightInterval);
    moveRightInterval = null;
    GameState.penguinDirection = 'idle';
});

// Global mouseup to catch any missed events
document.addEventListener('mouseup', () => {
    if (moveLeftInterval) {
        clearInterval(moveLeftInterval);
        moveLeftInterval = null;
        GameState.penguinDirection = 'idle';
    }
    if (moveRightInterval) {
        clearInterval(moveRightInterval);
        moveRightInterval = null;
        GameState.penguinDirection = 'idle';
    }
});

// Keyboard controls for desktop testing
document.addEventListener('keydown', (e) => {
    if (!GameState.gameActive) return;
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        GameState.penguinDirection = 'left';
        movePenguin('left');
    }
    if (e.key === 'ArrowRight' || e.key === 'd') {
        GameState.penguinDirection = 'right';
        movePenguin('right');
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'ArrowRight' || e.key === 'd') {
        GameState.penguinDirection = 'idle';
    }
});

// ========== Button Event Listeners ==========
document.getElementById('btnPlay').addEventListener('click', startCountdown);
document.getElementById('btnYes').addEventListener('click', startCelebration);

// Play Again button - restart from beginning
document.getElementById('btnPlayAgain').addEventListener('click', () => {
    // Stop celebration music
    if (celebrationMusic) {
        celebrationMusic.pause();
        celebrationMusic.currentTime = 0;
    }
    
    // Restart gameplay music from beginning
    if (gameplayMusic) {
        gameplayMusic.currentTime = 0;
        gameplayMusic.play().catch(err => {
            console.log('Gameplay music restart failed:', err);
        });
    }
    
    // Reset penguin state
    penguinIsAngry = false;
    
    // Reset question penguin to questioning state
    const questionPenguin = document.getElementById('penguinQuestion');
    if (questionPenguin) {
        questionPenguin.src = 'imgs/penguin-questioning.png';
    }
    
    // Go back to intro screen
    showScreen('intro');
});

// No button - changes penguin to angry
document.getElementById('btnNo').addEventListener('click', () => {
    if (!penguinIsAngry) {
        // First time pressing No - cut music and change to angry penguin
        if (gameplayMusic) {
            gameplayMusic.pause();
            gameplayMusic.currentTime = 0;
        }
        
        // Change penguin image to angry
        const questionPenguin = document.getElementById('penguinQuestion');
        if (questionPenguin) {
            questionPenguin.src = 'imgs/penguin-angry.png';
            questionPenguin.alt = 'Angry Penguin';
        }
        
        penguinIsAngry = true;
    }
    // If already angry, do nothing (but button still pressable)
});
