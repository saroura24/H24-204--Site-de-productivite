/*let time = document.getElementById("live-time");

setInterval(() =>{
    let d = new Date();
    time.innerHTML = d.toLocaleTimeString();
},1000)*/

let hrs = document.getElementById("hrs");
let min = document.getElementById("min");

setInterval(() => {
    let heureMtn = new Date();

    if(heureMtn.getHours() < 10){
        hrs.innerHTML = "0" + heureMtn.getHours();
    } else{
        hrs.innerHTML = heureMtn.getHours();
    }

    if(heureMtn.getMinutes() < 10){
        min.innerHTML = "0" + heureMtn.getMinutes();
    } else{
        min.innerHTML = heureMtn.getMinutes();
    }
    
},1000)




const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const navbar = document.querySelector('.navbar');

toggleBtn.onclick = function(){
    navbar.classList.toggle('open');
    const isOpen = navbar.classList.contains('open');

    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';
}