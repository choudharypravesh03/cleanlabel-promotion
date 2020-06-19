$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            var email = user.email;
            var phoneNumber = user.phoneNumber && user.phoneNumber.substr(3, 10);
            getUserData({phone: phoneNumber, email: email}, (response) => {
                var user = response.data;
                $('.username').html(user.name);
                if(response.data && response.data.membership !== 'none') {
                    var membershipType;
                    var membershipTerm;
                    if(user.membership === 'yearly') {
                        membershipType = 'Annual';
                        membershipTerm = '12';
                    } else {
                        membershipType = 'Half Yearly';
                        membershipTerm = '6';
                    }
                    $('.order_id').html(user.order_id);
                    $('.membership_type').html(membershipType);
                    $('.membership_term').html(membershipTerm);
                }
              })
        } else {
            console.log("no user");
            window.location.href="/";
        }
    });

    $('.logout').on('click', () => {
        onSignOutClick();
    })
})

function getUserData(obj, callback) {
    var url = `/customer/get?phone=${obj.phone}&email=${obj.email}`;
    axios.get(url)
      .then(response => {
        callback(response);
      })
      .catch(error => {
        console.log("Cannot get customer: ", JSON.stringify(error));
        callback(error);
      })
  }

  function onSignOutClick() {
    sessionStorage.removeItem('userData');
    localStorage.clear();
    firebase.auth().signOut();
    window.location.href = "/";
  }