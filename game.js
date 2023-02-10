$(document).ready(function () {

    const alertBox = (data) => {
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

            var scaling = "fit"; // this will resize to fit inside the screen dimensions
            var width = 2000;
            var height = 1000;
            var color = clear;
            var outerColor = clear;
            var assets = ["ball.png"];
            var path = "img/";

            // as of ZIM 5.5.0 you do not need to put zim before ZIM functions and classes
            var frame = new Frame(scaling, width, height, color, outerColor, assets, path);
            frame.on("ready", function () {
                zog("ready from ZIM Frame"); // logs in console (F12 - choose console)

                var stage = frame.stage;

                var score = new Label({ text: 0, align: "center", size: 500 }).alp(.1).centerReg()

                // create Physics with tall side borders and no border top
                /*var physics = new Physics({borders:new Boundary(0,-stageH,stageW,stageH*2)});
                physics.remove(physics.borderTop);*/
                var physics = new Physics(2);
                physics.remove(physics.borderTop);

                // create physics objects using the addPhysics() method
                // addPhysics(obj, dynamic, contract, shape, friction, linear, angular, density, restitution, maskBits, categoryBits)
                var ball = frame.asset("ball.png")
                    .sca(0.18).centerReg().cur()
                    .addPhysics({ shape: "circle", restitution: .7 })






                var min = 900;
                var max = 1000;
                ball.on("mousedown", function (e) {
                    var upForce = -rand(min, max);
                    let sideForce = (e.stageX - ball.x) * upForce / 150;
                    // x and y force plus where to apply force
                    ball.impulse(sideForce, -300, e.stageX, e.stageY);
                    score.text = Number(score.text) + 1;
                });

                // reset score if ball hits the bottom
                ball.contact(function (obj, body) { // obj is ZIM object - which borders do not have...
                    if (body == physics.borderBottom) {
                        $(".winningscreen").css("display", "block");
                        $(".points").html(score.text + " points")
                        setTimeout(() => {
                            location.href = 'index.html';
                        }, 2000);
                    }
                })

                stage.update(); // this is needed to show any changes

            }); // end of ready
        }
    });
});