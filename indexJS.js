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


/* target.forEach(el => {
    el.classList.remove("div-transition");
});
function callback(entries, observer) {
    for(let i=0;i<entries.length;i++){
        if(entries[i].isIntersecting) {
            console.log("visible");
            target[i].classList.add("div-transition");
        } else {
            console.log("not visible");
            target[i].classList.remove("div-transition");
            // target.classList.remove("div-transition"); 
       }
    }
}
function createObserver(target, callback) {
   const options = {
      root: null,
      threshold: 0.4
   };
   const observer = new IntersectionObserver(callback, options);
   target.forEach(el => {
        observer.observe(el);
    });
}
createObserver(target, callback); */



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