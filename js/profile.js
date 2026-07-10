import { BASE_URL } from "./config.js";

// ==========================
// Get Profile
// ==========================

async function getProfile() {

    try {

        const response = await axios.get(
            `${BASE_URL}/api/profile`,
            {
                withCredentials: true
            }
        );

        const user = response.data.user;

        document.getElementById("name").innerText = user.name;
        document.getElementById("email").innerText = user.email;
        document.getElementById("phone").innerText = user.phone;
        document.getElementById("college").innerText = user.college;
        document.getElementById("course").innerText = user.course;

        if (user.resume) {
            document.getElementById("resumeStatus").innerText = "Uploaded ✅";
        } else {
            document.getElementById("resumeStatus").innerText = "Not Uploaded ❌";
        }

    } catch (error) {

        console.log(error);

    }

}

getProfile();


// ==========================
// Logout
// ==========================

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