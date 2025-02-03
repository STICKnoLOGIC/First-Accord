const words = [
    "stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick"
];

const darkColors = ["#c678dd", "#e5c07b", "#61dafb", "#98c379", "#e06c75", "#56b6c2"];
const lightColors = ["#6f42c1", "#d73a49", "#0366d6", "#22863a", "#d73a49", "#b08800"];

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function createFloatingText(word, rowY, direction) {
    const div = document.createElement('div');
    div.classList.add('floating-text');
    const speed = Math.random() * 10 + 5 ; // Random speed between 5s and 15s

    //animation var
    if (direction === 'start') {
        div.style.setProperty('--start', '0vw');
        div.style.setProperty('--end', '100vw');
    } else {
        div.style.setProperty('--start', '100vw');
        div.style.setProperty('--end', '0vw');
    }
    
    div.style.setProperty('--oppa',( Math.random()*90 + 10 ) / 100); //create a depth effect by reducing the opacity of some floating text
    
    const isLightMode = document.body.classList.contains('light-mode');
    const colors = isLightMode ? darkColors : lightColors;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    div.style.setProperty('--color', randomColor);

    div.style.top = `${rowY}%`;
    div.style.animationDuration = `${speed}s`;
    div.style.animationDelay = `${Math.random() * 5}s`; // Random delay to stagger animations
    div.textContent = word;
    
    div.addEventListener('animationiteration', () => {
        const newY = Math.random() * 80 + 10; // Random y/row position between 10% and 90%
        div.style.top = `${newY}%`;
        const newWord = getRandomWord();
        div.textContent = newWord;
        
        div.style.setProperty('--oppa',(Math.random()*90+10)/100); //create a depth effect by reducing the opacity of some floating text
        const newRandomColor = colors[Math.floor(Math.random() * colors.length)];
        div.style.setProperty('--color', newRandomColor);
    });

    document.body.appendChild(div);
}

function generateFloatingText(){
    //I hope 40 floating text is not "annoying"
    for (let i = 0; i < 40; i++) {
        const rowY = ( 2 * Math.random() * 80 ) + 10; // random row position from 10% to 90%
        const direction = Math.random() > 0.5 ? 'start' : 'end';
        createFloatingText(getRandomWord(), rowY, direction); 
    
    }
}

function toggleMode() {
    const body = document.body;
    body.classList.toggle('light-mode');

    const isLightMode = body.classList.contains('light-mode');
    localStorage.setItem('snl_fa_theme', isLightMode);
    const button = document.querySelector('.toggle-button');
    button.style.backgroundColor = isLightMode ? '#282c34' : '#61dafb';
    button.style.color = isLightMode ? '#ffffff' : '#282c34';
    button.textContent = isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode';
}

window.addEventListener('resize', () => {
    const floatingTexts = document.querySelectorAll('.floating-text');
    floatingTexts.forEach(text => text.remove());
    generateFloatingText();
});

// get the last session dark theme state
if(localStorage.getItem('snl_fa_theme')=='true'){
    toggleMode();
}
// start the floating
generateFloatingText();
