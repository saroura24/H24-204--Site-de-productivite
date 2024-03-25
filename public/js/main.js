

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



