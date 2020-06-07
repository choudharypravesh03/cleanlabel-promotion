window.onload = function() {
    console.log(firebase);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("User present");
      } else {
        console.log("User not present");
      }
    });

    document.getElementById('get-yearly-membership').addEventListener('click', function(e) {
      console.log("get full membership");
      window.location.href = "/paywithpaytm?amount=999";
    })

    document.getElementById('get-halfyearly-membership').addEventListener('click', function(e) {
        console.log("get half membership");
        window.location.href = "/paywithpaytm?amount=350";
    })
};