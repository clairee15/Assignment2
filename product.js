$(document).ready(function () {
    for (var i = 0; i < 5; i++) {
        console.log("yay");
        let clone = $(".pro:first").clone();
        clone.find('img').attr("src", "https://img.amiami.com/images/product/main/224/GOODS-04289283.jpg");
        clone.appendTo(".pro-container")
    }
});