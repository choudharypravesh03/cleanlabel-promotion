document.getElementById('logout').addEventListener('click', function() {
    console.log("logout click");
    firebase.auth().signOut();
    setTimeout(function() {
        window.location.href = "/login";
    }, 2000)
})