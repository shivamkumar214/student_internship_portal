// import { BASE_URL } from "../../frontend/js/config.js";
const BASE_URL = "https://student-internship-portal-lvvf.onrender.com";
// const BASE_URL = "http://127.0.0.1:5000";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("admin login");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // console.log("emmai: ", email, " And ", "password: ", password);
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    message.style.color = "green";
    message.innerText = response.data.message;

    setTimeout(() => {
      window.location.href = "admin_dashboard.html";
    }, 1000);
  } catch (error) {
    message.style.color = "red";
    message.innerText = error.response;
  }
});
