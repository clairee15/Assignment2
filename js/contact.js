$(document).ready(function () {

    const APIKEY = "63e53916478852088da67f6d";
    getContacts();
    $("#update-contact-container").hide();
    $("#add-update-msg").hide();
  
    $("#contact-submit").on("click", function (e) {

      e.preventDefault();
  
      let contactName = $("#contact-name").val();
      let contactEmail = $("#contact-email").val();
      let contactMessage = $("#contact-msg").val();
  
      let jsondata = {
        "name": contactName,
        "email": contactEmail,
        "message": contactMessage
      };

      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://assignment2-cecf.restdb.io/rest/contact",
        "method": "POST", 
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata),
        "beforeSend": function(){
          $("#contact-submit").prop( "disabled", true);
          
          $("#add-contact-form").trigger("reset");
        }
      }
  
      $.ajax(settings).done(function (response) {
        console.log(response);
        
        $("#contact-submit").prop( "disabled", false);
        
        $("#add-update-msg").show().fadeOut(3000);
  
        getContacts();
      });
    });//end click 
  
    function getContacts(limit = 10, all = true) {
  
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://assignment2-cecf.restdb.io/rest/contact",
        "method": "GET", 
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
      }
  
      $.ajax(settings).done(function (response) {
        
        let content = "";
  
        for (var i = 0; i < response.length && i < limit; i++) {
          content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
          <td>${response[i].email}</td>
          <td>${response[i].message}</td>
          <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-msg='${response[i].message}' data-name='${response[i].name}' data-email='${response[i].email}'>Update</a></td></tr>`;
  
        }
  
        $("#contact-list tbody").html(content);
  
        $("#total-contacts").html(response.length);
      });
  
  
    }
  
    $("#contact-list").on("click", ".update", function (e) {
      e.preventDefault();
      let contactName = $(this).data("name");
      let contactEmail = $(this).data("email");
      let contactMsg = $(this).data("msg");
      let contactId = $(this).data("id");
      console.log($(this).data("msg"));
  
      
      $("#update-contact-name").val(contactName);
      $("#update-contact-email").val(contactEmail);
      $("#update-contact-msg").val(contactMsg);
      $("#update-contact-id").val(contactId);
      $("#update-contact-container").show();
  
    });
  
    $("#update-contact-submit").on("click", function (e) {
      e.preventDefault();
      let contactName = $("#update-contact-name").val();
      let contactEmail = $("#update-contact-email").val();
      let contactMsg = $("#update-contact-msg").val();
      let contactId = $("#update-contact-id").val();
  
      console.log($("#update-contact-msg").val());
      console.log(contactMsg);
  
      updateForm(contactId, contactName, contactEmail, contactMsg);
    });

    function updateForm(id, contactName, contactEmail, contactMsg) {
  
      var jsondata = { "name": contactName, "email": contactEmail, "message": contactMsg };
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://assignment2-cecf.restdb.io/rest/contact/(ObjectID)`,//update based on the ID
        "method": "PUT",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
      }
  
      $.ajax(settings).done(function (response) {
        console.log(response);
        
        $("#update-contact-container").fadeOut(5000);
        getContacts();
      });
    }
  
  })
  