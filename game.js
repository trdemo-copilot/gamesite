class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('high-score');
        this.gameOverElement = document.getElementById('game-over');
        this.finalScoreElement = document.getElementById('final-score');
        this.restartBtn = document.getElementById('restart-btn');
        this.playAgainBtn = document.getElementById('play-again-btn');

        // Game settings
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;

        // Ensure game over is hidden first
        this.gameOverElement.style.display = 'none';

        // Initialize game state
        this.init();
        
        // Event listeners
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        this.restartBtn.addEventListener('click', this.restart.bind(this));
        this.playAgainBtn.addEventListener('click', this.restart.bind(this));

        // Load high score from localStorage
        this.highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
        this.highScoreElement.textContent = this.highScore;

        // Start game loop
        this.gameLoop();
    }

    init() {
        // Snake initial position
        this.snake = [
            { x: 10, y: 10 }
        ];
        
        // Initial direction
        this.dx = 0;
        this.dy = 0;
        
        // Food position
        this.generateFood();
        
        // Game state
        this.score = 0;
        this.gameRunning = true;
        
        this.updateScore();
        this.hideGameOver();
    }

    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };

        // Make sure food doesn't spawn on snake
        for (let segment of this.snake) {
            if (segment.x === this.food.x && segment.y === this.food.y) {
                this.generateFood();
                return;
            }
        }
    }

    handleKeyPress(event) {
        if (!this.gameRunning) return;

        const key = event.key;
        
        // Prevent snake from going backward
        switch (key) {
            case 'ArrowUp':
                if (this.dy !== 1) {
                    this.dx = 0;
                    this.dy = -1;
                }
                break;
            case 'ArrowDown':
                if (this.dy !== -1) {
                    this.dx = 0;
                    this.dy = 1;
                }
                break;
            case 'ArrowLeft':
                if (this.dx !== 1) {
                    this.dx = -1;
                    this.dy = 0;
                }
                break;
            case 'ArrowRight':
                if (this.dx !== -1) {
                    this.dx = 1;
                    this.dy = 0;
                }
                break;
        }
    }

    update() {
        if (!this.gameRunning) return;

        // Calculate new head position
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }

        // Check self collision
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }

        this.snake.unshift(head);

        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScore();
            this.generateFood();
        } else {
            // Remove tail if no food eaten
            this.snake.pop();
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = '#27ae60';
        for (let i = 0; i < this.snake.length; i++) {
            const segment = this.snake[i];
            
            // Make head slightly different color
            if (i === 0) {
                this.ctx.fillStyle = '#2ecc71';
            } else {
                this.ctx.fillStyle = '#27ae60';
            }
            
            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        }

        // Draw food
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 1,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.highScoreElement.textContent = this.highScore;
            localStorage.setItem('snakeHighScore', this.highScore.toString());
        }
    }

    gameOver() {
        this.gameRunning = false;
        this.finalScoreElement.textContent = this.score;
        this.showGameOver();
    }

    showGameOver() {
        this.gameOverElement.style.display = 'block';
    }

    hideGameOver() {
        this.gameOverElement.style.display = 'none';
    }

    restart() {
        this.hideGameOver();
        this.init();
    }

    gameLoop() {
        this.update();
        this.draw();
        
        // Continue game loop
        setTimeout(() => {
            this.gameLoop();
        }, 150); // Game speed (150ms = slower, 100ms = faster)
    }
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SnakeGame();
});