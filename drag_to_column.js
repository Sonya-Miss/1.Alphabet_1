const columnDragDropGameData1 = {
    columns: [
        { id: "A", title: "A", correctWords: ["apple", "ant", "arm"] },
        { id: "B", title: "B", correctWords: ["ball", "book", "boy"] },
        { id: "C", title: "C", correctWords: ["cat", "car", "cup"] },
        { id: "D", title: "D", correctWords: ["dog", "door", "day"] },
        { id: "E", title: "E", correctWords: ["egg", "eye", "ear"] }
    ],
    allDraggableWords: [
        "apple", "ant", "arm", "ball", "book", "boy", "cat", "car", "cup", "dog", "door", "day",
        "egg", "eye", "ear"
    ]
};

const columnDragDropGameData2 = {
    columns: [
        { id: "F", title: "F", correctWords: ["fish", "fan", "foot"] },
        { id: "G", title: "G", correctWords: ["girl", "go", "game"] },
        { id: "H", title: "H", correctWords: ["hand", "hat", "house"] },
        { id: "I", title: "I", correctWords: ["ice", "in", "into"] }
    ],
    allDraggableWords: [
        "fish", "fan", "foot", "girl", "go", "game", "hand", "hat", "house", "ice", "in", "into"
    ]
};


// === ГЛОБАЛЬНИЙ СТАН ===
const currentDraggedItemMap = {};

// === УНІВЕРСАЛЬНА ІНІЦІАЛІЗАЦІЯ ===
function initializeColumnDragDropGame(gameData, suffix = "") {
  const containerId = `column-drop-zones-container${suffix}`;
  const bankId = `column-words-bank${suffix}`;
  const buttonId = `column-check-game-button${suffix}`;
  const messageId = `column-game-message${suffix}`;

  const columnDropZonesContainer = document.getElementById(containerId);
  const columnWordsBank = document.getElementById(bankId);
  const columnCheckButton = document.getElementById(buttonId);
  const columnGameMessageElement = document.getElementById(messageId);

  if (!columnDropZonesContainer || !columnWordsBank || !columnCheckButton || !columnGameMessageElement) {
    console.warn(`Не знайдено елементи для гри з суфіксом '${suffix}'`);
    return;
  }

  columnDropZonesContainer.innerHTML = "";
  columnWordsBank.innerHTML = "";

  gameData.columns.forEach(column => {
    const dropZoneWrapper = document.createElement("div");
    dropZoneWrapper.className = "flex flex-col bg-white p-6 rounded-lg shadow-md";
    dropZoneWrapper.innerHTML = `
      <h3 class="text-xl font-bold text-slate-700 mb-4 text-center">${column.title}</h3>
      <div id="column-drop-zone-${suffix}-${column.id}" class="column-drag-drop-zone flex-grow p-3 rounded-md space-y-2"></div>
    `;
    columnDropZonesContainer.appendChild(dropZoneWrapper);

    const dropZone = dropZoneWrapper.querySelector(`#column-drop-zone-${suffix}-${column.id}`);
    dropZone.addEventListener("dragover", e => e.preventDefault());
    dropZone.addEventListener("drop", e => {
      e.preventDefault();
      const word = currentDraggedItemMap[suffix];
      if (word) {
        dropZone.appendChild(word);
        word.classList.remove("correct", "incorrect");
        word.dataset.dropped = "true";
        delete currentDraggedItemMap[suffix];
      }
    });
  });

  shuffleArray([...gameData.allDraggableWords]).forEach(word => {
    const el = document.createElement("div");
    el.className = "column-draggable-item bg-blue-300 text-blue-800 py-3 px-4 rounded-md shadow font-semibold text-lg hover:bg-blue-400";
    el.draggable = true;
    el.textContent = word;
    el.dataset.word = word;
    el.addEventListener("dragstart", () => currentDraggedItemMap[suffix] = el);
    el.addEventListener("dragend", () => delete currentDraggedItemMap[suffix]);
    columnWordsBank.appendChild(el);
  });

  columnCheckButton.addEventListener("click", () => {
    let allCorrect = true;

    gameData.columns.forEach(column => {
      const dropZone = document.getElementById(`column-drop-zone-${suffix}-${column.id}`);
      const items = dropZone.querySelectorAll(".column-draggable-item");

      items.forEach(item => {
        if (column.correctWords.includes(item.textContent)) {
          item.classList.add("correct");
          item.classList.remove("incorrect");
        } else {
          item.classList.add("incorrect");
          item.classList.remove("correct");
          allCorrect = false;
        }
      });
    });

    columnGameMessageElement.textContent = allCorrect
      ? "Вітаємо! Все правильно!"
      : "Є помилки. Спробуйте ще раз!";
    columnGameMessageElement.className = `text-lg font-semibold text-center h-8 ${allCorrect ? 'text-green-700' : 'text-red-700'}`;
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// === DOMContentLoaded ===
document.addEventListener("DOMContentLoaded", () => {
  initializeColumnDragDropGame(columnDragDropGameData1); // для першої гри без суфікса
  initializeColumnDragDropGame(columnDragDropGameData2, "2"); // для другої гри з суфіксом "2"
});
