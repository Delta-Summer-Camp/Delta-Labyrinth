var player = document.getElementById("player")
var colidables = document.getElementsByClassName("colidable")


function updateplayer(way, newCords) {
    var prev
    if (way === "top") {
        prev = player.style.top
        player.style.top = newCords
    } else {
        prev = player.style.left
        player.style.left = newCords
    }

    for (let i = 0; i < colidables.length; i++) {
        if (colides(colidables[i])) {
            if (way === "top") {
                player.style.top = prev
            } else {
                player.style.left = prev
            }
            return false
        }
    }
    return true
}

function colides(otherobject) {
    // Static Object
    const othertop = parseInt(otherobject.style.top) + 50//top of the object (y)
    const otherbottom = parseInt(otherobject.style.top) + parseInt(otherobject.style.height) + 50//bottom of the object(y)
    const otherleft = parseInt(otherobject.style.left)//left of the object (x)
    const otherright = parseInt(otherobject.style.left) + parseInt(otherobject.style.width)//right of the object (x)

    // Player
    const mytop = parseInt(player.style.top) //top of the player (y)
    const mybottom = parseInt(player.style.top) + parseInt(player.style.height) //bottom of the player(y)
    const myleft = parseInt(player.style.left) //left of the player (x)
    const myright = parseInt(player.style.left) + parseInt(player.style.width) //right of the player (x)
    return mybottom > othertop && mytop < otherbottom && myright > otherleft && myleft < otherright;

}

/*function gamestart() {
    document.getElementById("coords").innerText = player.style.top + ", " + player.style.left
    databasereference.set({
        playerx: parseInt(player.style.top),
        playery: parseInt(player.style.left),
        playernick: globaluser.displayName
    });
}*/

function updateloc() { // also serves as the page load
    document.getElementById("coords").innerText = player.style.top + ", " + player.style.left
    // TODO send to firebase here
    console.log(globaluser.displayName + ": x: " + player.style.top + ", y: " + player.style.left)
    database.ref("players/" + globaluser.uid).set({
        playerx: parseInt(player.style.top),
        playery: parseInt(player.style.left),
        playernick: globaluser.displayName
    });
}

document.addEventListener('keydown', function (event) {
    var sendcoords
    if (event.code === 'KeyW') {
        sendcoords = updateplayer("top", parseInt(player.style.top) - 10 + 'px')
        if (sendcoords) {
            updateloc()
        }
    }
    if (event.code === 'KeyA') {
        //player.style.left = parseInt(player.style.left) - 10 + 'px'
        sendcoords = updateplayer("left", parseInt(player.style.left) - 10 + 'px')
        if (sendcoords) {
            updateloc()
        }
    }
    if (event.code === 'KeyS') {
        //player.style.top = parseInt(player.style.top) + 10 + 'px'
        sendcoords = updateplayer("top", parseInt(player.style.top) + 10 + 'px')
        if (sendcoords) {
            updateloc()
        }
    }
    if (event.code === 'KeyD') {
        //player.style.left = parseInt(player.style.left) + 10 + 'px'
        sendcoords = updateplayer("left", parseInt(player.style.left) + 10 + 'px')
        if (sendcoords) {
            updateloc()
        }
    }
});

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
}