// Form validation and handling
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsAccepted = document.getElementById('terms').checked;
            
            // Clear previous error messages
            clearErrors();
            
            // Validation
            let isValid = true;
            
            if (!fullName || fullName.trim().length < 2) {
                showError('fullName', 'Please enter your full name');
                isValid = false;
            }
            
            if (!email || !isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!password || password.length < 8) {
                showError('password', 'Password must be at least 8 characters');
                isValid = false;
            }
            
            if (password !== confirmPassword) {
                showError('confirmPassword', 'Passwords do not match');
                isValid = false;
            }
            
            if (!termsAccepted) {
                showError('terms', 'You must accept the terms and conditions');
                isValid = false;
            }
            
            if (isValid) {
                // Form is valid - show success message
                showSuccessMessage();
            }
        });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group') || field.closest('.checkbox-group');
    
    // Add error styling
    field.style.borderColor = '#dc2626';
    
    // Create and append error message if it doesn't exist
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc2626';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '4px';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function showSuccessMessage() {
    const form = document.getElementById('signupForm');
    const container = document.querySelector('.signup-container');
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.style.textAlign = 'center';
    successDiv.style.padding = '40px';
    successDiv.innerHTML = `
        <div style="width: 64px; height: 64px; margin: 0 auto 24px; background-color: #dcfce7; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 12px; color: #1e293b;">Account Created Successfully!</h2>
        <p style="color: #64748b; margin-bottom: 32px;">Welcome to Terminal Shell. Check your email to verify your account.</p>
        <a href="index.html" class="btn btn-primary">Go to Home</a>
    `;
    
    // Replace form with success message
    form.style.opacity = '0';
    form.style.transition = 'opacity 0.2s ease';
    
    setTimeout(() => {
        form.remove();
        container.querySelector('.signup-header').remove();
        container.appendChild(successDiv);
    }, 200);
}
