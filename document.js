if (localStorage.length != 0){
    $(".login").hide();
    const Email = localStorage.getItem("Email");
    const Password = localStorage.getItem("Password");
    console.log(Email);
    console.log(Password);
    $(".logout").on("click", function(e){
        localStorage.clear();
        location.reload();
    });
}
else{
    $(".logout").hide();
}


