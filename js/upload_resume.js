document.getElementById("resumeForm").addEventListener("submit",function(e){

    e.preventDefault();

    let file=document.getElementById("resume").files[0];

    if(!file){

        alert("Please select a resume.");

        return;

    }

    document.getElementById("statusText").textContent="Resume Ready to Upload";

    alert("Resume selected successfully!");

});