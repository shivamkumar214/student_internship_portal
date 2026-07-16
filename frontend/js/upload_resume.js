import { BASE_URL } from "./config.js";

const resumeForm = document.getElementById("resumeForm");
const statusText = document.getElementById("statusText");
const viewResumeBtn = document.getElementById("viewResumeBtn");
const deleteResumeBtn = document.getElementById("deleteResumeBtn");

// Get Profile
async function getProfile() {
  try {
    console.log("getProfile from upload_resume.js");
    const response = await axios.get(`${BASE_URL}/api/profile`, {
      withCredentials: true,
    });

    const user = response.data.user;

    if (user.resume) {
      statusText.innerText = "Resume Uploaded";

      viewResumeBtn.onclick = () => {
        window.open(user.resume, "_blank");
      };
    }
  } catch (error) {
    console.log(error);
    window.location.href = "login.html";
  }
}

getProfile();

// Upload Resume
resumeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = document.getElementById("resume").files[0];

  if (!file) {
    return alert("Select Resume");
  }

  const formData = new FormData();
  formData.append("resume", file);

  try {
    console.log("calling now backend");
    const response = await axios.post(
      `${BASE_URL}/api/resume/upload`,
      formData,
      {
        withCredentials: true,
      },
    );
    console.log(response.data.message);

    getProfile();
    resumeForm.reset();

    alert(response.data.message);
  } catch (error) {
    console.log("errrpr", error);
    console.log(error.response);

    alert(error.response?.data?.message || error.message);
  }
});


// Delete Resume
deleteResumeBtn.addEventListener("click", async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/resume/delete`, {
      withCredentials: true,
    });

    alert(response.data.message);

    statusText.innerText = "No Resume Uploaded";
  } catch (error) {
    alert(error.response.data.message);
  }
});


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
