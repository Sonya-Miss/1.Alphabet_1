const audioPuzzlesData = [
    { word: "Dd", audio: "./Audio/Dd.mp3" },
    { word: "Gg", audio: "./Audio/Gg.mp3" },
    { word: "Hh", audio: "./Audio/Hh.mp3" },
    { word: "Aa", audio: "./Audio/Aa.mp3" },
    { word: "Bb", audio: "./Audio/Bb.mp3" },
    { word: "Cc", audio: "./Audio/Cc.mp3" },
    { word: "Ff", audio: "./Audio/Ff.mp3" },
    { word: "Ii", audio: "./Audio/Ii.mp3" },
    { word: "Ee", audio: "./Audio/Ee.mp3" },

];

// Для гри 3
let correctAudioGameCount = 0;
const totalAudioGamePuzzles = audioPuzzlesData.length;
let currentDraggedAudioWord = null; // Зберігає слово, яке зараз перетягується



// Функція для додавання слухачів Drag & Drop до зони скидання
function addAudioDropZoneListeners(dropZone) {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Дозволяємо скидання
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');

        // Якщо в зоні вже є слово, не дозволяємо скидати ще одне
        if (dropZone.querySelector('.audio-dropped-word')) {
            // Можна додати якесь візуальне сповіщення, але ми не дозволяємо скидати
            return; 
        }

        const draggedWordText = e.dataTransfer.getData('text/plain');
        const draggedWordElement = document.querySelector(`.audio-draggable-word[data-word="${draggedWordText}"]`);
        
        if (draggedWordElement && currentDraggedAudioWord === draggedWordText) {
            // Якщо в зоні вже було слово, повертаємо його в банк
            const existingWordInDropZone = dropZone.querySelector('.audio-dropped-word');
            if (existingWordInDropZone) {
                document.getElementById('word-bank').appendChild(existingWordInDropZone);
                existingWordInDropZone.classList.remove('audio-dropped-word', 'correct-word-box', 'incorrect-word-box');
                existingWordInDropZone.classList.add('bg-blue-500', 'hover:bg-blue-400', 'text-white');
                existingWordInDropZone.draggable = true;
                addAudioDraggableWordListeners(); // Повторно додаємо слухачів
            }

            dropZone.innerHTML = ''; // Очистити placeholder
            dropZone.appendChild(draggedWordElement); // Перемістити елемент
            draggedWordElement.style.position = ''; 
            draggedWordElement.style.left = '';
            draggedWordElement.style.top = '';
            draggedWordElement.classList.add('audio-dropped-word'); // Позначаємо, що слово скинуте

            // Очищення повідомлень про помилку, якщо слово замінили
            const messageEl = dropZone.parentElement.querySelector('[id^="message-audio-"]');
            if (messageEl) {
                messageEl.textContent = '';
                dropZone.classList.remove('correct', 'incorrect');
                // Видаляємо класи результату з елемента, якщо вони були
                if (draggedWordElement.classList.contains('correct-word-box') || draggedWordElement.classList.contains('incorrect-word-box')) {
                    draggedWordElement.classList.remove('correct-word-box', 'incorrect-word-box');
                    draggedWordElement.classList.add('bg-blue-400', 'hover:bg-blue-600', 'text-white');
                }
                
                // Якщо кнопка перевірки була вимкнена, увімкнути її, якщо слово замінено
                const checkBtn = dropZone.parentElement.querySelector('[id^="check-btn-audio-"]');
                const playBtn = dropZone.parentElement.querySelector('[id^="play-btn-audio-"]');
                if (checkBtn) checkBtn.disabled = false;
                if (playBtn) playBtn.disabled = false;
            }
        }
        currentDraggedAudioWord = null; // Скинути поточне перетягуване слово
    });
}

// Функція для додавання слухачів Drag & Drop до перетягуваних слів
function addAudioDraggableWordListeners() {
    const draggableWords = document.querySelectorAll('#word-bank .audio-draggable-word');
    draggableWords.forEach(wordEl => {
        wordEl.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.word);
            e.target.classList.add('opacity-50'); // Візуальний ефект перетягування
            currentDraggedAudioWord = e.target.dataset.word; // Зберігаємо поточне слово
        });

        wordEl.addEventListener('dragend', (e) => {
            e.target.classList.remove('opacity-50'); // Прибираємо ефект
        });
    });
}

// Функція для перевірки відповіді в аудіо-грі
function checkAudioGameResult(correctWord, dropZone, messageEl, checkBtn, playBtn) {
    const droppedWordElement = dropZone.querySelector('.audio-dropped-word');
    const audioWordBank = document.getElementById('word-bank'); 

    if (!droppedWordElement) {
        messageEl.textContent = "Перетягніть букву!";
        messageEl.className = "mt-1 h-4 text-center text-xs font-medium text-red-500";
        return;
    }

    const droppedWord = droppedWordElement.textContent.trim();

    if (droppedWord.toLowerCase() === correctWord.toLowerCase()) {
        messageEl.textContent = "Правильно!";
        messageEl.className = "mt-1 h-4 text-center text-xs font-medium text-green-600";
        dropZone.classList.add('correct');
        dropZone.classList.remove('incorrect');
        checkBtn.disabled = true; 
        playBtn.disabled = true; 
        droppedWordElement.classList.remove('bg-blue-400', 'hover:bg-blue-600', 'text-white', 'incorrect-word-box'); 
        droppedWordElement.classList.add('correct-word-box'); 
        droppedWordElement.draggable = false; 
        droppedWordElement.style.cursor = 'default'; // Змінюємо курсор

        correctAudioGameCount++;

        if (correctAudioGameCount === totalAudioGamePuzzles) {
            messageEl.textContent = "Завдання виконано! 🎉";
            messageEl.className = "mt-1 h-4 text-center text-xs font-medium text-green-700 font-bold";
        }

    } else {
        messageEl.textContent = "Спробуйте ще раз.";
        messageEl.className = "mt-1 h-4 text-center text-xs font-medium text-red-500";
        dropZone.classList.add('incorrect');
        dropZone.classList.remove('correct');
        droppedWordElement.classList.remove('bg-blue-400', 'hover:bg-blue-600', 'text-white', 'correct-word-box');
        droppedWordElement.classList.add('incorrect-word-box'); 
        
        setTimeout(() => {
            dropZone.innerHTML = `<span class="placeholder text-sm font-normal text-gray-400">Перетягніть букву сюди</span>`;
            dropZone.classList.remove('incorrect');
            droppedWordElement.classList.remove('incorrect-word-box', 'opacity-50', 'audio-dropped-word'); 
            droppedWordElement.classList.add('bg-blue-400', 'hover:bg-blue-600', 'text-white'); 
            audioWordBank.appendChild(droppedWordElement); 
            droppedWordElement.draggable = true; 
            droppedWordElement.style.cursor = 'grab'; // Повернути курсор
            addAudioDraggableWordListeners(); 
        }, 1000); 
    }
}

// Функція для створення однієї аудіо-головоломки
function createAudioPuzzleBlock(puzzleData, index) {
    const audioZonesContainer = document.getElementById("audio-zones"); 
    
    const dropZoneWrapper = document.createElement("div");
    dropZoneWrapper.id = `audio-puzzle-${index}`;
    dropZoneWrapper.className = "bg-white p-6 rounded-lg shadow-md flex flex-col items-center relative min-w-[180px] flex-shrink-0";
    dropZoneWrapper.dataset.correct = puzzleData.word; 

    dropZoneWrapper.innerHTML = `
        <audio src="${puzzleData.audio}" id="audio-${index}" class="hidden"></audio>
        <button id="play-btn-audio-${index}" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <svg class="w-9 h-9" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
        </button>
        <div class="audio-drop-zone h-14 flex justify-center items-center border-2 border-dashed border-gray-300 rounded-md text-base font-bold text-gray-500 overflow-hidden mb-4 min-w-[200px]">
            <span class="placeholder text-sm font-normal text-gray-400">Перетягніть букву сюди</span>
        </div>
        <div class="mt-2 w-full">
            <button id="check-btn-audio-${index}" class="w-full bg-sky-500 text-white font-bold py-3 px-6 rounded-md hover:bg-sky-600 transition-colors duration-300 disabled:bg-slate-300 text-xs">
                Перевірити
            </button>
            <p id="message-audio-${index}" class="mt-1 h-4 text-center text-xs font-medium"></p>
        </div>
    `;

    audioZonesContainer.appendChild(dropZoneWrapper);

    const playBtn = dropZoneWrapper.querySelector(`#play-btn-audio-${index}`);
    const audioEl = dropZoneWrapper.querySelector(`#audio-${index}`);
    const audioDropZone = dropZoneWrapper.querySelector('.audio-drop-zone');
    const checkBtn = dropZoneWrapper.querySelector(`#check-btn-audio-${index}`);
    const messageEl = dropZoneWrapper.querySelector(`#message-audio-${index}`);

    playBtn.addEventListener('click', () => {
        audioEl.play();
    });

    addAudioDropZoneListeners(audioDropZone);
    checkBtn.addEventListener('click', () => checkAudioGameResult(puzzleData.word, audioDropZone, messageEl, checkBtn, playBtn));
}

// Функція для створення всіх перетягуваних слів в банку
function createAudioGameWordBank() {
    const audioWordBank = document.getElementById("word-bank"); 
    audioWordBank.innerHTML = ''; 

    shuffleArray([...audioPuzzlesData]).forEach(({ word }) => {
        const wordEl = document.createElement("div");
        wordEl.textContent = word;
        wordEl.className = "audio-draggable-word bg-blue-300 hover:bg-blue-400 text-blue-800 font-bold py-4 px-8 rounded-lg cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out";
        wordEl.setAttribute("draggable", true);
        wordEl.dataset.word = word; 
        audioWordBank.appendChild(wordEl);
    });
    addAudioDraggableWordListeners(); 
}


document.addEventListener('DOMContentLoaded', () => {
    createAudioGameWordBank();
    audioPuzzlesData.forEach((data, index) => {
        createAudioPuzzleBlock(data, index);
    });
});