onload = function () {

    /* VARIABLES */
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");

    var container = document.getElementById("container");
    var interactiveContainer = document.getElementById("interactive-container");

    // Vidéo
    var siVideo;

    var onplaying = false;
    var onpause = false;

    var mediaSource = "assets/video/ours-1.mp4";
    var videoContainer;
    var video = document.createElement("video");

    // Temps
    var tempsFinal = 144000,
        tempsApparitionScene1Plan2 = 7500, // Paysage Zoom visage
        tempsApparitionScene2Plan1 = 15000, // Van ville
        tempsApparitionScene3Plan1 = 31000, // Chambre Famille
        tempsApparitionScene4Plan1 = 38000, // Van neige
        tempsApparitionScene5Plan1 = 47000, // Jungle
        tempsApparitionScene6Plan1 = 61200, // Van montagnes
        tempsApparitionScene7Plan1 = 70200, // Psyché emporté
        tempsApparitionScene7Plan2 = 72000, // Psyché vortex
        tempsApparitionScene8Plan1 = 79800, // Plage
        tempsApparitionScene9Plan1 = 88800, // Van désert
        tempsApparitionScene10Plan1 = 122400, // Concert plan loin
        tempsApparitionScene10Plan2 = 131400, // Concert plan rapproché
        tempsApparitionScene11Plan1 = 139800; // Paysage final

    /* Scènes et plans */
    var scenes = document.querySelector(".scene");
    var plans = document.querySelector(".plan");

    // Scènes
    var scene1 = document.getElementById("scene1"),
        scene2 = document.getElementById("scene2");

    // Plans
    var scene1plan1 = document.querySelector("#scene1 #plan1"), // Falaises
        scene1plan2 = document.querySelector("#scene1 #plan2"), // Bonhomme qui réfléchit
        scene2plan1 = document.querySelector("#scene2 #plan1"); // Combi 1

    // Falaise
    var svgFalaise = document.getElementById("svg-falaise"),
        scene1plan1fond1 = document.getElementById("Scene1Plan1Fond1"),
        scene1plan1fond2 = document.getElementById("Scene1Plan1Fond2"),
        scene1plan1fond1et2 = document.getElementById("Scene1Plan1Fond1et2"),
        scene1plan1fond3 = document.getElementById("Scene1Plan1Fond3"),
        scene1plan1nuagesarriere1 = document.getElementById("Scene1Plan1NuagesArriere1"),
        scene1plan1nuagesarriere2 = document.getElementById("Scene1Plan1NuagesArriere2"),
        scene1plan1nuagesarriere3 = document.getElementById("Scene1Plan1NuagesArriere3"),
        scene1plan1nuagesavant1 = document.getElementById("Scene1Plan1NuagesAvant1"),
        scene1plan1nuagesavant2 = document.getElementById("Scene1Plan1NuagesAvant2"),
        scene1plan1nuagesavant3 = document.getElementById("Scene1Plan1NuagesAvant3"),
        scene1plan1nuagesavant4 = document.getElementById("Scene1Plan1NuagesAvant4"),
        scene1plan1nuagesavant5 = document.getElementById("Scene1Plan1NuagesAvant5"),
        scene1plan1nuagesavant6 = document.getElementById("Scene1Plan1NuagesAvant6");

    // Combi
    var combi = document.querySelector('#Combi'),
        carrosserie = document.querySelector('#Carrosserie'),
        roueArriere = document.getElementById("roueArriere"),
        roueAvant = document.getElementById("roueAvant");


    // Éléments externes au container
    var playButton = document.getElementById("playButton"); // Bouton PLAY


    // Attributs de la vidéo
    video.src = mediaSource;
    video.autoPlay = false;
    video.loop = false;
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
            console.log(video.currentTime);
            
            fscene1plan1(); // Joue le premier élément interactif
            playVid(); // Joue la vidéo "fixe"

            // Dessin de la vidéo à l'intérieur du canvas
            siVideo = setInterval(function () {
                ctx.drawImage(videoContainer.video, 0, 0, videoContainer.video.width, videoContainer.video.height);
            }, 20);

            /********************************************************************************************/
            /***************************************** TIMELINE *****************************************/
            /********************************************************************************************/

            scene1.classList.add("isActive");
            scene1plan1.classList.add("isActive");

            setTimeout(function() { // Au bout de 8 secondes...
                console.log(video.currentTime);
                //scene1plan1.classList.remove("isActive"); A DECOMMANTER DES QUE SCENE 1 PLAN 2 EST PRETE
                //scene1plan2.classList.add("isActive"); A DECOMMANTER DES QUE SCENE 1 PLAN 2 EST PRETE
                
                fscene1plan2();

                setTimeout(function() { // Au bout de 15 secondes...
                    console.log(video.currentTime);
                    scene1.classList.remove("isActive");
                    //scene1plan2.classList.remove("isActive"); A DECOMMANTER DES QUE SCENE 1 PLAN 2 EST PRETE

                    scene2.classList.add("isActive");
                    scene2plan1.classList.add("isActive");

                    fscene2plan1();
                }, tempsApparitionScene2Plan1 - tempsApparitionScene1Plan2); // Au bout de 15 secondes...
            }, tempsApparitionScene1Plan2); // Au bout de 8 secondes...

            /********************************************************************************************/
            /**************************************** ANIMATIONS ****************************************/
            /********************************************************************************************/

            /*** SCÈNE 1 - PLAN 1 - ANIMATION DE LA FALAISE ***/
            function fscene1plan1() {
                // Au survol pour le parallax...
                container.addEventListener("mouseover", function(e) {
                    var pos_x = e.pageX,
                        pos_y = e.pageY,
                        left  = 0,
                        top   = 0;

                    left = cnv.width / 2 - pos_x;
                    top  = cnv.height / 2 - pos_y;

                    TweenMax.to(scene1plan1fond1, 2, { css: { transform: 'translateX(' + left / 17 + 'px) translateY(' + top / 17 + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                    TweenMax.to(scene1plan1fond2, 2, { css: { transform: 'translateX(' + left / 30 + 'px) translateY(' + top / 30 + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });

                    TweenMax.to(scene1plan1nuagesavant5, 2, { css: { transform: 'translateX(' + left / 6 + 'px) translateY(' + top / 6 + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                    TweenMax.to(scene1plan1nuagesavant1, 2, { css: { transform: 'translateX(' + left / 6 + 'px) translateY(' + top / 6 + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                    TweenMax.to(scene1plan1nuagesavant4, 2, { css: { transform: 'translateX(' + left / 6 + 'px) translateY(' + top / 6 + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                    TweenMax.to(scene1plan1nuagesavant3, 2, { css: { transform: 'translateX(' + left / 10 + 'px) translateY(' + top / 10 + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                    TweenMax.to(scene1plan1nuagesavant6, 2, { css: { transform: 'translateX(' + left / 10 + 'px) translateY(' + top / 10 + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                    TweenMax.to(scene1plan1nuagesavant2, 2, { css: { transform: 'translateX(' + left / 15 + 'px) translateY(' + top / 15 + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });

                    TweenMax.to(scene1plan1nuagesarriere2, 2, { css: { transform: 'translateX(' + left / 30 + 'px) translateY(' + top / 30 + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                    TweenMax.to(scene1plan1nuagesarriere3, 2, { css: { transform: 'translateX(' + left / 30 + 'px) translateY(' + top / 30 + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                    TweenMax.to(scene1plan1nuagesarriere1, 2, { css: { transform: 'translateX(' + left / 60 + 'px) translateY(' + top / 60 + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                });

                TweenMax.to(scene1plan1fond1et2, 7, { css: { transform: 'scale(1.06)' }, ease: Linear.easeOut });
            }

            /*** SCÈNE 1 - PLAN 2 - ANIMATION BONHOMME FALAISE ***/
            function fscene1plan2() {
                noInteraction();
            }
            
            /*** SCÈNE 2 - PLAN 1 - ANIMATION DU COMBI ***/
            function fscene2plan1() {

                // Animation du combi
                TweenMax.to(combi, 10, {x: "700px", transformOrigin: "50% 50%", repeat: -1, ease:Linear.easeNone}); // Déplacement en x
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
            }
            
            // Apparition du container
            TweenMax.to(container, 3, {opacity: 1, ease:Linear.easeNone});

            // Disparition du bouton PLAY
            TweenMax.to(playButton, 1, {opacity: 0, onComplete: function() {
                playButton.style.display = "none";
                playButton.style.visibility = "hidden";
            }});
        }
    }

    // Est appelé lorsqu'on arrive à un moment de la vidéo où il n'y a pas d'interaction
    function noInteraction() {
        scenes.classList.remove("isActive");
        plans.classList.remove("isActive");
    }


    // Lorsque la vidéo est prête à être lancée et à terminer jusqu'à la fin...
    videoContainer.video.oncanplaythrough = function() {
        console.log("video prete");
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
        clearInterval(siVideo);
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