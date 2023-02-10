const form = [...document.querySelector('.form').children]; //animation

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i * 100);
})

function ValidateEmail(Email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailformat.test(Email)) {
        return true;
    }
    else {
        return false;
    }

};

const alertBox = (data) => { //alerts user  if input is wrong
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}

$(document).ready(function () {
    const APIKEY = "63e4542c478852088da67ef4";

    $(".submit-btn").on("click", function (e) {

        e.preventDefault();

        let valid = false;
        let Name = $(".name").val();
        let Email = $(".email").val();
        let Password = $(".password").val();
        valid = ValidateEmail(Email);
        if (Name == "") {
            alertBox("Please fill in your name");
        }
        else if (!valid) {
            alertBox("Invalid Email, please re-enter");
        }
        else if (Password == "") {
            alertBox("Please fill in your password");
        }
        else {

            let settings = { 
                "async": true,
                "crossDomain": true,
                "url": "https://idassignment2-b8e6.restdb.io/rest/login",
                "method": "GET", 
                "headers": {
                  "content-type": "application/json",
                  "x-apikey": APIKEY,
                  "cache-control": "no-cache"
                },
              }
            
              $.ajax(settings).done(function(response) { //checks if user entered details matches database
                let found = false;
                for (var i = 0; i < response.length; i++) {
                    if (response[i].Email == Email && response[i].Password == Password){
                        found = true;
                        localStorage.setItem("id", response[i]._id);
                        setTimeout(() => {
                            location.href = 'index.html';
                        }, 1000);
                    }
                }
                if (!found){
                    alertBox("User not found, please re-enter email and password or register");
                }
              });
        }
    });
});

