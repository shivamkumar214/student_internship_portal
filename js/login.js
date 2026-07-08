function validateForm(){

    let studentID = document.getElementById("studentid").value.trim();

    let password = document.getElementById("password").value.trim();

    if(studentID === ""){

        alert("Please enter Student ID.");

        return false;

    }

    if(password === ""){

        alert("Please enter Password.");

        return false;

    }

    return true;

}