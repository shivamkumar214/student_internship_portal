import { BASE_URL } from "./config.js";

const progressTableBody = document.getElementById("progressTableBody");
const noProgress = document.getElementById("noProgress");

async function checkAuth() {
  try {
    console.log("i am daily_progress.js from checkAuth")
    await axios.get(`${BASE_URL}/api/profile`, {
      withCredentials: true,
    });
  } catch (error) {
    window.location.href = "login.html";
  }
}

checkAuth()


// Get Completed Tasks
async function getProgress() {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/progress`,

      {
        withCredentials: true,
      },
    );

    const progress = response.data.progress;

    progressTableBody.innerHTML = "";

    if (progress.length === 0) {
      noProgress.style.display = "block";
      return;
    }

    noProgress.style.display = "none";

    progress.forEach((item) => {
      progressTableBody.innerHTML += `

            <tr>

                <td>${item.taskId.title}</td>

                <td>${item.taskId.description}</td>

                <td>${new Date(item.taskId.deadline).toLocaleDateString()}</td>

                <td>${item.status}</td>

                <td>

                    ${
                      item.completedAt
                        ? new Date(item.completedAt).toLocaleDateString()
                        : "--"
                    }

                </td>

            </tr>

            `;
    });
  } catch (error) {
    console.log(error);
  }
}

getProgress();


// Logout
document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    await axios.post(
      `${BASE_URL}/api/logout`,

      {},

      {
        withCredentials: true,
      },
    );

    window.location.href = "login.html";
  } catch (error) {
    console.log(error);
  }
});
