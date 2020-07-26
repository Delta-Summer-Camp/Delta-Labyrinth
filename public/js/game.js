var player = document.getElementById("player")
var colidables = document.getElementsByClassName("colidable")


function updateplayer(way, newCords) {
    var prev
    var player = document.getElementById("player")
    //console.log("moving player on screen")
    if (way === "top") {
        prev = player.style.top
        player.style.top = newCords
        //console.log(newCords)
    } else {
        prev = player.style.left
        player.style.left = newCords
    }

    for (let i = 0; i < colidables.length; i++) {
        if (colides(colidables[i])) {
            console.log("colids")
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
    var player = document.getElementById("player")
    // Static Object
    const othertop = parseInt(otherobject.style.top)// + 50//top of the object (y)
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
    var player = document.getElementById("player")
    document.getElementById("coords").innerText = (parseInt(player.style.top)) + ", " + (parseInt(player.style.left)) // true location
    // TODO send to firebase here
    console.log(globaluser.displayName + ": x: " + player.style.top + ", y: " + player.style.left)
    database.ref("games/" + sessionStorage.getItem("currentgame") + "/players/" + globaluser.uid).set({
        isOnline: true,
        playerx: parseInt(player.style.top),
        playery: parseInt(player.style.left),
        playernick: globaluser.displayName
    });
}

//add 50 to all
document.addEventListener('keydown', function (event) {
    if (isGameActive) {
        var player = document.getElementById("player")
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
    }
});