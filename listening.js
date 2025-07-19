const gameData = [
    {
        correctEnglishPhrase: "I wake up in the morning",
        draggableEnglishWords: ["I", "wake", "up", "in", "the", "morning"],
        audioPath: "audio/17.1.mp3"
    },
    {
        correctEnglishPhrase: "I get dressed in the morning",
        draggableEnglishWords: ["I", "get", "dressed", "in", "the", "morning"],
        audioPath: "audio/17.2.mp3"
    },
    {
        correctEnglishPhrase: "You have breakfast in the afternoon",
        draggableEnglishWords: ["You", "have", "breakfast", "in", "the", "afternoon"],
        audioPath: "audio/17.3.mp3"
    },
    {
        correctEnglishPhrase: "We watch TV in the evening",
        draggableEnglishWords: ["We", "watch", "TV", "in", "the", "evening"],
        audioPath: "audio/17.4.mp3"
    },
    {
        correctEnglishPhrase: "They go to bed in the evening",
        draggableEnglishWords: ["They", "go", "to", "bed", "in", "the", "evening"],
        audioPath: "audio/17.5.mp3"
    }
];

// --- ДОПОМІЖНІ ФУНКЦІЇ ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- ФУНКЦІЇ ДЛЯ ГРИ (Вставити слово з аудіо) ---

/** Створює одну головоломку (українська фраза + зони для англ. перекладу + власний банк слів) */
function createGamePuzzle(puzzleData, index) {
    const puzzleId = `game-puzzle-${index}`;
    const correctEnglishText = puzzleData.correctEnglishPhrase;
    const englishWords = puzzleData.draggableEnglishWords;
    const audioPath = puzzleData.audioPath; // Отримуємо шлях до аудіо

    const gamePuzzlesContainer = document.getElementById('game-puzzles-container');
    if (!gamePuzzlesContainer) {
        console.error('Контейнер для пазлів (game-puzzles-container) не знайдено.');
        return;
    }

    const puzzleWrapper = document.createElement('div');
    puzzleWrapper.id = puzzleId;
    puzzleWrapper.className = "puzzle-wrapper bg-white p-4 rounded-lg shadow-md flex flex-col items-center relative mb-6";
    puzzleWrapper.innerHTML = `
        <button id="play-audio-button-${index}" class="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197 2.132A1 1 0 0110 13.132V9.868a1 1 0 011.555-.832l3.197 2.132a1 1 0 010 1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Прослухати
        </button>
        <audio id="audio-player-${index}" src="${audioPath}" preload="auto"></audio>

        <div id="word-drop-zone-group-${index}" class="word-drop-zone-group flex flex-wrap justify-center items-center gap-2 mb-4 min-h-[75px] p-2 border-2 border-dashed border-gray-200 rounded-md">
        </div>

        <div id="draggable-words-for-puzzle-${index}" class="draggable-words-individual-container w-full bg-blue-50 bg-opacity-95 backdrop-blur-sm p-4 rounded-md shadow-inner flex flex-wrap justify-center gap-4">
            </div>

        <div class="mt-3 w-full">
            <div class="flex justify-center mt-3 w-full">
                <button id="check-button-${index}" class="min-w-[180px] py-3 px-6 bg-sky-500 text-white text-base font-bold rounded-lg hover:bg-sky-600 transition-colors duration-300 disabled:bg-slate-300">
                    Перевірити
                </button>
            </div>

            <p id="message-element-${index}" class="mt-1 h-4 text-center text-xs font-medium"></p>
        </div>
    `;
    gamePuzzlesContainer.appendChild(puzzleWrapper);

    // Змінив селектор на word-drop-zone-group
    const wordDropZoneGroup = document.getElementById(`word-drop-zone-group-${index}`); 
    const checkButton = document.getElementById(`check-button-${index}`);
    const messageElement = document.getElementById(`message-element-${index}`);
    // Змінив селектор на draggable-words-individual-container
    const individualDraggableWordsContainer = document.getElementById(`draggable-words-for-puzzle-${index}`); 
    const playAudioButton = document.getElementById(`play-audio-button-${index}`);
    const audioPlayer = document.getElementById(`audio-player-${index}`);

    // Додаємо обробник подій для кнопки відтворення аудіо
    playAudioButton.addEventListener('click', () => {
        audioPlayer.play().catch(e => console.error("Помилка відтворення аудіо:", e));
    });

    englishWords.forEach((wordPart, wordPartIndex) => {
        const dropZone = document.createElement('div');
        dropZone.className = 'word-drop-slot w-auto min-w-[70px] h-14 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-lg font-bold text-gray-500 overflow-hidden';
        dropZone.dataset.expectedWord = wordPart;
        // Додаємо обробник кліку для повернення слова зі слота
        dropZone.addEventListener('click', (e) => handleSlotClick(dropZone, individualDraggableWordsContainer));
        wordDropZoneGroup.appendChild(dropZone);

        // Цей блок відповідає за додавання пробілів між словами
        if (wordPartIndex < englishWords.length - 1 && !wordPart.endsWith('-')) {
            const spaceDiv = document.createElement('div');
            spaceDiv.className = 'w-2 h-10'; // Просто невеликий пробіл
            wordDropZoneGroup.appendChild(spaceDiv);
        }
    });

    createIndividualDraggableWords(englishWords, individualDraggableWordsContainer);

    checkButton.addEventListener('click', () => checkGameResult(correctEnglishText, wordDropZoneGroup, messageElement, checkButton, individualDraggableWordsContainer));
}

/** Створює та додає перетягувані слова (окремі) до ІНДИВІДУАЛЬНОГО контейнера */
function createIndividualDraggableWords(wordsArray, targetContainer) {
    targetContainer.innerHTML = '';
    const wordsToDrag = shuffleArray(wordsArray);

    wordsToDrag.forEach((word, index) => {
        const wordBox = document.createElement('div');
        wordBox.id = `draggable-word-${targetContainer.id}-${index}`;
        // Прибираємо draggable=true та пов'язані з drag-and-drop стилі
        wordBox.className = 'draggable-word-slot bg-blue-300 text-blue-700 py-3 rounded-lg shadow-md cursor-pointer text-xl md:text-2xl font-semibold transition-transform duration-200 hover:scale-105 px-4'; // Додав px-4 для кращого падінгу
        wordBox.textContent = word;
        
        // ДОДАЄМО СЛУХАЧ ПОДІЙ КЛІКУ для переміщення слова в слот
        wordBox.addEventListener('click', () => handleWordClick(wordBox, targetContainer));

        targetContainer.appendChild(wordBox);
    });
}

// Функції dragstart/dragend тепер не потрібні, якщо ми перейшли на клік.
// Якщо ви все ж хочете залишити drag-and-drop, тоді треба буде обробляти і кліки, і перетягування.
// Я видаляю їх, щоб зосередитись на кліку.

/** * Обробник кліку на слово.
 * Переміщує слово в першу доступну комірку.
 */
function handleWordClick(wordElement, originalDraggableContainer) {
    // Знаходимо батьківську групу слотів для цього речення
    const puzzleWrapper = wordElement.closest('.puzzle-wrapper');
    if (!puzzleWrapper) return;

    // Змінив селектор на word-drop-zone-group
    const wordDropZoneGroup = puzzleWrapper.querySelector('.word-drop-zone-group'); 
    if (!wordDropZoneGroup) return;

    // Знаходимо всі пусті слоти в цій групі
    const emptySlots = Array.from(wordDropZoneGroup.querySelectorAll('.word-drop-slot'))
        .filter(slot => !slot.querySelector('.draggable-word-slot'));

    if (emptySlots.length > 0) {
        const targetSlot = emptySlots[0]; // Вибираємо першу порожню комірку

        // Переміщуємо натиснуте слово в цільовий слот
        targetSlot.appendChild(wordElement);
        wordElement.style.cursor = 'default'; // Змінюємо курсор, бо слово вже в слоті

        // Очищаємо повідомлення про результат при зміні слова
        resetPuzzleFeedback(puzzleWrapper);
        
    } else {
        // Опціонально: Показати повідомлення, що немає вільних слотів
        const messageElement = puzzleWrapper.querySelector('[id^="message-element-"]');
        if (messageElement) {
            messageElement.textContent = 'Усі комірки заповнено.';
            messageElement.className = 'mt-1 h-4 text-center text-xs font-medium text-amber-600';
        }
    }
}

/** * Обробник кліку на порожній слот або на слово в слоті
 * Якщо клік на слоті з словом - повертає слово назад у банк.
 */
function handleSlotClick(slotElement, originalDraggableContainer) {
    const droppedWordElement = slotElement.querySelector('.draggable-word-slot');
    if (droppedWordElement) {
        // Переміщуємо слово назад у його оригінальний банк слів
        originalDraggableContainer.appendChild(droppedWordElement);
        droppedWordElement.style.cursor = 'pointer'; // Повертаємо курсор для кліку
        
        // Очищуємо повідомлення та класи результату для цієї групи
        const puzzleWrapper = slotElement.closest('.puzzle-wrapper');
        resetPuzzleFeedback(puzzleWrapper);
    }
}

/** Допоміжна функція для очищення повідомлень та стилів після зміни слів */
function resetPuzzleFeedback(puzzleWrapper) {
    const messageElement = puzzleWrapper.querySelector('[id^="message-element-"]');
    if (messageElement) {
        messageElement.textContent = '';
        messageElement.classList.remove('text-green-600', 'text-red-600', 'text-amber-600');
    }
    const wordDropZoneGroup = puzzleWrapper.querySelector('.word-drop-zone-group');
    if (wordDropZoneGroup) {
        wordDropZoneGroup.querySelectorAll('.word-drop-slot').forEach(slot => {
            slot.classList.remove('correct', 'incorrect');
        });
        wordDropZoneGroup.querySelectorAll('.draggable-word-slot').forEach(wordBox => {
            wordBox.classList.remove('correct-word-box', 'incorrect-word-box');
        });
    }
    const checkButton = puzzleWrapper.querySelector('[id^="check-button-"]');
    if (checkButton) {
        checkButton.disabled = false;
    }
}

/** Перевірка результату гри (по словах) */
function checkGameResult(correctPhrase, wordDropZoneGroup, messageElement, checkButton, individualDraggableWordsContainer) {
    const dropSlots = wordDropZoneGroup.querySelectorAll('.word-drop-slot');
    let userAnswerWords = [];
    let allFilled = true;

    dropSlots.forEach(slot => {
        const droppedWordElement = slot.querySelector('.draggable-word-slot');
        if (droppedWordElement) {
            userAnswerWords.push(droppedWordElement.textContent.trim());
        } else {
            allFilled = false;
        }
    });

    if (!allFilled) {
        messageElement.textContent = 'Будь ласка, заповніть усі пробіли.';
        messageElement.className = 'mt-1 h-4 text-center text-xs font-medium text-amber-600';
        return;
    }

    const userAnswerJoined = userAnswerWords.join(' ');

    if (userAnswerJoined === correctPhrase) {
        messageElement.textContent = 'Чудово, правильно!';
        messageElement.className = 'mt-1 h-4 text-center text-xs font-medium text-green-600';
        checkButton.disabled = true;
        dropSlots.forEach(slot => {
            slot.classList.add('correct');
            slot.classList.remove('incorrect');
            const droppedWordElement = slot.querySelector('.draggable-word-slot');
            if (droppedWordElement) {
                droppedWordElement.classList.add('correct-word-box');
                droppedWordElement.classList.remove('incorrect-word-box');
                // Вимикаємо подальші кліки на правильних словах у слотах
                droppedWordElement.style.pointerEvents = 'none'; 
                droppedWordElement.style.cursor = 'default';
            }
        });
    } else {
        messageElement.textContent = 'Спробуйте ще раз';
        messageElement.className = 'mt-1 h-4 text-center text-xs font-medium text-red-600';
        dropSlots.forEach(slot => {
            slot.classList.add('incorrect');
            slot.classList.remove('correct');
            const droppedWordElement = slot.querySelector('.draggable-word-slot');
            if (droppedWordElement) {
                droppedWordElement.classList.add('incorrect-word-box');
                droppedWordElement.classList.remove('correct-word-box');
            }
        });

        // Повертаємо неправильні слова назад у банк слів через 1 секунду
        setTimeout(() => {
            dropSlots.forEach(slot => {
                const droppedWordElement = slot.querySelector('.draggable-word-slot');
                if (droppedWordElement && droppedWordElement.classList.contains('incorrect-word-box')) {
                    droppedWordElement.classList.remove('incorrect-word-box');
                    // Повертаємо стилі та курсор
                    droppedWordElement.classList.add('bg-blue-300', 'text-blue-700', 'hover:scale-105'); 
                    droppedWordElement.style.cursor = 'pointer'; 

                    individualDraggableWordsContainer.appendChild(droppedWordElement);
                    slot.classList.remove('incorrect'); // Прибираємо червоний фон з комірки
                }
            });
            messageElement.textContent = '';
        }, 1000);
    }
}


// --- ІНІЦІАЛІЗАЦІЯ ГРИ ПІСЛЯ ЗАВАНТАЖЕННЯ DOM ---
document.addEventListener('DOMContentLoaded', () => {
    const gamePuzzlesContainer = document.getElementById('game-puzzles-container');

    if (gamePuzzlesContainer && gameData.length > 0) {
        console.log('Ініціалізація Гри: Вставити слово з аудіо - Окремий банк для кожного речення');
        gameData.forEach((data, index) => {
            createGamePuzzle(data, index);
        });
    } else {
        console.warn('Контейнер для Гри або дані відсутні. Перевірте HTML ID або gameData.');
    }
});