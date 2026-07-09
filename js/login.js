// function validateForm(){

//     let studentID = document.getElementById("studentid").value.trim();

//     let password = document.getElementById("password").value.trim();

//     if(studentID === ""){

//         alert("Please enter Student ID.");

//         return false;

//     }

//     if(password === ""){

//         alert("Please enter Password.");

//         return false;

//     }

//     return true;

// }


const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        alert(response.data.message);

        window.location.href = "dashboard.html";

    } catch (error) {

        alert(
            error.response?.data?.message || "Something went wrong"
        );

    }

});