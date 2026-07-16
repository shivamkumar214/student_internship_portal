import { BASE_URL } from "./config.js";

const taskTableBody = document.getElementById("taskTableBody");
const noTasks = document.getElementById("noTasks");

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

// Get Assigned Tasks
async function getTasks() {
  try {
    const response = await axios.get(`${BASE_URL}/api/tasks`, {
      withCredentials: true,
    });

    const tasks = response.data.tasks;

    if (tasks.length === 0) {
      noTasks.style.display = "block";
      return;
    }

    taskTableBody.innerHTML = "";

    tasks.forEach((task) => {
      taskTableBody.innerHTML += `

            <tr>

                <td>${task.title}</td>

                <td>${task.description}</td>

                <td>${new Date(task.deadline).toLocaleDateString()}</td>

                <td>${task.status}</td>

                <td>

                    <button
                        onclick="completeTask('${task._id}')"
                    >
                        Complete
                    </button>

                </td>

            </tr>
            `;
    });
  } catch (error) {
    console.log(error);
  }
}

getTasks();


// Complete Task
window.completeTask = async function (taskId) {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/progress/complete/${taskId}`,
      {},
      {
        withCredentials: true,
      },
    );

    alert(response.data.message);
    getTasks();
  } catch (error) {
    alert(error.response.data.message);
  }
};


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
