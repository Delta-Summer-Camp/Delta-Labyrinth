// switching login -> register and back

function switchtoreg() {
    document.getElementById("displayname").style = "display: block"
    document.getElementById("displaynametext").style = "display: block"

   // alert("str")
    document.getElementById("submit-button").setAttribute('onclick', 'register()')

    //change the color of the button
   // document.getElementById("switchToReq_Btn").style = "background: #1da1f2"
   // document.getElementById("switchToLogIn_Btn").style = "background: #1a1a1a

    document.getElementById("switchToLogIn_Btn").removeAttribute('class','active')
    document.getElementById("switchToReq_Btn").setAttribute('class','active')

   // alert(document.getElementById("switchToLogIn_Btn").getAttribute('class'))
}

function switchtologin() {
    document.getElementById("displayname").style = "display: none"
    document.getElementById("displaynametext").style = "display: none"
    //document.getElementById("actionsubmit").setAttribute('onclick', 'login()')
   // document.getElementById("tootheraction").innerText = "Register"
   // document.getElementById("tootheraction").setAttribute('onclick', 'switchtoreg()')
   // alert("stl")
    document.getElementById("submit-button").setAttribute('onclick', 'login()')
  //  document.getElementById("switchToReq_Btn").style.background = "#1a1a1a"
  //  document.getElementById("switchToLogIn_Btn").style.background = "#1da1f2"

    document.getElementById("switchToLogIn_Btn").setAttribute('class','active')
    document.getElementById("switchToReq_Btn").removeAttribute('class','active')
   // document.getElementById("submit-button").set
    //onclick="register()

}

function login() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    //alert(email + " " + password)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            var errorMessage = error.message;
            alert("Message: " + errorMessage);
            document.getElementById("password").value = ""
        });
    //alert("Logged in")
}

function register() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const displayname = document.getElementById("displayname").value

    //alert("email: " + email + ", password: " + password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            //var errorCode = error.code;
            var errorMessage = error.message;
            alert("Message: " + errorMessage)
        })
        .then(function (result) {
            return result.user.updateProfile({
                displayName: displayname
            })
        })
    //alert("Created")
}

function deleterefs()
{
    sessionStorage.clear()
}

/*
function changeStyle()
{
    document.getElementById("signUpLi").style.background = "#1da1f2"
    document.getElementById("signUpLi").style.color = "#ffffff"
}*/