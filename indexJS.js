projectClick();

const resize_navButtons = new ResizeObserver(function(entries) {
    // since we are observing only a single element, so we access the first element in entries array
    let rect = entries[0].contentRect;

    // current width & height
    let width = rect.width;
    let height = rect.height;

    // console.log('Current Width : ' + width);
    // console.log('Current Height : ' + height);
    //write font code to change accordingly
    let divFont = document.getElementsByClassName("buttons")[0].children;
    for(let i=0;i<divFont.length;i++)
        divFont[i].style.fontSize = (width/4*10)/100+"px";
    // console.log(divFont);
});
resize_navButtons.observe(document.getElementsByClassName("buttons")[0]);
const resize_ob = new ResizeObserver(function(entries) {
    // since we are observing only a single element, so we access the first element in entries array
    let rect = entries[0].contentRect;
    // current width & height
    let width = rect.width;
    let height = rect.height;
    
    // console.log('Current Width : ' + width);
    // console.log('Current Height : ' + height);
    //write font code to change accordingly
    let divToResize = document.getElementsByClassName("frontTextIntro")[0];
    console.log(height);
    divToResize.style.paddingTop = 4.5*height + "px";
    // console.log(divFont);
});
// resize_ob.observe(document.getElementsByClassName("navDiv")[0]);


const target = [];
// target.push(document.getElementsByClassName("frontTextIntro")[0]);
// target.push(document.getElementById("portfolioDivs"));
target.push(document.getElementsByClassName("portfolioDiv")[0].children[0]);
target.push(...document.getElementsByClassName("portfolioDiv")[0].children[1].children);
target.push(document.querySelectorAll(".formDiv>form")[0]);
target.push(document.querySelectorAll(".about-section h2")[0]);
target.push(...document.getElementsByClassName("topics")[0].children);
// const items = document.querySelectorAll('.item');
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



//Project Links Obj
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



const form = document.querySelectorAll('form')[0];
// Add an event listener for form submission
form.addEventListener('submit', e => {
  // Prevent the default form submission behavior
  e.preventDefault();
  // Get the form data
  const formData = new FormData(form);
  // Send the form data to an email address using a third-party service
  fetch('https://formsubmit.co/ajax/G_modebadze3@cu.edu.ge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
  .then(response => {
    // Handle the response from the server
    console.log(response);
    alert('Your message has been sent!');
    form.reset();
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error(error);
    alert('An error occurred while sending your message.');
  });
});


const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
});



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



const myImage = document.getElementById('myImage');
const myImage1 = document.getElementById('myImage1');
const scrollToElement = document.getElementById('home');
myImage.addEventListener('click', () => {
  scrollToElement.scrollIntoView({ behavior: 'smooth' });
});
myImage1.addEventListener('click', () => {
  scrollToElement.scrollIntoView({ behavior: 'smooth' });
});





const downloadBtn = document.getElementById('download-btn');
const loadingPopup = document.getElementById('loading-popup');
downloadBtn.addEventListener('click', () => {
  loadingPopup.style.display = 'block';
  // code to start download here

  // simulate download with setTimeout
  setTimeout(() => {
    loadingPopup.style.display = 'none';
  }, 1000);
});



function POPUPS() {
  const text = document.querySelectorAll(".topic>p");
  const topic = document.getElementsByClassName("topic");

  let firstClick = true;
  document.addEventListener("click",function(event) {
    const popupWin = document.getElementsByClassName("description-popup");
    let openWin = checkPopup();
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
  document.addEventListener("scroll",function(event) {
    const popupWin = document.getElementsByClassName("description-popup");
    let openWin = checkPopup();
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

  function checkPopup() {
    const popupBack = document.getElementsByClassName("popupBack");
    for(let i=0;i<popupBack.length;i++) {
      const style = getComputedStyle(popupBack[i]);
      if(style.display=='flex')
        return i; // index
    }
    return -1;
  }
  for(let i=0;i<topic.length;i++) {
    topic[i].addEventListener("click",function() {
    // if(window.innerWidth<=750){
    //   let pointOut = false;
      topic[i].children[1].children[0].innerText = text[i].innerText;
      topic[i].children[1].style.display = "flex";
    });
  }
}

// Create a media query that targets devices with a max width of 600px
const mediaQuery = window.matchMedia('(max-width: 750px)');

// Define a function to handle the media query changes
function handleMediaQueryChanges(mediaQuery) {
  if (mediaQuery.matches) {
    POPUPS();
  }
}

// Call the function once to set the initial background color based on the user's device width
handleMediaQueryChanges(mediaQuery);

// Add an event listener to the media query that will call the function whenever the device width changes
mediaQuery.addListener(handleMediaQueryChanges);