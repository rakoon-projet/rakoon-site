/*document.onreadystatechange = function () {
            if (document.readyState === "complete") {
                console.log(document.readyState);
                //document.getElementById("PreLoaderBar").style.display = "none";
            }
        }
*/

/*document.addEventListener('DOMContentLoaded', function(){ 
    console.log("ready");
}, false);*/

onload = function () {
    /* LOADER TERMINÉ */
    setTimeout(function() {
        TweenMax.to(document.getElementById("intro"), 0.7, {opacity: 0, onComplete: function() {
            document.getElementById("intro").style.display = "none";
            document.getElementById("video-wrapper").style.display = "block";
            var tl = new TimelineMax();
            tl.to(document.getElementById("video-wrapper"), 1, { opacity: 1, ease: Power4.easeIn })
                .from(overlayTop, 2, { height: 0, ease: Power4.easeOut })
                .from(overlayBottom, 2, { height: 0, ease: Power4.easeOut }, "-=2")
                .from(document.querySelector("#overlayTop p"), 2, { opacity: 0, ease: Power4.easeOut }, "-=1.5");
        }});
    }, 2000);

    /* VARIABLES */
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");

    var container = document.getElementById("container");
    var interactiveContainer = document.getElementById("interactive-container");

    var currentInteraction;

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

    /*

    Plan falaise : 00:00.000//
Plan pensif : 00:09.844//
Plan ville : 00:15.441//
Plan parent : 00:30.830//
Plan neige : 00:38.560//
Plan jungle : 00:46.480//
Plan montagne : 01:01.920 = 61920//
Plan pilule : 01:15.400 = 75400//
Plan psyché : 01:17.170 = 77170//
Plan plage : 01:32.766 = 92766//
Plan désert : 01:48.400 = 108400//
Plan concert : 02:03.680 = 123680//
Plan DJ : 02:19.200 = 139200//
Plan falaise : 02:32.799 = 152799


    */

    /* Scènes et plans */
    var scenes = document.querySelectorAll(".scene");
    var plans = document.querySelectorAll(".plan");

    // Scènes
    var scene1 = document.getElementById("scene1"),
        scene2 = document.getElementById("scene2");

    // Plans
    var scene1plan1 = document.querySelector("#scene1 #plan1"), // Falaises
        scene1plan2 = document.querySelector("#scene1 #plan2"), // Bonhomme qui réfléchit
        scene2plan1 = document.querySelector("#scene2 #plan1"); // Combi

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

    // Visage
    var svgVisage = document.getElementById("svg-visage"),
        scene1plan2nuagesarriere = document.getElementById("Scene1Plan2NuagesArriere"),
        scene1plan2nuagesarriere1 = document.getElementById("Scene1Plan2NuagesArriere1"),
        scene1plan2nuagesarriere2 = document.getElementById("Scene1Plan2NuagesArriere2"),
        scene1plan2nuagesavant = document.getElementById("Scene1Plan2NuagesAvant"),
        scene1plan2nuagesavant1 = document.getElementById("Scene1Plan2NuagesAvant1"),
        scene1plan2nuagesavant2 = document.getElementById("Scene1Plan2NuagesAvant2"),
        scene1plan2nuagesavant3 = document.getElementById("Scene1Plan2NuagesAvant3"),
        cpt = 0;

    // Combi
    var combi = document.querySelector('#Combi'),
        carrosserie = document.querySelector('#Carrosserie'),
        roueArriere = document.getElementById("roueArriere"),
        roueAvant = document.getElementById("roueAvant");


    // Éléments externes au container
    var mouse = document.getElementById("mouse");
    var playButton = document.getElementById("playButton"); // Bouton PLAY
    var overlayTop = document.getElementById("overlayTop");
    var overlayBottom = document.getElementById("overlayBottom");
    var iconFullscreen = document.getElementById("iconFullscreen");
    var fullscreen = false;
    var rakoonTitre = document.querySelector("h1");
    var trackTitre = document.querySelector("h2");


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

    noMouseInteraction();

    // Au clic sur le bouton PLAY...
    playButton.addEventListener("click", initVideo);

    /*** LA FONCTION PRINCIPALE ***/
    function initVideo() {
        if (videoContainer.ready === true) {
            console.log(video.currentTime);

            currentInteraction = "MOVE";

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

            setTimeout(function() { // Lorsque le paysage est terminé...
                console.log("visage");
                scene1plan1.classList.remove("isActive");
                scene1plan2.classList.add("isActive");

                currentInteraction = "CLEAR";

                fscene1plan2();

                setTimeout(function() { // Lorsque le plan rapproché visage est terminé...
                    console.log("van ville");
                    scene1.classList.remove("isActive");
                    scene1plan2.classList.remove("isActive");

                    scene2.classList.add("isActive");
                    scene2plan1.classList.add("isActive");

                    currentInteraction = "HOVER";

                    fsceneCombi(0, 130, 12.7);

                    setTimeout(function() { // Lorsque le plan van ville est terminé...
                        console.log("chambre famille");
                        noInteraction();
                        scene2plan1.classList.remove("isActive");
                        currentInteraction = "";

                        setTimeout(function() { // Lorsque le plan chambre famille est terminé...
                            console.log("van neige");
                            scene2.classList.add("isActive");
                            scene2plan1.classList.add("isActive");

                            currentInteraction = "CLIC";

                            fsceneCombi(1, 0, 5.5);

                            setTimeout(function() { // Lorsque le plan van neige est terminé...
                                console.log("jungle");
                                noInteraction();
                                scene2plan1.classList.remove("isActive");
                                currentInteraction = "";

                                setTimeout(function() { // Lorsque le plan jungle est terminé...
                                    console.log("van montagnes");
                                    noInteraction();
                                    currentInteraction = "";

                                    setTimeout(function() { // Lorsque le plan van montagnes est terminé...
                                        console.log("pilule");
                                        noInteraction();
                                        currentInteraction = "";

                                        setTimeout(function() { // Lorsque le plan pilule est terminé...
                                            console.log("psyché");
                                            noInteraction();
                                            currentInteraction = "";

                                            setTimeout(function() { // Lorsque le plan psyché est terminé...
                                                console.log("plage");
                                                noInteraction();
                                                currentInteraction = "";

                                                setTimeout(function() { // Lorsque le plan plage est terminé...
                                                    console.log("van désert");
                                                    noInteraction();
                                                    currentInteraction = "";

                                                    setTimeout(function() { // Lorsque le plan van désert est terminé...
                                                        console.log("concert loin");
                                                        noInteraction();
                                                        currentInteraction = "";

                                                        setTimeout(function() { // Lorsque le plan concert loin est terminé...
                                                            console.log("DJ");
                                                            noInteraction();
                                                            currentInteraction = "";

                                                            setTimeout(function() { // Lorsque le plan DJ est terminé...
                                                                console.log("Dernières falaise");
                                                                noInteraction();
                                                                currentInteraction = "";
                                                            }, 13599);
                                                        }, 15520);
                                                    }, 15280);
                                                }, 15634);
                                            }, 15596);
                                        }, 1770);
                                    }, 13480);
                                }, 15440);
                            }, 7920);
                        }, 7730);
                    }, 15389);
                }, 5597);
            }, 9844);

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

                TweenMax.to(scene1plan1fond1et2, 9, { css: { transform: 'scale(1.06)' }, ease: Linear.easeOut });

                mouseInteraction(currentInteraction);
            }

            /*** SCÈNE 1 - PLAN 2 - ANIMATION BONHOMME FALAISE ***/
            function fscene1plan2() {
                var clearForce = false;
                // Au survol pour le parallax...
                container.addEventListener("mouseover", function(e) {
                    cpt += 6;
                    var idTarget = e.target.id;

                    if (e.target.classList.contains("Scene1Plan2Nuages") && !clearForce) {
                        switch(idTarget) {
                            case "Scene1Plan2NuagesAvant3" :
                                TweenMax.to(e.target, 1, { css: { transform: 'translate(' + cpt + 'px, ' + cpt + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                                break;
                            case "Scene1Plan2NuagesAvant2" :
                                TweenMax.to(e.target, 1, { css: { transform: 'translate(-' + cpt + 'px, -' + cpt + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                                break;
                            case "Scene1Plan2NuagesAvant1" :
                                TweenMax.to(e.target, 1, { css: { transform: 'translate(-' + cpt + 'px, ' + cpt + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                                break;
                            case "Scene1Plan2NuagesArriere2" :
                                TweenMax.to(e.target, 1, { css: { transform: 'translate(' + cpt + 'px, -' + cpt + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                                break;
                            case "Scene1Plan2NuagesArriere1" :
                                TweenMax.to(e.target, 1, { css: { transform: 'translateX(-' + cpt + 'px)' }, ease: Power2.easeOut, overwrite: 'none' });
                        }
                    }

                    mouseInteraction(currentInteraction);
                });

                setTimeout(function() {
                    clearForce = true;
                    TweenMax.to(scene1plan2nuagesavant3, 1, { x: cnv.width+200, y: cnv.height+200, ease: Power4.easeIn, overwrite: 'all' });
                    TweenMax.to(scene1plan2nuagesavant2, 1, { x: -400, y: -400, ease: Power4.easeIn, overwrite: 'all' });
                    TweenMax.to(scene1plan2nuagesavant1, 1, { x: -800, y: cnv.height+100, ease: Power4.easeIn, overwrite: 'all' });

                    TweenMax.to(scene1plan2nuagesarriere2, 1, { x: cnv.width, y: -100, ease: Power4.easeIn, overwrite: 'all' });
                    TweenMax.to(scene1plan2nuagesarriere1, 1, { x: -700, ease: Power4.easeIn, overwrite: 'all' });
                }, 3500);
            }

            /*** SCÈNE 2 - PLAN 1 - ANIMATION DU COMBI ***/
            function fsceneCombi(typeInteraction, position, vitesse) {
                combiAnim(position, vitesse);
                combiHover();
                mouseInteraction(currentInteraction);

                switch(typeInteraction) {
                    case 1 :
                        combiHover();
                        combiClic(position);
                }
            }



            /********************************************************************************************/
            /****************************************** AUTRES ******************************************/
            /********************************************************************************************/

            // Apparition du container
            TweenMax.to(container, 3, {opacity: 1, ease: Linear.easeNone});

            // Disparition du bouton PLAY
            TweenMax.to(playButton, 1, {opacity: 0, onComplete: function() {
                playButton.style.display = "none";
                playButton.style.visibility = "hidden";
            }});

            // Disparition des titres
            TweenMax.to(rakoonTitre, 1, {opacity: 0, onComplete: function() {
                rakoonTitre.style.display = "none";
                rakoonTitre.style.visibility = "hidden";
            }});

            TweenMax.to(trackTitre, 1, {opacity: 0, onComplete: function() {
                trackTitre.style.display = "none";
                trackTitre.style.visibility = "hidden";
            }});

            // Dès que la souris sort de la zone vidéo...
            interactiveContainer.addEventListener("mouseleave", function(e) {   
                noMouseInteraction();
            });

            // Dès que la souris revient dans la zone vidéo...
            interactiveContainer.addEventListener("mouseenter", function(e) {   
                mouseInteraction(currentInteraction);
            });

            // Disparition des overlays
            TweenMax.to(overlayBottom, 0.7, {height: 50 + "px", lineHeight: 57 + "px", ease: Power4.easeIn });
            TweenMax.to(overlayTop, 0.7, {height: 0, ease: Power4.easeIn, onComplete: function() {
                document.querySelector("#overlayTop p").style.display = "none";
            }});

            TweenMax.from(document.querySelector("#overlayTop p"), 0.5, {opacity: 0, ease: Power4.easeIn });
        }
    }

    // Est appelée lorsqu'on arrive à un moment de la vidéo où il n'y a pas d'interaction
    function noInteraction() {
        noScene();
        noPlan();
        noMouseInteraction();
    }
    
    function noScene() {
        scenes.forEach(function(element) {
            element.parentNode.classList.remove("isActive");
        });
    }
    
    function noPlan() {
        plans.forEach(function(element) {
            element.parentNode.classList.remove("isActive");
            //element.classList.remove("isActive");
        });
    }

    function noMouseInteraction() {
        mouse.innerHTML = "";
        mouse.classList.add("differenceMode");
        TweenMax.to(mouse, 0.2, {width: 10, height: 10, ease: Power1.easeOut});
    }

    // Est appelée lorsqu'il y a une interaction
    function mouseInteraction(s) {
        mouse.classList.remove("differenceMode");
        TweenMax.to(mouse, 0.2, {width: 100, height: 100, ease: Power1.easeOut});

        if (s != "") mouse.innerHTML = s;
        else noMouseInteraction();
    }

    function combiAnim(position, vitesse) {
        // Animation du combi
        var tlAvanceCombi = new TimelineLite();
        tlAvanceCombi.set(combi, {x: -1500, y: position})
            .to(combi, 2, {x: -500, transformOrigin: "50% 50%", ease: Power4.easeOut}) // Déplacement en x
            .to(combi, vitesse, {x: 900, transformOrigin: "50% 50%", ease: Linear.easeNone}, "-=1")
            .to(combi, 1, {x: 1400, transformOrigin: "50% 50%", ease: Power4.easeIn})
        TweenMax.to(roueArriere, 2, {rotation: 360, transformOrigin: "50% 50%", repeat: -1, ease: Linear.easeNone});
        TweenMax.to(roueAvant, 2, {rotation: 360, transformOrigin: "50% 50%", repeat: -1, ease: Linear.easeNone});

        var randomRebondCombi = Math.random() * (30-10) + 10;
        var tlRebondCombi = new TimelineMax({repeat: -1});

        tlRebondCombi.to(carrosserie, 0.2, {y: "+=" + randomRebondCombi + "px", ease: Linear.easeNone})
            .to(carrosserie, 0.2, {y: "-=" + randomRebondCombi + "10px", ease: Linear.easeNone});

    }

    function combiHover() {
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
    }

    function combiClic(position) {
        // Au clic sur le container lorsque le combi est présent...
        container.addEventListener("click", function() {
            var tlCombiJump = new TimelineLite();
            tlCombiJump.to(combi, 0.1, {y: -300, ease: Power1.easeOut}).to(combi, 0.2,  {y: position, ease: Back.easeIn, overwrite: "none"});
        });
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

    // Gestion de la souris
    window.onmousemove = function(e) {
        mouse.style.top = e.pageY + "px";
        mouse.style.left = e.pageX + "px";
    };

    iconFullscreen.addEventListener("click", Fullscreen);


    /* View in fullscreen */
    function Fullscreen() {
        if (!fullscreen) {
            fullscreen = true;
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
                document.documentElement.msRequestFullscreen();
            }
        } else {
            fullscreen = false;
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        }
    }
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