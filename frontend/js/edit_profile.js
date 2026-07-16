import { BASE_URL } from "./config.js";

const form = document.getElementById("editProfileForm");


// Get profile

async function getProfile() {

    try {

        const response = await axios.get(
            `${BASE_URL}/api/profile`,
            {
                withCredentials: true
            }
        );

        const user = response.data.user;

        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;
        document.getElementById("college").value = user.college;
        document.getElementById("course").value = user.course;

    } catch (error) {

        console.log(error);
        window.location.href = "login.html";

    }

}

getProfile();


// Update profile
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const response = await axios.put(

            `${BASE_URL}/api/profile/update`,

            {
                name: document.getElementById("name").value,
                phone: document.getElementById("phone").value,
                college: document.getElementById("college").value,
                course: document.getElementById("course").value
            },

            {
                withCredentials: true
            }

        );

        alert(response.data.message);

        window.location.href = "profile.html";

    } catch (error) {

        alert(error.response?.data?.message || error.message);

    }

});


// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {

    try {

        await axios.post(
            `${BASE_URL}/api/logout`,
            {},
            {
                withCredentials: true
            }
        );

        window.location.href = "login.html";
    } catch (error) {
        console.log(error);
    }
});