// Predefined credentials for login
const credentials = {
    username: "Jordanpro22",
    email: "jordan.youmbi@kaeyros-analytics.de",
    password: "Raphajoe22" 
};

// Function to validate email format
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function to handle login
function handleLogin() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if all fields are filled
    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Validate email format
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Check if credentials match
    if (username === credentials.username && email === credentials.email && password === credentials.password) {
        // Redirect to the dashboard page
        window.location.href = "index.html"; 
    } else {
        alert("Invalid credentials. Please try again.");
    }
}

// Event listener for login button
document.getElementById('login-button').addEventListener('click', handleLogin);