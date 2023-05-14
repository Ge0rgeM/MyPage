// USING FUNCTIONS 
projectClick();
textToCopy(document.getElementById('toCopy'));
CVdownloader(document.getElementById('download-btn'),document.getElementById('loading-popup'));
CVdownloader(document.getElementById('download-ContactBtn'),document.getElementById('loading-ContactPopup'));
// USING FUNCTIONS 


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





res();
function res() {
    let rH = document.getElementsByClassName("infoWrap")[0].offsetHeight;
    let lH = document.getElementsByClassName("contactWrap")[0].offsetHeight+50;
    let rD = document.getElementsByClassName("infoWrap")[0];
    let lD = document.getElementsByClassName("contactWrap")[0];
    rD.style.height = Math.max(lH-80,rH-80) + 'px';
    lD.style.height = Math.max(lH-80,rH-80) + 'px';
}
 




// FOR SMOOTH SCROLLING 
const target = []; // ARRAY TO STORE ALL ELEMETS THAT NEED TO BE APPEARING/DISSAPPEARING
target.push(document.getElementsByClassName("portfolioDiv")[0].children[0]);
target.push(...document.getElementsByClassName("portfolioDiv")[0].children[1].children);
// target.push(document.querySelectorAll(".formDiv>form")[0]);
target.push(document.querySelectorAll(".about-section h2")[0]);
target.push(...document.getElementsByClassName("topics")[0].children);
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
projectLinks["ComingSoon"]="#";
function projectClick() {
    let projects = document.getElementById("portfolioDivs").children;
    for(let i=0;i<projects.length;i++) {
        projects[i].addEventListener("click",function() {
            const newTab = window.open(projectLinks[projects[i].id],"_blank");
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
const button = document.getElementById("submitBtn");
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
        // let all = window.getComputedStyle(document.querySelectorAll("input")[0]);
    }else {
        let errorList = document.getElementsByClassName("error");

        
        
        
        
        
        
        




        
        // არ მუშაოოოოოოოოოოოოოოოოოოოოოოოოოოოოობს
        for(let i=0;i<errorList.length;i++) {
            const computedStyle = window.getComputedStyle(errorList[i]);
            if(computedStyle.getPropertyValue("display")==="block"){
                errorList[i].style.removeProperty("display");
            }
        }
        // არ მუშაოოოოოოოოოოოოოოოოოოოოოოოოოოოოობს













        formSubmit(form);
    }
});
    
function formSubmit(form) {
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
        form.reset();
    })
    .catch(error => {
        // Handle any errors that occur during the request
        alert('An error occurred while sending your message.');
    });
}
// FORM 

// SIDE MENU OPEN/CLOSE TOGGLE
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
});
// SIDE MENU OPEN/CLOSE TOGGLE

// TO MOVE PHOTO ON HOVER
let shape = document.getElementsByClassName("shapeDiv")[0];
let me = document.getElementsByClassName("myPhotoDiv")[0];
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
const myImage = document.getElementById('myImage');
const myImage1 = document.getElementById('myImage1');
const scrollToElement = document.getElementById('home');
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
        }, 1000);
    });
}
// DOWNLOADING BUTTON LOADING POPUP 

function POPUPS() {
    const text = document.querySelectorAll(".topic>p");
    const topic = document.getElementsByClassName("topic");
    let firstClick = true;
    document.addEventListener("click",function(event) {
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
    for(let i=0;i<topic.length;i++) {
    topic[i].addEventListener("click",function() {
            topic[i].children[1].children[0].innerText = text[i].innerText;
            topic[i].children[1].style.display = "flex";
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

//MEDIA QUERY 
// Create a media query that targets devices with a max width of 750px
const mediaQuery = window.matchMedia('(max-width: 750px)');
// Define a function to handle the media query changes
function handleMediaQueryChanges(mediaQuery) {
    if (mediaQuery.matches) {
        POPUPS();
    }
}
handleMediaQueryChanges(mediaQuery);
mediaQuery.addListener(handleMediaQueryChanges);
//MEDIA QUERY 