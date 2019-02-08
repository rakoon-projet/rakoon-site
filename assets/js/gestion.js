onload = function () {

    /* VARIABLES */
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");

    var container = document.getElementById("container");

    // Vidéo
    var siVideo;

    var onplaying = false;
    var onpause = false;

    var mediaSource = "assets/video/landscape.mp4";
    var videoContainer;
    var video = document.createElement("video");

    // Scènes et plans
    var scene2plan1 = document.querySelector("#scene2 #plan1"); // Premier plan avec le combi

    // Combi
    var combi = document.querySelector('#Combi');
    var carrosserie = document.querySelector('#Carrosserie');
    var roueArriere = document.getElementById("roueArriere");
    var roueAvant = document.getElementById("roueAvant");


    // Éléments externes au container
    var playButton = document.getElementById("playButton"); // Bouton PLAY


    // Attributs de la vidéo
    video.src = mediaSource;
    video.autoPlay = false;
    video.loop = true;
    video.muted = false;
    video.setAttribute("width", container.offsetWidth);
    video.setAttribute("height", container.offsetHeight);
    videoContainer = {
        video : video,
        ready : false
    };

    // Le canvas a les mêmes dimensions que la vidéo
    cnv.width = video.width;
    cnv.height = video.height;


    // Au clic sur le bouton PLAY...
    playButton.addEventListener("click", initVideo);

    /*** LA FONCTION PRINCIPALE ***/
    function initVideo() {
        if (videoContainer.ready === true) {
            playVid();

            // Dessin de la vidéo à l'intérieur du canvas
            siVideo = setInterval(function () {
                ctx.drawImage(videoContainer.video, 0, 0, videoContainer.video.width, videoContainer.video.height);
            }, 20);

            // Disparition du bouton PLAY
            TweenMax.to(playButton, 1, {opacity: 0, onComplete: function() {
                playButton.style.display = "none";
                playButton.style.visibility = "hidden";
            }});


            /*** ANIMATION DU COMBI ***/
            // Apparaît au bout de 2 secondes de vidéo
            setTimeout(function() {
                combi.style.display = "block";
                scene2plan1.classList.add("isActive");

                // Animation du combi
                TweenMax.to(combi, 10, {x: "700px", transformOrigin:"50% 50%", repeat: -1, ease:Linear.easeNone}); // Déplacement en x
                TweenMax.to(roueArriere, 2, {rotation: 360, transformOrigin: "50% 50%", repeat: -1, ease: Linear.easeNone});
                TweenMax.to(roueAvant, 2, {rotation: 360, transformOrigin: "50% 50%", repeat: -1, ease: Linear.easeNone});

                var randomRebondCombi = Math.random() * (30-10) + 10;
                var tlRebondCombi = new TimelineMax({repeat: -1});

                tlRebondCombi.to(carrosserie, 0.2, {y: "+=" + randomRebondCombi + "px", ease: Linear.easeNone})
                    .to(carrosserie, 0.2, {y: "-=" + randomRebondCombi + "10px", ease: Linear.easeNone});

                // Au survol du combi...
                combi.addEventListener("mouseover", function(e) {
                    if (e.target.classList.contains("blueGradient")) {
                        e.target.classList = "";
                        e.target.classList.add("st44");
                    } else {
                        e.target.classList = "";
                        e.target.classList.add("st45");
                        e.target.classList.add("blueGradient");
                    }
                });

                // Au clic sur le container lorsque le combi est présent...
                container.addEventListener("click", function() {
                    var tlCombiJump = new TimelineLite();
                    tlCombiJump.to(combi, 0.1, {y: -300, ease: Power1.easeOut}).to(combi, 0.2,  {y: 300, ease: Back.easeIn});
                });
            }, 2000);
        }
    };


    // Lorsque la vidéo est prête à être lancée et à terminer jusqu'à la fin...
    videoContainer.video.oncanplaythrough = function() {
        videoContainer.ready = true;
    };

    // Lorsque la vidéo est lancée
    videoContainer.video.onplaying = function() {
        onplaying = true;
        onpause = false;
    };

    // Lorsque la vidéo est en pause
    videoContainer.video.onpause = function() {
        onplaying = false;
        onpause = true;
        clearInterval(siCombi);
    };

    // Lance la vidéo
    function playVid() {
        if (videoContainer.video.paused && !onplaying) {
            videoContainer.video.play();
        }
    }

    // Met la vidéo en pause
    function pauseVid() {
        if (!videoContainer.video.paused && !onpause) {
            videoContainer.video.pause();
        }
    }

    // Gestion des erreurs pour Edge qui n'aime pas le format vidéo .ogv
    video.onerror = function() {
        document.body.removeChild(cnv);
        document.body.innerHTML += "<h2>There is a problem loading the video</h2><br>";
        document.body.innerHTML += "Users of IE9+ , the browser does not support WebM videos used by this demo";
        document.body.innerHTML += "<br><a href='https://tools.google.com/dlpage/webmmf/'> Download IE9+ WebM support</a> from tools.google.com<br> this includes Edge and Windows 10";
    }

    // Au redimensionnement de la fenêtre...
    window.onresize = function() {
        video.setAttribute("width", container.offsetWidth);
        video.setAttribute("height", container.offsetHeight);
        cnv.width = video.width;
        cnv.height = video.height;
    };
};











// A VOIR PLUS TARD ////////////////////////////////////////////////////////


/*
            document.addEventListener('scroll', function() {
                console.log("scroll");
                console.log(document.body.scrollTop);
            });
            */



            // Avec BodyMovin
            /*
        var animationData = {"v":"5.3.1","fr":25,"ip":0,"op":170,"w":800,"h":800,"nm":"Tests","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":".rectangleEnHaut","cl":"rectangleEnHaut","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":92,"s":[0],"e":[116.611]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":169,"s":[116.611],"e":[187]},{"t":170}],"ix":10},"p":{"a":0,"k":[444,276,0],"ix":2},"a":{"a":0,"k":[-162,234,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":0,"s":[50,50,100],"e":[100,100,100]},{"t":92}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[150.352,-150.352],[-150.352,-150.352],[-150.352,150.352],[150.352,150.352]],"c":true},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":47,"ix":5},"lc":1,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":8},"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke","hd":true},{"ty":"fl","c":{"a":0,"k":[0.361171468099,0.886963848039,0.513786465514,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fond 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-158.641,233.328],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[79.17,51.688],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Rectangle 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":170,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":".rectangleEnBas","cl":"rectangleEnBas","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":92,"s":[0],"e":[187]},{"t":170}],"ix":10},"p":{"a":0,"k":[238,634,0],"ix":2},"a":{"a":0,"k":[-162,234,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"n":["0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167","0p833_0p833_0p167_0p167"],"t":0,"s":[50,50,100],"e":[100,100,100]},{"t":92}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[150.352,-150.352],[-150.352,-150.352],[-150.352,150.352],[150.352,150.352]],"c":true},"ix":2},"nm":"Tracé 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":47,"ix":5},"lc":1,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":8},"nm":"Contour 1","mn":"ADBE Vector Graphic - Stroke","hd":true},{"ty":"fl","c":{"a":0,"k":[0.467519363703,0.345424068675,0.886963848039,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fond 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[-158.641,233.328],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[79.17,51.688],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transformer "}],"nm":"Rectangle 1","np":3,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":170,"st":0,"bm":0}],"markers":[]};
        lottie.loadAnimation({
            container: document.getElementById('div1'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            useSubFrames: false,
            animationData: animationData,
            rendererSettings: {
                context: ctx, // the canvas context
                scaleMode: 'noScale',
                clearCanvas: true
            }
        });


        var r, v, b;

        $("path").click(function() {
            r = Math.random() * 255;
            v = Math.random() * 255;
            b = Math.random() * 255;
            $(this).css("fill", "rgb(" + r + ", " + v + ", " + b);
        });

        var rectangleEnHaut = $(".rectangleEnHaut");

        //TweenMax.to(rectangleEnHaut, 2, {y:"+=50px"});

        var tl = new TimelineLite();


        $("svg > g > g").click(function() {
            //tl.animation.play(true);
            tl.to(this, 0.3, {y:"-=50px"})
                .to(this, 0.2, {y:"+=50px"});
        */