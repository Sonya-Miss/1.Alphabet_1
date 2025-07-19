// script.js

// --- Word Data for Each Game ---
const wordsDataGame1 = [
    { en: "Aa", uk: "Ей" },
    { en: "Bb", uk: "Бі" },
    { en: "Cc", uk: "Сі" },
    { en: "Dd", uk: "Ді" },
    { en: "Ee", uk: "І" },
    { en: "Ff", uk: "Еф" },
    { en: "Gg", uk: "Джі" },
    { en: "Hh", uk: "Ейч" },
    { en: "Ii", uk: "Ай" },
];

const wordsDataGame2 = [
    { en: "A", uk: "a" },
    { en: "B", uk: "b" },
    { en: "C", uk: "c" },
    { en: "D", uk: "d" },
    { en: "E", uk: "e" },
    { en: "F", uk: "f" },
    { en: "G", uk: "g" },
    { en: "H", uk: "h" },
    { en: "I", uk: "i" },
];

// --- Game Logic Encapsulated in a Function ---
function createMatchingGame(gameConfig) {
    const {
        gameContainerId,
        canvasId,
        englishColumnId,
        ukrainianColumnId,
        finalCheckButtonId,
        messageAreaId,
        words
    } = gameConfig;

    let selectedEnglishCard = null;
    let selectedUkrainianCard = null;
    let currentConnections = []; // Stores {enCard: element, ukCard: element}

    const gameContainer = document.getElementById(gameContainerId);
    const englishColumn = document.getElementById(englishColumnId);
    const ukrainianColumn = document.getElementById(ukrainianColumnId);
    const finalCheckButton = document.getElementById(finalCheckButtonId);
    const messageArea = document.getElementById(messageAreaId);

    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    // Ensure gameAreaWrapper is correctly identified within its specific game container
    const gameAreaWrapper = gameContainer.querySelector('.game-area-wrapper');

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to create a word card
    function createWordCard(word, type) {
        const card = document.createElement('div');
        card.classList.add('word-card');
        card.textContent = word;
        card.dataset.type = type; // 'en' or 'uk'
        card.dataset.word = word; // Store the word itself for comparison
        card.addEventListener('click', () => handleCardClick(card));
        return card;
    }

    // Click handler for a card
    function handleCardClick(card) {
        // Ignore clicks if the card is already 'connected', 'correct-match' or 'incorrect-match'
        if (card.classList.contains('connected') || card.classList.contains('correct-match') || card.classList.contains('incorrect-match')) {
            return;
        }

        // Remove 'selected' from previously selected card of the same type
        if (card.dataset.type === 'en') {
            if (selectedEnglishCard) {
                selectedEnglishCard.classList.remove('selected');
            }
            selectedEnglishCard = card;
        } else { // type === 'uk'
            if (selectedUkrainianCard) {
                selectedUkrainianCard.classList.remove('selected');
            }
            selectedUkrainianCard = card;
        }

        // Add 'selected' to the current card
        card.classList.add('selected');

        // If one card from each column is selected, try to create a connection
        if (selectedEnglishCard && selectedUkrainianCard) {
            // Check if a connection already exists for either of these cards
            const existingEnConnection = currentConnections.find(conn => conn.enCard === selectedEnglishCard);
            const existingUkConnection = currentConnections.find(conn => conn.ukCard === selectedUkrainianCard);

            if (existingEnConnection || existingUkConnection) {
                // If one of the cards is already connected, reset selection
                messageArea.textContent = 'Ці слова вже з\'єднані або вибрані в іншому зв\'язку. Скиньте вибір, щоб продовжити.';
                messageArea.classList.add('message-info');
                setTimeout(() => {
                    messageArea.textContent = '';
                    messageArea.classList.remove('message-info');
                }, 2000);

                if (selectedEnglishCard) selectedEnglishCard.classList.remove('selected');
                if (selectedUkrainianCard) selectedUkrainianCard.classList.remove('selected');
                selectedEnglishCard = null;
                selectedUkrainianCard = null;
                return;
            }

            makeConnection(selectedEnglishCard, selectedUkrainianCard);
            selectedEnglishCard = null; // Reset selection after connection
            selectedUkrainianCard = null;
            messageArea.textContent = ''; // Clear message
            messageArea.classList.remove('message-info');
        }

        // Update the state of the "Check all pairs" button
        updateFinalCheckButtonState();
    }

    // Function to create a connection (draw line and move cards)
    function makeConnection(enCard, ukCard) {
        currentConnections.push({ enCard: enCard, ukCard: ukCard });

        // Mark cards as connected (visually)
        enCard.classList.remove('selected');
        ukCard.classList.remove('selected');
        enCard.classList.add('connected');
        ukCard.classList.add('connected');
        
        // Prepend connected cards to the top of their respective columns
        englishColumn.prepend(enCard);
        ukrainianColumn.prepend(ukCard);

        drawLines(); // Redraw all lines
    }

    // Function to get the center coordinates of a card relative to gameAreaWrapper
    function getCardCenter(card) {
        const rect = card.getBoundingClientRect();
        const gameAreaRect = gameAreaWrapper.getBoundingClientRect();

        return {
            x: rect.left + rect.width / 2 - gameAreaRect.left,
            y: rect.top + rect.height / 2 - gameAreaRect.top
        };
    }

    // Function to draw all lines
    function drawLines() {
        // Update canvas dimensions to match parent
        canvas.width = gameAreaWrapper.clientWidth;
        canvas.height = gameAreaWrapper.clientHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#22d3ee'; // Line color (Cyan-400)

        currentConnections.forEach(connection => {
            // Check if cards still exist in DOM (might be removed on reset)
            if (gameContainer.contains(connection.enCard) && gameContainer.contains(connection.ukCard)) {
                const start = getCardCenter(connection.enCard);
                const end = getCardCenter(connection.ukCard);

                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
                ctx.stroke();
            }
        });
    }

    // Function to check all connections (final check)
    function finalCheck() {
        if (currentConnections.length === 0) {
            messageArea.textContent = 'Будь ласка, з\'єднайте хоча б одну пару!';
            messageArea.classList.add('message-info');
            messageArea.classList.remove('message-success', 'message-error');
            return;
        }

        // First, clear all previous result states
        gameContainer.querySelectorAll('.word-card').forEach(card => {
            card.classList.remove('correct-match', 'incorrect-match', 'shake');
            card.style.pointerEvents = 'auto'; // Re-enable clicks for resetting
        });
        
        // Store current connections for iteration, then clear for re-population
        const connectionsToCheck = [...currentConnections];
        currentConnections = []; 

        let correctCount = 0;

        connectionsToCheck.forEach(connection => {
            const englishWord = connection.enCard.dataset.word;
            const ukrainianWord = connection.ukCard.dataset.word;

            // Find the corresponding pair in the game's specific words data
            const isCorrect = words.some(pair => 
                pair.en === englishWord && pair.uk === ukrainianWord
            );

            connection.enCard.classList.remove('connected', 'selected');
            connection.ukCard.classList.remove('connected', 'selected');

            if (isCorrect) {
                connection.enCard.classList.add('correct-match');
                connection.ukCard.classList.add('correct-match');
                connection.enCard.style.pointerEvents = 'none'; // Disable clicks on correct matches
                connection.ukCard.style.pointerEvents = 'none';
                correctCount++;
                currentConnections.push(connection); // Add correct connection back
            } else {
                connection.enCard.classList.add('incorrect-match');
                connection.ukCard.classList.add('incorrect-match');
                
                // Remove incorrect-match and reset cards after a short delay
                setTimeout(() => {
                    connection.enCard.classList.remove('incorrect-match');
                    connection.ukCard.classList.remove('incorrect-match');
                    // Move back to original column if incorrect
                    englishColumn.appendChild(connection.enCard); 
                    ukrainianColumn.appendChild(connection.ukCard); 
                    
                    connection.enCard.style.pointerEvents = 'auto'; // Re-enable clicks
                    connection.ukCard.style.pointerEvents = 'auto';
                    drawLines(); // Redraw lines after resetting incorrect ones
                    updateFinalCheckButtonState(); // Update button after resetting
                }, 1000);
            }
        });

        if (correctCount === words.length) {
            messageArea.textContent = 'Чудово! Всі пари правильні!';
            messageArea.classList.add('message-success');
            messageArea.classList.remove('message-error', 'message-info');
            finalCheckButton.disabled = true; // Deactivate as all are correct
        } else {
            messageArea.textContent = `Ви з'єднали ${correctCount} з ${words.length} пар правильно. Спробуйте ще раз!`;
            messageArea.classList.add('message-error');
            messageArea.classList.remove('message-success', 'message-info');
        }
        
        drawLines(); // Redraw lines to show only correct ones
    }

    // Function to update the final check button state
    function updateFinalCheckButtonState() {
        finalCheckButton.disabled = (currentConnections.length === 0 && messageArea.textContent === '');
    }

    // Function to initialize the game
    function initializeGame() {
        englishColumn.innerHTML = '';
        ukrainianColumn.innerHTML = '';
        finalCheckButton.disabled = true;
        messageArea.textContent = '';
        messageArea.classList.remove('message-success', 'message-error', 'message-info');
        currentConnections = []; // Clear connections for a new game

        // Create separate arrays for English and Ukrainian words
        const shuffledEnglishWords = shuffleArray(words.map(pair => pair.en));
        const shuffledUkrainianWords = shuffleArray(words.map(pair => pair.uk));

        // Add cards to DOM
        shuffledEnglishWords.forEach(word => {
            englishColumn.appendChild(createWordCard(word, 'en'));
        });

        shuffledUkrainianWords.forEach(word => {
            ukrainianColumn.appendChild(createWordCard(word, 'uk'));
        });

        // Update canvas dimensions after cards are added to DOM
        requestAnimationFrame(() => {
            canvas.width = gameAreaWrapper.clientWidth;
            canvas.height = gameAreaWrapper.clientHeight;
            drawLines(); // Redraw lines
        });
    }

    // Add event listeners
    finalCheckButton.addEventListener('click', finalCheck);

    // Handle window resize for redrawing lines
    window.addEventListener('resize', drawLines); // This will attach multiple listeners, which is fine for small scale

    // Initialize the game when the function is called
    initializeGame();
}

// --- Initialize Both Games on DOM Content Loaded ---
document.addEventListener('DOMContentLoaded', () => {
    // Game 1 Configuration
    createMatchingGame({
        gameContainerId: 'game-container-1',
        canvasId: 'line-canvas-1',
        englishColumnId: 'english-column-1',
        ukrainianColumnId: 'ukrainian-column-1',
        finalCheckButtonId: 'final-check-button-1',
        messageAreaId: 'message-area-1',
        words: wordsDataGame1
    });

    // Game 2 Configuration
    createMatchingGame({
        gameContainerId: 'game-container-2',
        canvasId: 'line-canvas-2',
        englishColumnId: 'english-column-2',
        ukrainianColumnId: 'ukrainian-column-2',
        finalCheckButtonId: 'final-check-button-2',
        messageAreaId: 'message-area-2',
        words: wordsDataGame2
    });
});