$(document).ready(function() {
  $(".connecter span").text("Mon compte");
  $('.connecter').attr('href', 'mon-compte');
  $('.links').append(`<li><a href="deconnexion"><i class="fa-solid fa-right-from-bracket"></i><span style="margin-left:5px">Se déconnecter</span></a></li>`);

  const toggleBtn = $('.toggle_btn');
  const links = $('.links');

  
  toggleBtn.click(function() {
      links.toggleClass('open');
      if (links.hasClass('open')) {
          links.height(270); 
          $('.toggle_btn i').removeClass('fa-bars').addClass('fa-xmark');
      } else {
          links.height(0); 
          $('.toggle_btn i').removeClass('fa-xmark').addClass('fa-bars');
      }
  });
});

