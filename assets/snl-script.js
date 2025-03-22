//values
const pattern=/^[a-zA-Z0-9]+[-a-zA-Z0-9]*/;
let lastInput="";
isSearching=false;
let searchedUser='';
let url_string = window.location.href;
let url = new URL(url_string);
let c = url.searchParams.get("c");
let floatingTextCount=40; //I hope 40 floating text is not "annoying"
let lastWidth=window.innerWidth;

if(lastWidth<780){
    floatingTextCount=25;
}

// colors
const darkColors = ["#383a42", "#0098dd", "#23974a", "#a05a48", "#c5a332", "#ce33c0","#823ff1","#275fe4","#df631c","#d52753","#7a82da"];
const lightColors = ["#f8f8f2", "#8be9fd", "#50fa7b", "#ffb86c", "#ff79c6", "#bd93f9","#ff5555","#f1fa8c"];
var colors = [];

// views
const search=document.getElementById('snl-search-bar');
const resultDiv=document.getElementById('result');
const dialBG=document.getElementById('dial-bg');
const userName=document.getElementById('dial-name');
const userNameLink=document.getElementById('dial-name-link');
const userSM=document.getElementById('dial-sm');
const userAvatar=document.getElementById('dial-avatar');
const userDescription=document.getElementById('dial-description');
const userResourceContainer=document.getElementById('dial-res-cntnr');
const userResource=document.getElementById('dial-resources');

// checker
if(c!==null && c!==''){
    search.value=c;
    searchContributor();
}


function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function createFloatingText(word, rowY, direction) {
    const div = document.createElement('div');
    div.classList.add('floating-text');
    const Allrand=Math.random();
    const speed =  Allrand * 10 + 5 ; // Random speed between 5s and 15s

    //animation var
    if (direction === 'start') {
        div.style.setProperty('--start', '0vw');
        div.style.setProperty('--end', '100vw');
    } else {
        div.style.setProperty('--start', '100vw');
        div.style.setProperty('--end', '0vw');
    }

    div.style.setProperty('--oppa',1.2 - (( Allrand * 90 + 10 ) / 100)); //create a depth effect by reducing the opacity of some floating text
    const isLightMode = document.body.classList.contains('light-mode');
    colors = isLightMode ? darkColors : lightColors;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    div.style.setProperty('--color', randomColor);

    div.style.top = `${rowY}%`;
    div.style.animationDuration = `${speed}s`;
    div.style.animationDelay = `${Allrand * 5}s`; // Random delay to stagger animations
    div.textContent = word;

    div.addEventListener('animationiteration', () => {
        div.style.animation = 'none';
        div.offsetHeight; /* trigger reflow */
        div.style.animation = null;
        const newY = Math.random() * 80 + 10; // Random y/row position between 10% and 90%
        div.style.top = `${newY}%`;
        const newWord = getRandomWord();
        div.textContent = newWord;
        const Allrand=Math.random();
        const speed =  Allrand * 10 + 5 ; // Random speed between 5s and 15s
        div.style.animationDuration = `${speed}s`;
        div.style.setProperty('--oppa',1.2 - ((Allrand*90+10)/100)); //create a depth effect by reducing the opacity of some floating text
        const newRandomColor = colors[Math.floor(Math.random() * colors.length)];
        div.style.setProperty('--color', newRandomColor);
    });

    document.body.appendChild(div);
}

function generateFloatingText(){

    for (let i = 0; i < floatingTextCount; i++) {
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

//screen listenr
window.addEventListener('resize', () => {
    if(window.innerWidth===lastWidth){
        return;
    }
    lastWidth=window.innerWidth;
    if(lastWidth<780){
        floatingTextCount=25; //less floating text for tablets
    }else{
        floatingTextCount=40;
    }
    const floatingTexts = document.querySelectorAll('.floating-text');
    floatingTexts.forEach(text => text.remove());
    generateFloatingText();

});

//search listener
search.addEventListener('keypress',function(e){
    if(e.key==='Enter'){
        searchContributor();
    }
});

search.addEventListener(
    "input", function () {
    const inputValue = this.value.trim();

    const matchedValue = inputValue.match(pattern);

    if (matchedValue && inputValue!=="") {
        if(inputValue.endsWith('--')){
            this.value=lastInput;
            return;
        }
        lastInput=matchedValue[0];
        search.value = matchedValue[0];
        return;
    }else if(inputValue.endsWith('--')||inputValue.startsWith("-")){
        this.value=lastInput;
        return;
    }
    this.value="";
    lastInput=this.value;
}
);

// get the last session dark theme state
if(localStorage.getItem('snl_fa_theme')=='true'){
    toggleMode();
}
// start the floating
generateFloatingText();

//contributor
async function fetchContributor(fileName) {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/sticknologic/first-accord/main/contributors/${fileName}.json`);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        return null;
    }
}

//show Error
function showError(msg){
    if(resultDiv.classList.contains('hidden'))
        resultDiv.classList.toggle('hidden');
    resultDiv.innerHTML = sanitize(msg);
}

// hide view
function hide(view){
    if (!view.classList.contains('hidden')){
        view.classList.toggle('hidden');
    }
}

// sanitizer
function sanitize(msg){
    return DOMPurify.sanitize(msg);
}

//propagate data
function showDial(data){
    hide(resultDiv);
    if (dialBG.classList.contains('hidden'))
        dialBG.classList.toggle('hidden');
    userAvatar.src= `${'use_github_avatar' in data && !data.use_github_avatar && 'custom_avatar_url' in data ?  sanitize(data.custom_avatar_url) : ('github' in data.owner ? sanitize(data.owner.github) : `https://github/com/${searchedUser}` )}.png?size=128`;
    userNameLink.href='github' in data.owner ? sanitize(data.owner.github) : `https://github/com/${searchedUser}`;
    userName.innerHTML=data.owner.name;
    userSM.innerHTML='';
    if('social' in data){
        for(s in data.social){
            userSM.innerHTML+= `<a href="${sanitize(data.social[s])}" alt="user-sm" target="_blank"><i class="${sanitize(s)} dial-share"></i></a>`;
        }
    }
    if('email' in data.owner){
        userSM.innerHTML+=`<a href="mailto:${sanitize(data.owner.email)}?subject=Hi There!&body=I find Your Contribution at First Accord!"><i class="fa-solid fa-envelope dial-share"></i></a>`;
    }
    userDescription.innerHTML='description'in data? sanitize(data.description) : "This Contributor is lazy enough not to modify this description, what a shame..";
    if ("my_top_resources" in data){
        userResourceContainer.classList.remove('hidden');
        userResource.innerHTML='';
        for(res in data.my_top_resources){
            userResource.innerHTML+=`<li><a href="${sanitize(data.my_top_resources[res])}" alt="my top resources" target="_blank">${sanitize(res)}</a></li>`;
        }
    }else{
        hide(userResourceContainer);
    }
}

async function searchContributor() {
    if(isSearching){
        return;
    }
    const fileName = search.value.toLowerCase().trim().replace(/\s+/g, '');
    if(fileName===""){
        showError("Can't Search Empty Field.");
        return;
    }
    hide(resultDiv);
    isSearching=true;
    const result = await fetchContributor(fileName);

    if (result) {
        searchedUser=fileName;
        showDial(result);
    } else {
        showError('No matching contributor found.');
    }
    isSearching=false;
}

function share(link){
    let url='';
    let current_url=window.location.href+(window.location.href.includes('?c=')?"":'?c='+search.value);
    let message="Don't miss out—join First Accord and make your very first contribution to GitHub and Open Source!";
    switch(link){
        case 0:
            url=`https://www.facebook.com/sharer/sharer.php?u=${current_url}/&share=facebook`;
            break;
        case 1:
            url=`https://x.com/intent/post?url=${current_url}&via=STICKnoLOGIC&hashtags=FirstAccord&text=${message}`;
            break;
        case 2:
            url=`https://bsky.app/intent/compose?text=${message} ${current_url}\n via @sticknologic.bsky.social`;
            break;
        case 3:
            url=`https://wa.me/?text=${message}  :: ${current_url}`;
            break;
        case 4:
            url=`https://t.me/share/url?url=${current_url}&text=${message}`;
            break;
        case 5:
            navigator.clipboard.writeText(current_url);
            alert("Link copied to clipboard");
            return;
    }
    window.open(url,"Share First Accord",'width=360,height=640,titlebar=0,toolbar=0,');
}
function closeButton(){
    hide(dialBG);
}