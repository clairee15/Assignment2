// ".images/animal1.png" --> ".images/" + value + ".png"
document.addEventListener(function(){
    changechar("cos1");
});

function changechar(displaypic){
    ["cos1","cos2","cos3","cos4","cos5","cos6","cos7","cos8"].forEach(function(cos)
    {
        document.getElementById(cos).style.display = 'none';
    });
    document.getElementById(displaypic).style.display = "block";
}