

$(document).ready(function() {
   

    function setBackground(img) {
        $(".hero").css({"background-image": "url(" + img + ")"});
       
        localStorage.setItem('backgroundImage', img);
    }

   
    function getBackground() {
      
        const img = localStorage.getItem('backgroundImage');
        if (img) {
            
            setBackground(img);
        }
    }

   
    $(".back-change").click(function(){
        var imgSrc = $(this).find('img').attr('src');
        setBackground(imgSrc);
    });

    var setBackgroundDefault = (function(){
        setBackground(`images/cozy.jpg`);
        localStorage.setItem('functionExecuted', 'true');
    })
    
    if(!localStorage.getItem('functionExecuted')) {
        setBackgroundDefault();
    }

    
    getBackground();
});