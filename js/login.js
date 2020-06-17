
var firebaseApp;

(function () {

  var selectedCity = "";
  var selectedPackage = "";
  var isLoginFlow = true;
  var userEmail = "";
  var phoneNumber = "";
  
  // Check for referral cookie
  getReferralFromUrl();
  var referralCode = getCookie('referralCode');

  function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        // var displayName = user.displayName;
        var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
        var phoneNumber = user.phoneNumber && user.phoneNumber.substr(3, 10);

        $('.login-button-container').hide();
        $('.account-button-container').show();
        $('#myAccounts').show();
        getUserData({phone: phoneNumber, email: email}, (response) => {
          var user = response.data;
          $('#username').html(user.name);
          if(response.data && response.data.membership !== 'none') {
            $('.prod-Membership').hide();
            $('.getmembership-button-container').hide();
          }
        })
      } else {
        $('.login-button-container').show();
        $('.account-button-container').hide();
        $('#myAccounts').hide();

      }
      updateSignInButtonUI();
      updateSignInFormUI();
      updateSignOutButtonUI();
      updateSignedInUserStatusUI();
      updateVerificationCodeFormUI();
    });

    //Attach event listeners to all buttons
    attachEventListeners();

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
      }
    });

    recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId;
      updateSignInButtonUI();
    });
  

  }

  window.onload = function () {
    initApp();
  };




  $('.joinMemberShip').on('click', (e) => {
    console.log(e);
    isLoginFlow = false;
    let locationType = e.target.classList[1]
    if(locationType === 'blr') {
      selectedCity = 'bangalore';
      selectedPackage = $('#bangalore-section .selected > p').attr('value');
    } else {
      selectedCity = 'others';
      selectedPackage = $('#others-section .selected > p').attr('value');
    }
    var user = firebase.auth().currentUser;
    if(user) {
      $('#join-members').click();
    } else {
      secureLogin();
      $('#elegantModalForm').addClass('show').css('display', 'block');
      // $('#login-button').click();
    }
  })

  $('#login-button').on('click', (e) => {
    isLoginFlow = true;
  });

  $('.close').on('click', () => {
    $('.modal').removeClass('show').css('display', 'none');
  })

  $('.logout').on('click', () => {
    onSignOutClick();
  })




function attachEventListeners() {
  document.getElementById('quickstart-sign-in-google').addEventListener('click', toggleGoogleSignIn, false);
  document.getElementById('quickstart-sign-in-facebook').addEventListener('click', toggleFacebookSignIn, false);
  document.getElementById('sign-out-button').addEventListener('click', onSignOutClick);
  document.getElementById('phoneNumber').addEventListener('keyup', updateSignInButtonUI);
  document.getElementById('phoneNumber').addEventListener('change', updateSignInButtonUI);
  document.getElementById('codeBox6').addEventListener('keyup', updateVerifyCodeButtonUI);
  document.getElementById('codeBox6').addEventListener('change', updateVerifyCodeButtonUI);
  document.getElementById('verification-code-form').addEventListener('submit', onVerifyCodeSubmit);
  document.getElementById('cancel-verify-code-button').addEventListener('click', cancelVerification);
  document.getElementById('continue-successful').addEventListener('click', getNameAndEmailThenSaveAndRedirect);
  document.getElementById('apply-referral').addEventListener('click', checkRetrieveSaveReferral);
  document.getElementById('pay-now').addEventListener('click', payNowForLoggedInUser);
}

  function toggleGoogleSignIn() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      // firebase.auth().signInWithRedirect(provider);
      firebase.auth().signInWithPopup(provider).then(function (result) {
        oAuthSuccess(result);
      });
    } else {
      firebase.auth().signOut();
    }
  }

  function toggleFacebookSignIn() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('user_likes');
      // firebase.auth().signInWithRedirect(provider);
      firebase.auth().signInWithPopup(provider).then(function (result) {
        oAuthSuccess(result);
      })
      .catch(err => {
        alert(err+" Please check your network connection and try login/signup again");
        location.reload();
      })
    } else {
      firebase.auth().signOut();
    }
    document.getElementById('quickstart-sign-in-facebook').disabled = true;
  }

  function oAuthSuccess(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    localStorage.setItem("signinType", "oauth");

   

    var userObj = {
      name: result.user.displayName,
      email: result.user.email,
      referrerCode: referralCode || null
    };
    userEmail = userObj.email;
    localStorage.setItem('userData', JSON.stringify(userObj));
    saveUserData(userObj, (response) => {
      console.log(response);
      if(response.status === 200) {
        if(response.data.isUpdated && response.data.membership === 'none') {
          // User in database. Send directly to payment page.
          window.location.href = (isLoginFlow ? "/" : "/paywithpaytm?amount="+selectedPackage);
        } else if(response.data.isUpdated && response.data.membership !== 'none') {
          window.location.href = "/referrals";
        } else {
          // User not there. Enter phone number
          // trick to use phone verification code after social login
          firebase.auth().signOut();
          document.querySelector('.oauth-container').style.display = 'none';
          document.querySelector('.referral-container').style.display = 'none';
        }
      } else {
        alert("There was an error saving your data. Please try again! Error: "+error);
      }
    });
  }

  function onSignOutClick() {
    sessionStorage.removeItem('userData');
    localStorage.clear();
    firebase.auth().signOut();
  }

  function payNowForLoggedInUser() {
    console.log(selectedCity,
    selectedPackage,
    isLoginFlow,
    userEmail,
    phoneNumber);
    var localData = JSON.parse(localStorage.getItem('userData'));

    var userObj = {
      email: localData.email,
      city: selectedCity,
    }
    saveUserData(userObj, (res) => {
      if(res.status === 200) {
        window.location.href = "/paywithpaytm?amount="+selectedPackage;
      } else {
        alert("There was an error saving your data. Please try again! Error: "+error);
      }
    })
  }


  /* --------------------------------------------------------------------------------------------------------------
  -------------------------------------------PHONE NUMBER FLOW START---------------------------------------------------- 
  -----------------------------------------------------------------------------------------------------------------*/

  function onSignInSubmit() {
    if (isPhoneNumberValid()) {
      window.signingIn = true;
      updateSignInButtonUI();
      phoneNumber = getPhoneNumberFromUserInput();
      var phoneWithCode = '+91' + phoneNumber;
      var appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneWithCode, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          window.signingIn = false;
          updateSignInButtonUI();
          updateVerificationCodeFormUI();
          updateVerifyCodeButtonUI();
          updateSignInFormUI();
        }).catch(function (error) {
          // Error; SMS not sent
          console.error('Error during signInWithPhoneNumber', error);
          window.alert('Error during signInWithPhoneNumber:\n\n'
            + error.code + '\n\n' + error.message);
          window.signingIn = false;
          updateSignInFormUI();
          updateSignInButtonUI();
        });
    }
  }

  /**
   * Function called when clicking the "Verify Code" button.
   */
  function onVerifyCodeSubmit(e) {
    e.preventDefault();
    if (!!getCodeFromUserInput()) {
      window.verifyingCode = true;
      updateVerifyCodeButtonUI();
      var code = getCodeFromUserInput();
      confirmationResult.confirm(code).then(function (result) {
        // User signed in successfully.
        var user = result.user;
        window.verifyingCode = false;
        window.confirmationResult = null;
        updateVerificationCodeFormUI();
        var isoAuthFlow = (localStorage.getItem('signinType') === 'oauth');
        if(isoAuthFlow) {
          saveUserData({phone: phoneNumber, email: userEmail}, (response) => {
            verifyWithPhoneIfUserExist();
          })
        }
        verifyWithPhoneIfUserExist();
      }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        console.error('Error while checking the verification code', error);
        window.alert('Error while checking the verification code:\n\n'
          + error.code + '\n\n' + error.message);
        window.verifyingCode = false;
        updateSignInButtonUI();
        updateVerifyCodeButtonUI();
      });
    }
  }
  
  function cancelVerification(e) {
    e.preventDefault();
    window.confirmationResult = null;
    updateVerificationCodeFormUI();
    updateSignInFormUI();
  }

  function getCodeFromUserInput() {
    var code = "";
    for(let i=1; i<7; i++) {
      code+=document.getElementById('codeBox' + i).value;
    }
    console.log(code);
    return code;
  }

  function getPhoneNumberFromUserInput() {
    return document.getElementById('phoneNumber').value;
  }

  function isPhoneNumberValid() {
    var pattern = /^[789]\d{9}$/;
    var phoneNumber = getPhoneNumberFromUserInput();
    return phoneNumber.search(pattern) !== -1;
  }

  function resetReCaptcha() {
    if (typeof grecaptcha !== 'undefined'
      && typeof window.recaptchaWidgetId !== 'undefined') {
      grecaptcha.reset(window.recaptchaWidgetId);
    }
  }

  function updateSignInButtonUI() {
    document.getElementById('sign-in-button').disabled =
      !isPhoneNumberValid()
      || !!window.signingIn;
  }

  function updateVerifyCodeButtonUI() {
    document.getElementById('verify-code-button').disabled =
      !!window.verifyingCode
      || !getCodeFromUserInput();
  }

  function updateSignInFormUI() {
    if (firebase.auth().currentUser || window.confirmationResult) {
      document.getElementById('sign-in-form').style.display = 'none';
    } else {
      resetReCaptcha();
      document.getElementById('sign-in-form').style.display = 'block';
    }
  }

  function updateVerificationCodeFormUI() {
    if (!firebase.auth().currentUser && window.confirmationResult) {
      // document.getElementById('verification-code-form').style.display = 'block';
      $('.phone-number-title').html(getPhoneNumberFromUserInput());
      $('#otpConfirm').show();
      $('#loginRegister').hide();
    } else {
      // document.getElementById('verification-code-form').style.display = 'none';
      $('#otpConfirm').hide();
      // $('#loginRegister').show();
    }
  }

  function updateSignOutButtonUI() {
    if (firebase.auth().currentUser) {
      document.getElementById('sign-out-button').style.display = 'block';
      document.getElementById('login').style.display = 'none';
    } else {
      document.getElementById('sign-out-button').style.display = 'none';
      document.getElementById('login').style.display = 'block';
    }
  }

  function updateSignedInUserStatusUI() {
    var user = firebase.auth().currentUser;
    if (user) {

    } else {

    }
  }

   /* --------------------------------------------------------------------------------------------------------------
  -------------------------------------------PHONE NUMBER FLOW END---------------------------------------------------- 
  -----------------------------------------------------------------------------------------------------------------*/

  function saveUserData(obj, callback) {
    axios.post('/customer/save', obj)
      .then(response => {
        callback(response);
      })
      .catch(error => {
        console.log("FALIURE RESPONSE", JSON.stringify(error));
        callback(error);
      })
  }

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


  function getNameAndEmailThenSaveAndRedirect() {
    var user = firebase.auth().currentUser;
    console.log(user);
    var phoneNumber = getPhoneNumberFromUserInput();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    if (name && email) {
      var userObj = {
        phone: phoneNumber,
        name: name,
        email: email,
        city: selectedCity,
        referrerCode: referralCode || null
      };
      saveUserData(userObj, (response) => {
        localStorage.setItem('userData', JSON.stringify(userObj));
        window.location.href = (isLoginFlow ? "/" : "/paywithpaytm?amount="+selectedPackage);
      });
    } else {
      alert('Please enter your name and email to proceed');
    }
  }

  function verifyWithPhoneIfUserExist() {
    var phoneNumber = getPhoneNumberFromUserInput();
    var email = userEmail || '';
    var obj = {
      phone: phoneNumber,
      email: email
    };
    getUserData(obj, (response) => {
        console.log(response);
        var isoAuthFlow = (localStorage.getItem('signinType') === 'oauth');
        if (response.data === "" && !isoAuthFlow) {
          // Login by phone
          // document.getElementById('email-name-container').style.display = 'block';
          // $('#otpConfirm').hide();
          $('#otpverified').show();
        } else if(response.data && response.data.membership !== 'none') {
          window.location.href = '/referrals';
        } else {
          // Non registered social login
          // sessionStorage.setItem('userData', JSON.stringify(userData));
          localStorage.removeItem('signinType');
          localStorage.setItem("userData", JSON.stringify(response.data));
          window.location.href = (isLoginFlow ? "/" : "/paywithpaytm?amount="+selectedPackage);

        }
    })
  }

  function checkRetrieveSaveReferral() {
    var referralInput = document.getElementById('referral-link').value;
    var url = new URL(referralInput);
    var c = url.searchParams.get("mwr");
    console.log(c);
    if (c) {
      setCookie('referralCode', c, 5);
      referralCode = c;
      alert('Congratulations! Your referral code applied. Please proceed to login/register');
      document.getElementById('referral-link').value = ""
    } else {
      alert("Enter a valid referral link");
    }
  }


  function getReferralFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const mwr = urlParams.get('mwr');
    if(mwr) {
      setCookie('referralCode', mwr, 5);
    }
  }

  // function isEmailInLocalStorage() {
  //   var local = localStorage.getItem('userData');
  //   var userData;
  //   if(local) {
  //     userData = JSON.parse(local);
  //   } 
  //   if(userData.email) {
  //     return userData.email
  //   } else {
  //     return null
  //   }
  // }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function secureLogin() {
    var local = localStorage.getItem('api_token');
    if(!local) {
      axios.post('/login')
      .then(response => {
        console.log(response);
        localStorage.setItem('api_token', response.data.token);
      })
      .catch(error => {
        alert(err+ " Please try again!");
      })
    }
  }
})()
