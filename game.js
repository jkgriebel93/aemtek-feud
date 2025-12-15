// Family Feud Game Logic

class FamilyFeudGame {
    constructor() {
        this.team1Name = 'Team 1';
        this.team2Name = 'Team 2';
        this.team1Score = 0;
        this.team2Score = 0;
        this.currentTeam = 1;
        this.roundPoints = 0;
        this.strikes = 0;
        this.maxStrikes = 3;
        this.currentRound = 0;
        this.currentQuestion = null;
        this.revealedAnswers = [];
        this.usedQuestions = [];
        this.totalRounds = 5;
        this.gameStarted = false;

        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        // Screens
        this.titleScreen = document.getElementById('title-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.winnerScreen = document.getElementById('winner-screen');

        // Title screen elements
        this.team1NameInput = document.getElementById('team1-name');
        this.team2NameInput = document.getElementById('team2-name');
        this.startGameBtn = document.getElementById('start-game');

        // Game screen elements
        this.team1Label = document.getElementById('team1-label');
        this.team2Label = document.getElementById('team2-label');
        this.team1ScoreDisplay = document.getElementById('team1-score');
        this.team2ScoreDisplay = document.getElementById('team2-score');
        this.team1Display = document.getElementById('team1-display');
        this.team2Display = document.getElementById('team2-display');
        this.roundNumberDisplay = document.getElementById('round-number');
        this.roundPointsDisplay = document.getElementById('round-points');
        this.questionText = document.getElementById('question-text');
        this.answerBoard = document.getElementById('answer-board');
        this.guessInput = document.getElementById('guess-input');
        this.submitGuessBtn = document.getElementById('submit-guess');

        // Strike elements
        this.strikeElements = [
            document.getElementById('strike1'),
            document.getElementById('strike2'),
            document.getElementById('strike3')
        ];

        // Host control buttons
        this.newRoundBtn = document.getElementById('new-round');
        this.switchTeamBtn = document.getElementById('switch-team');
        this.addStrikeBtn = document.getElementById('add-strike');
        this.awardPointsBtn = document.getElementById('award-points');
        this.revealAllBtn = document.getElementById('reveal-all');
        this.revealButtons = document.querySelectorAll('.reveal-btn');

        // Overlays
        this.strikeOverlay = document.getElementById('strike-overlay');
        this.correctOverlay = document.getElementById('correct-overlay');

        // Winner screen elements
        this.winnerName = document.getElementById('winner-name');
        this.finalTeam1Name = document.getElementById('final-team1-name');
        this.finalTeam1Score = document.getElementById('final-team1-score');
        this.finalTeam2Name = document.getElementById('final-team2-name');
        this.finalTeam2Score = document.getElementById('final-team2-score');
        this.playAgainBtn = document.getElementById('play-again');
    }

    bindEvents() {
        this.startGameBtn.addEventListener('click', () => this.startGame());
        this.submitGuessBtn.addEventListener('click', () => this.submitGuess());
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitGuess();
        });

        // Host controls
        this.newRoundBtn.addEventListener('click', () => this.newRound());
        this.switchTeamBtn.addEventListener('click', () => this.switchTeam());
        this.addStrikeBtn.addEventListener('click', () => this.addStrike());
        this.awardPointsBtn.addEventListener('click', () => this.awardPoints());
        this.revealAllBtn.addEventListener('click', () => this.revealAllAnswers());
        this.playAgainBtn.addEventListener('click', () => this.resetGame());

        // Manual reveal buttons
        this.revealButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                this.revealAnswer(index);
            });
        });

        // Answer row clicks
        this.answerBoard.querySelectorAll('.answer-row').forEach(row => {
            row.addEventListener('click', () => {
                const index = parseInt(row.dataset.index);
                this.revealAnswer(index);
            });
        });
    }

    startGame() {
        this.team1Name = this.team1NameInput.value.trim() || 'Team 1';
        this.team2Name = this.team2NameInput.value.trim() || 'Team 2';

        this.team1Label.textContent = this.team1Name;
        this.team2Label.textContent = this.team2Name;

        this.titleScreen.classList.remove('active');
        this.gameScreen.classList.add('active');

        this.updateTeamDisplay();
        this.gameStarted = true;
    }

    newRound() {
        // Check if we've played all rounds
        if (this.currentRound >= this.totalRounds) {
            this.endGame();
            return;
        }

        // Get fresh questions from the manager (in case they were modified)
        const allQuestions = questionManager.getAll();

        // Get a random question that hasn't been used
        const availableQuestions = allQuestions.filter((q, i) => !this.usedQuestions.includes(i));

        if (availableQuestions.length === 0) {
            this.usedQuestions = [];
            this.newRound();
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        this.currentQuestion = availableQuestions[randomIndex];
        const originalIndex = allQuestions.indexOf(this.currentQuestion);
        this.usedQuestions.push(originalIndex);

        this.currentRound++;
        this.roundPoints = 0;
        this.strikes = 0;
        this.revealedAnswers = [];

        // Reset displays
        this.roundNumberDisplay.textContent = this.currentRound;
        this.roundPointsDisplay.textContent = '0';
        this.questionText.textContent = this.currentQuestion.question;

        // Reset strikes
        this.strikeElements.forEach(el => el.classList.remove('active'));

        // Reset answer board
        this.resetAnswerBoard();

        // Reset reveal buttons
        this.revealButtons.forEach(btn => btn.classList.remove('revealed'));

        // Clear guess input
        this.guessInput.value = '';
        this.guessInput.focus();
    }

    resetAnswerBoard() {
        const rows = this.answerBoard.querySelectorAll('.answer-row');
        const answerCount = this.currentQuestion ? this.currentQuestion.answers.length : 8;

        rows.forEach((row, index) => {
            row.classList.remove('revealed');
            const textEl = row.querySelector('.answer-text');
            const pointsEl = row.querySelector('.answer-points');

            if (index < answerCount) {
                row.style.display = 'flex';
                textEl.textContent = '???';
                pointsEl.textContent = '??';
            } else {
                row.style.display = 'none';
            }
        });

        // Update reveal buttons visibility
        this.revealButtons.forEach((btn, index) => {
            btn.style.display = index < answerCount ? 'block' : 'none';
        });
    }

    submitGuess() {
        if (!this.currentQuestion) {
            this.showMessage('Start a new round first!');
            return;
        }

        const guess = this.guessInput.value.trim().toLowerCase();
        if (!guess) return;

        const matchedIndex = this.findMatchingAnswer(guess);

        if (matchedIndex !== -1 && !this.revealedAnswers.includes(matchedIndex)) {
            this.revealAnswer(matchedIndex);
            this.showCorrectOverlay();
        } else if (matchedIndex !== -1 && this.revealedAnswers.includes(matchedIndex)) {
            this.showMessage('Already revealed!');
        } else {
            this.addStrike();
        }

        this.guessInput.value = '';
        this.guessInput.focus();
    }

    findMatchingAnswer(guess) {
        if (!this.currentQuestion) return -1;

        guess = guess.toLowerCase().trim();

        for (let i = 0; i < this.currentQuestion.answers.length; i++) {
            const answer = this.currentQuestion.answers[i];
            const answerText = answer.text.toLowerCase();
            const acceptedAnswers = answer.accepted || [];

            // Check main answer
            if (answerText.includes(guess) || guess.includes(answerText)) {
                return i;
            }

            // Check accepted variations
            for (const accepted of acceptedAnswers) {
                const acceptedLower = accepted.toLowerCase();
                if (acceptedLower.includes(guess) || guess.includes(acceptedLower)) {
                    return i;
                }
            }

            // Fuzzy match - if guess is similar enough
            if (this.isSimilar(guess, answerText)) {
                return i;
            }
        }

        return -1;
    }

    isSimilar(str1, str2) {
        // Simple similarity check - if strings share significant overlap
        str1 = str1.replace(/[^a-z0-9]/g, '');
        str2 = str2.replace(/[^a-z0-9]/g, '');

        if (str1.length < 3 || str2.length < 3) return false;

        // Check if one contains most of the other
        const shorter = str1.length < str2.length ? str1 : str2;
        const longer = str1.length < str2.length ? str2 : str1;

        // Check for substring match with at least 70% of shorter string
        const minMatchLength = Math.ceil(shorter.length * 0.7);
        for (let i = 0; i <= shorter.length - minMatchLength; i++) {
            const substring = shorter.substring(i, i + minMatchLength);
            if (longer.includes(substring)) {
                return true;
            }
        }

        return false;
    }

    revealAnswer(index) {
        if (!this.currentQuestion) return;
        if (index >= this.currentQuestion.answers.length) return;
        if (this.revealedAnswers.includes(index)) return;

        this.revealedAnswers.push(index);
        const answer = this.currentQuestion.answers[index];

        // Update answer board
        const row = this.answerBoard.querySelector(`[data-index="${index}"]`);
        row.classList.add('revealed');
        row.querySelector('.answer-text').textContent = answer.text;
        row.querySelector('.answer-points').textContent = answer.points;

        // Update reveal button
        this.revealButtons[index].classList.add('revealed');

        // Add points to round
        this.roundPoints += answer.points;
        this.roundPointsDisplay.textContent = this.roundPoints;

        // Check if all answers revealed
        if (this.revealedAnswers.length === this.currentQuestion.answers.length) {
            this.showMessage('All answers revealed!');
        }
    }

    revealAllAnswers() {
        if (!this.currentQuestion) return;

        for (let i = 0; i < this.currentQuestion.answers.length; i++) {
            if (!this.revealedAnswers.includes(i)) {
                this.revealAnswer(i);
            }
        }
    }

    addStrike() {
        if (this.strikes >= this.maxStrikes) return;

        this.strikes++;
        this.strikeElements[this.strikes - 1].classList.add('active');
        this.showStrikeOverlay();

        // Check for 3 strikes
        if (this.strikes >= this.maxStrikes) {
            setTimeout(() => {
                this.showMessage(`${this.maxStrikes} strikes! Other team can steal!`);
            }, 800);
        }
    }

    switchTeam() {
        this.currentTeam = this.currentTeam === 1 ? 2 : 1;
        this.updateTeamDisplay();
    }

    updateTeamDisplay() {
        if (this.currentTeam === 1) {
            this.team1Display.classList.add('active');
            this.team2Display.classList.remove('active');
        } else {
            this.team1Display.classList.remove('active');
            this.team2Display.classList.add('active');
        }
    }

    awardPoints() {
        if (this.roundPoints === 0) {
            this.showMessage('No points to award!');
            return;
        }

        if (this.currentTeam === 1) {
            this.team1Score += this.roundPoints;
            this.team1ScoreDisplay.textContent = this.team1Score;
            this.showMessage(`${this.team1Name} earns ${this.roundPoints} points!`);
        } else {
            this.team2Score += this.roundPoints;
            this.team2ScoreDisplay.textContent = this.team2Score;
            this.showMessage(`${this.team2Name} earns ${this.roundPoints} points!`);
        }

        // Reset round points
        this.roundPoints = 0;
        this.roundPointsDisplay.textContent = '0';

        // Check if game should end
        if (this.currentRound >= this.totalRounds) {
            setTimeout(() => this.endGame(), 1500);
        }
    }

    showStrikeOverlay() {
        this.strikeOverlay.classList.add('show');
        setTimeout(() => {
            this.strikeOverlay.classList.remove('show');
        }, 700);
    }

    showCorrectOverlay() {
        this.correctOverlay.classList.add('show');
        setTimeout(() => {
            this.correctOverlay.classList.remove('show');
        }, 500);
    }

    showMessage(text) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = text;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.9);
            color: #ffd700;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1.2rem;
            z-index: 2000;
            border: 2px solid #ffd700;
            animation: fadeInOut 2s ease;
        `;

        // Add animation style if not present
        if (!document.getElementById('toast-style')) {
            const style = document.createElement('style');
            style.id = 'toast-style';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                    15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    endGame() {
        this.gameScreen.classList.remove('active');
        this.winnerScreen.classList.add('active');

        // Display final scores
        this.finalTeam1Name.textContent = this.team1Name;
        this.finalTeam1Score.textContent = this.team1Score;
        this.finalTeam2Name.textContent = this.team2Name;
        this.finalTeam2Score.textContent = this.team2Score;

        // Determine winner
        if (this.team1Score > this.team2Score) {
            this.winnerName.textContent = `${this.team1Name} Wins!`;
        } else if (this.team2Score > this.team1Score) {
            this.winnerName.textContent = `${this.team2Name} Wins!`;
        } else {
            this.winnerName.textContent = "It's a Tie!";
        }
    }

    resetGame() {
        // Reset all game state
        this.team1Score = 0;
        this.team2Score = 0;
        this.currentTeam = 1;
        this.roundPoints = 0;
        this.strikes = 0;
        this.currentRound = 0;
        this.currentQuestion = null;
        this.revealedAnswers = [];
        this.usedQuestions = [];
        this.gameStarted = false;

        // Reset displays
        this.team1ScoreDisplay.textContent = '0';
        this.team2ScoreDisplay.textContent = '0';
        this.roundNumberDisplay.textContent = '1';
        this.roundPointsDisplay.textContent = '0';
        this.questionText.textContent = 'Press "New Round" to start!';

        // Reset strikes
        this.strikeElements.forEach(el => el.classList.remove('active'));

        // Reset answer board
        const rows = this.answerBoard.querySelectorAll('.answer-row');
        rows.forEach(row => {
            row.style.display = 'flex';
            row.classList.remove('revealed');
            row.querySelector('.answer-text').textContent = '???';
            row.querySelector('.answer-points').textContent = '??';
        });

        // Reset reveal buttons
        this.revealButtons.forEach(btn => {
            btn.classList.remove('revealed');
            btn.style.display = 'block';
        });

        // Switch screens
        this.winnerScreen.classList.remove('active');
        this.titleScreen.classList.add('active');

        // Update team display
        this.updateTeamDisplay();
    }
}

// Question Management UI
class QuestionManagementUI {
    constructor() {
        this.editingIndex = null;
        this.initializeElements();
        this.bindEvents();
        this.renderQuestionList();
    }

    initializeElements() {
        // Modal elements
        this.modal = document.getElementById('question-modal');
        this.closeBtn = document.getElementById('close-modal');
        this.manageBtn = document.getElementById('manage-questions-btn');

        // Views
        this.listView = document.getElementById('question-list-view');
        this.editView = document.getElementById('question-edit-view');

        // List view elements
        this.questionList = document.getElementById('question-list');
        this.totalQuestions = document.getElementById('total-questions');
        this.addQuestionBtn = document.getElementById('add-question-btn');
        this.resetQuestionsBtn = document.getElementById('reset-questions-btn');

        // Edit view elements
        this.editTitle = document.getElementById('edit-title');
        this.backToListBtn = document.getElementById('back-to-list');
        this.questionForm = document.getElementById('question-form');
        this.questionInput = document.getElementById('question-input');
        this.answersContainer = document.getElementById('answers-container');
        this.addAnswerBtn = document.getElementById('add-answer-btn');
        this.saveQuestionBtn = document.getElementById('save-question-btn');
        this.cancelEditBtn = document.getElementById('cancel-edit-btn');
    }

    bindEvents() {
        // Modal open/close
        this.manageBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // List view actions
        this.addQuestionBtn.addEventListener('click', () => this.showAddForm());
        this.resetQuestionsBtn.addEventListener('click', () => this.confirmReset());

        // Edit view actions
        this.backToListBtn.addEventListener('click', () => this.showListView());
        this.addAnswerBtn.addEventListener('click', () => this.addAnswerEntry());
        this.cancelEditBtn.addEventListener('click', () => this.showListView());
        this.questionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveQuestion();
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal() {
        this.modal.classList.add('active');
        this.showListView();
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    showListView() {
        this.listView.classList.add('active');
        this.editView.classList.remove('active');
        this.renderQuestionList();
        this.editingIndex = null;
    }

    showEditView() {
        this.listView.classList.remove('active');
        this.editView.classList.add('active');
    }

    renderQuestionList() {
        const questions = questionManager.getAll();
        this.totalQuestions.textContent = questions.length;

        if (questions.length === 0) {
            this.questionList.innerHTML = `
                <div class="empty-state">
                    <p>No questions available</p>
                    <button class="action-btn add-btn" onclick="questionUI.showAddForm()">+ Add Your First Question</button>
                </div>
            `;
            return;
        }

        this.questionList.innerHTML = questions.map((q, index) => `
            <div class="question-item" data-index="${index}">
                <div class="question-number">${index + 1}</div>
                <div class="question-info">
                    <div class="question-preview">${this.escapeHtml(q.question)}</div>
                    <div class="answer-count"><span>${q.answers.length}</span> answers</div>
                </div>
                <div class="question-actions">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            </div>
        `).join('');

        // Bind edit/delete buttons
        this.questionList.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editQuestion(parseInt(btn.dataset.index));
            });
        });

        this.questionList.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.confirmDelete(parseInt(btn.dataset.index));
            });
        });
    }

    showAddForm() {
        this.editingIndex = null;
        this.editTitle.textContent = 'Add New Question';
        this.questionInput.value = '';
        this.answersContainer.innerHTML = '';

        // Add 3 empty answer entries by default
        for (let i = 0; i < 3; i++) {
            this.addAnswerEntry();
        }

        this.showEditView();
        this.questionInput.focus();
    }

    editQuestion(index) {
        const question = questionManager.get(index);
        if (!question) return;

        this.editingIndex = index;
        this.editTitle.textContent = 'Edit Question';
        this.questionInput.value = question.question;
        this.answersContainer.innerHTML = '';

        // Populate existing answers
        question.answers.forEach((answer, i) => {
            this.addAnswerEntry(answer);
        });

        this.showEditView();
        this.questionInput.focus();
    }

    addAnswerEntry(answer = null) {
        const index = this.answersContainer.children.length + 1;
        const entry = document.createElement('div');
        entry.className = 'answer-entry';
        entry.innerHTML = `
            <div class="answer-entry-number">${index}</div>
            <div class="answer-entry-fields">
                <div class="answer-entry-row">
                    <input type="text" class="answer-text-input" placeholder="Answer text" value="${answer ? this.escapeHtml(answer.text) : ''}" maxlength="50">
                    <span class="points-label">Points:</span>
                    <input type="number" class="answer-points-input" min="1" max="100" value="${answer ? answer.points : ''}" placeholder="0">
                </div>
                <input type="text" class="accepted-input" placeholder="Accepted variations (comma-separated, e.g.: alias1, alias2)" value="${answer && answer.accepted ? answer.accepted.join(', ') : ''}">
            </div>
            <button type="button" class="remove-answer-btn">&times;</button>
        `;

        // Bind remove button
        entry.querySelector('.remove-answer-btn').addEventListener('click', () => {
            entry.remove();
            this.updateAnswerNumbers();
        });

        this.answersContainer.appendChild(entry);
    }

    updateAnswerNumbers() {
        this.answersContainer.querySelectorAll('.answer-entry').forEach((entry, index) => {
            entry.querySelector('.answer-entry-number').textContent = index + 1;
        });
    }

    saveQuestion() {
        const questionText = this.questionInput.value.trim();
        if (!questionText) {
            this.showToast('Please enter a question');
            return;
        }

        const answers = [];
        const entries = this.answersContainer.querySelectorAll('.answer-entry');

        if (entries.length === 0) {
            this.showToast('Please add at least one answer');
            return;
        }

        let hasValidAnswer = false;
        entries.forEach(entry => {
            const text = entry.querySelector('.answer-text-input').value.trim();
            const points = parseInt(entry.querySelector('.answer-points-input').value) || 0;
            const acceptedStr = entry.querySelector('.accepted-input').value.trim();
            const accepted = acceptedStr ? acceptedStr.split(',').map(s => s.trim()).filter(s => s) : [];

            if (text && points > 0) {
                answers.push({ text, points, accepted });
                hasValidAnswer = true;
            }
        });

        if (!hasValidAnswer) {
            this.showToast('Please add at least one answer with text and points');
            return;
        }

        // Sort answers by points (descending)
        answers.sort((a, b) => b.points - a.points);

        const questionData = {
            question: questionText,
            answers: answers
        };

        if (this.editingIndex !== null) {
            questionManager.update(this.editingIndex, questionData);
            this.showToast('Question updated successfully!');
        } else {
            questionManager.add(questionData);
            this.showToast('Question added successfully!');
        }

        this.showListView();
    }

    confirmDelete(index) {
        const question = questionManager.get(index);
        if (!question) return;

        const confirmed = confirm(`Are you sure you want to delete this question?\n\n"${question.question.substring(0, 50)}..."`);
        if (confirmed) {
            questionManager.delete(index);
            this.renderQuestionList();
            this.showToast('Question deleted');
        }
    }

    confirmReset() {
        const confirmed = confirm('Are you sure you want to reset all questions to defaults?\n\nThis will delete all custom questions and restore the original set.');
        if (confirmed) {
            questionManager.resetToDefaults();
            this.renderQuestionList();
            this.showToast('Questions reset to defaults');
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.9);
            color: #ffd700;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 1.2rem;
            z-index: 4000;
            border: 2px solid #ffd700;
            animation: fadeInOut 2s ease;
        `;

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new FamilyFeudGame();
    window.questionUI = new QuestionManagementUI();
});
