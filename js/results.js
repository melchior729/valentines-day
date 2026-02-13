// ========== Results Logic ==========
function showResults() {
    showScreen('results');
    
    const percentage = (GameState.score / GameState.totalHearts) * 100;
    const resultsPenguin = document.getElementById('resultsPenguin');
    const penguinImg = document.getElementById('penguinResult');
    const resultsTitle = document.getElementById('resultsTitle');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const resultsMessage = document.getElementById('resultsMessage');
    const resultsButton = document.getElementById('resultsButton');
    
    scoreDisplay.textContent = `${GameState.score} / ${GameState.totalHearts}`;
    
    // Determine message and penguin image based on score
    if (percentage === 100) {
        // Perfect score - overjoyed
        resultsPenguin.className = 'penguin overjoyed';
        penguinImg.src = 'imgs/penguin-overjoyed.png';
        penguinImg.alt = 'Overjoyed Penguin';
        resultsTitle.textContent = 'Perfect! 🌟';
        resultsMessage.textContent = 'Absolutely incredible! You caught every single heart! You\'re a true champion!';
        resultsButton.textContent = 'Continue';
        resultsButton.className = 'btn btn-primary';
        resultsButton.onclick = () => {
            // Reset penguin to questioning state when going to question screen
            penguinIsAngry = false;
            const questionPenguin = document.getElementById('penguinQuestion');
            if (questionPenguin) {
                questionPenguin.src = 'imgs/penguin-questioning.png';
            }
            showScreen('question');
        };
    } else if (percentage >= 75) {
        // Good score - pleasant/happy
        resultsPenguin.className = 'penguin happy';
        penguinImg.src = 'imgs/penguin-pleasant.png';
        penguinImg.alt = 'Pleasant Penguin';
        resultsTitle.textContent = 'Well Done! 😊';
        resultsMessage.textContent = 'Great job! You caught enough hearts to make the penguin happy!';
        resultsButton.textContent = 'Continue';
        resultsButton.className = 'btn btn-primary';
        resultsButton.onclick = () => {
            // Reset penguin to questioning state when going to question screen
            penguinIsAngry = false;
            const questionPenguin = document.getElementById('penguinQuestion');
            if (questionPenguin) {
                questionPenguin.src = 'imgs/penguin-questioning.png';
            }
            showScreen('question');
        };
    } else if (percentage >= 50) {
        // Mid score - bored
        resultsPenguin.className = 'penguin bored';
        penguinImg.src = 'imgs/penguin-bored.png';
        penguinImg.alt = 'Bored Penguin';
        resultsTitle.textContent = 'Pretty Average... 😐';
        resultsMessage.textContent = 'Meh, that was pretty mid. You need at least 15 hearts to continue. Try again!';
        resultsButton.textContent = 'Try Again';
        resultsButton.className = 'btn btn-secondary';
        resultsButton.onclick = startCountdown;
    } else if (percentage >= 25) {
        // Low score - angry
        resultsPenguin.className = 'penguin angry';
        penguinImg.src = 'imgs/penguin-angry.png';
        penguinImg.alt = 'Angry Penguin';
        resultsTitle.textContent = 'Not Great... 😠';
        resultsMessage.textContent = 'That wasn\'t very good. You need at least 15 hearts to continue. Give it another shot!';
        resultsButton.textContent = 'Try Again';
        resultsButton.className = 'btn btn-secondary';
        resultsButton.onclick = startCountdown;
    } else {
        // Very low score - very angry
        resultsPenguin.className = 'penguin angry';
        penguinImg.src = 'imgs/penguin-angry.png';
        penguinImg.alt = 'Very Angry Penguin';
        resultsTitle.textContent = 'Oh No... 😤';
        resultsMessage.textContent = 'That was rough! You need at least 15 hearts to continue. Don\'t give up!';
        resultsButton.textContent = 'Try Again';
        resultsButton.className = 'btn btn-secondary';
        resultsButton.onclick = startCountdown;
    }
}

// ========== Celebration Logic ==========
function startCelebration() {
    showScreen('celebration');
    
    // Stop gameplay music if it's still playing
    if (gameplayMusic) {
        gameplayMusic.pause();
        gameplayMusic.currentTime = 0;
    }
    
    // Play celebration music (no loop) - fanfare!
    if (celebrationMusic) {
        celebrationMusic.currentTime = 0;
        celebrationMusic.play().catch(err => {
            console.log('Celebration music play failed:', err);
        });
    }
    
    createFloatingHearts();
    createConfetti();
}

function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '0';
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3000);
    }, 300);
}

function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#FF1493', '#FF85B3', '#FFB6D9', '#B4D7E8', '#6CB4E8', '#4A90C7'];
    
    setInterval(() => {
        for (let i = 0; i < 5; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }
    }, 200);
}
