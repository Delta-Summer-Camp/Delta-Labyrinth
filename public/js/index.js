// switching login -> register and back

function switchtoreg() {
    document.getElementById("displayname").style = "display: block"
    document.getElementById("displaynametext").style = "display: block"
    document.getElementById("actionsubmit").setAttribute('onclick', 'register()')
    document.getElementById("tootheraction").innerText = "Login"
    document.getElementById("tootheraction").setAttribute('onclick', 'switchtologin()')
}

function switchtologin() {
    document.getElementById("displayname").style = "display: none"
    document.getElementById("displaynametext").style = "display: none"
    document.getElementById("actionsubmit").setAttribute('onclick', 'login()')
    document.getElementById("tootheraction").innerText = "Register"
    document.getElementById("tootheraction").setAttribute('onclick', 'switchtoreg()')
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

function deleterefs() {
    sessionStorage.clear()
}