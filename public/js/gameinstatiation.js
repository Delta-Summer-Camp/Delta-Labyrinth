var isGameActive
var isHost
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
                    preGameFieldInstatiation(gamecode, childSnapshot.val().gamemap) //
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
                    preGameFieldInstatiation(gamecode, childSnapshot.val().gamemap)
                    //return true
                }
                //alert("Game Not found, double check your code")
            });
        });
    }
    //add the player updating program
}

function createartifacts() {
    var artifacts = []
    artifacts.push({
        "artifacttype": "kuznya",
        "artifactx": Math.ceil(Math.ceil(Math.random() * 450) / 50) * 50,
        "artifacty": Math.ceil(Math.ceil(Math.random() * 450) / 50) * 50
    })
    artifacts.push({
        "artifacttype": "pedestal",
        "artifactx": Math.ceil(Math.ceil(Math.random() * 450) / 50) * 50,
        "artifacty": Math.ceil(Math.ceil(Math.random() * 450) / 50) * 50
    })
    artifacts.push({
        "artifacttype": "cookie",
        "artifactx": Math.ceil(Math.ceil(Math.random() * 450) / 50) * 50,
        "artifacty": Math.ceil(Math.ceil(Math.random() * 450) / 50) * 50
    })
    artifacts.push({
        "artifacttype": "knijka",
        "artifactx": Math.ceil(Math.ceil(Math.random() * 450) / 50) * 50,
        "artifacty": Math.ceil(Math.ceil(Math.random() * 450) / 50) * 50
    })
    artifacts.push({
        "artifacttype": "telik",
        "artifactx": Math.ceil(Math.ceil(Math.random() * 450) / 50) * 50,
        "artifacty": Math.ceil(Math.ceil(Math.random() * 450) / 50) * 50
    })

    return artifacts
}

function creategame() {
    var gamekey = Math.random().toString(36).substring(2, 15)
    var gamelink = database.ref("games/" + gamekey)
    var field = labGen()
    var genartifacts = createartifacts()
    //console.log(field)

    gamelink.set({
        //payload
        owner: globaluser.uid,
        gamemap: field, // pull gamelib here DONE
        artifacts: genartifacts,
        players: null
    })
    isHost = true
    alert("Game generated, the code is : #" + gamekey)
    sessionStorage.setItem("currentgame", gamekey)//dont know if we need this
    //game has been generated at this point
    preGameFieldInstatiation(gamekey, field)
}

function preGameFieldInstatiation(gamecode, map) {
    sessionStorage.setItem("currentgame", gamecode)//dont know if we need this
    //game has been generated at this point
    document.getElementById("welcome").style.display = "none"
    document.getElementById("gamearea").style.display = "block"
    document.getElementById("coords").style.display = "block"
    document.getElementById("playerlist").style.display = "block"
    isGameActive = true

    //other player update
    database.ref("games/" + gamecode + "/players").on('value', (snapshot) => {
        console.log(snapshot.val())
        //clear div
        //otherplayerdiv.innerHTML = ""
        otherplayers = document.getElementsByClassName("others")
        for (let i = 0; i < otherplayers.length; i++) {
            otherplayers[i].parentNode.removeChild(otherplayers[i])
        }
        othertexts = document.getElementsByClassName("otherstext")
        for (let i = 0; i < othertexts.length; i++) {
            othertexts[i].parentNode.removeChild(othertexts[i])
        }
        //console.log(otherplayers[0])
        //add players
        var gamearea = document.getElementById("gamearea")
        var playerlist = document.getElementById("playerlist")
        playerlist.innerHTML = ""
        var renderlisting = true
        snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.key !== globaluser.uid) {
                if (childSnapshot.val().isOnline) {
                    //gamearea.innerHTML += "<div class=\"others\" id='" + childSnapshot.key + "' style=\"background-color: black; top: " + childSnapshot.val().playerx + "px; left: " + childSnapshot.val().playery + "px; width: 50px; height: 50px;\"></div>"
                    //"<p style=\"position: fixed; top: " + childSnapshot.val().playerx + "px; left: " + childSnapshot.val().playery + "px;\">" + childSnapshot.val().playernick + "</p>" +
                    var newPlayer = document.createElement("img");
                    gamearea.append(newPlayer)
                    newPlayer.id = childSnapshot.key
                    newPlayer.className = "others"
                    newPlayer.style.position = "fixed"
                    newPlayer.style.backgroundColor = "transparent"
                    newPlayer.style.top = childSnapshot.val().playerx + 50 + "px"
                    newPlayer.style.left = childSnapshot.val().playery + 50 + "px"
                    newPlayer.style.width = "25px"
                    newPlayer.style.height = "25px"
                    newPlayer.src = "static/png/igrok.png"
                    //var newPlayerText = document.createElement("p");
                    //newPlayerText.innerText = (childSnapshot.val().playerx + 50) + ", " + (childSnapshot.val().playery + 50)

                    //otherplayerdiv.innerHTML += "<p>" + childSnapshot.val().displayname + ": x:" + childSnapshot.val().playerx + ", y:" + childSnapshot.val().playery + "</p>"
                    console.log(childSnapshot.val().playernick + ": x: " + parseInt(childSnapshot.val().playerx) + ", y: " + childSnapshot.val().playery)
                } else {
                    //remove from sidebar
                    renderlisting = false
                    //try catch formula, not very efficiant, just to avoid errors in console
                    try {
                        var listingtext = document.getElementById(childSnapshot.val().playernick)
                        listingtext.parentNode.removeChild(listingtext)
                    } catch {
                        _ = "" // void
                    }
                }
            }
            if (renderlisting) {
                var playerdiv = document.createElement("div")
                playerdiv.id = childSnapshot.val().playernick
                playerlist.append(playerdiv)
                //playerlist.innerHTML += "<p>" + childSnapshot.val().playernick + ": x: " + childSnapshot.val().playerx + ", y: " + childSnapshot.val().playery + "</p>"
                playertext = document.createElement("p");
                playertext.innerText = childSnapshot.val().playernick + ": x: " + (childSnapshot.val().playerx) + ", y: " + (childSnapshot.val().playery) // true location

                playerdiv.append(playertext)

                if (isHost) {
                    if (childSnapshot.val().playernick !== globaluser.displayName) {
                        playerkick = document.createElement("button")
                        playerkick.innerText = "Kick"
                        playerkick.setAttribute('onclick', 'kickplayer(' + childSnapshot.val().playernick + ')')
                        playerdiv.append(playerkick)
                    }
                }
            }
        });
        //add the ondisconnect class TODO
    }, (error) => {
        console.error(error);
    });
    startlocalGame(map)//pass field generator object here TODO
    //if the player disconnects
    database.ref("games/" + gamecode + "/players/" + globaluser.uid + "/isOnline").onDisconnect().set(false);
    database.ref("games/" + gamecode + "/commands").orderByChild('date').on('value', (snapshot) => {
        // TODO Interpret commands
        var commands = []
        var commandcontents = []
        snapshot.forEach(function (element) {
            commands.push(element.val().command)
            commandcontents.push(element.val().content)
        })
        //alert(commands)
        if (commands[commands.length - 1] === "kick") {
            if (commandcontents[commandcontents.length - 1] === globaluser.displayName) {
                alert("You have been kicked from the game by the host")
                window.close() // TODO change to proper kick
            }
        }

        if (commands[commands.length - 1] === "found") {
            //if (commandcontents[commandcontents.length - 1] === globaluser.displayName) {
            var split = commandcontents[commandcontents.length - 1].split(",")
            alert(split[0] + " Found Artifact " + split[1])
            //}
            if (split[0] !== globaluser.displayName) {//if isnt us who deleted it
                var objectDelete = document.getElementById(split[1])
                objectDelete.parentNode.removeChild(objectDelete)
            }
        }
    })

    database.ref("games/" + gamecode + "/artifacts").on('value', (snapshot) => {
        var gamearea = document.getElementById("gamearea")
        snapshot.forEach(function (childSnapshot) {
            var newArtifact = document.createElement("img")
            newArtifact.src = "static/png/" + childSnapshot.val().artifacttype + ".png"
            newArtifact.style.top = childSnapshot.val().artifactx + 50 + "px"
            newArtifact.style.left = childSnapshot.val().artifacty + 50 + "px"
            newArtifact.className = "artifact"
            newArtifact.style.position = "fixed"
            newArtifact.style.width = "25px"
            newArtifact.style.height = "25px"
            newArtifact.id = childSnapshot.val().artifacttype
            gamearea.append(newArtifact)
        })
    })
    //send join message
    sendcommand("join", globaluser.displayName)
}