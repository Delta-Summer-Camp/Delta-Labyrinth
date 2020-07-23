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

firebase.auth().onAuthStateChanged((user) => { // Authorisation
    //globaluser = user
    if (user) {
        console.log("User Logged In")
    } else {
        document.getElementById("modal_block").style = "display: block"
    }
});

