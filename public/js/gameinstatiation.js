var isGameActive

function joingame() {
    if (sessionStorage.getItem("currentgame")) {
        var gamecode = sessionStorage.getItem("currentgame")
        var gamedirectory = database.ref("games")
        gamedirectory.once('value').then(function (snapshot) {
            //read games one
            snapshot.forEach(function (childSnapshot) {
                if (gamecode === childSnapshot.key) {
                    alert("game has been found")
                    var gamelink = database.ref("games/" + gamecode)//duno if we need this
                    preGameFieldInstatiation(gamecode)
                    //return true
                }
                //alert("Game Not found, double check your code")
            });
        });
    } else {

        var gamecode = prompt("Please enter a game code: ")
        var gamedirectory = database.ref("games")
        gamedirectory.once('value').then(function (snapshot) {
            //read games one
            snapshot.forEach(function (childSnapshot) {
                if (gamecode === childSnapshot.key) {
                    alert("game has been found")
                    var gamelink = database.ref("games/" + gamecode)
                    sessionStorage.setItem("currentgame", gamecode)//dont know if we need this
                    preGameFieldInstatiation(gamecode)
                    //return true
                }
                //alert("Game Not found, double check your code")
            });
        });
    }
    //add the player updating program
}

function creategame() {
    var gamekey = Math.random().toString(36).substring(2, 15)
    var gamelink = database.ref("games/" + gamekey)
    gamelink.set({
        //payload
        owner: globaluser.uid,
        gamemap: null, // pull gamelib here
        players: null
    })
    alert("Game generated, the code is : #" + gamekey)
    sessionStorage.setItem("currentgame", gamekey)//dont know if we need this
    //game has been generated at this point
    preGameFieldInstatiation(gamekey)
}

function preGameFieldInstatiation(gamecode) {
    sessionStorage.setItem("currentgame", gamecode)//dont know if we need this
    //game has been generated at this point
    document.getElementById("welcome").style.display = "none"
    document.getElementById("gamearea").style.display = "block"
    document.getElementById("coords").style.display = "block"
    document.getElementById("playerlist").style.display = "block"
    isGameActive = true

    database.ref("games/" + gamecode + "/players").on('value', (snapshot) => {
        console.log(snapshot.val())
        //clear div
        //otherplayerdiv.innerHTML = ""
        otherplayers = document.getElementsByClassName("others")
        for (let i = 0; i < otherplayers.length; i++) {
            otherplayers[i].parentNode.removeChild(otherplayers[i])
        }
        //console.log(otherplayers[0])
        //add players
        var gamearea = document.getElementById("gamearea")//will not fix TODO ERROR
        var playerlist = document.getElementById("playerlist")
        playerlist.innerHTML = ""
        snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.key !== globaluser.uid) {
                gamearea.innerHTML += "<div class=\"others\" id='" + childSnapshot.key + "' style=\"background-color: black; top: " + childSnapshot.val().playerx + "px; left: " + childSnapshot.val().playery + "px; width: 50px; height: 50px;\"></div>"
                //"<p style=\"position: relative; top: " + childSnapshot.val().playerx + "px; left: " + childSnapshot.val().playery + "px;\">" + childSnapshot.val().playernick + "</p>" +

                //otherplayerdiv.innerHTML += "<p>" + childSnapshot.val().displayname + ": x:" + childSnapshot.val().playerx + ", y:" + childSnapshot.val().playery + "</p>"
                console.log(childSnapshot.val().playernick + ": x: " + parseInt(childSnapshot.val().playerx) + ", y: " + childSnapshot.val().playery)
            }
            playerlist.innerHTML += "<p>" + childSnapshot.val().playernick + ": x: " + childSnapshot.val().playerx + ", y: " + childSnapshot.val().playery + "</p>"
        });
        //add the ondisconnect class TODO
    }, (error) => {
        console.error(error);
    });
}