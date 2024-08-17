// Page Navigation
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
let currentActiveLink = null;

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        const target = this.getAttribute('data-target');

        if (currentActiveLink) {
            currentActiveLink.classList.remove('active');
        }

        // Set current active link
        currentActiveLink = this;
        this.classList.add('active');

        pages.forEach(page => {
            page.classList.remove('active');
        });

        setTimeout(() => {
            document.getElementById(target).classList.add('active');
        }, 100); 
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

        setTimeout(() => {
            document.getElementById(target).classList.add('active');
        }, 100); 
    });
});


 