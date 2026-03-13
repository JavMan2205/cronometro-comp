let startTime;
let elapsedTime = 0;
let timerInterval;
let firstCompetitorTime = null;
let captureCount = 0;

const display = document.getElementById('display');
const resultsBody = document.getElementById('resultsBody');

function formatTime(ms) {
    let date = new Date(ms);
    let hh = String(date.getUTCHours()).padStart(2, '0');
    let mm = String(date.getUTCMinutes()).padStart(2, '0');
    let ss = String(date.getUTCSeconds()).padStart(2, '0');
    let mmm = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${hh}:${mm}:${ss}.${mmm}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);
    toggleButtons(true);
}

function pause() {
    clearInterval(timerInterval);
    toggleButtons(false);
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    firstCompetitorTime = null;
    captureCount = 0;
    display.textContent = "00:00:00.00";
    resultsBody.innerHTML = "";
    toggleButtons(false);
}

function capture() {
    captureCount++;
    const currentCapture = elapsedTime;
    
    if (firstCompetitorTime === null) {
        firstCompetitorTime = currentCapture;
    }

    const difference = currentCapture - firstCompetitorTime;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${captureCount}</td>
        <td>${formatTime(currentCapture)}</td>
        <td>${difference === 0 ? "---" : "+" + formatTime(difference)}</td>
    `;
    resultsBody.appendChild(row);
}

function toggleButtons(isRunning) {
    document.getElementById('btnStart').disabled = isRunning;
    document.getElementById('btnPause').disabled = !isRunning;
    document.getElementById('btnCapture').disabled = !isRunning;
}