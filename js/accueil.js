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