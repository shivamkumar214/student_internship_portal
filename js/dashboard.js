import {BASE_URL} from "./config.js";
async function getProfile() {
    try {
        console.log("getprofile")
        const response = await axios.get(
            `${BASE_URL}/api/profile`,
            {
                withCredentials: true
            }
        );
        console.log("getProfile from dashboard.js")

        const user = response.data.user;

        document.getElementById("studentName").innerText = user.name;

        if (user.resume) {
            document.getElementById("resumeStatus").innerText = "Uploaded";
        }else{
            document.getElementById("resumeStatus").innerText = "Not Uploaded";
        }
    } catch (error) {
        console.log(error);
    }
}

// ==========================
// Get Assigned Tasks
// ==========================

async function getTasks() {

    try {
        const response = await axios.get(
            `${BASE_URL}/api/tasks`,
            {
                withCredentials: true
            }
        );

        document.getElementById("taskCount").innerText =
            response.data.tasks.length + " Assigned";

    } catch (error) {

        console.log(error);

    }

}

// ==========================
// Get Completed Tasks
// ==========================

async function getProgress() {

    try {

        const response = await axios.get(
            `${BASE_URL}/api/progress`,
            {
                withCredentials: true
            }
        );

        const completed = response.data.progress.filter(task =>
            task.status === "Completed"
        );

        document.getElementById("completedCount").innerText =
            completed.length + " Completed";

    } catch (error) {

        console.log(error);

    }

}

// ==========================
// Logout
// ==========================

document.getElementById("logoutBtn").addEventListener("click", async () => {

    try {

        const response = await axios.post(
            `${BASE_URL}/api/logout`,
            {},
            {
                withCredentials: true
            }
        );

        alert(response.data.message);

        window.location.href = "login.html";

    } catch (error) {

        console.log(error);

    }

});

// ==========================
// Function Calls
// ==========================

getProfile();
getTasks();
getProgress();