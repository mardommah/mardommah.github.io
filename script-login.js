let loginBtn = document.getElementById("btnLogin")

loginBtn.addEventListener("click", function(e){
    e.preventDefault()
    
    // check the value inside
    let checkPassword = document.getElementById("exampleInputPassword1")
    let passwordCheck = document.getElementById("feedback-result")

    if (checkPassword.value.length < 6){
        checkPassword.classList.toggle("is-invalid")
        passwordCheck.innerHTML = "Password kurang dari 6 karakter"
    } else {
        checkPassword.classList.remove("is-invalid")
    }
})