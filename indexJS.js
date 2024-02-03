// GLOBAL
// Create a media query that targets devices with a max width of 750px
const mediaQuery = window.matchMedia('(max-width: 750px)');
// ARRAY TO STORE ALL ELEMETS THAT NEED TO BE APPEARING/DISSAPPEARING
const target = []; 
// form Submit Button
const button = document.getElementById("submitBtn");
// Email Text (p)
const emailText = document.getElementsByClassName('gmailInfo')[0].children[0];
// Side menu Button and Div
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
// Photo of me and a shape
let shape = document.getElementsByClassName("shapeDiv")[0];
let me = document.getElementsByClassName("myPhotoDiv")[0];
// Logo for big and small screen and #home (for fast navigation)
const myImage = document.getElementById('myImage');
const myImage1 = document.getElementById('myImage1');
const scrollToElement = document.getElementById('home');
let ignoreBeforeUnload = false; // Default 
// GLOBAL

// USING FUNCTIONS 
projectClick();
sideMenuWidth();
paddingRes();
textToCopy(document.getElementById('toCopy'));
CVdownloader(document.getElementById('download-btn'),document.getElementById('loading-popup'));
CVdownloader(document.getElementById('download-ContactBtn'),document.getElementById('loading-ContactPopup'));
if(!mediaQuery.matches){
    res();
}
// USING FUNCTIONS 

//MEDIA QUERY 
// Define a function to handle the media query changes
function handleMediaQueryChanges(mediaQuery) {
    if (mediaQuery.matches) {
        POPUPS(); 
    }
}
handleMediaQueryChanges(mediaQuery);
mediaQuery.addListener(handleMediaQueryChanges);
//MEDIA QUERY  

//MAKE NAV BUTTONS RESPOSNIVE
const resize_navButtons = new ResizeObserver(function(entries) {
    // since we are observing only a single element, so we access the first element in entries array
    let rect = entries[0].contentRect;
    
    // current width & height
    let width = rect.width;
    let height = rect.height;
    
    let divFont = document.getElementsByClassName("buttons")[0].children;
    for(let i=0;i<divFont.length;i++)
    divFont[i].style.fontSize = (width/4*10)/100+"px";
});
resize_navButtons.observe(document.getElementsByClassName("buttons")[0]);

const resize_ob = new ResizeObserver(function(entries) {
    // since we are observing only a single element, so we access the first element in entries array
    let rect = entries[0].contentRect;

    // current width & height
    let width = rect.width;
    let height = rect.height;

    let divToResize = document.getElementsByClassName("frontTextIntro")[0];
    divToResize.style.paddingTop = 4.5*height + "px";
    // console.log(divFont);
});
//MAKE NAV BUTTONS RESPOSNIVE

//Manual Padding for nav and Home
window.addEventListener("resize",paddingRes);
function paddingRes() {
    let navH = document.getElementsByClassName("navDiv")[0].offsetHeight;
    let homeEl = document.getElementById("home");
    homeEl.style.paddingTop=navH + 20 +'px';
}
//Manual Padding for nav and Home


// form left and right side resizer
function res() {
    let rH = document.getElementsByClassName("infoWrap")[0].offsetHeight;
    let lH = document.getElementsByClassName("contactWrap")[0].offsetHeight+50;
    let rD = document.getElementsByClassName("infoWrap")[0];
    let lD = document.getElementsByClassName("contactWrap")[0];
    rD.style.height = Math.max(lH-80,rH-80) + 'px';
    lD.style.height = Math.max(lH-80,rH-80) + 'px';
}
// form left and right side resizer
 
// FOR SMOOTH SCROLLING 
target.push(document.getElementById("home"));
target.push(document.getElementsByClassName("portfolioDiv")[0].children[0]);
target.push(...document.getElementsByClassName("portfolioDiv")[0].children[1].children);
// target.push(document.querySelectorAll(".formDiv>form")[0]);
target.push(document.querySelectorAll(".about-section h2")[0]);
target.push(...document.getElementsByClassName("topics")[0].children);
target.push(document.getElementsByClassName("formCon")[0]);
function checkViewport() {
    target.forEach(item => {
        const itemPosition = item.getBoundingClientRect();
        // Check if the item is in the viewport
        if (itemPosition.top < window.innerHeight-window.innerHeight*12/100 
        && itemPosition.bottom >= window.innerHeight*22/100) {
            item.style.opacity = 1;
        } else {
            item.style.opacity = 0;
        }
    });
}
window.addEventListener('load', checkViewport);
window.addEventListener('scroll', checkViewport);
// FOR SMOOTH SCROLLING 

//PROJECT LINKS
const projectLinks={};
projectLinks["TicTacToe"]="https://ge0rgem.github.io/TicTacToe/";
projectLinks["ToDoList"]="https://ge0rgem.github.io/ToDoList/";
projectLinks["StopWatch"]="https://ge0rgem.github.io/Stopwatch/";
projectLinks["TBCAcademyClone"]="https://ge0rgem.github.io/TBCAcademyClone/";
projectLinks["ComingSoon"]="#";
function projectClick() {
    let projects = document.getElementById("portfolioDivs").children;
    for(let i=0;i<projects.length;i++) {
        projects[i].addEventListener("click",function() {
            window.open(projectLinks[projects[i].id],"_blank");
        });
        projects[i].addEventListener('mousedown',function(e) {
            if(e.button==1){
                window.open(projectLinks[projects[i].id]);
            }
        });
    }
}
//PROJECT LINKS
// FORM 
button.addEventListener("click",(event)=>{
    event.preventDefault();
    const form = document.querySelectorAll('form')[0];
    if(!form.checkValidity()) {
        console.log(1);
        const style = document.createElement('style');
        style.textContent = `
            .form-group input:invalid + .error,.form-group textarea:invalid + .error {
                display: block;
            }
        `;
        document.head.appendChild(style);
    }else {
        const style = document.createElement('style');
        style.textContent = `
            .form-group input:invalid + .error,.form-group textarea:invalid + .error {
                display: none;
            }
        `;
        document.head.appendChild(style);
        formSubmit(form);
    }
});
function formSubmit(form) {
    // Prevent Spam Submitting
    const btn = document.getElementById("submitBtn");
    btn.disabled = true;

    // Get the form data
    const formData = new FormData(form);
    // POPUP
    let popup = document.getElementById("loading-SubmitPopup");
    popup.style.display = 'block';
    // code to start download here
    
    // simulate download with setTimeout
    setTimeout(() => {
        popup.style.display = 'none';
    }, 1500);
    // POPUP
    
    // Send the form data to an email address using a third-party service
    fetch('https://formsubmit.co/ajax/G_modebadze3@cu.edu.ge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
    })
    .then(response => {
        alert('Your message has been sent!');
        btn.disabled = false;
        form.reset();
    })
    .catch(error => {
        // Handle any errors that occur during the request
        alert('An error occurred while sending your message.');
    });
}
// FORM 

// Open map for Georgia,Tbilisi
function openMap() {
    const mapURL = `https://www.google.com/maps/place/Tbilisi/@41.7233144,44.7900053,12z/data=!4m12!1m5!3m4!2zNDHCsDQyJzU0LjQiTiA0NMKwNDknMzcuNiJF!8m2!3d41.7151111!4d44.8271111!3m5!1s0x40440cd7e64f626b:0x61d084ede2576ea3!8m2!3d41.6938026!4d44.8015168!16zL20vMGJtNGo`;
    window.open(mapURL);
}
// Open map for Georgia,Tbilisi


// Clickable Gmail
emailText.addEventListener('click', function() {
  window.location.href = 'mailto:G_Modebadze3@cu.edu.ge';
  const loading = document.getElementsByClassName("loadBackground")[0];
  loading.style.display = "none";
});
// Clickable Gmail

// SIDE MENU MANUAL WIDTH
window.addEventListener("resize",sideMenuWidth);
function sideMenuWidth() {
    let screenW = window.innerWidth;
    let menuDiv = document.getElementsByClassName("menu")[0];
    menuDiv.style.right = -1*(screenW/2) + "px";
    menuDiv.style.width = screenW/2 + "px";

}
// SIDE MENU MANUAL WIDTH

// SIDE MENU OPEN/CLOSE TOGGLE
menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
});
let firstClickSideMenu = true;
document.addEventListener("click",function(event) {
    if(menuBtn.classList.contains("open")){
        if(firstClickSideMenu){
            firstClickSideMenu=false;
            return;
        }
        const menuDiv = document.getElementsByClassName("menu")[0];
        if(!menuDiv.contains(event.target)){
            menuBtn.classList.toggle("open");
            firstClickSideMenu=true;
        }
    }
});
// SIDE MENU OPEN/CLOSE TOGGLE

// TO MOVE PHOTO ON HOVER
me.addEventListener("mouseover", function() {
    this.style.transform = "translateX(4%)";
    shape.style.transform = "translateY(-4.5%)";
});
me.addEventListener("mouseout", function() {
    this.style.transform = "translateX(-4%)";
    shape.style.transform = "translateY(4.5%)";
});
// TO MOVE PHOTO ON HOVER

// CLICKABLE LOGO TO GET TO TOP
myImage.addEventListener('click', () => {
    scrollToElement.scrollIntoView({ behavior: 'smooth' });
});
myImage1.addEventListener('click', () => {
    scrollToElement.scrollIntoView({ behavior: 'smooth' });
});
// CLICKABLE LOGO TO GET TO TOP

// DOWNLOADING BUTTON LOADING POPUP 
function CVdownloader(div,popup) {
    div.addEventListener('click', () => {
        popup.style.display = 'block';
        // code to start download here
        
        // simulate download with setTimeout
        setTimeout(() => {
            popup.style.display = 'none';
            const loading = document.getElementsByClassName("loadBackground")[0];
            loading.style.display = "none";
        }, 1000);
    });
}
// DOWNLOADING BUTTON LOADING POPUP 
function POPUPS() {
    // const text = document.querySelectorAll(".topic>p");
    const text = document.querySelectorAll(".topicInfo");
    const topic = document.getElementsByClassName("topic");
    let firstClick = true;
    document.addEventListener("click",function(event) {
        const popupWin = document.getElementsByClassName("description-popup");
        let openWin = checkPopup(); // Index of opened popup
        if(openWin===-1)
            return;
        if(firstClick){
            firstClick=false;
            return;
        }
        if(!popupWin[openWin].contains(event.target)) {
            topic[openWin].children[1].children[0].innerText = "";
            topic[openWin].children[1].style.display = "none";
            firstClick=true;
        }
    });
    // TO CLOSE POPUP ON SCROLL
    document.addEventListener("scroll",function(event) {
        const popupWin = document.getElementsByClassName("description-popup");
        let openWin = checkPopup(); // Index of opened popup
        if(openWin==-1)
            return;
        if(firstClick){
            firstClick=false;
            return;
        }
        if(!popupWin[openWin].contains(event.target)) {
            topic[openWin].children[1].children[0].innerText = "";
            topic[openWin].children[1].style.display = "none";
            firstClick=true;
        }
    });
    // TO CLOSE POPUP ON SCROLL
    function checkPopup() {
        const popupBack = document.getElementsByClassName("popupBack");
        for(let i=0;i<popupBack.length;i++) {
            const style = getComputedStyle(popupBack[i]);
            if(style.display=='flex')
                return i; // RETURN INDEX OF OPENED POPUP
        }
        return -1;
    }
    function openWinCheck(index) {
        const popupBack = document.getElementsByClassName("popupBack");
        const style = getComputedStyle(popupBack[index]);
            if(style.display=='flex')
                return true;
        return false;        
    }
    for(let i=0;i<topic.length;i++) {
        topic[i].addEventListener("click",function() {
            if(!openWinCheck(i)){ // If not opened than open popup (to prevent opening already opened one)
                topic[i].children[1].children[0].innerHTML = text[i].innerHTML;
                topic[i].children[1].style.display = "flex";
            }
        });
    }
}
// COPY ON CLICK
function textToCopy(textDoc) {
    textDoc.addEventListener('click', () => {
    // Get the text content of the element
    const text = textDoc.textContent;
    // Copy the text to the clipboard
    navigator.clipboard.writeText(text)
        .then(() => {
            const popupMessage = document.getElementById("copyPopUp"); 
            popupMessage.style.display = "block";
            setTimeout(function() {
                popupMessage.style.display = "none";
            }, 700);
            console.log('Text copied to clipboard!');
        })
        .catch((error) => {
            console.error('Failed to copy text: ', error);
        });
    });
}
// COPY ON CLICK

// LOADING 
window.addEventListener('load', function() {
    const loading = document.getElementsByClassName("loadBackground")[0];
    loading.style.display = "none";
});
window.addEventListener('beforeunload', function() {
    const loading = document.getElementsByClassName("loadBackground")[0];
    loading.style.display = "flex";
});
// LOADING

//LOADING LETTERS DELAY
delayLoadingLetters();
function delayLoadingLetters() {
    let letters = document.getElementsByClassName("letter");
    for(let i=0;i<letters.length;i++){
        letters[i].style.animationDelay = 0.12*(i+1) + 's';
    }
}
//LOADING LETTERS DELAY
