$(document).ready(function () { //same as product.js
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

        $('.section-p1 .pro').find('h5').html(response[0].itemName);
        $('.section-p1 .pro').find('img').attr('src',response[0].itemPicture);
        $('.section-p1 .pro').find('h4').html(response[0].itemPrice);
        $('.section-p1 .pro').find('span').html(response[0].itemBrand);
        for (var i = 1; i < response.length && i < 7; i++) {
            let clone = $(".pro:first").clone();
            clone.find('h5').html(response[i].itemName); //set item name
            clone.find('img').attr("src", response[i].itemPicture); //set picture src
            clone.find('h4').html(response[i].itemPrice);
            clone.find('span').html(response[i].itemBrand);
            clone.appendTo(".section-p1 .pro-container")
        }

        for (var i = 7; i < response.length; i++) {
            let clone = $(".pro:first").clone();
            clone.find('h5').html(response[i].itemName); //set item name
            clone.find('img').attr("src", response[i].itemPicture); //set picture src
            clone.find('h4').html(response[i].itemPrice);
            clone.find('span').html(response[i].itemBrand);
            clone.appendTo(".section-p2 .pro-container")
        }
        const form = [$('.pro-container').children()];

        form.forEach((item, i) => {
            setTimeout(() => {
                item.css('opacity', 1);
            }, i * 100);
        });

        $(".loader").css("display", "none");

        setTimeout(() => {
            $('.cart').css('opacity', 1);
        }, 0);

        setTimeout(() => {
            $('#product1 h2').css('opacity', 1);
        }, 0);

        setTimeout(() => {
            $('#product1 p').css('opacity', 1);
        }, 0);
    });
});