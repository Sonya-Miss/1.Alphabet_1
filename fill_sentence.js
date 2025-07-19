const fillInDragDropPuzzles = [
  {
        parts: ["1. How", "you."],
        correctWord: "are"
    },
    {
        parts: ["2. I", "happy."],
        correctWord: "am"
    },
    {
        parts: ["3. It", "hungry"],
        correctWord: "is"
    },
    {
        parts: ["4. How", "he."],
        correctWord: "is"
    },
        {
        parts: ["5. They", "good"],
        correctWord: "are"
    },
    {
        parts: ["6. He", "great."],
        correctWord: "is"
    },
    {
        parts: ["7. We", "sad"],
        correctWord: "are"
    },
    {
        parts: ["8. She", "tired"],
        correctWord: "is"
    },
    
];

let draggedItemFillIn = null; // Змінна для відстеження елемента, що перетягується

// --- ДОПОМІЖНІ ФУНКЦІЇ ---

/**
 * Перемішує елементи масиву (алгоритм Фішера-Єйтса).
 * @param {Array} array - Масив для перемішування.
 * @returns {Array} Перемішаний масив.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Скидає стан слова, роблячи його знову перетягуваним і прибираючи стилі.
 * Ця функція тепер буде використовуватися, коли слово повертається в банк.
 * @param {HTMLElement} wordElement - Елемент слова для скидання.
 */
function resetWordStateForBank(wordElement) {
    wordElement.classList.remove('drag-disabled', 'opacity-50', 'text-green-800', 'font-bold');
    wordElement.draggable = true;
    wordElement.style.cursor = 'grab'; // Повертаємо курсор grab
    // Важливо: при поверненні в банк, прибираємо innerHTML, якщо там було слово,
    // і додаємо текст слова назад. Це для випадку, якщо слово було переміщено
    // в зону скидання, а потім повернуто.
    wordElement.textContent = wordElement.dataset.originalWord || wordElement.textContent;
}

/**
 * Скидає стан зони скидання, очищаючи її та прибираючи стилі.
 * @param {HTMLElement} dropZone - Елемент зони скидання для скидання.
 */
function resetDropZoneState(dropZone) {
    dropZone.classList.remove('filled', 'correct-fill-in', 'incorrect-fill-in');
    // dropZone.textContent = '   '; // Повертаємо плейсхолдер
    dropZone.style.cursor = 'default'; // Змінюємо курсор на стандартний
    // Перевіряємо, чи в зоні скидання є перетягнуте слово, і видаляємо його,
    // якщо зона не має бути заповненою (наприклад, після скидання неправильного слова)
    const droppedWord = dropZone.querySelector('.draggable-fill-in-word');
    if (droppedWord) {
        droppedWord.remove(); // Видаляємо слово з DOM зони скидання
    }
}

// --- ОСНОВНІ ФУНКЦІЇ ГРИ "Вставити слово в речення" (Drag & Drop) ---

/**
 * Ініціалізує банк слів для перетягування.
 * Тепер буде відображати всі інстанції слів, а не лише унікальні.
 */
function initializeFillInWordsBank() {
    const dragWordsBank = document.getElementById('drag-words-bank-fill-in');
    dragWordsBank.innerHTML = '<h2 class="w-full text-xl font-semibold text-gray-700 mb-4 text-center">Перетягніть слова в пропуски:</h2>';

    // Збираємо ВСІ правильні слова (включаючи дублікати)
    const allWordsIncludingDuplicates = fillInDragDropPuzzles.map(p => p.correctWord);
    const shuffledWords = shuffleArray(allWordsIncludingDuplicates);

    shuffledWords.forEach((word, index) => {
        const wordElement = document.createElement('div');
        // Унікальний ID для кожного елемента, навіть якщо слова однакові
        wordElement.id = `fill-in-draggable-${index}-${word}`; 
        wordElement.textContent = word;
        wordElement.className = 'draggable-fill-in-word';
        wordElement.draggable = true;
        wordElement.dataset.originalWord = word; // Зберігаємо оригінальне слово для зручності

        wordElement.addEventListener('dragstart', (e) => {
            draggedItemFillIn = e.target;
            e.dataTransfer.setData('text/plain', word); // Передаємо текстове значення слова
            setTimeout(() => {
                // Слово стає прозорим в банку, коли його перетягують
                e.target.classList.add('opacity-50'); 
            }, 0);
        });

        wordElement.addEventListener('dragend', (e) => {
            setTimeout(() => {
                // Прибираємо прозорість після завершення перетягування
                if (draggedItemFillIn) {
                   draggedItemFillIn.classList.remove('opacity-50');
                }
                // ВАЖЛИВО:DraggedItemFillIn НЕ очищуємо тут,
                // бо воно потрібне для ідентифікації слова в drop-зоні.
                // Його буде очищено в `drop` або `checkAllFillInSentences`
            }, 0);
        });
        dragWordsBank.appendChild(wordElement);
    });
}

function displayFillInSentences() {
    const sentencesListContainer = document.getElementById('sentences-list-container');
    sentencesListContainer.innerHTML = ''; // Очищаємо контейнер

    fillInDragDropPuzzles.forEach((puzzle, index) => {
        const sentenceItem = document.createElement('div');
        sentenceItem.className = 'sentence-item';
        sentenceItem.setAttribute('data-correct-word', puzzle.correctWord); 

        const firstPart = document.createElement('span');
        firstPart.textContent = puzzle.parts[0];
        sentenceItem.appendChild(firstPart);

        const dropZone = document.createElement('div');
        dropZone.id = `fill-in-drop-zone-${index}`;
        dropZone.className = 'sentence-blank-drop-zone';
        dropZone.textContent = '   '; // Початковий плейсхолдер для порожнього пропуску
        // Додаємо атрибут для легшого доступу до оригінального плейсхолдера
        dropZone.dataset.placeholder = '   '; 

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            // Дозволяємо скидання лише якщо зона порожня (не має дочірніх елементів крім можливого placeholder-тексту)
            // або якщо в ній немає слова
            if (draggedItemFillIn && !dropZone.querySelector('.draggable-fill-in-word')) {
                dropZone.classList.add('drag-over-fill-in');
            }
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over-fill-in');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over-fill-in');

            const dragWordsBank = document.getElementById('drag-words-bank-fill-in');

            if (draggedItemFillIn && draggedItemFillIn.classList.contains('draggable-fill-in-word')) {
                const currentDroppedWordInZone = dropZone.querySelector('.draggable-fill-in-word');
                
                // Якщо зона вже містить слово, повертаємо його в банк
                if (currentDroppedWordInZone) {
                    dragWordsBank.appendChild(currentDroppedWordInZone);
                    resetWordStateForBank(currentDroppedWordInZone); // Скидаємо стан слова, яке було в зоні
                }

                // ВАЖЛИВА ЗМІНА ТУТ:
                // Спочатку очищаємо текстовий вміст зони, якщо там був плейсхолдер
                // Але НЕ очищаємо, якщо там вже було слово, яке ми щойно забрали
                if (dropZone.textContent.trim() === dropZone.dataset.placeholder) {
                     dropZone.textContent = ''; // Очищаємо плейсхолдер
                }
               
                // Переміщуємо перетягнутий елемент у зону скидання
                dropZone.appendChild(draggedItemFillIn);
                
                // Слово стає неперетягуваним (disabled) ОДРАЗУ після скидання,
                // але його можна витягти назад, якщо перетягнути інше слово.
                // При перевірці (checkAllFillInSentences) його статус буде остаточно визначено.
                draggedItemFillIn.classList.add('drag-disabled'); // Застосовуємо стилі disabled
                draggedItemFillIn.draggable = false; // Вимикаємо подальше перетягування слова після його розміщення
                draggedItemFillIn.style.cursor = 'default'; // Змінюємо курсор

                dropZone.classList.add('filled'); // Додаємо клас для заповненої зони
                // Очищаємо будь-які попередні результати перевірки на цій зоні
                dropZone.classList.remove('correct-fill-in', 'incorrect-fill-in'); 

                draggedItemFillIn = null; // Очищаємо draggedItemFillIn після успішного скидання
            }
        });

        sentenceItem.appendChild(dropZone);

        if (puzzle.parts[1]) {
            const secondPart = document.createElement('span');
            secondPart.textContent = puzzle.parts[1];
            sentenceItem.appendChild(secondPart);
        }

        sentencesListContainer.appendChild(sentenceItem);
    });
}


function checkAllFillInSentences() {
    const sentencesListContainer = document.getElementById('sentences-list-container');
    const fillInGameMessage = document.getElementById('fill-in-game-message');
    const checkBtn = document.getElementById('check-fill-in-game-btn');
    let allCorrect = true; 

    // Скидаємо повідомлення перед новою перевіркою
    fillInGameMessage.textContent = '';
    fillInGameMessage.className = 'fill-in-game-message'; // Скидаємо всі додаткові класи

    sentencesListContainer.querySelectorAll('.sentence-item').forEach((sentenceItem) => {
        const dropZone = sentenceItem.querySelector('.sentence-blank-drop-zone');
        const droppedWordElement = dropZone.querySelector('.draggable-fill-in-word');
        const correctWord = sentenceItem.getAttribute('data-correct-word');

        // Важливо: скидаємо стан dropZone на початку перевірки, щоб прибрати попередні кольори.
        // Але НЕ очищуємо її вміст, якщо там є слово, це буде зроблено нижче.
        dropZone.classList.remove('correct-fill-in', 'incorrect-fill-in');

        if (droppedWordElement && droppedWordElement.textContent.trim() === correctWord) {
            dropZone.classList.add('correct-fill-in');
            droppedWordElement.classList.add('text-green-800', 'font-bold');
            droppedWordElement.draggable = false; // Вимикаємо перетягування для правильного слова
            droppedWordElement.style.cursor = 'default'; // Змінюємо курсор
            droppedWordElement.classList.add('drag-disabled'); // Позначаємо як "вирішене"

        } else {
            // Якщо слово неправильне або пропуск порожній
            dropZone.classList.add('incorrect-fill-in');
            allCorrect = false;

            if (droppedWordElement) {
                // Повертаємо неправильне слово в банк слів
                document.getElementById('drag-words-bank-fill-in').appendChild(droppedWordElement);
                resetWordStateForBank(droppedWordElement); // Скидаємо його стан
            }
            // Очищаємо зону скидання та повертаємо плейсхолдер
            resetDropZoneState(dropZone); 
        }
    });

    if (allCorrect) {
        fillInGameMessage.textContent = 'Усі речення правильні! Чудова робота!';
        fillInGameMessage.classList.add('text-green-600');
        checkBtn.disabled = true;

        // Деактивуємо всі слова в банку, якщо гра повністю вирішена
        document.querySelectorAll('.draggable-fill-in-word').forEach(word => {
            word.draggable = false;
            word.classList.add('drag-disabled');
            word.style.cursor = 'default';
        });
    } else {
        fillInGameMessage.textContent = 'Є помилки. Спробуйте ще раз!';
        fillInGameMessage.classList.add('text-red-600');
        checkBtn.disabled = false; // Кнопка залишається активною для повторних спроб
    }
}

// --- ІНІЦІАЛІЗАЦІЯ ГРИ ПІСЛЯ ЗАВАНТАЖЕННЯ DOM ---
document.addEventListener('DOMContentLoaded', () => {
    const sentenceDragDropGameContainer = document.getElementById('sentence-drag-drop-game-container');
    
    if (sentenceDragDropGameContainer && fillInDragDropPuzzles.length > 0) {
        console.log('Ініціалізація Гри: Вставити слово в речення (Drag & Drop)');
        initializeFillInWordsBank();
        displayFillInSentences();

        document.getElementById('check-fill-in-game-btn').addEventListener('click', checkAllFillInSentences);
    } else {
        console.warn('Контейнер або дані для гри "Вставити слово в речення" відсутні. Перевірте HTML ID або fillInDragDropPuzzles.');
    }
});