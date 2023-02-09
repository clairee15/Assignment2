const form = [...document.querySelector('.form').children];

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

const alertBox = (data) => {
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

    //[STEP 1]: Create our submit form listener
    $(".submit-btn").on("click", function (e) {

        //prevent default action of the button 
        e.preventDefault();

        //[STEP 2]: let's retrieve form data
        //for now we assume all information is valid
        //you are to do your own data validation
        let valid = false;
        let Name = $(".name").val();
        let Email = $(".email").val();
        let Password = $(".password").val();
        valid = ValidateEmail(Email);
        if (Name == "") {
            console.log(Name);
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
                "method": "GET", //[cher] we will use GET to retrieve info
                "headers": {
                  "content-type": "application/json",
                  "x-apikey": APIKEY,
                  "cache-control": "no-cache"
                },
              }
            
              //[STEP 8]: Make our AJAX calls
              //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
              //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links 
              $.ajax(settings).done(function(response) {
                let found = false;
                for (var i = 0; i < response.length; i++) {
                    if (response[i].Email == Email && response[i].Password == Password){
                        console.log(response[i].Email);
                        found = true;
                        localStorage.setItem("Email", Email); 
                        localStorage.setItem("Password", Password); 
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

