

// ===== MOBILE MENU =====
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');

if (menu) {
    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });
}

// ===== MODAL =====
// Get modal element
const modal = document.getElementById('myModal');

// Get ALL buttons that should open the modal
const openModalBtns = document.querySelectorAll('#getStartedBtn, #signupBtn');

// Get close button
const closeBtn = document.querySelector('.close');

// Get form and inputs
const form = document.getElementById('signupForm');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Function to open modal
function openModal(e) {
    if (e) e.preventDefault();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    resetForm();
}

// Function to reset form
function resetForm() {
    if (form) form.reset();
    // Clear error messages
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (passwordError) passwordError.textContent = '';
    if (confirmPasswordError) confirmPasswordError.textContent = '';
    // Remove error/success classes
    if (fullname) fullname.classList.remove('error', 'success');
    if (email) email.classList.remove('error', 'success');
    if (password) password.classList.remove('error', 'success');
    if (confirmPassword) confirmPassword.classList.remove('error', 'success');
}

// Attach open event to all buttons
openModalBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', openModal);
});

// Close modal when close button is clicked
if (closeBtn) closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Close modal with Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
});

// ===== FORM VALIDATION =====
// Only run if form exists
if (form) {
    function validateName() {
        const nameValue = fullname.value.trim();
        if (nameValue === '') {
            nameError.textContent = 'Full name is required';
            fullname.classList.add('error');
            fullname.classList.remove('success');
            return false;
        } else if (nameValue.length < 3) {
            nameError.textContent = 'Name must be at least 3 characters';
            fullname.classList.add('error');
            fullname.classList.remove('success');
            return false;
        } else {
            nameError.textContent = '';
            fullname.classList.remove('error');
            fullname.classList.add('success');
            return true;
        }
    }

    function validateEmail() {
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === '') {
            emailError.textContent = 'Email is required';
            email.classList.add('error');
            email.classList.remove('success');
            return false;
        } else if (!emailPattern.test(emailValue)) {
            emailError.textContent = 'Please enter a valid email address';
            email.classList.add('error');
            email.classList.remove('success');
            return false;
        } else {
            emailError.textContent = '';
            email.classList.remove('error');
            email.classList.add('success');
            return true;
        }
    }

    function validatePassword() {
        const passwordValue = password.value.trim();
        if (passwordValue === '') {
            passwordError.textContent = 'Password is required';
            password.classList.add('error');
            password.classList.remove('success');
            return false;
        } else if (passwordValue.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            password.classList.add('error');
            password.classList.remove('success');
            return false;
        } else {
            passwordError.textContent = '';
            password.classList.remove('error');
            password.classList.add('success');
            return true;
        }
    }

    function validateConfirmPassword() {
        const passwordValue = password.value.trim();
        const confirmValue = confirmPassword.value.trim();
        if (confirmValue === '') {
            confirmPasswordError.textContent = 'Please confirm your password';
            confirmPassword.classList.add('error');
            confirmPassword.classList.remove('success');
            return false;
        } else if (confirmValue !== passwordValue) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPassword.classList.add('error');
            confirmPassword.classList.remove('success');
            return false;
        } else {
            confirmPasswordError.textContent = '';
            confirmPassword.classList.remove('error');
            confirmPassword.classList.add('success');
            return true;
        }
    }

    // Real-time validation
    fullname.addEventListener('input', validateName);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
            alert('Account created successfully! Welcome aboard! 🎉');
            closeModal();
            console.log('Form submitted:', { name: fullname.value, email: email.value });
        }
    });
}

// Debug: Check if elements are found
document.addEventListener('DOMContentLoaded', function() {
    console.log('Modal found:', !!modal);
    console.log('Open buttons found:', openModalBtns.length);
    console.log('Close button found:', !!closeBtn);
    console.log('Form found:', !!form);
});