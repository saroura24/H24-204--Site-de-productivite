
$(".button-28").click(function(){
    $(".button-28").removeClass("clicked");
    $(this).addClass("clicked");
    
})


const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
  };

  const mainButton = document.getElementById('js-btn');
mainButton.addEventListener('click', () => {
  const { action } = mainButton.dataset;
  if (action === 'Start') {
    startTimer();
  } else {
    stopTimer();
  }
});

  const modeButtons = document.querySelector('#js-mode-buttons');
modeButtons.addEventListener('click', handleMode);

function updateClock() {
    const { remainingTime } = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');
  
    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');
    min.textContent = minutes;
    sec.textContent = seconds;
  }

function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime = {
      total: timer[mode] * 60,
      minutes: timer[mode],
      seconds: 0,
    };
  
    document
      .querySelectorAll('button[data-mode]')
      .forEach(e => e.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    document.body.style.backgroundColor = `var(--${mode})`;
  
    updateClock();
  }

function handleMode(event) {
  const { mode } = event.target.dataset;

  if (!mode) return;

  switchMode(mode);
  stopTimer();
}


let interval;

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  const total = Number.parseInt(difference / 1000, 10);
  const minutes = Number.parseInt((total / 60) % 60, 10);
  const seconds = Number.parseInt(total % 60, 10);

  return {
    total,
    minutes,
    seconds,
  };
}

function startTimer() {
  let { total } = timer.remainingTime;
  const endTime = Date.parse(new Date()) + total * 1000;


  mainButton.dataset.action = 'Stop';
  mainButton.textContent = 'Stop';
  mainButton.classList.add('active');

  interval = setInterval(function() {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();

    total = timer.remainingTime.total;
    if (total <= 0) {
      clearInterval(interval);
      var audio = new Audio('../audio/endPomodoroSound.wav');
      audio.play();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);

  mainButton.dataset.action = 'Start';
  mainButton.textContent = 'Start';
  mainButton.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  switchMode('pomodoro');
});


  
$(".play-playlist").click(function(){

  let spotifyLink = "";
    
  if($(".chose-playlist").val()!=""){
  
  var spotifyString = $(".chose-playlist").val(); 
  
  
  let slashCounter = 0;
  var embedAdded=false;
  
  for (let i = 0; i < spotifyString.length; i++) {
      if (spotifyString.charAt(i) === '?') {
          break;
      }
  
      if (spotifyString.charAt(i) === '/') {
          slashCounter += 1;
      }
  
      if (slashCounter === 3 && embedAdded==false) {
          spotifyLink += "/embed";
           embedAdded=true;
      }
  
      spotifyLink += spotifyString.charAt(i);
  }
  
  }
  
  if(spotifyLink!=""){
  $("#iframe").attr("src", spotifyLink);
  }
  
  $(".chose-playlist").val("");
  
  })