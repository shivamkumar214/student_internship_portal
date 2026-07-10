
import { BASE_URL } from "./config.js";
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

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

    // alert(response.data.message);
    // console.log("aaaaaaaaaaaaaaaaaa");

    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
  }
});
