const firebaseConfig = {
    apiKey: "AIzaSyAifhjZzTUtrajnxmEaD6X1kFRGs0knN0c",
    authDomain: "delta-labyrinth.firebaseapp.com",
    databaseURL: "https://delta-labyrinth.firebaseio.com",
    projectId: "delta-labyrinth",
    storageBucket: "delta-labyrinth.appspot.com",
    messagingSenderId: "227161939149",
    appId: "1:227161939149:web:09e2b297e38d5459141d84",
    measurementId: "G-JB12X83Y50"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var globaluser
var database

firebase.auth().onAuthStateChanged((user) => { // Authorisation
    if (user) {
        console.log("User Logged In")
        database = firebase.database()
        globaluser = user

        database.ref("players").on('value', (snapshot) => {
            var otherplayerdiv = document.getElementById("otherplayers")
            console.log(snapshot.val())
            //clear div
            otherplayerdiv.innerHTML = ""
            //add players
            snapshot.forEach(function (childSnapshot) {
                if (childSnapshot.key !== user.uid) {
                    otherplayerdiv.innerHTML += "<div class=\"otherplayer\" id='" + childSnapshot.val().playernick + "' style=\"position: relative; background-color: black; top: " + childSnapshot.val().playerx + "px; left: " + childSnapshot.val().playery + "px; width: 50px; height: 50px; padding: 0px;\">"
                    //"<p style=\"position: relative; top: " + childSnapshot.val().playerx + "px; left: " + childSnapshot.val().playery + "px;\">" + childSnapshot.val().playernick + "</p>" +


                    //otherplayerdiv.innerHTML += "<p>" + childSnapshot.val().displayname + ": x:" + childSnapshot.val().playerx + ", y:" + childSnapshot.val().playery + "</p>"
                    console.log(childSnapshot.val().playernick + ": x: " + parseInt(childSnapshot.val().playerx) + ", y: " + childSnapshot.val().playery)
                }
            });
            //add the ondisconnect class TODO
        }, (error) => {
            console.error(error);
        });
    } else {
        document.getElementById("modal_block").style = "display: block"
    }
});