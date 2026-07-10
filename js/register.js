// const form = document.querySelector("form");

// form.addEventListener("submit", function (e) {

//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;

//     if (password !== confirmPassword) {
//         e.preventDefault();
//         alert("Passwords do not match!");
//     }

// });
import { BASE_URL } from "./config.js";
const registerForm = document.getElementById("registerForm");
console.log("hello");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("EmailAddress").value.trim();
  const phone = document.getElementById("PhoneNumber").value.trim();
  const college = document.getElementById("CollegeName").value.trim();
  const course = document.getElementById("Course").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Password Match Validation
  if (password !== confirmPassword) {
    return alert("Passwords do not match");
  }

  try {
    console.log("registerForm ");
    const response = await axios.post(
      `${BASE_URL}/api/auth/signup`,
      {
        name,
        email,
        phone,
        college,
        course,
        password,
      },
      {
        withCredentials: true,
      },
    );

    alert(response.data.message);

    window.location.href = "login.html";
  } catch (error) {
    // alert(
    //     error.response?.data?.message || "Something went wrong"
    // );
    // catch (error) {
    console.log(error);
    console.log(error.response);
    console.log(error.response?.data);

    alert(error.response?.data?.message || error.message);
    // }
  }
});
