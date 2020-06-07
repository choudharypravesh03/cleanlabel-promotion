window.onload = function() {

    document.getElementById('get-yearly-membership').addEventListener('click', function(e) {
        console.log("get full membership");
        window.location.href = "/paywithpaytm?amount=999";
    })

    document.getElementById('get-halfyearly-membership').addEventListener('click', function(e) {
        console.log("get half membership");
        window.location.href = "/paywithpaytm?amount=350";
    })
};