
window.onload = function() {
    
    // Initialize the tags input field
    var emailField = document.querySelector('[name="tags"]')
    tagger(emailField, {
        
      });

    var userData = JSON.parse(sessionStorage.getItem('userData'));
    getUserData();
    var userFromMongo = {};

    // use custom css for cloudsponge widgets
    cloudsponge.init({
        sources: ['gmail','yahoo',"outlook"],
        skipSourceMenu: true,
        css: "/css/utils/cloudsponge.css",
        localeData: {
            GET_CONTACTS: 'Send ${0} invites'
        },
        afterClosing:function() {
            var emails = document.querySelector('.cloudsponge-contacts').value;
            sendEmail(emails);
        }
    });


    // Send invites button click
    document.getElementById('send-invites').addEventListener('click', function() {
        sendEmail(emailField.value);
    });

    // Copy text
    document.getElementById('copy-text').addEventListener('click', copyText);

    document.getElementById('track-invites').addEventListener('click', function() {
      console.log("Tract invites");
      trackInvites();
    })

    document.querySelector('.cloudsponge-contacts').addEventListener('change', function() {
        console.log("Input changed");
    })


    function copyText() {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById('my-referral-link'));
            range.select().createTextRange();
            document.execCommand("copy");
          } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(document.getElementById('my-referral-link'));
            window.getSelection().addRange(range);
            document.execCommand("copy");
            alert("Copied. Now send the referral link to you friends!");
          }
    }
    
    function sendEmail(emails) {
        this.disabled = true;
        var emails = emails;
        axios.get('/sendmails?emails='+emails)
        .then(response => {
            console.log("SUCCESS RESPONSE", JSON.stringify(response));
            this.disabled = false;

            // Save emails to current user data
            var currentUserEmail = userData.email;
            saveCustomerEmailData(emails, currentUserEmail);
            alert("Invites Sent");
        })
        .catch(error => {
            console.log("FALIURE RESPONSE", JSON.stringify(error));
            alert("Error occured");
        })
    }

    function saveCustomerEmailData(emails, currentUserEmail) {
        var previousEmails = userFromMongo.sentEmails;
        var totalEmails = previousEmails + ', ' + emails;
        var obj = {
            email: currentUserEmail,
            sentEmails: totalEmails
        }
        axios.post('/customer/save', obj)
          .then(response => {
            console.log("SUCCESS RESPONSE", JSON.stringify(response));
          })
          .catch(error => {
            console.log("Failed to store data", JSON.stringify(error));
          })
      }

    function getUserData() {
        axios.get('/customer/get?email='+userData.email)
          .then(response => {
            console.log("SUCCESS RESPONSE", JSON.stringify(response));
            userFromMongo = response.data;
          })
          .catch(error => {
            console.log("Failed to store data", JSON.stringify(error));
            return error;
          })
    }
    
    function trackInvites() {
      axios.get('/customer/trackinvites?email='+userData.email)
        .then(response => {
            console.log("SUCCESS RESPONSE", response);
            document.getElementById('show-invites').innerHTML = JSON.stringify(response.data);
        })
        .catch(error => {
            console.log("FALIURE RESPONSE", JSON.stringify(error));
            alert("Error occured");
        })
    }
  }
