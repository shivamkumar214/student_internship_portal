// // Admin Login Page

// console.log("Admin Login Page Loaded");

// const form = document.getElementById("loginForm");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const message = document.getElementById("message");

// // Email Validation Pattern
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// // Display Message
// function showMessage(text, color = "red") {
//     message.textContent = text;
//     message.style.color = color;
// }

// // Clear message while typing
// emailInput.addEventListener("input", () => showMessage(""));
// passwordInput.addEventListener("input", () => showMessage(""));

// // Form Submission
// form.addEventListener("submit", function(e){

//     e.preventDefault();

//     const email = emailInput.value.trim();
//     const password = passwordInput.value.trim();

//     if(email === "" || password === ""){

//         showMessage("Please fill all fields.");
//         return;

//     }

//     if(!emailRegex.test(email)){

//         showMessage("Please enter a valid email address.");
//         return;

//     }

//     if(password.length < 6){

//         showMessage("Password must be at least 6 characters.");
//         return;

//     }

//     // Temporary frontend success
//     showMessage("Login Successful!", "green");

//     // Redirect after 1 second
//     setTimeout(function(){

//         window.location.href = "admin_dashboard.html";

//     },1000);

// });

import { BASE_URL } from "../../js/config.js";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();
    console.log("admin login")
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("emmai: ", email, " And ", "password: ", password)
    try {
        const response = await axios.post( `${BASE_URL}/api/auth/login`,
            {
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        message.style.color = "green";
        message.innerText = response.data.message;

        setTimeout(() => {
            window.location.href = "admin_dashboard.html";
        }, 5000);
    }
    catch (error) {
        message.style.color = "red";
        message.innerText =
            error.response;
    }
});