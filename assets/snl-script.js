const words = [
    "stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick","stick","ex","user", "dfg", "fgg", "rte", "ert", "stick", "stick"
];

const darkColors = ["#383a42", "#0098dd", "#23974a", "#a05a48", "#c5a332", "#ce33c0","#823ff1","#275fe4","#df631c","#d52753","#7a82da"];
const lightColors = ["#f8f8f2", "#8be9fd", "#50fa7b", "#ffb86c", "#ff79c6", "#bd93f9","#ff5555","#f1fa8c"];
var colors = [];

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
    colors = isLightMode ? darkColors : lightColors;
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
    colors = isLightMode ? darkColors : lightColors;
    const floatingTexts = document.querySelectorAll('.floating-text');
    floatingTexts.forEach(function(text){
        const newRandomColor = colors[Math.floor(Math.random() * colors.length)];
        text.style.setProperty('--color', newRandomColor);
    });
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

//contributor
async function fetchContributor(fileName) {
    try {
        const response = await fetch(`contributors/${fileName}.json`);
        if (!response.ok) {
            throw new Error('Contributor not found');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching the contributor:', error);
        return null;
    }
}

async function searchContributor() {
    const query = document.getElementById('snl-search-bar').value.toLowerCase().replace(/\s+/g, '');
    const fileName = query;
    const result = await fetchContributor(fileName);

    const resultDiv = document.getElementById('result');
    if (result) {
        resultDiv.innerHTML = `Name: ${result.name} <br> Email: ${result.email}`;
    } else {
        resultDiv.innerHTML = 'No matching contributor found.';
    }
}