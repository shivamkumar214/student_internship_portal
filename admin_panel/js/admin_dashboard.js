// import { BASE_URL } from "../../frontend/js/config.js";
const BASE_URL = "https://student-internship-portal-lvvf.onrender.com";

const studentTableBody = document.getElementById("studentTableBody");

const studentCount = document.getElementById("studentCount");
const resumeCount = document.getElementById("resumeCount");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");

const taskModal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");
const taskForm = document.getElementById("taskForm");

// Dashboard Summary
async function getDashboard() {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/admin/dashboard`,

      {
        withCredentials: true,
      },
    );

    taskCount.innerText = response.data.totalTasks;
    completedCount.innerText = response.data.completedTasks;
  } catch (error) {
    console.log(error);
  }
}

getDashboard();

// Get all students
async function getStudents() {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/admin/users`,

      {
        withCredentials: true,
      },
    );

    const students = response.data.users;

    studentCount.innerText = response.data.totalStudents;

    let uploadedResume = 0;

    studentTableBody.innerHTML = "";

    students.forEach((student) => {
      if (student.resume) {
        uploadedResume++;
      }

      studentTableBody.innerHTML += `

            <tr>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>

                ${
                  student.resume
                    ? `<button onclick="viewResume('${student._id}')">

                    View Resume

                    </button>`
                    : `<span>Not Uploaded</span>`
                }

                </td>

                <td>

                    <button onclick="openTaskModal('${student._id}')">

                        Assign Task

                    </button>

                </td>

                <td>

                    <button onclick="viewProgress('${student._id}')">

                        View

                    </button>

                </td>

            </tr>

            `;
    });

    resumeCount.innerText = uploadedResume;
  } catch (error) {
    console.log(error);
  }
}

getStudents();

// View Resume
window.viewResume = async function (id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/admin/user/${id}`,

      {
        withCredentials: true,
      },
    );

    window.open(
      response.data.user.resume,

      "_blank",
    );
  } catch (error) {
    console.log(error);
  }
};

// Open Assign Task Modal
window.openTaskModal = function (id) {
  document.getElementById("studentId").value = id;

  taskModal.style.display = "block";
};

// Close Modal
closeModal.addEventListener("click", () => {
  taskModal.style.display = "none";

  taskForm.reset();
});

// Assign Task
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${BASE_URL}/api/admin/assign-task/${document.getElementById("studentId").value}`,

      {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        deadline: document.getElementById("deadline").value,
      },

      {
        withCredentials: true,
      },
    );

    alert(response.data.message);

    taskModal.style.display = "none";

    taskForm.reset();

    getDashboard();
  } catch (error) {
    alert(error.response?.data?.message || error.message);
  }
});

// View Student Progress
const progressTableBody = document.getElementById("progressTableBody");

const noCompletedTask = document.getElementById("noCompletedTask");

window.viewProgress = async function (userId) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/admin/progress/${userId}`,

      {
        withCredentials: true,
      },
    );

    progressTableBody.innerHTML = "";

    if (response.data.progress.length === 0) {
      noCompletedTask.style.display = "block";

      return;
    }

    noCompletedTask.style.display = "none";

    response.data.progress.forEach((item) => {
      progressTableBody.innerHTML += `

            <tr>

                <td>${item.taskId.title}</td>

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

    document.querySelector(".progress-section").scrollIntoView({
      behavior: "smooth",
    });
  } catch (error) {
    console.log(error);
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

    window.location.href = "admin_login.html";
  } catch (error) {
    console.log(error);
  }
});
