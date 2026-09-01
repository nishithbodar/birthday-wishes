/* =========================================
   BIRTHDAY WEBSITE JAVASCRIPT
========================================= */


/* =========================================
   VARIABLES
========================================= */

let enteredPin = "";

const correctPin = "0309";

let poppedBalloons = 0;


/* =========================================
   SCREEN NAVIGATION
========================================= */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const targetScreen = document.getElementById(screenId);

    if (targetScreen) {
        targetScreen.classList.add("active");
    }

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   PIN SYSTEM
========================================= */

function enterNumber(number) {

    // Don't allow more than 4 numbers
    if (enteredPin.length >= 4) {
        return;
    }

    enteredPin += number;

    updatePinDisplay();

    // Check automatically after 4 digits
    if (enteredPin.length === 4) {

        setTimeout(() => {

            if (enteredPin === correctPin) {

                unlockWebsite();

            } else {

                wrongPin();

            }

        }, 300);
    }
}


/* =========================================
   UPDATE PIN DISPLAY
========================================= */

function updatePinDisplay() {

    const dots = document.querySelectorAll(".pin-dot");

    dots.forEach((dot, index) => {

        if (index < enteredPin.length) {

            dot.style.background = "#ffffff";

            dot.style.boxShadow =
                "0 0 15px rgba(255,255,255,0.9)";

        } else {

            dot.style.background = "#ff5c9a";

            dot.style.boxShadow =
                "0 0 12px rgba(255,92,154,0.7)";
        }

    });
}


/* =========================================
   DELETE PIN
========================================= */

function deleteNumber() {

    if (enteredPin.length > 0) {

        enteredPin =
            enteredPin.slice(0, -1);

        updatePinDisplay();
    }
}


/* =========================================
   CORRECT PIN
========================================= */

function unlockWebsite() {

    // Small celebration
    createHeartBurst();

    setTimeout(() => {

        showScreen("memories-screen");

    }, 700);
}


/* =========================================
   WRONG PIN
========================================= */

function wrongPin() {

    const card =
        document.querySelector(".lock-card");

    card.animate(
        [
            { transform: "translateX(0)" },
            { transform: "translateX(-10px)" },
            { transform: "translateX(10px)" },
            { transform: "translateX(-10px)" },
            { transform: "translateX(0)" }
        ],
        {
            duration: 350
        }
    );

    enteredPin = "";

    updatePinDisplay();
}


/* =========================================
   MEMORIES → WISHES
========================================= */

function showWishes() {

    createHeartBurst();

    setTimeout(() => {

        showScreen("wishes-screen");

    }, 400);
}


/* =========================================
   POP BALLOON
========================================= */

function popBalloon(balloon) {

    // Prevent clicking same balloon twice
    if (balloon.classList.contains("popped")) {
        return;
    }

    balloon.classList.add("popped");

    poppedBalloons++;

    document.getElementById("popped-count")
        .textContent = poppedBalloons;


    // Create heart effect
    createSmallHeart();


    // Show wish
    const message =
        document.getElementById("wish-message");

    message.classList.remove("hidden");


    // Different wishes
    const wishes = [

        "May your smile never fade. ❤️",

        "May every dream of yours come true. ✨",

        "You deserve all the happiness in the world. 💕",

        "May this year bring you beautiful memories. 🌸",

        "Keep shining exactly the way you do. ✨",

        "I hope today is as special as you are. 🎂"

    ];


    const index =
        poppedBalloons - 1;

    message.textContent =
        wishes[index];


    // Show continue button after all balloons
    if (poppedBalloons === 6) {

        setTimeout(() => {

            document
                .getElementById("continue-button")
                .classList.remove("hidden");

        }, 500);
    }
}


/* =========================================
   FINAL MESSAGE
========================================= */

function showFinalMessage() {

    createHeartBurst();

    setTimeout(() => {

        showScreen("final-screen");

    }, 500);
}


/* =========================================
   FLOATING HEART CREATOR
========================================= */

function createFloatingHeart() {

    const container =
        document.getElementById("hearts-container");

    if (!container) {
        return;
    }

    const heart =
        document.createElement("div");

    heart.classList.add("floating-heart");

    heart.textContent =
        Math.random() > 0.5
            ? "♥"
            : "♡";


    // Random horizontal position
    heart.style.left =
        Math.random() * 100 + "%";


    // Random size
    const size =
        Math.random() * 18 + 12;

    heart.style.fontSize =
        size + "px";


    // Random animation duration
    const duration =
        Math.random() * 5 + 5;

    heart.style.animationDuration =
        duration + "s";


    container.appendChild(heart);


    // Remove after animation
    setTimeout(() => {

        heart.remove();

    }, duration * 1000);
}


/* =========================================
   START FLOATING HEARTS
========================================= */

setInterval(
    createFloatingHeart,
    500
);


/* =========================================
   HEART BURST
========================================= */

function createHeartBurst() {

    const container =
        document.getElementById("hearts-container");

    for (let i = 0; i < 15; i++) {

        const heart =
            document.createElement("div");

        heart.classList.add("floating-heart");

        heart.textContent = "♥";

        heart.style.left =
            (40 + Math.random() * 20) + "%";

        heart.style.bottom =
            "40%";

        heart.style.fontSize =
            (15 + Math.random() * 25) + "px";

        heart.style.animationDuration =
            (2 + Math.random() * 2) + "s";

        container.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 4000);
    }
}


/* =========================================
   SMALL HEART EFFECT
========================================= */

function createSmallHeart() {

    const container =
        document.getElementById("hearts-container");

    for (let i = 0; i < 5; i++) {

        const heart =
            document.createElement("div");

        heart.classList.add("floating-heart");

        heart.textContent = "♥";

        heart.style.left =
            (40 + Math.random() * 20) + "%";

        heart.style.bottom =
            "30%";

        heart.style.fontSize =
            "18px";

        heart.style.animationDuration =
            "2s";

        container.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 2500);
    }
}


/* =========================================
   CURRENT TIME
========================================= */

function updateTime() {

    const timeElement =
        document.getElementById("current-time");

    if (!timeElement) {
        return;
    }

    const now = new Date();

    let hours =
        now.getHours();

    let minutes =
        now.getMinutes();


    hours =
        hours.toString().padStart(2, "0");

    minutes =
        minutes.toString().padStart(2, "0");


    timeElement.textContent =
        `${hours}:${minutes}`;
}


/* =========================================
   START CLOCK
========================================= */

updateTime();

setInterval(
    updateTime,
    60000
);
/* =========================================
   OPEN LETTER
========================================= */

function openLetter() {

    const envelope = document.querySelector(".envelope");
    const letter = document.getElementById("secret-letter");
    const continueButton = document.getElementById("letter-continue");

    // Open envelope
    envelope.classList.add("open");

    // Create heart effect
    createHeartBurst();

    // Show letter after animation
    setTimeout(function () {

        letter.classList.remove("hidden");

        continueButton.classList.remove("hidden");

    }, 700);
}
/* =========================================
   MEMORY CAROUSEL
========================================= */


const memories = [
    {
        image: "assets/photo1.jpeg",
        caption: "Every moment with you is special ❤️"
    },
    {
        image: "assets/photo2.jpeg",
        caption: "Some memories deserve to stay forever ✨"
    },
    {
        image: "assets/photo3.jpeg",
        caption: "Smiles that make everything better 💕"
    },
    {
        image: "assets/photo4.jpeg",
        caption: "A beautiful moment to remember 🌷"
    },
    {
        image: "assets/photo5.jpeg",
        caption: "Memories that make me smile ❤️"
    },
    {
        image: "assets/photo6.jpeg",
        caption: "And many more memories to come ✨"
    }
];

let currentMemory = 0;


function createMemoryDots() {

    const dotsContainer =
        document.getElementById("memory-dots");

    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    memories.forEach((memory, index) => {

        const dot = document.createElement("span");

        dot.className = "memory-dot";

        if (index === currentMemory) {
            dot.classList.add("active");
        }

        dot.onclick = function () {
            currentMemory = index;
            updateMemory();
        };

        dotsContainer.appendChild(dot);
    });
}


function updateMemory() {

    const photo =
        document.getElementById("memory-photo");

    const caption =
        document.getElementById("memory-caption");

    if (!photo) return;


    const memory =
        memories[currentMemory];


    // Show actual image
    photo.style.backgroundImage =
        `url("${memory.image}")`;

    photo.style.backgroundSize =
        "cover";

    photo.style.backgroundPosition =
        "center";


    // Hide placeholder
    const icon =
        document.getElementById("memory-icon");

    const placeholder =
        document.getElementById(
            "memory-placeholder-text"
        );

    if (icon) {
        icon.style.display = "none";
    }

    if (placeholder) {
        placeholder.style.display = "none";
    }


    // Caption
    if (caption) {
        caption.textContent =
            memory.caption;
    }


    // Active dot
    const dots =
        document.querySelectorAll(
            ".memory-dot"
        );

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentMemory
        );

    });
}


function nextMemory() {

    currentMemory =
        (currentMemory + 1) %
        memories.length;

    updateMemory();
}


function previousMemory() {

    currentMemory =
        (currentMemory - 1 +
        memories.length) %
        memories.length;

    updateMemory();
}


createMemoryDots();
updateMemory();
