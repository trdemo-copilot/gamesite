// game.js - Number Guessing Game Logic
// 由AI生成，请务必仔细验证

class NumberGuessingGame {
    constructor() {
        this.targetNumber = 0;
        this.attempts = 0;
        this.guesses = [];
        this.minRange = 1;
        this.maxRange = 100;
        
        // Get DOM elements
        this.guessInput = document.getElementById('guess-input');
        this.submitBtn = document.getElementById('submit-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.messageDiv = document.getElementById('message');
        this.attemptsCount = document.getElementById('attempts-count');
        this.historyList = document.getElementById('history-list');
        
        this.init();
    }

    init() {
        this.resetGame();
        this.setupEventListeners();
        
        // Listen for language changes to update messages
        window.addEventListener('languageChanged', () => {
            this.updateHistoryDisplay();
            if (this.lastMessageKey) {
                this.showMessage(this.lastMessageKey, this.lastMessageType, this.lastMessageParams);
            }
        });
    }

    setupEventListeners() {
        this.submitBtn.addEventListener('click', () => this.handleGuess());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleGuess();
            }
        });
    }

    resetGame() {
        this.targetNumber = Math.floor(Math.random() * this.maxRange) + this.minRange;
        this.attempts = 0;
        this.guesses = [];
        this.attemptsCount.textContent = '0';
        this.guessInput.value = '';
        this.guessInput.disabled = false;
        this.submitBtn.disabled = false;
        this.historyList.innerHTML = '';
        this.showMessage('message-welcome', 'info');
        
        console.log('New game started. Target number:', this.targetNumber); // For debugging
    }

    handleGuess() {
        const guess = parseInt(this.guessInput.value);
        
        // Validate input
        if (isNaN(guess) || guess < this.minRange || guess > this.maxRange) {
            this.showMessage('message-invalid', 'error');
            return;
        }

        this.attempts++;
        this.guesses.push(guess);
        this.attemptsCount.textContent = this.attempts;
        this.addToHistory(guess);

        if (guess === this.targetNumber) {
            this.showMessage('message-correct', 'success', { attempts: this.attempts });
            this.guessInput.disabled = true;
            this.submitBtn.disabled = true;
        } else if (guess < this.targetNumber) {
            this.showMessage('message-too-low', 'info');
        } else {
            this.showMessage('message-too-high', 'info');
        }

        this.guessInput.value = '';
        this.guessInput.focus();
    }

    showMessage(messageKey, type = 'info', params = {}) {
        this.lastMessageKey = messageKey;
        this.lastMessageType = type;
        this.lastMessageParams = params;
        
        const message = i18n.translate(messageKey, params);
        this.messageDiv.textContent = message;
        this.messageDiv.className = `message ${type}`;
    }

    addToHistory(guess) {
        const li = document.createElement('li');
        const guessText = i18n.translate('guess-format', { 
            number: this.attempts, 
            guess: guess 
        });
        li.textContent = guessText;
        li.dataset.attemptNumber = this.attempts;
        li.dataset.guessValue = guess;
        this.historyList.insertBefore(li, this.historyList.firstChild);
    }

    updateHistoryDisplay() {
        // Update all history items with current language
        const historyItems = this.historyList.querySelectorAll('li');
        historyItems.forEach(li => {
            const attemptNumber = li.dataset.attemptNumber;
            const guessValue = li.dataset.guessValue;
            const guessText = i18n.translate('guess-format', { 
                number: attemptNumber, 
                guess: guessValue 
            });
            li.textContent = guessText;
        });
    }
}

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NumberGuessingGame();
    });
} else {
    new NumberGuessingGame();
}
