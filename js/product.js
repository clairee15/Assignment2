$(document).ready(function () { //read data from database
    const APIKEY = "63e4542c478852088da67ef4"; 

    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://idassignment2-b8e6.restdb.io/rest/keychain",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": APIKEY,
            "cache-control": "no-cache"
        },
    }

    $.ajax(settings).done(function (response) {

        $('.pro').find('h5').html(response[0].itemName); //update individual element content based on database
        $('.pro').find('img').attr('src',response[0].itemPicture);
        $('.pro').find('h4').html(response[0].itemPrice);
        $('.pro').find('span').html(response[0].itemBrand);
        for (var i = 1; i < response.length && i < 7; i++) {
            let clone = $(".pro:first").clone();
            clone.find('h5').html(response[i].itemName); //set item name
            clone.find('img').attr("src", response[i].itemPicture); //set picture src
            clone.find('h4').html(response[i].itemPrice);//set item price
            clone.find('span').html(response[i].itemBrand);//set item brand
            clone.appendTo(".pro-container")
        }
        const form = [$('.pro-container').children()]; //animation

        form.forEach((item, i) => {
            setTimeout(() => {
                item.css('opacity', 1);
            }, i * 100);
        });

        setTimeout(() => {
            $('.cart').css('opacity', 1);
        }, 0);
    });
});