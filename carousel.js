// Зображення для каруселі

const carouselImages = [
    { src: "./Pictures/Aa.jpg", alt: "Aa" },
    { src: "./Pictures/Bb.jpg", alt: "Bb" },
    { src: "./Pictures/Cc.jpg", alt: "Cc" },
    { src: "./Pictures/Dd.jpg", alt: "Dd" },
    { src: "./Pictures/Ee.jpg", alt: "Ee" },
    { src: "./Pictures/Ff.jpg", alt: "Ff" },
    { src: "./Pictures/Gg.jpg", alt: "Gg" },
    { src: "./Pictures/Hh.jpg", alt: "Hh" },
    { src: "./Pictures/Ii.jpg", alt: "Ii" }
];

// Зображення для каруселі 2

const carouselImages2 = [
    { src: "./Pictures/go.jpg", alt: "go" },
    { src: "./Pictures/eat.jpg", alt: "eat" },
    { src: "./Pictures/drink.jpg", alt: "drink" }, 
    { src: "./Pictures/sleep.jpg", alt: "sleep" },
    { src: "./Pictures/play.jpg", alt: "play" }, 
    { src: "./Pictures/read.jpg", alt: "read" },
    { src: "./Pictures/write.jpg", alt: "write" }, 
    { src: "./Pictures/like.jpg", alt: "like" }, 
];



// Змінні для каруселі
const carouselContainer = document.getElementById('carousel-container');
const carouselPrevBtn = document.getElementById('carousel-prev');
const carouselNextBtn = document.getElementById('carousel-next');
const carouselDotsContainer = document.getElementById('carousel-dots');

let currentSlide = 0;
let carouselInterval;

// карусель 2

const carouselContainer2 = document.getElementById('carousel-container2');
const carouselPrevBtn2 = document.getElementById('carousel-prev2');
const carouselNextBtn2 = document.getElementById('carousel-next2');
const carouselDotsContainer2 = document.getElementById('carousel-dots2');

let currentSlide2 = 0;
let carouselInterval2;


// карусель 3

const carouselContainer3 = document.getElementById('carousel-container3');
const carouselPrevBtn3 = document.getElementById('carousel-prev3');
const carouselNextBtn3 = document.getElementById('carousel-next3');
const carouselDotsContainer3 = document.getElementById('carousel-dots3');

let currentSlide3 = 0;
let carouselInterval3;




/** Ініціалізує карусель: створює слайди та точки */
function initializeCarousel() {
    carouselImages.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide absolute top-0 left-0 w-full h-full';
        slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="w-full h-full object-contain rounded-lg">`;
        carouselContainer.appendChild(slide);

        const dot = document.createElement('span');
        dot.className = 'w-3 h-3 bg-gray-400 rounded-full cursor-pointer transition-colors duration-300';
        dot.addEventListener('click', () => showSlide(index));
        carouselDotsContainer.appendChild(dot);
    });

    showSlide(currentSlide);
}


/** Показує конкретний слайд і оновлює індикатори */
function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('#carousel-dots span');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('bg-blue-500', 'bg-blue-300'));
    dots.forEach(dot => dot.classList.add('bg-gray-400'));

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.remove('bg-gray-400');
    dots[currentSlide].classList.add('bg-blue-500');

    stopCarouselAutoPlay();
}


/** Перехід до наступного слайда */
function nextSlide() {
    showSlide(currentSlide + 1);
}

/** Перехід до попереднього слайда */
function prevSlide() {
    showSlide(currentSlide - 1);
}

/** Запускає автоматичне прогортання каруселі */
function startCarouselAutoPlay() {
    stopCarouselAutoPlay(); // Запобігаємо дублюванню інтервалів
}

/** Зупиняє автоматичне прогортання каруселі */
function stopCarouselAutoPlay() {
    clearInterval(carouselInterval);
}



              //  функції 2 каруселі 

function initializeCarousel2() {
    carouselImages2.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide2 absolute top-0 left-0 w-full h-full hidden'; // додали hidden
        slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="w-full h-full object-contain rounded-lg">`;
        carouselContainer2.appendChild(slide);

        const dot2 = document.createElement('span');
        dot2.className = 'w-3 h-3 bg-gray-400 rounded-full cursor-pointer transition-colors duration-300';
        dot2.addEventListener('click', () => showSlide2(index));
        carouselDotsContainer2.appendChild(dot2);
    });

    showSlide2(currentSlide2);
}

function showSlide2(index) {
    const slides = document.querySelectorAll('.carousel-slide2');
    const dots = document.querySelectorAll('#carousel-dots2 span');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('bg-blue-500', 'bg-blue-300'));
    dots.forEach(dot => dot.classList.add('bg-gray-400'));

    if (index >= slides.length) {
        currentSlide2 = 0;
    } else if (index < 0) {
        currentSlide2 = slides.length - 1;
    } else {
        currentSlide2 = index;
    }

    slides[currentSlide2].classList.add('active');
    dots[currentSlide2].classList.remove('bg-gray-400');
    dots[currentSlide2].classList.add('bg-blue-500');

    stopCarouselAutoPlay2();
}


function nextSlide2() {
    showSlide2(currentSlide2 + 1);
}

function prevSlide2() {
    showSlide2(currentSlide2 - 1);
}

function startCarouselAutoPlay2() {
    stopCarouselAutoPlay2();
    carouselInterval2 = setInterval(() => {
        nextSlide2();
    }, 4000);
}

function stopCarouselAutoPlay2() {
    clearInterval(carouselInterval2);
}






///////////////////////////////////////////////////  функції 3 каруселі  ///////////////////////////////////////////////

function initializeCarousel3() {
    carouselImages3.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide3 absolute top-0 left-0 w-full h-full hidden'; // додали hidden
        slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="w-full h-full object-contain rounded-lg">`;
        carouselContainer3.appendChild(slide);

        const dot3 = document.createElement('span');
        dot3.className = 'w-3 h-3 bg-gray-400 rounded-full cursor-pointer transition-colors duration-300';
        dot3.addEventListener('click', () => showSlide3(index));
        carouselDotsContainer3.appendChild(dot3);
    });

    showSlide3(currentSlide3);
}

function showSlide3(index) {
    const slides = document.querySelectorAll('.carousel-slide3');
    const dots = document.querySelectorAll('#carousel-dots3 span');

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('bg-blue-500', 'bg-blue-300'));
    dots.forEach(dot => dot.classList.add('bg-gray-400'));

    if (index >= slides.length) {
        currentSlide3 = 0;
    } else if (index < 0) {
        currentSlide3 = slides.length - 1;
    } else {
        currentSlide3 = index;
    }

    slides[currentSlide3].classList.add('active');
    dots[currentSlide3].classList.remove('bg-gray-400');
    dots[currentSlide3].classList.add('bg-blue-500');

    stopCarouselAutoPlay3();
}


function nextSlide3() {
    showSlide3(currentSlide3 + 1);
}

function prevSlide3() {
    showSlide3(currentSlide3 - 1);
}

function startCarouselAutoPlay3() {
    stopCarouselAutoPlay3();
    carouselInterval3 = setInterval(() => {
        nextSlide3();s
    }, 4000);
}

function stopCarouselAutoPlay3() {
    clearInterval(carouselInterval3);
}




// --- ІНІЦІАЛІЗАЦІЯ ---
document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізація каруселі
    initializeCarousel();
    carouselPrevBtn.addEventListener('click', prevSlide);
    carouselNextBtn.addEventListener('click', nextSlide);

    initializeCarousel2();
    carouselPrevBtn2.addEventListener('click', prevSlide2); 
    carouselNextBtn2.addEventListener('click', nextSlide2);

    initializeCarousel3();
    carouselPrevBtn3.addEventListener('click', prevSlide3); 
    carouselNextBtn3.addEventListener('click', nextSlide3);
});
