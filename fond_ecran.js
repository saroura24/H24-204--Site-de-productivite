function background(img){
    document.querySelector('.hero').style.background = img;
    localStorage.setItem('backgroundImage',img)
  }
  
  function getBackground(){
    var img = localStorage.getItem('backgroundImage');
    if (img) {
        document.querySelector('.hero').style.background = img;
    }
  }
  
  window.onload = function(){
    getBackground();
  }