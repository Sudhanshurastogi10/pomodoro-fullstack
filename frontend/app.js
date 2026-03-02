// ===============================
// API CONFIG
// ===============================
const API_BASE = "https://your-render-url.onrender.com";

// ===============================
// AUTH SECTION
// ===============================
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const authMessage = document.getElementById("authMessage");

signupBtn?.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        authMessage.textContent = "Enter email and password";
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        authMessage.textContent = data.message || data.detail;

    } catch (err) {
        authMessage.textContent = "Server error";
    }
});

loginBtn?.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        authMessage.textContent = "Enter email and password";
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.access_token) {
            localStorage.setItem("token", data.access_token);
            authMessage.textContent = "Login successful";
        } else {
            authMessage.textContent = data.detail;
        }

    } catch (err) {
        authMessage.textContent = "Server error";
    }
});

// ===============================
// TIMER SECTION
// ===============================
let timeLeft = 25 * 60;
let timerInterval = null;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
    if (timerInterval) return; // prevent multiple intervals

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            isRunning = false;
            startPauseBtn.textContent = "Start";
        }
    }, 1000);
}

startPauseBtn?.addEventListener("click", () => {
    if (!isRunning) {
        startTimer();
        startPauseBtn.textContent = "Pause";
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        startPauseBtn.textContent = "Start";
    }

    isRunning = !isRunning;
});

resetBtn?.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    timeLeft = 25 * 60;
    startPauseBtn.textContent = "Start";
    updateDisplay();
});

updateDisplay();