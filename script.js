// --- НАЛАШТУВАННЯ ДЛЯ ГРИ 1: Перетягни слово до картинки ---
// const dragAndDropPuzzlesData = [
//     { correctWord: "I", image: "./Pictures/я.jpg", draggableWord: "I" },
//     { correctWord: "You", image: "./Pictures/ви.jpg", draggableWord: "You" },
//     { correctWord: "He", image: "./Pictures/він.jpg", draggableWord: "He" },
//     { correctWord: "She", image: "./Pictures/вона.jpg", draggableWord: "She" },
//     { correctWord: "It", image: "./Pictures/воно.jpg", draggableWord: "It" },
//     { correctWord: "We", image: "./Pictures/ми.jpg", draggableWord: "We" },
//     { correctWord: "You", image: "./Pictures/ти.jpg", draggableWord: "You" },
//     { correctWord: "They", image: "./Pictures/вони.jpg", draggableWord: "They" }
// ];
// --- НАЛАШТУВАННЯ ДЛЯ ГРИ 2: Склади слово з літер ---
// const letterPuzzlesData = [
//     { phrase: "How old are you", image: "./Pictures/скільки тобі років.jpg" },
//     { phrase: "I am", image: "./Pictures/мені.jpg" },
//     { phrase: "I am years old", image: "./Pictures/мені років.jpg" },
//     { phrase: "man", image: "./Pictures/чоловік.jpg" },
//     { phrase: "woman", image: "./Pictures/жінка.jpg" },
//     { phrase: "girl", image: "./Pictures/дівчинка.jpg" },
//     { phrase: "boy ", image: "./Pictures/хлопчик.jpg" }
// ];



// // Зображення для каруселі
// const carouselImages = [
//     { src: "./Pictures/i.jpg", alt: "I" },
//     { src: "./Pictures/you.jpg", alt: "You" },
//     { src: "./Pictures/we.jpg", alt: "We" },
//     { src: "./Pictures/they.jpg", alt: "They" },
//     { src: "./Pictures/he.jpg", alt: "He" },
//     { src: "./Pictures/she.jpg", alt: "She" },
//     { src: "./Pictures/it.jpg", alt: "It" }

// ];


// // Зображення для каруселі  2
// const carouselImages2 = [
//     { src: "./Pictures/how old are you.jpg", alt: "how old are you" },
//     { src: "./Pictures/I am.jpg", alt: "I am" },
//     { src: "./Pictures/I am years old.jpg", alt: "I am years old" },
//     { src: "./Pictures/man.jpg", alt: "man" },
//     { src: "./Pictures/woman.jpg", alt: "woman" },
//     { src: "./Pictures/boy.jpg", alt: "boy" },
//     { src: "./Pictures/girl.jpg", alt: "girl" }


// ];


// // Зображення для каруселі  3
// const carouselImages3 = [
//     { src: "./Pictures/to be.jpg", alt: "to be" },
//     { src: "./Pictures/to be2.jpg", alt: "to be2" },
//     { src: "./Pictures/to beall.jpg", alt: "to beall" }

// ];


// --- НАЛАШТУВАННЯ ДЛЯ ГРИ 3: ВПІЗНАЙ СЛОВО НА СЛУХ (АУДІО-ГРА) ---
// const audioPuzzlesData = [

//     { word: "man", audio: "./Audio/man.mp3" },
//     { word: "woman", audio: "./Audio/woman.mp3" },
//     { word: "boy", audio: "./Audio/boy.mp3" },
//     { word: "girl", audio: "./Audio/girl.mp3" },
//     { word: "I am eight", audio: "./Audio/i am eight.mp3" },
//     { word: "I am nine years old", audio: "./Audio/i am nine years old.mp3" },
//     { word: "How old are you?", audio: "./Audio/how old are you.mp3" } 

// ];


// --- ГЛОБАЛЬНІ ЗМІННІ ---
// Контейнери для ігор
 // Для гри 1
// const puzzlesContainerLetters = document.getElementById('puzzles-container-letters');
// const puzzlesContainerDragAndDrop = document.getElementById('puzzles-container-drag-and-drop');
// const draggableWordsContainer = document.getElementById('draggable-words-container');

//  // Для гри 1.2
//  const puzzlesContainerLetters2 = document.getElementById('puzzles-container-letters2');
// const puzzlesContainerDragAndDrop2 = document.getElementById('puzzles-container-drag-and-drop2');
// const draggableWordsContainer2 = document.getElementById('draggable-words-container2');
// // Для гри 3
// let correctAudioGameCount = 0;
// const totalAudioGamePuzzles = audioPuzzlesData.length;
// let currentDraggedAudioWord = null; // Зберігає слово, яке зараз перетягується

 // Використовується для обох Drag & Drop ігор (Г1 та Г2)

// // Змінні для каруселі
// const carouselContainer = document.getElementById('carousel-container');
// const carouselPrevBtn = document.getElementById('carousel-prev');
// const carouselNextBtn = document.getElementById('carousel-next');
// const carouselDotsContainer = document.getElementById('carousel-dots');

// let currentSlide = 0;
// let carouselInterval;

// // карусель 2

// const carouselContainer2 = document.getElementById('carousel-container2');
// const carouselPrevBtn2 = document.getElementById('carousel-prev2');
// const carouselNextBtn2 = document.getElementById('carousel-next2');
// const carouselDotsContainer2 = document.getElementById('carousel-dots2');

// let currentSlide2 = 0;
// let carouselInterval2;


// // карусель 3

// const carouselContainer3 = document.getElementById('carousel-container3');
// const carouselPrevBtn3 = document.getElementById('carousel-prev3');
// const carouselNextBtn3 = document.getElementById('carousel-next3');
// const carouselDotsContainer3 = document.getElementById('carousel-dots3');

// let currentSlide3 = 0;
// let carouselInterval3;

// --- ФУНКЦІЇ ЗАГАЛЬНІ ---

/** Перемішує масив у випадковому порядку */
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }


// // --- ФУНКЦІЇ ДЛЯ ГРИ 1: Перетягни слово до картинки ---

// /** Створює одну головоломку для перетягування слова до картинки */
// function createDragAndDropPuzzle(puzzleData, index) {
//     const puzzleId = `drag-puzzle-${index}`;
//     const correctWord = puzzleData.correctWord;
//     const imagePath = puzzleData.image;

// const puzzleWrapper = document.createElement('div');
// puzzleWrapper.id = puzzleId;
// puzzleWrapper.className = "bg-white p-3 rounded-lg shadow-md flex flex-col items-center relative flex-grow-0 flex-shrink-0 w-[calc(34%-1.066rem)] min-w-[180px]";
// puzzleWrapper.innerHTML = `
//     <img src="${imagePath}" alt="Зображення для слова ${correctWord}" class="imagesize w-34 h-33 rounded-md shadow-sm mb-5"> 
    
//     <div class="word-drop-zone w-full h-16 flex justify-center items-center border-2 border-dashed border-gray-300 rounded-md text-lg font-bold text-gray-500 overflow-hidden">
//         <span class="placeholder text-sm">Перетягніть слово сюди</span>
//     </div>
    
//     <div class="mt-6 w-full"> 
//         <button id="check-btn-drag-${index}" class="w-full bg-sky-500 text-white font-bold py-1.5 px-3 rounded-md hover:bg-sky-600 transition-colors duration-300 disabled:bg-slate-300 text-sm">
//             Перевірити
//         </button>
//         <p id="message-drag-${index}" class="mt-1 h-4 text-center text-xs font-medium"></p>
//     </div>
// `;
// puzzlesContainerDragAndDrop.appendChild(puzzleWrapper);
    
//     const wordDropZone = puzzleWrapper.querySelector('.word-drop-zone');
//     const checkBtn = document.getElementById(`check-btn-drag-${index}`);
//     const messageEl = document.getElementById(`message-drag-${index}`);

//     addWordDropZoneListeners(wordDropZone);

//     checkBtn.addEventListener('click', () => checkWordDropResult(correctWord, wordDropZone, messageEl, checkBtn));
// }

// /** Створює та додає перетягувані слова до контейнера */
// function createDraggableWords() {
//     draggableWordsContainer.innerHTML = ''; 
//     const wordsToDrag = shuffleArray(dragAndDropPuzzlesData.map(p => p.draggableWord));

//     wordsToDrag.forEach((word, index) => {
//         const wordBox = document.createElement('div');
//         wordBox.id = `draggable-word-${index}`;
//         wordBox.className = 'draggable-word bg-blue-200 text-blue-800 py-3 px-6 rounded-lg shadow-md cursor-grab text-xl md:text-2xl font-semibold transition-transform duration-200 hover:scale-105';
//         wordBox.textContent = word;
//         wordBox.draggable = true;
//         addDraggableWordListeners(wordBox);
//         draggableWordsContainer.appendChild(wordBox);
//     });
// }

// /** Додавання слухачів подій до елементів, що перетягуються (слова) */
// function addDraggableWordListeners(element) {
//     element.addEventListener('dragstart', (e) => {
//         draggedItem = e.target;
//         e.dataTransfer.setData('text/plain', element.textContent);
//         setTimeout(() => {
//             e.target.classList.add('opacity-50');
//         }, 0);
//     });

//     element.addEventListener('dragend', (e) => {
//         setTimeout(() => {
//             if (draggedItem) {
//                draggedItem.classList.remove('opacity-50');
//             }
//             draggedItem = null;
//         }, 0);
//     });
// }

// /** Додавання слухачів подій до зон скидання (контейнери над картинками) для слів */
// function addWordDropZoneListeners(zone) {
//       zone.addEventListener('dragover', (e) => {
//           e.preventDefault();
//           if (draggedItem && draggedItem.classList.contains('draggable-word') && !zone.querySelector('.draggable-word')) {
//               zone.classList.add('drag-over');
//           }
//       });

//       zone.addEventListener('dragleave', () => {
//           zone.classList.remove('drag-over');
//       });

//       zone.addEventListener('drop', (e) => {
//           e.preventDefault();
//           zone.classList.remove('drag-over');

//           if (draggedItem && draggedItem.classList.contains('draggable-word') && !zone.querySelector('.draggable-word')) {
//               // Повертаємо будь-яке слово, яке вже було в цій зоні, назад у контейнер для перетягування
//               const existingWord = zone.querySelector('.draggable-word');
//               if (existingWord) {
//                   draggableWordsContainer.appendChild(existingWord);
//                   existingWord.classList.remove('correct-word-box', 'incorrect-word-box'); // Прибрати стилі результату
//                   existingWord.draggable = true; // Знову зробити перетягуваним
//                   existingWord.style.cursor = 'grab'; // Повернути курсор
//               }
              
//               zone.appendChild(draggedItem);
//               // Видаляємо плейсхолдер після скидання слова
//               const placeholder = zone.querySelector('.placeholder');
//               if (placeholder) {
//                   placeholder.style.display = 'none';
//               }

//               // Очищуємо повідомлення про помилку/успіх, якщо слово змінюється
//               const messageEl = zone.parentElement.querySelector('[id^="message-drag-"]');
//               if (messageEl) {
//                   messageEl.textContent = '';
//                   zone.classList.remove('correct', 'incorrect');
//                   // Перевіряємо, чи є вже скинутий елемент у зоні, перед спробою зняти з нього класи
//                   if (draggedItem.classList.contains('correct-word-box') || draggedItem.classList.contains('incorrect-word-box')) {
//                       draggedItem.classList.remove('correct-word-box', 'incorrect-word-box');
//                   }
//               }
//               // Увімкнути кнопку перевірки, якщо її було вимкнено
//               const checkBtn = zone.parentElement.querySelector('[id^="check-btn-drag-"]');
//               if (checkBtn) {
//                   checkBtn.disabled = false;
//               }
//           }
//       });
// }

// /** Перевірка результату для гри "Перетягни слово до картинки" */
// function checkWordDropResult(correctWord, wordDropZone, messageEl, checkBtn) {
//     const droppedWordElement = wordDropZone.querySelector('.draggable-word');
//     let userAnswer = '';
    
//     if (!droppedWordElement) {
//         messageEl.textContent = 'Будь ласка, перетягніть слово';
//         messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-amber-600';
//         return;
//     }

//     userAnswer = droppedWordElement.textContent.trim(); // Trim на випадок зайвих пробілів

//     if (userAnswer === correctWord) {
//         messageEl.textContent = 'Чудово, правильно!';
//         messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-green-600';
//         checkBtn.disabled = true;
//         wordDropZone.classList.add('correct');
//         wordDropZone.classList.remove('incorrect');
//         droppedWordElement.classList.add('correct-word-box');
//         droppedWordElement.classList.remove('incorrect-word-box');
//         droppedWordElement.draggable = false;
//         droppedWordElement.style.cursor = 'default';
//     } else {
//         messageEl.textContent = 'Спробуйте ще раз';
//         messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-red-600';
//         wordDropZone.classList.add('incorrect');
//         wordDropZone.classList.remove('correct');
//         droppedWordElement.classList.add('incorrect-word-box');
//         droppedWordElement.classList.remove('correct-word-box');

//         // Повертаємо слово назад у банк слів, якщо відповідь невірна
//         setTimeout(() => {
//             const placeholder = wordDropZone.querySelector('.placeholder');
//             if (placeholder) {
//                 placeholder.style.display = 'inline'; // Показати плейсхолдер знову
//             } else {
//                 // Якщо плейсхолдера немає, створити його або повернути оригінальний текст
//                 wordDropZone.innerHTML = `<span class="placeholder text-sm">Перетягніть слово сюди</span>`;
//             }
            
//             wordDropZone.classList.remove('incorrect');
//             droppedWordElement.classList.remove('incorrect-word-box', 'opacity-50');
//             // Повернути оригінальні стилі draggable слова
//             droppedWordElement.classList.add('bg-blue-200', 'text-blue-800', 'hover:scale-105'); 
//             draggableWordsContainer.appendChild(droppedWordElement);
//             droppedWordElement.draggable = true;
//             droppedWordElement.style.cursor = 'grab';
//         }, 1000); // Повернення через 1 секунду
//     }
// }


//////////////////////////////////////////////////////// --- ФУНКЦІЇ ДЛЯ ГРИ 2: Склади слово з літер ---//////////////////////////////////////



/** Створює одну головоломку для фрази (букви) */
// function createLetterPuzzle(phrase, imagePath, index) {
//     const puzzleId = `letter-puzzle-${index}`;
//     const correctWord = phrase;
    
// const puzzleWrapper = document.createElement('div');
// puzzleWrapper.id = puzzleId;
// puzzleWrapper.className = "bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center";

// puzzleWrapper.innerHTML = `
//     <img src="${imagePath}" alt="Зображення для слова ${phrase}" class="imagesize w-48 h-48 md:w-56 md:h-56 rounded-lg mb-6 shadow-md">
    
//     <div id="word-container-letters-${index}" class="flex justify-center items-center flex-wrap gap-2 mb-6 min-h-[60px]"></div>
    
//     <div class="w-full h-px bg-slate-200 mb-8"></div> 
    
//     <div id="letters-container-letters-${index}" class="flex justify-center flex-wrap gap-2 min-h-[60px]"></div>
    
//     <div class="mt-10"> 
//         <button id="check-btn-letters-${index}" class="w-full bg-sky-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-600 transition-colors duration-300 disabled:bg-slate-300">
//             Перевірити
//         </button>
//         <p id="message-letters-${index}" class="mt-1 h-4 text-center text-xs font-medium"></p>
//     </div>
// `;
// puzzlesContainerLetters.appendChild(puzzleWrapper);
    
//     const wordContainer = document.getElementById(`word-container-letters-${index}`);
//     const lettersContainer = document.getElementById(`letters-container-letters-${index}`);
//     const checkBtn = document.getElementById(`check-btn-letters-${index}`);
//     const messageEl = document.getElementById(`message-letters-${index}`);

//     const letters = shuffleArray(correctWord.replace(/ /g, '').split(''));

//     correctWord.split('').forEach((char) => {
//         if (char === ' ') {
//             const spaceBox = document.createElement('div');
//             spaceBox.className = 'space-box';
//             wordContainer.appendChild(spaceBox);
//         } else {
//             const dropZone = document.createElement('div');
//             dropZone.className = 'drop-zone';
//             addLetterDropZoneListeners(dropZone, lettersContainer);
//             wordContainer.appendChild(dropZone);
//         }
//     });

//     letters.forEach((letter, letterIndex) => {
//         const letterBox = document.createElement('div');
//         letterBox.id = `letter-${index}-${letterIndex}`;
//         letterBox.className = 'letter-box-base letter-box letter-box-draggable';
//         letterBox.textContent = letter;
//         letterBox.draggable = true;
        
//         addDraggableLetterListeners(letterBox);
//         addLetterClickListener(letterBox, wordContainer, lettersContainer);
        
//         lettersContainer.appendChild(letterBox);
//     });
    
//     checkBtn.addEventListener('click', () => checkLetterResult(correctWord, wordContainer, messageEl, checkBtn));
// }

// /** Додавання слухачів подій до перетягуваних букв */
// function addDraggableLetterListeners(element) {
//     element.addEventListener('dragstart', (e) => {
//         draggedItem = e.target;
//         setTimeout(() => {
//             e.target.style.opacity = '0.5';
//         }, 0);
//     });

//     element.addEventListener('dragend', (e) => {
//         setTimeout(() => {
//             if (draggedItem) {
//                draggedItem.style.opacity = '1';
//             }
//             draggedItem = null;
//         }, 0);
//     });
// }

// /** Додавання слухачів подій до комірок для букв */
// function addLetterDropZoneListeners(zone, lettersContainer) {
//       zone.addEventListener('dragover', (e) => {
//           e.preventDefault(); 
//           if (!zone.hasChildNodes()) {
//               zone.classList.add('drag-over');
//           }
//       });

//       zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));

//       zone.addEventListener('drop', (e) => {
//           e.preventDefault();
//           zone.classList.remove('drag-over');
//           if (draggedItem && draggedItem.classList.contains('letter-box') && !zone.hasChildNodes()) {
//                if(zone.children.length > 0) { // Якщо в зоні вже щось є (хоча !zone.hasChildNodes() мав би це запобігти)
//                    lettersContainer.appendChild(zone.firstChild); // Повернути назад
//                }
//                zone.appendChild(draggedItem);
//           }
//       });
// }

// /** Додавання слухача кліка до букв */
// function addLetterClickListener(letterBox, wordContainer, lettersContainer) {
//     letterBox.addEventListener('click', () => {
//         // Якщо буква знаходиться в зоні скидання, повернути її в банк
//         if (letterBox.parentElement.classList.contains('drop-zone')) {
//             const currentDropZone = letterBox.parentElement;
//             lettersContainer.appendChild(letterBox);
//             currentDropZone.classList.remove('correct', 'incorrect'); // Очистити стилі зони
//             // Очистити повідомлення про помилку/успіх, якщо букву забрали
//             const messageEl = currentDropZone.parentElement.querySelector('[id^="message-letters-"]');
//             if (messageEl) {
//                 messageEl.textContent = '';
//             }
//             // Увімкнути кнопку перевірки, якщо її було вимкнено
//             const checkBtn = currentDropZone.parentElement.querySelector('[id^="check-btn-letters-"]');
//             if (checkBtn) {
//                 checkBtn.disabled = false;
//             }

//         } else {
//             // Якщо буква в банку, знайти першу вільну зону скидання
//             const dropZones = Array.from(wordContainer.children).filter(node => node.classList.contains('drop-zone') && !node.hasChildNodes());
            
//             if (dropZones.length > 0) {
//                 dropZones[0].appendChild(letterBox);
//                 // Очистити повідомлення про помилку/успіх, якщо букву додали
//                 const messageEl = dropZones[0].parentElement.querySelector('[id^="message-letters-"]');
//                 if (messageEl) {
//                     messageEl.textContent = '';
//                 }
//             }
//         }
//     });
// }

// /** Перевірка результату для гри з буквами */
// function checkLetterResult(correctWord, wordContainer, messageEl, checkBtn) {
//     const dropZonesAndSpaces = Array.from(wordContainer.childNodes).filter(node => node.nodeType === 1); // Фільтруємо лише елементи
//     let userAnswer = '';
//     let allFilled = true;

//     dropZonesAndSpaces.forEach(node => {
//         if (node.classList && node.classList.contains('drop-zone')) {
//             if (node.children.length > 0) {
//                 userAnswer += node.children[0].textContent.trim(); // Додаємо trim
//             } else {
//                 allFilled = false;
//             }
//         } else if (node.classList && node.classList.contains('space-box')) {
//             userAnswer += ' ';
//         }
//     });

//     if (!allFilled) {
//         messageEl.textContent = 'Будь ласка, заповніть усі комірки';
//         messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-amber-600';
//         return;
//     }

//     if (userAnswer === correctWord) {
//         messageEl.textContent = 'Чудово, правильно!';
//         messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-green-600';
//         checkBtn.disabled = true;
//         dropZonesAndSpaces.forEach(node => { 
//             if (node.classList && node.classList.contains('drop-zone')) {
//                 node.classList.add('correct');
//                 node.classList.remove('incorrect');
//             }
//         });
//     } else {
//         messageEl.textContent = 'Спробуйте ще раз';
//         messageEl.className = 'mt-1 h-4 text-center text-xs font-medium text-red-600';
//         dropZonesAndSpaces.forEach(node => { 
//             if (node.classList && node.classList.contains('drop-zone')) {
//                 node.classList.add('incorrect');
//                 node.classList.remove('correct');
//             }
//         });
//     }
// }



////////////////////////////////////////////// --- ФУНКЦІЇ ДЛЯ ГРИ 3: ВПІЗНАЙ СЛОВО НА СЛУХ (АУДІО-ГРА) ---///////////////////////////////////////


// --- ФУНКЦІЇ ДЛЯ ГРИ 3: ВПІЗНАЙ СЛОВО НА СЛУХ (АУДІО-ГРА) ---

// // Функція для додавання слухачів Drag & Drop до зони скидання
// function addAudioDropZoneListeners(dropZone) {
//     dropZone.addEventListener('dragover', (e) => {
//         e.preventDefault(); // Дозволяємо скидання
//         dropZone.classList.add('drag-over');
//     });

//     dropZone.addEventListener('dragleave', () => {
//         dropZone.classList.remove('drag-over');
//     });

//     dropZone.addEventListener('drop', (e) => {
//         e.preventDefault();
//         dropZone.classList.remove('drag-over');

//         // Якщо в зоні вже є слово, не дозволяємо скидати ще одне
//         if (dropZone.querySelector('.audio-dropped-word')) {
//             // Можна додати якесь візуальне сповіщення, але ми не дозволяємо скидати
//             return; 
//         }

//         const draggedWordText = e.dataTransfer.getData('text/plain');
//         const draggedWordElement = document.querySelector(`.audio-draggable-word[data-word="${draggedWordText}"]`);
        
//         if (draggedWordElement && currentDraggedAudioWord === draggedWordText) {
//             // Якщо в зоні вже було слово, повертаємо його в банк
//             const existingWordInDropZone = dropZone.querySelector('.audio-dropped-word');
//             if (existingWordInDropZone) {
//                 document.getElementById('word-bank').appendChild(existingWordInDropZone);
//                 existingWordInDropZone.classList.remove('audio-dropped-word', 'correct-word-box', 'incorrect-word-box');
//                 existingWordInDropZone.classList.add('bg-blue-500', 'hover:bg-blue-400', 'text-white');
//                 existingWordInDropZone.draggable = true;
//                 addAudioDraggableWordListeners(); // Повторно додаємо слухачів
//             }

//             dropZone.innerHTML = ''; // Очистити placeholder
//             dropZone.appendChild(draggedWordElement); // Перемістити елемент
//             draggedWordElement.style.position = ''; 
//             draggedWordElement.style.left = '';
//             draggedWordElement.style.top = '';
//             draggedWordElement.classList.add('audio-dropped-word'); // Позначаємо, що слово скинуте

//             // Очищення повідомлень про помилку, якщо слово замінили
//             const messageEl = dropZone.parentElement.querySelector('[id^="message-audio-"]');
//             if (messageEl) {
//                 messageEl.textContent = '';
//                 dropZone.classList.remove('correct', 'incorrect');
//                 // Видаляємо класи результату з елемента, якщо вони були
//                 if (draggedWordElement.classList.contains('correct-word-box') || draggedWordElement.classList.contains('incorrect-word-box')) {
//                     draggedWordElement.classList.remove('correct-word-box', 'incorrect-word-box');
//                     draggedWordElement.classList.add('bg-blue-400', 'hover:bg-blue-600', 'text-white');
//                 }
                
//                 // Якщо кнопка перевірки була вимкнена, увімкнути її, якщо слово замінено
//                 const checkBtn = dropZone.parentElement.querySelector('[id^="check-btn-audio-"]');
//                 const playBtn = dropZone.parentElement.querySelector('[id^="play-btn-audio-"]');
//                 if (checkBtn) checkBtn.disabled = false;
//                 if (playBtn) playBtn.disabled = false;
//             }
//         }
//         currentDraggedAudioWord = null; // Скинути поточне перетягуване слово
//     });
// }

// // Функція для додавання слухачів Drag & Drop до перетягуваних слів
// function addAudioDraggableWordListeners() {
//     const draggableWords = document.querySelectorAll('#word-bank .audio-draggable-word');
//     draggableWords.forEach(wordEl => {
//         wordEl.addEventListener('dragstart', (e) => {
//             e.dataTransfer.setData('text/plain', e.target.dataset.word);
//             e.target.classList.add('opacity-50'); // Візуальний ефект перетягування
//             currentDraggedAudioWord = e.target.dataset.word; // Зберігаємо поточне слово
//         });

//         wordEl.addEventListener('dragend', (e) => {
//             e.target.classList.remove('opacity-50'); // Прибираємо ефект
//         });
//     });
// }

// // Функція для перевірки відповіді в аудіо-грі
// function checkAudioGameResult(correctWord, dropZone, messageEl, checkBtn, playBtn) {
//     const droppedWordElement = dropZone.querySelector('.audio-dropped-word');
//     const audioWordBank = document.getElementById('word-bank'); 

//     if (!droppedWordElement) {
//         messageEl.textContent = "Перетягніть слово!";
//         messageEl.className = "mt-1 h-4 text-center text-xs font-medium text-red-500";
//         return;
//     }

//     const droppedWord = droppedWordElement.textContent.trim();

//     if (droppedWord.toLowerCase() === correctWord.toLowerCase()) {
//         messageEl.textContent = "Правильно!";
//         messageEl.className = "mt-1 h-4 text-center text-xs font-medium text-green-600";
//         dropZone.classList.add('correct');
//         dropZone.classList.remove('incorrect');
//         checkBtn.disabled = true; 
//         playBtn.disabled = true; 
//         droppedWordElement.classList.remove('bg-blue-400', 'hover:bg-blue-600', 'text-white', 'incorrect-word-box'); 
//         droppedWordElement.classList.add('correct-word-box'); 
//         droppedWordElement.draggable = false; 
//         droppedWordElement.style.cursor = 'default'; // Змінюємо курсор

//         correctAudioGameCount++;

//         if (correctAudioGameCount === totalAudioGamePuzzles) {
//             messageEl.textContent = "Завдання виконано! 🎉";
//             messageEl.className = "mt-1 h-4 text-center text-xs font-medium text-green-700 font-bold";
//         }

//     } else {
//         messageEl.textContent = "Спробуйте ще раз.";
//         messageEl.className = "mt-1 h-4 text-center text-xs font-medium text-red-500";
//         dropZone.classList.add('incorrect');
//         dropZone.classList.remove('correct');
//         droppedWordElement.classList.remove('bg-blue-400', 'hover:bg-blue-600', 'text-white', 'correct-word-box');
//         droppedWordElement.classList.add('incorrect-word-box'); 
        
//         setTimeout(() => {
//             dropZone.innerHTML = `<span class="placeholder text-sm font-normal text-gray-400">Перетягніть слово сюди</span>`;
//             dropZone.classList.remove('incorrect');
//             droppedWordElement.classList.remove('incorrect-word-box', 'opacity-50', 'audio-dropped-word'); 
//             droppedWordElement.classList.add('bg-blue-400', 'hover:bg-blue-600', 'text-white'); 
//             audioWordBank.appendChild(droppedWordElement); 
//             droppedWordElement.draggable = true; 
//             droppedWordElement.style.cursor = 'grab'; // Повернути курсор
//             addAudioDraggableWordListeners(); 
//         }, 1000); 
//     }
// }

// // Функція для створення однієї аудіо-головоломки
// function createAudioPuzzleBlock(puzzleData, index) {
//     const audioZonesContainer = document.getElementById("audio-zones"); 
    
//     const dropZoneWrapper = document.createElement("div");
//     dropZoneWrapper.id = `audio-puzzle-${index}`;
//     dropZoneWrapper.className = "bg-white p-4 rounded-lg shadow-md flex flex-col items-center relative min-w-[180px]";
//     dropZoneWrapper.dataset.correct = puzzleData.word; 

//     dropZoneWrapper.innerHTML = `
//         <audio src="${puzzleData.audio}" id="audio-${index}" class="hidden"></audio>
//         <button id="play-btn-audio-${index}" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
//             <svg class="w-9 h-9" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
//         </button>
//         <div class="audio-drop-zone w-full h-14 flex justify-center items-center border-2 border-dashed border-gray-300 rounded-md text-base font-bold text-gray-500 overflow-hidden mb-4">
//             <span class="placeholder text-sm font-normal text-gray-400">Перетягніть слово сюди</span>
//         </div>
//         <div class="mt-2 w-full">
//             <button id="check-btn-audio-${index}" class="w-full bg-sky-500 text-white font-bold py-3 px-6 rounded-md hover:bg-sky-600 transition-colors duration-300 disabled:bg-slate-300 text-xs">
//                 Перевірити
//             </button>
//             <p id="message-audio-${index}" class="mt-1 h-4 text-center text-xs font-medium"></p>
//         </div>
//     `;

//     audioZonesContainer.appendChild(dropZoneWrapper);

//     const playBtn = dropZoneWrapper.querySelector(`#play-btn-audio-${index}`);
//     const audioEl = dropZoneWrapper.querySelector(`#audio-${index}`);
//     const audioDropZone = dropZoneWrapper.querySelector('.audio-drop-zone');
//     const checkBtn = dropZoneWrapper.querySelector(`#check-btn-audio-${index}`);
//     const messageEl = dropZoneWrapper.querySelector(`#message-audio-${index}`);

//     playBtn.addEventListener('click', () => {
//         audioEl.play();
//     });

//     addAudioDropZoneListeners(audioDropZone);
//     checkBtn.addEventListener('click', () => checkAudioGameResult(puzzleData.word, audioDropZone, messageEl, checkBtn, playBtn));
// }

// // Функція для створення всіх перетягуваних слів в банку
// function createAudioGameWordBank() {
//     const audioWordBank = document.getElementById("word-bank"); 
//     audioWordBank.innerHTML = ''; 

//     shuffleArray([...audioPuzzlesData]).forEach(({ word }) => {
//         const wordEl = document.createElement("div");
//         wordEl.textContent = word;
//         wordEl.className = "audio-draggable-word bg-blue-300 hover:bg-blue-400 text-blue-800 font-bold py-4 px-8 rounded-lg cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out";
//         wordEl.setAttribute("draggable", true);
//         wordEl.dataset.word = word; 
//         audioWordBank.appendChild(wordEl);
//     });
//     addAudioDraggableWordListeners(); 
// }




//////////////////////////////////////////////////// --- ФУНКЦІЇ КАРУСЕЛІ ---////////////////////////////////////////////////

// /** Ініціалізує карусель: створює слайди та точки */
// function initializeCarousel() {
//     carouselImages.forEach((img, index) => {
//         const slide = document.createElement('div');
//         slide.className = 'carousel-slide absolute top-0 left-0 w-full h-full';
//         slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="w-full h-full object-contain rounded-lg">`;
//         carouselContainer.appendChild(slide);

//         const dot = document.createElement('span');
//         dot.className = 'w-3 h-3 bg-gray-400 rounded-full cursor-pointer transition-colors duration-300';
//         dot.addEventListener('click', () => showSlide(index));
//         carouselDotsContainer.appendChild(dot);
//     });

//     showSlide(currentSlide);
// }


// /** Показує конкретний слайд і оновлює індикатори */
// function showSlide(index) {
//     const slides = document.querySelectorAll('.carousel-slide');
//     const dots = document.querySelectorAll('#carousel-dots span');

//     slides.forEach(slide => slide.classList.remove('active'));
//     dots.forEach(dot => dot.classList.remove('bg-blue-500', 'bg-blue-300'));
//     dots.forEach(dot => dot.classList.add('bg-gray-400'));

//     if (index >= slides.length) {
//         currentSlide = 0;
//     } else if (index < 0) {
//         currentSlide = slides.length - 1;
//     } else {
//         currentSlide = index;
//     }

//     slides[currentSlide].classList.add('active');
//     dots[currentSlide].classList.remove('bg-gray-400');
//     dots[currentSlide].classList.add('bg-blue-500');

//     stopCarouselAutoPlay();
// }


// /** Перехід до наступного слайда */
// function nextSlide() {
//     showSlide(currentSlide + 1);
// }

// /** Перехід до попереднього слайда */
// function prevSlide() {
//     showSlide(currentSlide - 1);
// }

// /** Запускає автоматичне прогортання каруселі */
// function startCarouselAutoPlay() {
//     stopCarouselAutoPlay(); // Запобігаємо дублюванню інтервалів
// }

// /** Зупиняє автоматичне прогортання каруселі */
// function stopCarouselAutoPlay() {
//     clearInterval(carouselInterval);
// }



//               //  функції 2 каруселі 

// function initializeCarousel2() {
//     carouselImages2.forEach((img, index) => {
//         const slide = document.createElement('div');
//         slide.className = 'carousel-slide2 absolute top-0 left-0 w-full h-full hidden'; // додали hidden
//         slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="w-full h-full object-contain rounded-lg">`;
//         carouselContainer2.appendChild(slide);

//         const dot2 = document.createElement('span');
//         dot2.className = 'w-3 h-3 bg-gray-400 rounded-full cursor-pointer transition-colors duration-300';
//         dot2.addEventListener('click', () => showSlide2(index));
//         carouselDotsContainer2.appendChild(dot2);
//     });

//     showSlide2(currentSlide2);
// }

// function showSlide2(index) {
//     const slides = document.querySelectorAll('.carousel-slide2');
//     const dots = document.querySelectorAll('#carousel-dots2 span');

//     slides.forEach(slide => slide.classList.remove('active'));
//     dots.forEach(dot => dot.classList.remove('bg-blue-500', 'bg-blue-300'));
//     dots.forEach(dot => dot.classList.add('bg-gray-400'));

//     if (index >= slides.length) {
//         currentSlide2 = 0;
//     } else if (index < 0) {
//         currentSlide2 = slides.length - 1;
//     } else {
//         currentSlide2 = index;
//     }

//     slides[currentSlide2].classList.add('active');
//     dots[currentSlide2].classList.remove('bg-gray-400');
//     dots[currentSlide2].classList.add('bg-blue-500');

//     stopCarouselAutoPlay2();
// }


// function nextSlide2() {
//     showSlide2(currentSlide2 + 1);
// }

// function prevSlide2() {
//     showSlide2(currentSlide2 - 1);
// }

// function startCarouselAutoPlay2() {
//     stopCarouselAutoPlay2();
//     carouselInterval2 = setInterval(() => {
//         nextSlide2();
//     }, 4000);
// }

// function stopCarouselAutoPlay2() {
//     clearInterval(carouselInterval2);
// }






// ///////////////////////////////////////////////////  функції 3 каруселі  ///////////////////////////////////////////////

// function initializeCarousel3() {
//     carouselImages3.forEach((img, index) => {
//         const slide = document.createElement('div');
//         slide.className = 'carousel-slide3 absolute top-0 left-0 w-full h-full hidden'; // додали hidden
//         slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="w-full h-full object-contain rounded-lg">`;
//         carouselContainer3.appendChild(slide);

//         const dot3 = document.createElement('span');
//         dot3.className = 'w-3 h-3 bg-gray-400 rounded-full cursor-pointer transition-colors duration-300';
//         dot3.addEventListener('click', () => showSlide3(index));
//         carouselDotsContainer3.appendChild(dot3);
//     });

//     showSlide3(currentSlide3);
// }

// function showSlide3(index) {
//     const slides = document.querySelectorAll('.carousel-slide3');
//     const dots = document.querySelectorAll('#carousel-dots3 span');

//     slides.forEach(slide => slide.classList.remove('active'));
//     dots.forEach(dot => dot.classList.remove('bg-blue-500', 'bg-blue-300'));
//     dots.forEach(dot => dot.classList.add('bg-gray-400'));

//     if (index >= slides.length) {
//         currentSlide3 = 0;
//     } else if (index < 0) {
//         currentSlide3 = slides.length - 1;
//     } else {
//         currentSlide3 = index;
//     }

//     slides[currentSlide3].classList.add('active');
//     dots[currentSlide3].classList.remove('bg-gray-400');
//     dots[currentSlide3].classList.add('bg-blue-500');

//     stopCarouselAutoPlay3();
// }


// function nextSlide3() {
//     showSlide3(currentSlide3 + 1);
// }

// function prevSlide3() {
//     showSlide3(currentSlide3 - 1);
// }

// function startCarouselAutoPlay3() {
//     stopCarouselAutoPlay3();
//     carouselInterval3 = setInterval(() => {
//         nextSlide3();s
//     }, 4000);
// }

// function stopCarouselAutoPlay3() {
//     clearInterval(carouselInterval3);
// }







// --- ІНІЦІАЛІЗАЦІЯ ---
// document.addEventListener('DOMContentLoaded', () => {
//     // Ініціалізація каруселі
//     // initializeCarousel();
//     // carouselPrevBtn.addEventListener('click', prevSlide);
//     // carouselNextBtn.addEventListener('click', nextSlide);

//     // Ініціалізація ГРИ 1: Перетягни слово до картинки
//     // createDraggableWords();
//     // dragAndDropPuzzlesData.forEach((data, index) => {
//     //     createDragAndDropPuzzle(data, index);
//     // });


//     // Ініціалізація ГРИ 2: Склади слово з літер
//     // letterPuzzlesData.forEach((data, index) => {
//     //     createLetterPuzzle(data.phrase, data.image, index);
//     // });

//     // Ініціалізація ГРИ 3: Впізнай слово на слух (Аудіо-гра)
//     createAudioGameWordBank();
//     audioPuzzlesData.forEach((data, index) => {
//         createAudioPuzzleBlock(data, index);
//     });

//     // initializeCarousel2();
//     // carouselPrevBtn2.addEventListener('click', prevSlide2); 
//     // carouselNextBtn2.addEventListener('click', nextSlide2);

//     // initializeCarousel3();
//     // carouselPrevBtn3.addEventListener('click', prevSlide3); 
//     // carouselNextBtn3.addEventListener('click', nextSlide3);
// });
