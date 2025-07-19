const dialogPuzzlesData5 = [
    {
        ukrainianPhrase: "Ти чистиш зуби зранку",
        correctEnglishPhrase: "You brush teeth in the morning.",
        draggableEnglishWords: ["You", "brush", "teeth", "in", "the", "morning"]
    },
    {
        ukrainianPhrase: "Я обідаю вдень",
        correctEnglishPhrase: "I have lunch in the afternoon.",
        draggableEnglishWords: ["I", "have", "lunch", "in", "the", "afternoon"]
    },
    {
        ukrainianPhrase: "Вони приймають душ ввечері",
        correctEnglishPhrase: "They take a shower in the evening.",
        draggableEnglishWords: ["They", "take", "a", "shower", "in", "the", "evening"]
    },
    {
        ukrainianPhrase: "Ми йдемо до школи вдень",
        correctEnglishPhrase: "We go to school in the afternoon.",
        draggableEnglishWords: ["We", "go", "to", "school", "in", "the", "afternoon"]
    }
];

let draggedItem5 = null; 

// --- ДОПОМІЖНІ ФУНКЦІЇ ---
function shuffleArray5(array) { 
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// --- ФУНКЦІЇ ДЛЯ ГРИ 5 (Імітація діалогу - Склади переклад по слову) ---

/** Створює одну головоломку для діалогу (украінська фраза + зони для англ. перекладу + власний банк слів) */
function createDialogPuzzle5(puzzleData, index) {
    const puzzleId = `dialog-puzzle-${index}`;
    const ukrainianPhrase = puzzleData.ukrainianPhrase;
    const correctEnglishPhrase = puzzleData.correctEnglishPhrase;
    const englishWords = puzzleData.draggableEnglishWords;

    const dialogPuzzlesContainer = document.getElementById('dialog-puzzles-container');
    if (!dialogPuzzlesContainer) {
        console.error('Контейнер пазлів для Гри 5 (dialog-puzzles-container) не знайдено.');
        return;
    }
    
const puzzleWrapper = document.createElement('div');
puzzleWrapper.id = puzzleId;
puzzleWrapper.className = "puzzle-wrapper bg-white p-4 rounded-lg shadow-md flex flex-col items-center relative mb-6";
puzzleWrapper.innerHTML = `
    <p class="text-xl md:text-2xl font-bold text-gray-700 mb-4 text-center">${ukrainianPhrase}</p> 
    
    <div id="word-drop-zone-group-${index}" class="word-drop-zone-group5 flex flex-wrap justify-center items-center gap-2 mb-4 min-h-[60px] p-2 border-2 border-dashed border-gray-200 rounded-md">
    </div>

    <div id="draggable-words-for-puzzle-${index}" class="draggable-words-individual-container5 w-full bg-blue-50 bg-opacity-95 backdrop-blur-sm p-4 rounded-md shadow-inner flex flex-wrap justify-center gap-2">
    </div>
    
    <div class="mt-3 w-full">
      <div class="mt-3 w-full flex justify-center">
    <button id="check-btn-dialog-${index}" class="min-w-[180px] py-3 px-6 bg-sky-500 text-white text-base font-bold rounded-lg hover:bg-sky-600 transition-colors duration-300 disabled:bg-slate-300">
        Перевірити
    </button>
   </div>

        <p id="message-dialog-${index}" class="mt-1 h-4 text-center text-xs font-medium"></p>
    </div>
`;
dialogPuzzlesContainer.appendChild(puzzleWrapper);
    
    const wordDropZoneGroup = document.getElementById(`word-drop-zone-group-${index}`);
    const checkBtn = document.getElementById(`check-btn-dialog-${index}`);
    const messageEl = document.getElementById(`message-dialog-${index}`);
    const individualDraggableWordsContainer = document.getElementById(`draggable-words-for-puzzle-${index}`);

    englishWords.forEach((wordPart, wordPartIndex) => {
        const dropZone = document.createElement('div');
        dropZone.className = 'word-drop-slot5 w-auto min-w-[70px] h-14 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-lg font-bold text-gray-500 overflow-hidden';
        dropZone.dataset.expectedWord = wordPart;
        addWordDropZoneListeners5(dropZone, individualDraggableWordsContainer); 
        wordDropZoneGroup.appendChild(dropZone);

        if (wordPartIndex < englishWords.length - 1 && !wordPart.endsWith('-')) { 
             const spaceDiv = document.createElement('div');
             spaceDiv.className = 'w-2 h-10'; 
             wordDropZoneGroup.appendChild(spaceDiv);
        }
    });

    createIndividualDraggableWords5(englishWords, individualDraggableWordsContainer);

    checkBtn.addEventListener('click', () => checkDialogResult5(correctEnglishPhrase, wordDropZoneGroup, messageEl, checkBtn, individualDraggableWordsContainer));
}

/** Створює та додає перетягувані слова (окремі) до ІНДИВІДУАЛЬНОГО контейнера для Гри 5 */
function createIndividualDraggableWords5(wordsArray, targetContainer) {
    targetContainer.innerHTML = ''; 
    const wordsToDrag = shuffleArray5(wordsArray); 

    wordsToDrag.forEach((word, index) => {
        const wordBox = document.createElement('div');
        wordBox.id = `draggable-dialog-word-${targetContainer.id}-${index}`; 
        wordBox.className = 'draggable-word-slot5 bg-blue-300 text-blue-700 py-3 rounded-lg shadow-md cursor-grab text-xl md:text-2xl font-semibold transition-transform duration-200 hover:scale-105'; 
        wordBox.textContent = word;
        wordBox.draggable = true;
        addDraggableWordListeners5(wordBox);
        
        // ДОДАЄМО СЛУХАЧ ПОДІЙ КЛІКУ
        wordBox.addEventListener('click', () => handleWordClick5(wordBox, targetContainer));

        targetContainer.appendChild(wordBox);
    });
}

/** Додавання слухачів подій до елементів, що перетягуються (окремі слова) для Гри 5 */
function addDraggableWordListeners5(element) {
    element.addEventListener('dragstart', (e) => {
        draggedItem5 = e.target; 
        e.dataTransfer.setData('text/plain', element.textContent);
        setTimeout(() => {
            e.target.classList.add('opacity-50');
        }, 0);
    });

    element.addEventListener('dragend', (e) => {
        setTimeout(() => {
            if (draggedItem5) { 
               draggedItem5.classList.remove('opacity-50');
            }
            draggedItem5 = null; 
        }, 0);
    });
}

/** * НОВА ФУНКЦІЯ: Обробник кліку на слово. 
 * Переміщує слово в першу доступну комірку.
 */
function handleWordClick5(wordElement, originalDraggableContainer) {
    // Знаходимо батьківську групу слотів для цього речення
    const puzzleWrapper = wordElement.closest('.puzzle-wrapper');
    if (!puzzleWrapper) return;

    const wordDropZoneGroup = puzzleWrapper.querySelector('.word-drop-zone-group5');
    if (!wordDropZoneGroup) return;

    // Знаходимо всі пусті слоти в цій групі
    const emptySlots = Array.from(wordDropZoneGroup.querySelectorAll('.word-drop-slot5'))
                            .filter(slot => !slot.querySelector('.draggable-word-slot5'));

    if (emptySlots.length > 0) {
        const targetSlot = emptySlots[0]; // Вибираємо першу порожню комірку

        // Якщо в цільовому слоті вже є слово (хоча ми фільтруємо порожні, це для безпеки)
        const existingWord = targetSlot.querySelector('.draggable-word-slot5');
        if (existingWord) {
            originalDraggableContainer.appendChild(existingWord); // Повертаємо в банк слів
            existingWord.classList.remove('correct-word-box', 'incorrect-word-box');
            existingWord.draggable = true;
            existingWord.style.cursor = 'grab';
        }

        // Переміщуємо натиснуте слово в цільовий слот
        targetSlot.appendChild(wordElement);

        // Очищаємо повідомлення про результат при зміні слова
        const messageEl = puzzleWrapper.querySelector('[id^="message-dialog-"]');
        if (messageEl) {
            messageEl.textContent = '';
            wordDropZoneGroup.querySelectorAll('.word-drop-slot5').forEach(slot => {
                slot.classList.remove('correct', 'incorrect');
            });
        }
        const checkBtn = puzzleWrapper.querySelector('[id^="check-btn-dialog-"]');
        if (checkBtn) {
            checkBtn.disabled = false;
        }

        // Видаляємо клас opacity-50, якщо він залишився від drag-and-drop
        wordElement.classList.remove('opacity-50');

    } else {
        // Опціонально: Показати повідомлення, що немає вільних слотів
        const messageEl = puzzleWrapper.querySelector('[id^="message-dialog-"]');
        if (messageEl) {
            messageEl.textContent = 'Усі комірки заповнено.';
            messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-amber-600';
        }
    }
}


/** Додавання слухачів подій до зон скидання (окремі слоти) для Гри 5 */
function addWordDropZoneListeners5(zone, originalDraggableContainer) {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (draggedItem5 && draggedItem5.classList.contains('draggable-word-slot5') && !zone.querySelector('.draggable-word-slot5')) { 
            zone.classList.add('drag-over');
        }
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');

        if (draggedItem5 && draggedItem5.classList.contains('draggable-word-slot5') && !zone.querySelector('.draggable-word-slot5')) { 
            const existingWord = zone.querySelector('.draggable-word-slot5');
            if (existingWord) {
                originalDraggableContainer.appendChild(existingWord); 
                existingWord.classList.remove('correct-word-box', 'incorrect-word-box');
                existingWord.draggable = true;
                existingWord.style.cursor = 'grab';
            }
            
            zone.appendChild(draggedItem5);

            const messageEl = zone.closest('.puzzle-wrapper') ? zone.closest('.puzzle-wrapper').querySelector('[id^="message-dialog-"]') : null;
            if (messageEl) {
                messageEl.textContent = '';
                const dropZoneGroup = zone.closest('.word-drop-zone-group5');
                if (dropZoneGroup) {
                    dropZoneGroup.querySelectorAll('.word-drop-slot5').forEach(slot => {
                        slot.classList.remove('correct', 'incorrect');
                    });
                }
            }
            const checkBtn = zone.closest('.puzzle-wrapper') ? zone.closest('.puzzle-wrapper').querySelector('[id^="check-btn-dialog-"]') : null;
            if (checkBtn) {
                checkBtn.disabled = false;
            }
        }
    });

    // ДОДАЄМО ОБРОБНИК КЛІКУ НА САМУ ЗОНУ (ЩОБ ПОВЕРНУТИ СЛОВО НАЗАД)
    zone.addEventListener('click', (e) => {
        const droppedWordElement = zone.querySelector('.draggable-word-slot5');
        if (droppedWordElement) {
            // Переміщуємо слово назад у його оригінальний банк слів
            originalDraggableContainer.appendChild(droppedWordElement);
            droppedWordElement.classList.remove('correct-word-box', 'incorrect-word-box'); // Прибираємо класи результату
            droppedWordElement.classList.add('bg-yellow-400', 'text-yellow-900', 'hover:scale-105'); // Повертаємо початкові стилі
            droppedWordElement.draggable = true;
            droppedWordElement.style.cursor = 'grab';

            // Очищуємо повідомлення та класи результату для цієї групи
            const puzzleWrapper = zone.closest('.puzzle-wrapper');
            if (puzzleWrapper) {
                const messageEl = puzzleWrapper.querySelector('[id^="message-dialog-"]');
                if (messageEl) {
                    messageEl.textContent = '';
                }
                const dropZoneGroup = puzzleWrapper.querySelector('.word-drop-zone-group5');
                if (dropZoneGroup) {
                    dropZoneGroup.querySelectorAll('.word-drop-slot5').forEach(slot => {
                        slot.classList.remove('correct', 'incorrect');
                    });
                }
                const checkBtn = puzzleWrapper.querySelector('[id^="check-btn-dialog-"]');
                if (checkBtn) {
                    checkBtn.disabled = false;
                }
            }
        }
    });
}

/** Перевірка результату для Гри 5 (діалог - по словах) */
function checkDialogResult5(correctPhrase, wordDropZoneGroup, messageEl, checkBtn, individualDraggableWordsContainer) {
    const dropSlots = wordDropZoneGroup.querySelectorAll('.word-drop-slot5');
    let userAnswerWords = [];
    let allFilled = true;

    dropSlots.forEach(slot => {
        const droppedWordElement = slot.querySelector('.draggable-word-slot5');
        if (droppedWordElement) {
            userAnswerWords.push(droppedWordElement.textContent.trim());
        } else {
            allFilled = false;
        }
    });

    if (!allFilled) {
        messageEl.textContent = 'Будь ласка, заповніть усі пробіли.';
        messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-amber-600';
        return;
    }

    const userAnswerJoined = userAnswerWords.join(' '); 

    if (userAnswerJoined === correctPhrase) {
        messageEl.textContent = 'Чудово, правильно!';
        messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-green-600';
        checkBtn.disabled = true;
        dropSlots.forEach(slot => {
            slot.classList.add('correct');
            slot.classList.remove('incorrect');
            const droppedWordElement = slot.querySelector('.draggable-word-slot5');
            if (droppedWordElement) {
                droppedWordElement.classList.add('correct-word-box');
                droppedWordElement.classList.remove('incorrect-word-box');
                droppedWordElement.draggable = false;
                droppedWordElement.style.cursor = 'default';
            }
        });
    } else {
        messageEl.textContent = 'Спробуйте ще раз';
        messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-red-600';
        dropSlots.forEach(slot => {
            slot.classList.add('incorrect');
            slot.classList.remove('correct');
            const droppedWordElement = slot.querySelector('.draggable-word-slot5');
            if (droppedWordElement) {
                droppedWordElement.classList.add('incorrect-word-box');
                droppedWordElement.classList.remove('correct-word-box');
            }
        });

        // Повертаємо неправильні слова назад у банк слів через 1 секунду
        setTimeout(() => {
            dropSlots.forEach(slot => {
                const droppedWordElement = slot.querySelector('.draggable-word-slot5');
                if (droppedWordElement && droppedWordElement.classList.contains('incorrect-word-box')) {
                    droppedWordElement.classList.remove('incorrect-word-box', 'opacity-50');
                    droppedWordElement.classList.add('bg-yellow-400', 'text-yellow-900', 'hover:scale-105'); 
                    
                    individualDraggableWordsContainer.appendChild(droppedWordElement);
                    droppedWordElement.draggable = true;
                    droppedWordElement.style.cursor = 'grab';

                    slot.classList.remove('incorrect'); // Прибираємо червоний фон з комірки
                }
            });
            messageEl.textContent = ''; 
        }, 1000);
    }
}


// --- ІНІЦІАЛІЗАЦІЯ ГРИ 5 ПІСЛЯ ЗАВАНТАЖЕННЯ DOM ---
document.addEventListener('DOMContentLoaded', () => {
    const dialogPuzzlesContainer = document.getElementById('dialog-puzzles-container');

    if (dialogPuzzlesContainer && dialogPuzzlesData5.length > 0) {
        console.log('Ініціалізація Гри 5: Імітація діалогу (по словах) - Окремий банк для кожного речення');
        dialogPuzzlesData5.forEach((data, index) => {
            createDialogPuzzle5(data, index);
        });
    } else {
        console.warn('Контейнер для Гри 5 (Діалог по словах) або дані відсутні. Перевірте HTML ID або dialogPuzzlesData5.');
    }
});