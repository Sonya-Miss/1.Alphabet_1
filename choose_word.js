const sentenceData = [
    {
        id: 1,
        parts: ["1.", "cat."],
        correctWord: "One",
        options: ["One", "Seven"]
    },
    {
        id: 2,
        parts: ["2.", "cats."],
        correctWord: "Eight",
        options: ["One", "Eight"]
    },
    {
        id: 3,
        parts: ["3.", "raspberry."],
        correctWord: "One",
        options: ["Five", "One"]
    },
    {
        id: 4,
        parts: ["4.", "carrots."],
        correctWord: "Three",
        options: ["Three", "One"]
    },
    {
        id: 5,
        parts: ["5.", "horse."],
        correctWord: "One",
        options: ["One", "Nine"]
    },
    {
        id: 6,
        parts: ["6.", "pigs."],
        correctWord: "Six",
        options: ["One", "Six"]
    },
        {
        id: 7,
        parts: ["7.", "onion."],
        correctWord: "One",
        options: ["Four", "One"]
    },
        {
        id: 8,
        parts: ["8.", "peppers."],
        correctWord: "Two",
        options: ["Two", "One"]
    },

];

let activeDropdown = null;

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
 * Закриває будь-який активний випадаючий список.
 */
function closeActiveDropdown() {
    if (activeDropdown) {
        activeDropdown.remove();
        activeDropdown = null;
    }
}

// Слухач для закриття випадаючого списку при кліку за його межами
document.addEventListener('click', (e) => {
    // Перевіряємо, чи клік був поза активним дропдауном І не на самій drop-зоні
    if (activeDropdown && !activeDropdown.contains(e.target) && !e.target.classList.contains('blank-drop-zone')) {
        closeActiveDropdown();
    }
});

/**
 * Ініціалізує та відображає речення з пропусками-кнопками.
 */
function initializeGame() {
    const sentencesDisplay = document.getElementById('sentences-display');
    sentencesDisplay.innerHTML = ''; // Очищаємо вміст

    sentenceData.forEach((data, index) => {
        const sentenceItem = document.createElement('div');
        sentenceItem.className = 'sentence-item';
        sentenceItem.setAttribute('data-id', data.id); // Для ідентифікації речення

        // Додаємо першу частину речення (текст перед пропуском)
        const firstPartSpan = document.createElement('span');
        firstPartSpan.textContent = data.parts[0];
        sentenceItem.appendChild(firstPartSpan);

        // Створюємо drop-зону, яка буде кнопкою випадаючого списку
        const dropZone = document.createElement('div');
        dropZone.id = `blank-drop-zone-${data.id}`;
        dropZone.className = 'blank-drop-zone';
        dropZone.textContent = 'Виберіть слово'; // Початковий текст
        dropZone.dataset.placeholder = 'Виберіть слово'; // Зберігаємо placeholder
        dropZone.dataset.correctWord = data.correctWord; // Зберігаємо правильне слово для перевірки

        // Обробник кліку для drop-зони
        dropZone.addEventListener('click', (e) => {
            e.stopPropagation(); // Зупиняємо спливання, щоб не закрити одразу через document.click

            // Якщо є інший активний дропдаун, закриваємо його
            if (activeDropdown && activeDropdown.dataset.targetId !== dropZone.id) {
                closeActiveDropdown();
            }

            // Якщо ми клікнули на ту ж зону, що вже має відкритий дропдаун, закриваємо його
            if (activeDropdown && activeDropdown.dataset.targetId === dropZone.id) {
                closeActiveDropdown();
                return;
            }

            // Створюємо контейнер для випадаючого списку
            const dropdown = document.createElement('ul');
            dropdown.className = 'dropdown-list';
            dropdown.dataset.targetId = dropZone.id; // Прив'язуємо список до dropZone

            // Комбінуємо правильне слово з невірними опціями, перемішуємо та створюємо елементи списку
            const allOptions = shuffleArray([...data.options]); // Використовуємо всі опції, включно з correctWord якщо воно є в options

            allOptions.forEach(optionText => {
                const optionItem = document.createElement('li');
                optionItem.className = 'dropdown-option';
                optionItem.textContent = optionText;
                optionItem.addEventListener('click', (optionClickEvent) => {
                    optionClickEvent.stopPropagation(); // Зупиняємо спливання
                    dropZone.textContent = optionText; // Встановлюємо вибраний текст
                    dropZone.classList.add('filled');
                    // Прибираємо старі класи correct/incorrect, якщо були
                    dropZone.classList.remove('correct', 'incorrect');
                    closeActiveDropdown(); // Закриваємо список
                });
                dropdown.appendChild(optionItem);
            });

            // Додаємо випадаючий список до drop-зони
            dropZone.appendChild(dropdown);
            activeDropdown = dropdown; // Встановлюємо як активний
        });

        sentenceItem.appendChild(dropZone);

        // Додаємо другу частину речення (текст після пропуску)
        const secondPartSpan = document.createElement('span');
        secondPartSpan.textContent = data.parts[1];
        secondPartSpan.classList.add('second-part'); // Додаємо клас
        sentenceItem.appendChild(secondPartSpan);


        sentencesDisplay.appendChild(sentenceItem);
    });
}

/**
 * Перевіряє відповіді користувача.
 */
function checkAnswers() {
    closeActiveDropdown(); // Закриваємо будь-який відкритий список перед перевіркою
    const dropZones = document.querySelectorAll('.blank-drop-zone');
    const gameFeedback = document.getElementById('game-feedback');
    const checkButton = document.getElementById('check-answers-btn');

    let allCorrect = true;

    dropZones.forEach(dropZone => {
        const selectedWord = dropZone.textContent.trim();
        const correctWord = dropZone.dataset.correctWord;

        dropZone.classList.remove('correct', 'incorrect'); // Очищаємо попередні стани

        if (selectedWord === correctWord) {
            dropZone.classList.add('correct');
        } else {
            dropZone.classList.add('incorrect');
            allCorrect = false;
        }
    });

    if (allCorrect) {
        gameFeedback.textContent = 'Чудово! Усі відповіді правильні!';
        gameFeedback.className = 'game-message text-green-600';
        checkButton.disabled = true; // Вимикаємо кнопку після успішної перевірки
        // Забороняємо подальші кліки на drop-зонах
        dropZones.forEach(zone => {
            zone.style.pointerEvents = 'none';
            zone.classList.remove('cursor-pointer');
        });
    } else {
        gameFeedback.textContent = 'Є помилки. Спробуйте ще раз!';
        gameFeedback.className = 'game-message text-red-600';
        checkButton.disabled = false; // Дозволяємо перевірити знову
    }
}

// Запуск гри при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    const checkButton = document.getElementById('check-answers-btn');
    if (checkButton) {
        checkButton.addEventListener('click', checkAnswers);
    } else {
        console.error("Кнопка 'check-answers-btn' не знайдена. Перевірте HTML ID.");
    }
});