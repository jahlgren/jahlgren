const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const outputElement = document.getElementById('outputElement');

const timeToGuess = 10;
let startTime;

startButton.addEventListener('click', onStartButtonClicked);
stopButton.addEventListener('click', onStopButtonClicked);

stopButton.style.display = 'none';

function onStartButtonClicked() {
    outputElement.textContent = `Klicka på STOP när det har gått ${timeToGuess} sekunder.`;
    startButton.style.display = 'none';
    stopButton.style.display = null;
    startTime = new Date();
}

function onStopButtonClicked() {
    startButton.style.display = null;
    stopButton.style.display = 'none';

    const stopTime = new Date();

    const result = timeToGuess - (stopTime.getTime() - startTime.getTime()) / 1000;
    outputElement.textContent = `Du var ${result.toFixed(2)} sec från ${timeToGuess} sec.`;
}

