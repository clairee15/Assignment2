if (localStorage.length != 0){
    $(".login").hide();
    const id = localStorage.getItem("id");
    $(".logout").on("click", function(e){
        localStorage.clear();
        location.reload();
    });
}
else{
    $(".logout").hide();
}


