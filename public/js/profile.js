class Navbar {
    constructor(toggleId, navId, bodyId, headerId) {
        this.toggle = document.getElementById(toggleId);
        this.nav = document.getElementById(navId);
        this.bodypd = document.getElementById(bodyId);
        this.headerpd = document.getElementById(headerId);
        this.linkColor = document.querySelectorAll('.nav_link');

        this.initEventListeners();
    }

    initEventListeners() {
        if (this.toggle && this.nav && this.bodypd && this.headerpd) {
            this.toggle.addEventListener('click', () => this.toggleNavbar());
        }

        if (this.linkColor) {
            this.linkColor.forEach(link => link.addEventListener('click', (event) => this.colorLink(event)));
        }
    }
    toggleNavbar() {
        this.nav.classList.toggle('show');
        this.toggle.classList.toggle('bx-x');
        this.bodypd.classList.toggle('body-pd');
        this.headerpd.classList.toggle('body-pd');
    }

    colorLink(event) {
        this.linkColor.forEach(link => link.classList.remove('active'));
        event.currentTarget.classList.add('active');
    }
}

// Inicialize a classe Navbar quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    new Navbar('header-toggle', 'nav-bar', 'body-pd', 'header');
});
