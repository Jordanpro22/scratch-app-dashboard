// Page Navigation
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        const target = this.getAttribute('data-target');

        pages.forEach(page => {
            page.classList.remove('active');
        });

        document.getElementById(target).classList.add('active');
    });
});

// Config Navigation
const configButtons = document.querySelectorAll('.config-btn');
const configPages = document.querySelectorAll('.config-page');

configButtons.forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('data-config');

        configButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');

        configPages.forEach(page => {
            page.classList.remove('active');
        });

        document.getElementById(target).classList.add('active');
    });
});
