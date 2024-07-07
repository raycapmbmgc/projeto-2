class LoginForm {
    constructor(formId, emailId, passwordId, errorMessageId) {
        this.form = document.getElementById(formId);
        this.emailInput = document.getElementById(emailId);
        this.passwordInput = document.getElementById(passwordId);
        this.errorMessage = document.getElementById(errorMessageId);

        this.initEventListeners();
    }

    initEventListeners() {
        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }

    async handleSubmit(event) {
        event.preventDefault();
        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({ email, password })
            });

            const data = await response.text();
            if (data.includes('Login successful')) {
                window.location.href = '/';
            } else {
                this.showErrorMessage(data);
            }
        } catch (error) {
            this.showErrorMessage('An error occurred. Please try again.');
        }
    }

    showErrorMessage(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LoginForm('loginForm', 'email', 'password', 'errorMessage');
});
