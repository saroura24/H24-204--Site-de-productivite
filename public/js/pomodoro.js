
$(".button-28").click(function(){
    $(".button-28").removeClass("clicked");
    $(this).addClass("clicked");
    
})

const pomodoroTime = localStorage.getItem('pomodoro') || 25;
const shortBreakTime = localStorage.getItem('shortBreak') || 5;
const longBreakTime = localStorage.getItem('longBreak') || 15;

const timer = {
  pomodoro: pomodoroTime,
  shortBreak: shortBreakTime,
  longBreak: longBreakTime,
  longBreakInterval: 4,
};


const mainButton = $('#js-btn');
mainButton.on('click', function() {
  const action = mainButton.data('action');
  if (action === 'Commencer') {
    startTimer();
  } else {
    stopTimer();
  }
});

const modeButtons = $('#js-mode-buttons');
modeButtons.on('click', handleMode);

function updateClock() {
  const remainingTime = timer.remainingTime;
  const minutes = `${remainingTime.minutes}`.padStart(2, '0');
  const seconds = `${remainingTime.seconds}`.padStart(2, '0');

  $('#js-minutes').text(minutes);
  $('#js-seconds').text(seconds);
}

function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };

  $('button[data-mode]').removeClass('active');
  $(`[data-mode="${mode}"]`).addClass('active');
  $('body').css('backgroundColor', `var(--${mode})`);

  updateClock();
}

function handleMode(event) {
  const mode = $(event.target).data('mode');

  if (!mode) return;

  switchMode(mode);
  stopTimer();
}

let interval;

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  const total = parseInt(difference / 1000, 10);
  const minutes = parseInt((total / 60), 10);
  const seconds = parseInt(total % 60, 10);

  return {
    total,
    minutes,
    seconds,
  };
}

function startTimer() {
  let { total } = timer.remainingTime;
  const endTime = Date.parse(new Date()) + total * 1000;

  mainButton.data('action', 'Arrêter').text('Arrêter').addClass('active');

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

  mainButton.data('action', 'Commencer').text('Commencer').removeClass('active');
}

$(document).ready(function() {
  switchMode('pomodoro');
});

$('.play-playlist').click(function() {
  let spotifyLink = "";

  if ($('.chose-playlist').val() != "") {

    var spotifyString = $('.chose-playlist').val();


    let slashCounter = 0;
    var embedAdded = false;

    for (let i = 0; i < spotifyString.length; i++) {
      if (spotifyString.charAt(i) === '?') {
        break;
      }

      if (spotifyString.charAt(i) === '/') {
        slashCounter += 1;
      }

      if (slashCounter === 3 && embedAdded == false) {
        spotifyLink += "/embed";
        embedAdded = true;
      }

      spotifyLink += spotifyString.charAt(i);
    }

  }

  if (spotifyLink != "") {
    $('#iframe').attr('src', spotifyLink);
  }

  $('.chose-playlist').val("");

});
