//firebase.initializeApp(firebaseConfig);
//firebase.analytics();

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