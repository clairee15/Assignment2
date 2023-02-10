$(document).ready(function () {

    const APIKEY = "63e4542c478852088da67ef4";

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

    $.ajax(settings).done(function (response) {
        var id = localStorage.getItem("id");
        for (var i = 0; i < response.length; i++) {
            if (response[i]._id == id) {
                date = response[i].LastPlayed
                console.log(new Date());
                if (date == new Date()) {
                    console.log(date);
                    $(".instructions h2").html("Come back tomorrow to play and earn again!")
                    $(".instructions h3").html("")
                    $(".start").css("display", "none")
                    break;
                }
            }
        };

        const alertBox = (data) => { //alert user if they are not logged in
            const alertContainer = document.querySelector('.alert-box');
            const alertMsg = document.querySelector('.alert');
            alertMsg.innerHTML = data;

            alertContainer.style.top = `15%`;
            setTimeout(() => {
                alertContainer.style.top = null;
            }, 5000);
        }

        $(".start").on("click", function (e) {
            if (localStorage.length == 0) {
                alertBox("Please log in before playing the game");
            }
            else {


                $(".instructions").css("display", "none")

                var scaling = "fit";
                var width = 2000;
                var height = 1000;
                var color = clear;
                var outerColor = clear;
                var assets = ["ball.png"];
                var path = "img/";

                var frame = new Frame(scaling, width, height, color, outerColor, assets, path);
                frame.on("ready", function () {
                    zog("ready from ZIM Frame");

                    var stage = frame.stage;

                    var score = new Label({ text: 0, align: "center", size: 500 }).alp(.1).centerReg()

                    var physics = new Physics(2);
                    physics.remove(physics.borderTop);

                    var ball = frame.asset("ball.png")
                        .sca(0.18).centerReg().cur()
                        .addPhysics({ shape: "circle", restitution: .7 })

                    var min = 900;
                    var max = 1000;
                    ball.on("mousedown", function (e) {
                        var upForce = -rand(min, max);
                        let sideForce = (e.stageX - ball.x) * upForce / 150;
                        ball.impulse(sideForce, -300, e.stageX, e.stageY);
                        score.text = Number(score.text) + 1;
                    });

                    // reset score if ball hits the bottom
                    ball.contact(function (obj, body) {
                        if (body == physics.borderBottom) {
                            $(".winningscreen").css("display", "block");
                            $(".points").html(score.text + " points")
                            var id = localStorage.getItem("id");
                            var jsondata = { "Points": Number(score.text) };
                            var settings = {
                                "async": true,
                                "crossDomain": true,
                                "url": `https://idweek12-7489.restdb.io/rest/contact/${id}`,//update based on the ID
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
                            });
                            setTimeout(() => {
                                location.href = 'index.html';
                            }, 3000);

                        };
                    });

                    stage.update(); // this is needed to show any changes

                });
            }
        });
    });
});
