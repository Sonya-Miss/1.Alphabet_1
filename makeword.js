// --- ДАНІ ДЛЯ ГРИ ---
const letterPuzzlesData = [
    { phrase: "Read", image: "./Pictures/читати.jpg" },
    { phrase: "Write", image: "./Pictures/писати.jpg" },
    { phrase: "Play", image: "./Pictures/грати.jpg" },
    { phrase: "Go", image: "./Pictures/іти.jpg" },
    { phrase: "Eat", image: "./Pictures/їсти.jpg" },
    { phrase: "Drink", image: "./Pictures/пити.jpg" },
    { phrase: "Sleep", image: "./Pictures/спати.jpg" },
    { phrase: "Like", image: "./Pictures/подобатися.jpg" },
    { phrase: "Go", image: "./Pictures/їхати.jpg" },
];

// --- ДОПОМІЖНА ФУНКЦІЯ ---
/**
 * Перемішує елементи масиву випадковим чином.
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

// --- КЛАС ДЛЯ ГРИ "Складіть слова з літер" ---
class MakeWordGame {
    /**
     * Створює новий екземпляр гри "Складіть слова з літер".
     * @param {string} containerId - ID HTML-контейнера, куди будуть додаватися головоломки.
     * @param {Array<Object>} gameData - Масив даних для головоломок.
     */
    constructor(containerId, gameData) {
        this.puzzlesContainer = document.getElementById(containerId);
        this.gameData = gameData;
        this.draggedItem = null; // Локальна змінна для draggedItem для цього екземпляра гри

        if (!this.puzzlesContainer) {
            console.error(`Контейнер для гри не знайдено: ${containerId}`);
            return;
        }
        this.init();
    }

    init() {
        this.puzzlesContainer.innerHTML = ''; // Очищаємо контейнер перед ініціалізацією
        if (this.gameData.length > 0) {
            this.gameData.forEach((data, index) => {
                this.createLetterPuzzle(data.phrase, data.image, index);
            });
        }
    }

    /**
     * Створює одну головоломку для гри з буквами.
     * @param {string} phrase - Правильна фраза/слово.
     * @param {string} imagePath - Шлях до зображення.
     * @param {number} index - Індекс головоломки.
     */
    createLetterPuzzle(phrase, imagePath, index) {
        const puzzleId = `letter-puzzle-${this.puzzlesContainer.id}-${index}`; // Унікальний ID
        const correctWord = phrase.trim(); // Видаляємо зайві пробіли з кінців

        const puzzleWrapper = document.createElement('div');
        puzzleWrapper.id = puzzleId;
        puzzleWrapper.className = "bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center";

        puzzleWrapper.innerHTML = `
            <img src="${imagePath}" alt="Зображення для слова ${phrase}" class="imagesize w-48 h-48 md:w-56 md:h-56 rounded-lg mb-6 shadow-md">
            
            <div id="word-container-letters-${this.puzzlesContainer.id}-${index}" class="flex justify-center items-center flex-wrap gap-2 mb-6 min-h-[0px]"></div>
            
            <div class="w-full h-px bg-slate-200 mb-8"></div> 
            
            <div id="letters-container-letters-${this.puzzlesContainer.id}-${index}" class="flex justify-center flex-wrap gap-2 min-h-[40px]"></div>
            
            <div class="mt-10"> 
                <button id="check-btn-letters-${this.puzzlesContainer.id}-${index}" class="w-full bg-sky-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-600 transition-colors duration-300 disabled:bg-slate-300">
                    Перевірити
                </button>
                <p id="message-letters-${this.puzzlesContainer.id}-${index}" class="mt-1 h-4 text-center text-xs font-medium"></p>
            </div>
        `;
        this.puzzlesContainer.appendChild(puzzleWrapper);

        const wordContainer = document.getElementById(`word-container-letters-${this.puzzlesContainer.id}-${index}`);
        const lettersContainer = document.getElementById(`letters-container-letters-${this.puzzlesContainer.id}-${index}`);
        const checkBtn = document.getElementById(`check-btn-letters-${this.puzzlesContainer.id}-${index}`);
        const messageEl = document.getElementById(`message-letters-${this.puzzlesContainer.id}-${index}`);

        const letters = shuffleArray(correctWord.replace(/ /g, '').split(''));

        correctWord.split('').forEach((char) => {
            if (char === ' ') {
                const spaceBox = document.createElement('div');
                spaceBox.className = 'space-box min-w-[20px] h-10'; // Додав min-width і height для кращого відображення пробілу
                wordContainer.appendChild(spaceBox);
            } else {
                const dropZone = document.createElement('div');
                dropZone.className = 'drop-zone min-w-[40px] h-14 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-lg font-bold text-gray-500 overflow-hidden'; // Додав стилі
                this.addLetterDropZoneListeners(dropZone, lettersContainer);
                wordContainer.appendChild(dropZone);
            }
        });

        letters.forEach((letter, letterIndex) => {
            const letterBox = document.createElement('div');
            letterBox.id = `letter-${this.puzzlesContainer.id}-${index}-${letterIndex}`; // Унікальний ID
            letterBox.className = 'letter-box-base letter-box letter-box-draggable bg-blue-300 text-blue-800 py-2 px-3 rounded-md shadow-sm cursor-grab text-xl font-semibold transition-transform duration-200 hover:scale-105'; // Додав стилі
            letterBox.textContent = letter;
            letterBox.draggable = true;
            
            this.addDraggableLetterListeners(letterBox);
            this.addLetterClickListener(letterBox, wordContainer, lettersContainer);
            
            lettersContainer.appendChild(letterBox);
        });
        
        checkBtn.addEventListener('click', () => this.checkLetterResult(correctWord, wordContainer, messageEl, checkBtn, lettersContainer));
    }

    /** Додавання слухачів подій до перетягуваних букв */
    addDraggableLetterListeners(element) {
        element.addEventListener('dragstart', (e) => {
            this.draggedItem = e.target; // Використовуємо this.draggedItem
            setTimeout(() => {
                e.target.style.opacity = '0.5';
            }, 0);
        });

        element.addEventListener('dragend', (e) => {
            setTimeout(() => {
                if (this.draggedItem) {
                    this.draggedItem.style.opacity = '1';
                }
                this.draggedItem = null; // Очищуємо this.draggedItem
            }, 0);
        });
    }

    /** Додавання слухачів подій до комірок для букв */
    addLetterDropZoneListeners(zone, lettersContainer) {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); 
            // Перевіряємо, чи це draggedItem цього класу і чи зона порожня
            if (this.draggedItem && this.draggedItem.classList.contains('letter-box') && !zone.hasChildNodes()) {
                zone.classList.add('drag-over');
            }
        });

        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            if (this.draggedItem && this.draggedItem.classList.contains('letter-box') && !zone.hasChildNodes()) {
                // Якщо в зоні вже щось є, повертаємо її в контейнер літер
                if(zone.children.length > 0) {
                    lettersContainer.appendChild(zone.firstChild);
                    // Додатково повертаємо початкові стилі
                    zone.firstChild.classList.remove('correct-letter-box', 'incorrect-letter-box');
                    zone.firstChild.classList.add('bg-blue-300', 'text-blue-800');
                    zone.firstChild.draggable = true;
                    zone.firstChild.style.cursor = 'grab';
                }
                zone.appendChild(this.draggedItem);

                // Очищаємо повідомлення про помилку/успіх
                const messageEl = zone.closest('.puzzle-wrapper') ? zone.closest('.puzzle-wrapper').querySelector('[id^="message-letters-"]') : null;
                if (messageEl) {
                    messageEl.textContent = '';
                    // Очищаємо стилі всіх дроп-зон, якщо вони були неправильними
                    Array.from(zone.closest('.puzzle-wrapper').querySelectorAll('.drop-zone')).forEach(dZ => {
                        dZ.classList.remove('correct', 'incorrect');
                    });
                }
                // Увімкнути кнопку перевірки, якщо її було вимкнено
                const checkBtn = zone.closest('.puzzle-wrapper') ? zone.closest('.puzzle-wrapper').querySelector('[id^="check-btn-letters-"]') : null;
                if (checkBtn) {
                    checkBtn.disabled = false;
                }
            }
        });

        // Додаємо обробник кліку на порожню drop-зону, щоб повернути букву з неї
        zone.addEventListener('click', () => {
            const letterInZone = zone.querySelector('.letter-box');
            if (letterInZone) {
                lettersContainer.appendChild(letterInZone);
                // Повертаємо початкові стилі
                letterInZone.classList.remove('correct-letter-box', 'incorrect-letter-box');
                letterInZone.classList.add('bg-blue-300', 'text-blue-800');
                letterInZone.draggable = true;
                letterInZone.style.cursor = 'grab';

                const messageEl = zone.closest('.puzzle-wrapper') ? zone.closest('.puzzle-wrapper').querySelector('[id^="message-letters-"]') : null;
                if (messageEl) {
                    messageEl.textContent = '';
                    Array.from(zone.closest('.puzzle-wrapper').querySelectorAll('.drop-zone')).forEach(dZ => {
                        dZ.classList.remove('correct', 'incorrect');
                    });
                }
                const checkBtn = zone.closest('.puzzle-wrapper') ? zone.closest('.puzzle-wrapper').querySelector('[id^="check-btn-letters-"]') : null;
                if (checkBtn) {
                    checkBtn.disabled = false;
                }
            }
        });
    }

    /** Додавання слухача кліка до букв */
    addLetterClickListener(letterBox, wordContainer, lettersContainer) {
        letterBox.addEventListener('click', () => {
            // Якщо буква знаходиться в зоні скидання, повернути її в банк
            if (letterBox.parentElement.classList.contains('drop-zone')) {
                const currentDropZone = letterBox.parentElement;
                lettersContainer.appendChild(letterBox);
                currentDropZone.classList.remove('correct', 'incorrect'); // Очистити стилі зони
                // Повернути початкові стилі букви
                letterBox.classList.remove('correct-letter-box', 'incorrect-letter-box');
                letterBox.classList.add('bg-blue-300', 'text-blue-800');
                letterBox.draggable = true;
                letterBox.style.cursor = 'grab';
                
                // Очистити повідомлення про помилку/успіх, якщо букву забрали
                const messageEl = currentDropZone.closest('.puzzle-wrapper') ? currentDropZone.closest('.puzzle-wrapper').querySelector('[id^="message-letters-"]') : null;
                if (messageEl) {
                    messageEl.textContent = '';
                }
                // Увімкнути кнопку перевірки, якщо її було вимкнено
                const checkBtn = currentDropZone.closest('.puzzle-wrapper') ? currentDropZone.closest('.puzzle-wrapper').querySelector('[id^="check-btn-letters-"]') : null;
                if (checkBtn) {
                    checkBtn.disabled = false;
                }

            } else {
                // Якщо буква в банку, знайти першу вільну зону скидання
                const dropZones = Array.from(wordContainer.children).filter(node => node.classList.contains('drop-zone') && !node.hasChildNodes());
                
                if (dropZones.length > 0) {
                    dropZones[0].appendChild(letterBox);
                    // Очистити повідомлення про помилку/успіх, якщо букву додали
                    const messageEl = dropZones[0].closest('.puzzle-wrapper') ? dropZones[0].closest('.puzzle-wrapper').querySelector('[id^="message-letters-"]') : null;
                    if (messageEl) {
                        messageEl.textContent = '';
                    }
                }
            }
        });
    }

    /** Перевірка результату для гри з буквами */
    checkLetterResult(correctWord, wordContainer, messageEl, checkBtn, lettersContainer) {
        const dropZonesAndSpaces = Array.from(wordContainer.childNodes).filter(node => node.nodeType === 1); // Фільтруємо лише елементи
        let userAnswer = '';
        let allFilled = true;

        dropZonesAndSpaces.forEach(node => {
            if (node.classList && node.classList.contains('drop-zone')) {
                if (node.children.length > 0) {
                    userAnswer += node.children[0].textContent.trim(); // Додаємо trim
                } else {
                    allFilled = false;
                }
            } else if (node.classList && node.classList.contains('space-box')) {
                userAnswer += ' ';
            }
        });

        if (!allFilled) {
            messageEl.textContent = 'Будь ласка, заповніть усі комірки';
            messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-amber-600';
            return;
        }

        if (userAnswer === correctWord) {
            messageEl.textContent = 'Чудово, правильно!';
            messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-green-600';
            checkBtn.disabled = true;
            dropZonesAndSpaces.forEach(node => { 
                if (node.classList && node.classList.contains('drop-zone')) {
                    node.classList.add('correct');
                    node.classList.remove('incorrect');
                    // Змінити стиль букви на зелений
                    if (node.children.length > 0) {
                        node.children[0].classList.add('correct-letter-box');
                        node.children[0].classList.remove('incorrect-letter-box', 'bg-blue-300', 'text-blue-800');
                        node.children[0].draggable = false; // Вимикаємо перетягування
                        node.children[0].style.cursor = 'default';
                    }
                }
            });
        } else {
            messageEl.textContent = 'Спробуйте ще раз';
            messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-red-600';
            dropZonesAndSpaces.forEach(node => { 
                if (node.classList && node.classList.contains('drop-zone')) {
                    node.classList.add('incorrect');
                    node.classList.remove('correct');
                    // Змінити стиль букви на червоний
                    if (node.children.length > 0) {
                        node.children[0].classList.add('incorrect-letter-box');
                        node.children[0].classList.remove('correct-letter-box', 'bg-blue-300', 'text-blue-800');
                    }
                }
            });

            // Повернення неправильних букв у вихідний контейнер через 1 секунду
            setTimeout(() => {
                dropZonesAndSpaces.forEach(node => {
                    if (node.classList && node.classList.contains('drop-zone')) {
                        const letterBox = node.querySelector('.letter-box');
                        if (letterBox && letterBox.classList.contains('incorrect-letter-box')) {
                            lettersContainer.appendChild(letterBox); // Повертаємо в lettersContainer
                            letterBox.classList.remove('incorrect-letter-box', 'opacity-50');
                            letterBox.classList.add('bg-blue-300', 'text-blue-800'); // Повертаємо початкові стилі
                            letterBox.draggable = true;
                            letterBox.style.cursor = 'grab';
                            node.classList.remove('incorrect'); // Прибираємо червоний фон з drop-зони
                        }
                    }
                });
                messageEl.textContent = ''; // Очищаємо повідомлення
            }, 1000);
        }
    }
}

// --- ІНІЦІАЛІЗАЦІЯ ГРИ ПІСЛЯ ЗАВАНТАЖЕННЯ DOM ---
document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізація гри "Складіть слова з літер"
    // Тепер ми використовуємо ID "puzzles-container-letters", який ви вказали у HTML
    new MakeWordGame(
        'puzzles-container-letters', // ID контейнера, куди будуть додаватися пазли
        letterPuzzlesData             // Дані для гри
    );
});