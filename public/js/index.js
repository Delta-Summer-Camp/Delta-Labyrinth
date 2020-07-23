var player = document.getElementById("player")
var colidables = document.getElementsByClassName("colidable")

function updateplayer(way, newCords) {
    if (way === "top") {
        var prev = player.style.top
        player.style.top = newCords
    } else {
        var prev = player.style.left
        player.style.left = newCords
    }
    var submitcoords = true
    for (let i = 0; i < colidables.length; i++) {
        if (colides(colidables[i])) {
            if (way === "top") {
                player.style.top = prev
            } else {
                player.style.left = prev
            }
            submitcoords = false
        }
    }
    return submitcoords
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
    if ((mybottom > othertop && mytop < otherbottom) && (myright > otherleft && myleft < otherright)) {
        return true
    }
    return false
}

function gamestart() {
    document.getElementById("coords").innerText = player.style.top + ", " + player.style.left
}

function updateloc() {
    document.getElementById("coords").innerText = player.style.top + ", " + player.style.left
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyW') {
        var sendcoords = updateplayer("top", parseInt(player.style.top) - 10 + 'px')
        if (sendcoords) {
            updateloc()
        }
    }
    if (event.code === 'KeyA') {
        //player.style.left = parseInt(player.style.left) - 10 + 'px'
        var sendcoords = updateplayer("left", parseInt(player.style.left) - 10 + 'px')
        if (sendcoords) {
            updateloc()
        }
    }
    if (event.code === 'KeyS') {
        //player.style.top = parseInt(player.style.top) + 10 + 'px'
        var sendcoords = updateplayer("top", parseInt(player.style.top) + 10 + 'px')
        if (sendcoords) {
            updateloc()
        }
    }
    if (event.code === 'KeyD') {
        //player.style.left = parseInt(player.style.left) + 10 + 'px'
        var sendcoords = updateplayer("left", parseInt(player.style.left) + 10 + 'px')
        if (sendcoords) {
            updateloc()
        }
    }
});