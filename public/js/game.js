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
    const othertop = parseInt(otherobject.style.top) //+50//top of the object (y)
    const otherbottom = parseInt(otherobject.style.top) + parseInt(otherobject.style.height)//+50//bottom of the object(y)
    const otherleft = parseInt(otherobject.style.left)//+50//left of the object (x)
    const otherright = parseInt(otherobject.style.left) + parseInt(otherobject.style.width)//+50//right of the object (x)

    // Player
    const mytop = parseInt(player.style.top) + 50 //top of the player (y)
    const mybottom = parseInt(player.style.top) + parseInt(player.style.height) + 50 //bottom of the player(y)
    const myleft = parseInt(player.style.left) + 50 //left of the player (x)
    const myright = parseInt(player.style.left) + parseInt(player.style.width) + 50 //right of the player (x)
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

function startlocalGame() {
    var field = []
    for (let i = 0; i < 10; i++) {//for each row
        field.push([])
        for (let j = 0; j < 20; j++) {//for each block
            field[i].push({"contains": Math.random() > 0.5, "rwall": Math.random() > 0.5, "bwall": Math.random() > 0.5})
        }
    }
    console.log(field)
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
    drawmap(field)
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

function drawmap(maparray) {
    var currentwritex = 1
    var currentwritey = 1
    const blocksize = 50
    maparray.forEach((item, index) => {
        item.forEach((item, index) => {
            var gamearea = document.getElementById("gamearea")
            if (item["contains"]) {
                if (item["rwall"]) {
                    //right wall
                    //each block is 50
                    var newCollidable = document.createElement("div");
                    gamearea.append(newCollidable)
                    // example   <!--<div class="colidable" id="colidableobject"
                    //        style="position: fixed; background-color: black; top: 250px; left: 200px; width: 100px; height: 50px;">-->
                    newCollidable.className = "colidable"
                    newCollidable.style.position = "fixed"
                    newCollidable.style.backgroundColor = "black"
                    newCollidable.style.top = currentwritey * blocksize + "px"
                    newCollidable.style.left = ((currentwritex * blocksize) + blocksize / 2) + "px"
                    newCollidable.style.width = (blocksize / 2) + "px"
                    newCollidable.style.height = blocksize + "px"
                    currentwritex += 1
                } else if (item["bwall"]) {
                    //bottom wall
                    //each block is 50
                    var newCollidable = document.createElement("div");
                    gamearea.append(newCollidable)
                    // example   <!--<div class="colidable" id="colidableobject"
                    //        style="position: fixed; background-color: black; top: 250px; left: 200px; width: 100px; height: 50px;">-->
                    newCollidable.className = "colidable"
                    newCollidable.style.position = "fixed"
                    newCollidable.style.backgroundColor = "black"
                    newCollidable.style.top = ((currentwritey * blocksize) + blocksize / 2) + "px"
                    newCollidable.style.left = currentwritex * blocksize + "px"
                    newCollidable.style.width = blocksize + "px"
                    newCollidable.style.height = (blocksize / 2) + "px"
                    currentwritex += 1
                }
            }
        })
        currentwritex = 1
        currentwritey += 1 // * 50 (when used with block size
    })
}