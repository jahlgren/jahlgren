const containerElement = document.getElementById('container');
const words = ["banan", "päron", "äpple", "citron", "apelsin", "plommon", "passionsfrukt"];

let wordIndex      = 0;
let characterIndex = 0;

let startDate;
let timeInSeconds;

window.addEventListener('keydown', onKeyDown);

render();

function onKeyDown(e) {
    const key = e.key;
    const nextCharacter = getNextCharacter();

    if(nextCharacter && key.toLowerCase() === nextCharacter.toLowerCase()) {
        if(wordIndex === 0 && characterIndex === 0) {
            onStart();
        }
        
        if(next()) {
            onEnd();
        }
        
        render();
    }
    else if(e.keyCode === 32) {
        wordIndex = 0;
        characterIndex = 0;
        render();
    }
}

function onStart() {
    startDate = new Date();
}

function onEnd() {
    const endDate = new Date();
    timeInSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
}

function getWord() {
    return wordIndex < words.length ? words[wordIndex] : null;
}

function getNextCharacter() {
    const word = getWord();
    if(word && characterIndex < word.length) {
        return word.charAt(characterIndex);
    }
    return null;
}

/**
 * Avancerar till nästa bokstav eller ord.
 * @returns true eller false. Ifall funktionen returnerar true så betyder det att det inte finns mera ord.
 */
function next() {
    characterIndex++;

    const word = getWord();
    if(word && characterIndex >= word.length) {
        characterIndex = 0;
        wordIndex++;
    }

    return getWord() ? false : true;
}

function render() {
    const word = getWord();

    if(word) {
        let html = '<div class="word">';
        for(let i = 0; i < word.length; i++) {
            const character = word.charAt(i);
            const active = i === characterIndex;
            const filled = i < characterIndex;
            html += `<span 
                class="character ${active ? '--active' : ''} ${filled ? '--filled' : ''}"
            >${character}</span>`;
        }
        html += '</div>';

        containerElement.innerHTML = html;
    }
    else {
        containerElement.innerHTML = `
            <span class="score">${timeInSeconds.toFixed(2)} sekunder</span>
            <span class="again">[Tryck på SPACE för att försöka igen]</span>
        `;
    }
}
