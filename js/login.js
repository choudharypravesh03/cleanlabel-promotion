
var firebaseApp;

(function () {

  var selectedCity = "Bangalore";
  var selectedPackage = "999";
  var isLoginFlow = false;
  var userEmail = "";
  var phoneNumber = "";
  
  // Check for referral cookie
  getReferralFromUrl();
  var referralCode = getCookie('referralCode');

  function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        var phoneNumber = user.phoneNumber;

      } else {

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




  /* -------------------------------------------------------------------
                                MODAL START
  ----------------------------------------------------------------------*/ 
  var modal = document.getElementById("myModal");
  var btn = document.getElementById("join-membership");
  var login = document.getElementById('login');
  var span = document.getElementsByClassName("close")[0];
  btn.onclick = function () {
    isLoginFlow = false;
    modal.style.display = "block";
  }
  login.onclick = function () {
    isLoginFlow = true;
    modal.style.display = "block";
  }
  span.onclick = function () {
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  /* -------------------------------------------------------------------
                                MODAL END
  ----------------------------------------------------------------------*/ 








  function attachEventListeners() {
    document.getElementById('quickstart-sign-in-google').addEventListener('click', toggleGoogleSignIn, false);
    document.getElementById('quickstart-sign-in-facebook').addEventListener('click', toggleFacebookSignIn, false);
    document.getElementById('sign-out-button').addEventListener('click', onSignOutClick);
    document.getElementById('phone-number').addEventListener('keyup', updateSignInButtonUI);
    document.getElementById('phone-number').addEventListener('change', updateSignInButtonUI);
    document.getElementById('verification-code').addEventListener('keyup', updateVerifyCodeButtonUI);
    document.getElementById('verification-code').addEventListener('change', updateVerifyCodeButtonUI);
    document.getElementById('verification-code-form').addEventListener('submit', onVerifyCodeSubmit);
    document.getElementById('cancel-verify-code-button').addEventListener('click', cancelVerification);
    document.getElementById('continue-successful').addEventListener('click', getNameAndEmailThenSaveAndRedirect);
    document.getElementById('apply-referral').addEventListener('click', checkRetrieveSaveReferral);
  }

  function toggleGoogleSignIn() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      // firebase.auth().signInWithRedirect(provider);
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        localStorage.setItem("signinType", "oauth");

        // trick to use phone verification code after social login
        firebase.auth().signOut();

        var userObj = {
          name: result.user.displayName,
          email: result.user.email,
          referrerCode: referralCode || null
        };
        userEmail = userObj.email;
        sessionStorage.setItem('userData', JSON.stringify(userObj));
        saveUserData(userObj, (response) => {
          console.log(response);
          if(response.status === 200) {
            if(response.data.isUpdated && response.data.membership === 'none') {
              // User in database. Send directly to payment page.
              window.location.href =  (isLoginFlow ? "/" : "/paywithpaytm?amount="+selectedPackage);
            }  else {
              // User not there. Enter phone number
              document.querySelector('.oauth-container').style.display = 'none';
              document.querySelector('.referral-container').style.display = 'none';
            }
          } else {
            alert("There was an error saving your data. Please try again! Error: "+error);
          }
        });
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
        var token = result.credential.accessToken;
        var user = result.user;
        localStorage.setItem("signinType", "oauth");

        // trick to use phone verification code after social login
        firebase.auth().signOut();

        var userObj = {
          name: result.user.displayName,
          email: result.user.email,
          referrerCode: referralCode || null
        };
        userEmail = userObj.email;
        sessionStorage.setItem('userData', JSON.stringify(userObj));
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
              document.querySelector('.oauth-container').style.display = 'none';
              document.querySelector('.referral-container').style.display = 'none';
            }
          } else {
            alert("There was an error saving your data. Please try again! Error: "+error);
          }
        });
      });
    } else {
      firebase.auth().signOut();
    }
    document.getElementById('quickstart-sign-in-facebook').disabled = true;
  }

  function onSignOutClick() {
    firebase.auth().signOut();
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
        saveUserData({phone: phoneNumber, email: userEmail}, (response) => {
          verifyWithPhoneIfUserExist();
        })
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
    return document.getElementById('verification-code').value;
  }

  function getPhoneNumberFromUserInput() {
    return document.getElementById('phone-number').value;
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
      document.getElementById('verification-code-form').style.display = 'block';
    } else {
      document.getElementById('verification-code-form').style.display = 'none';
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
        sessionStorage.setItem('userData', JSON.stringify(userObj));
        window.location.href = (isLoginFlow ? "/" : "/paywithpaytm?amount="+selectedPackage);
      });
    } else {
      alert('Please enter your name and email to proceed');
    }
  }

  function verifyWithPhoneIfUserExist() {
    var phoneNumber = getPhoneNumberFromUserInput();
    var email = userEmail || '';
    var url = `/customer/get?phone=${phoneNumber}&&email=${email}`;
    axios.get(url)
      .then(response => {
        console.log(response);
        var isoAuthFlow = (localStorage.getItem('signinType') === 'oauth');
        if (response.data === "" && !isoAuthFlow) {
          // Login by phone
          document.getElementById('email-name-container').style.display = 'block';
        } else if(response.data && response.data.membership !== 'none') {
          window.location.href = '/referrals';
        } else {
          // Non registered social login
          // sessionStorage.setItem('userData', JSON.stringify(userData));
          localStorage.removeItem('signinType');
          window.location.href = (isLoginFlow ? "/" : "/paywithpaytm?amount="+selectedPackage);

        }
      })
      .catch(error => {
        console.log("FALIURE RESPONSE", JSON.stringify(error));
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
})()
