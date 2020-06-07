window.onload = function() {
    var userData = JSON.parse(sessionStorage.getItem('userData'));
    getLoggedInUserData(userData.email);
}

function openCity(cityName) {
    var i;
    var x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    document.getElementById(cityName).style.display = "block";  
}


function getLoggedInUserData(query) {
    axios.get('/customer/get',{
        params: query
    })
      .then(response => {
        console.log("SUCCESS RESPONSE", JSON.stringify(response));
        return response.data.data;
      })
      .catch(error => {
        console.log("FALIURE RESPONSE", JSON.stringify(error));
        return error;
      })
}