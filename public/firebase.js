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
        document.getElementById("modal_block").style = "display: none";
        database = firebase.database()
        globaluser = user
    } else {
        document.getElementById("modal_block").style = "display: block"
    }
});