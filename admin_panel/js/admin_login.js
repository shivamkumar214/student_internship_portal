import { BASE_URL } from "../../frontend/js/config.js";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("admin login");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("emmai: ", email, " And ", "password: ", password);
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
    }, 5000);
  } catch (error) {
    message.style.color = "red";
    message.innerText = error.response;
  }
});
