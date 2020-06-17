window.onload = function() {
    var responseData = JSON.parse(document.getElementById('response-data').innerHTML);
    var baseUrl = JSON.parse(document.getElementById('base-url').innerHTML);
    var userData = JSON.parse(localStorage.getItem('userData'));
    var userName = userData.name;
    var userEmail = userData.email;
    var userPhone = userData.phone;
    var dataObj = {
      email: userEmail,
      name: userName,
      createdAt: responseData.TXNDATE,
      orderId: responseData.ORDERID,
      transactionAmount: responseData.TXNAMOUNT,
      status: responseData.STATUS,
      referral: userData.referrerCode || null,
      baseUrl: baseUrl
    }
    if(responseData.STATUS === "TXN_SUCCESS") {
        saveSubscriber(dataObj);
    }

    document.querySelector('.phone').innerHTML = userPhone;
    document.querySelector('.email').innerHTML = userEmail;

    // document.getElementById('pay-again').addEventListener('click', function() {
    //   window.location.href = "/paywithpaytm?amount="+responseData.TXNAMOUNT;
    // });
}


function saveSubscriber(obj) {
    var subscribersObj = {
        email: obj.email,
        name: obj.name,
        hosting_url: obj.baseUrl,
        double_optin: false,
        api_token: '9dd07fa2dc19443a73526ad6caa6a65f0e630797',
        referral: obj.referral
    }
   
    axios.post('https://app.referralhero.com/api/v2/lists/MF51efecef56/subscribers', subscribersObj)
      .then(response => {
        const subResponse = response.data.data;
        if(response.status === 200) {
          var userObj = {
            email: obj.email,
            referral: subResponse.code,
            created_at: obj.createdAt,
            order_id: obj.orderId,
            amount: obj.transactionAmount,
            transactionStatus: obj.status,
            membership: obj.transactionAmount ? 'yearly' : 'halfyearly',
            referred_by: subResponse.referred_by.email ? subResponse.referred_by.email : ""
          }
          saveUserData(userObj);
        } else {
          console.log(response.status);
        }
      })
      .catch(error => {
        console.log("FALIURE RESPONSE", JSON.stringify(error));
      })
}

function saveUserData(obj) {
  axios.post('/customer/save', obj)
    .then(response => {
      console.log("User Data saved");
    })
    .catch(error => {
      console.log("Failed to store data", JSON.stringify(error));
    })
}