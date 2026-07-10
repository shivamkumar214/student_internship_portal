// console.log("Dashboard Loaded Successfully");
// import { BASE_URL } from "../../js/config.js";

// const studentTableBody = document.getElementById("studentTableBody");

// const studentCount = document.getElementById("studentCount");
// const resumeCount = document.getElementById("resumeCount");
// const taskCount = document.getElementById("taskCount");
// const completedCount = document.getElementById("completedCount");

// const taskModal = document.getElementById("taskModal");
// const closeModal = document.getElementById("closeModal");
// const taskForm = document.getElementById("taskForm");

// // ===================================
// // Get All Students
// // ===================================

// async function getStudents() {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/admin/users`, {
//       withCredentials: true,
//     });

//     const students = response.data.users;

//     studentCount.innerText = response.data.totalStudents;

//     let resumeUploaded = 0;

//     studentTableBody.innerHTML = "";

//     students.forEach((student) => {
//       if (student.resume) {
//         resumeUploaded++;
//       }

//       studentTableBody.innerHTML += `

//             <tr>

//                 <td>${student.name}</td>

//                 <td>${student.email}</td>

//                 <td>

//                     <button onclick="viewResume('${student.resume}')">

//                         View Resume

//                     </button>

//                 </td>

//                 <td>

//                     <button onclick="openTaskModal('${student._id}')">

//                         Assign Task

//                     </button>

//                 </td>

//                 <td>

//                     <button onclick="viewProgress('${student._id}')">

//                         View

//                     </button>

//                 </td>

//             </tr>

//             `;
//     });

//     resumeCount.innerText = resumeUploaded;
//   } catch (error) {
//     console.log(error);
//   }
// }

// getStudents();

// // ===================================
// // View Resume
// // ===================================

// window.viewResume = function (resume) {
//   if (!resume) {
//     alert("Resume Not Uploaded");

//     return;
//   }

//   window.open(resume, "_blank");
// };

// // ===================================
// // Open Modal
// // ===================================

// window.openTaskModal = function (id) {
//   document.getElementById("studentId").value = id;

//   taskModal.style.display = "block";
// };

// // ===================================
// // Close Modal
// // ===================================

// closeModal.onclick = () => {
//   taskModal.style.display = "none";
// };

// // ===================================
// // Assign Task
// // ===================================

// taskForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   try {
//     const response = await axios.post(
//       `${BASE_URL}/api/admin/assign-task/${document.getElementById("studentId").value}`,

//       {
//         title: document.getElementById("title").value,
//         description: document.getElementById("description").value,
//         deadline: document.getElementById("deadline").value,
//       },

//       {
//         withCredentials: true,
//       },
//     );

//     alert(response.data.message);

//     taskModal.style.display = "none";

//     taskForm.reset();
//   } catch (error) {
//     alert(error.response.data.message);
//   }
// });

// // ===================================
// // View Progress
// // ===================================

// window.viewProgress = async function (userId) {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/admin/progress/${userId}`,
//       {
//         withCredentials: true,
//       },
//     );

//     taskCount.innerText = response.data.totalTasks;
//     completedCount.innerText = response.data.completedTasks;

//     alert("Completed Tasks : " + response.data.progress.length);
//   } catch (error) {
//     console.log(error);
//   }
// };

// // ===================================
// // Logout
// // ===================================

// document.getElementById("logoutBtn").addEventListener("click", async () => {
//   try {
//     await axios.post(
//       `${BASE_URL}/api/logout`,

//       {},

//       {
//         withCredentials: true,
//       },
//     );

//     window.location.href = "admin_login.html";
//   } catch (error) {
//     console.log(error);
//   }
// });


import { BASE_URL } from "../../js/config.js";

const studentTableBody = document.getElementById("studentTableBody");

const studentCount = document.getElementById("studentCount");
const resumeCount = document.getElementById("resumeCount");
const taskCount = document.getElementById("taskCount");
const completedCount = document.getElementById("completedCount");

const taskModal = document.getElementById("taskModal");
const closeModal = document.getElementById("closeModal");
const taskForm = document.getElementById("taskForm");

// ==============================
// Dashboard Summary
// ==============================

async function getDashboard() {

    try {

        const response = await axios.get(

            `${BASE_URL}/api/admin/dashboard`,

            {
                withCredentials: true
            }

        );

        taskCount.innerText = response.data.totalTasks;
        completedCount.innerText = response.data.completedTasks;

    }

    catch (error) {

        console.log(error);

    }

}

getDashboard();


// ==============================
// Get All Students
// ==============================

async function getStudents() {

    try {

        const response = await axios.get(

            `${BASE_URL}/api/admin/users`,

            {
                withCredentials: true
            }

        );

        const students = response.data.users;

        studentCount.innerText = response.data.totalStudents;

        let uploadedResume = 0;

        studentTableBody.innerHTML = "";

        students.forEach(student => {

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
                    ?

                    `<button onclick="viewResume('${student._id}')">

                    View Resume

                    </button>`

                    :

                    `<span>Not Uploaded</span>`

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

    }

    catch (error) {

        console.log(error);

    }

}

getStudents();


// ==============================
// View Resume
// ==============================

window.viewResume = async function(id){

    try{

        const response = await axios.get(

            `${BASE_URL}/api/admin/user/${id}`,

            {

                withCredentials:true

            }

        );

        window.open(

            response.data.user.resume,

            "_blank"

        );

    }

    catch(error){

        console.log(error);

    }

};

// ==============================
// Open Assign Task Modal
// ==============================

window.openTaskModal = function (id) {

    document.getElementById("studentId").value = id;

    taskModal.style.display = "block";

};


// ==============================
// Close Modal
// ==============================

closeModal.addEventListener("click", () => {

    taskModal.style.display = "none";

    taskForm.reset();

});


// ==============================
// Assign Task
// ==============================

taskForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const response = await axios.post(

            `${BASE_URL}/api/admin/assign-task/${document.getElementById("studentId").value}`,

            {
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                deadline: document.getElementById("deadline").value
            },

            {
                withCredentials: true
            }

        );

        alert(response.data.message);

        taskModal.style.display = "none";

        taskForm.reset();

        getDashboard();

    }

    catch (error) {

        alert(error.response?.data?.message || error.message);

    }

});


// ==============================
// View Student Progress
// ==============================

window.viewProgress = async function (userId) {

    try {

        const response = await axios.get(

            `${BASE_URL}/api/admin/progress/${userId}`,

            {
                withCredentials: true
            }

        );

        if (response.data.progress.length === 0) {

            alert("No Progress Found");

            return;

        }

        let message = "";

        response.data.progress.forEach((item, index) => {

            message += `${index + 1}. ${item.taskId.title}\n`;
            message += `Status : ${item.status}\n`;

            if (item.completedAt) {

                message += `Completed : ${new Date(item.completedAt).toLocaleDateString()}\n`;

            }

            message += "\n";

        });

        alert(message);

    }

    catch (error) {

        console.log(error);

    }

};


// ==============================
// Logout
// ==============================

document.getElementById("logoutBtn").addEventListener("click", async () => {

    try {

        await axios.post(

            `${BASE_URL}/api/logout`,

            {},

            {
                withCredentials: true
            }

        );

        window.location.href = "admin_login.html";
    }
    catch (error) {
        console.log(error);
    }
});