            // Capture d'images extraites d'une vidéo à intervalles réguliers


            onload = function () {
                // Initializing values
                var onplaying = false;
                var onpause = false;
                //var mediaSource = "http://video.webmfiles.org/big-buck-bunny_trailer.webm";
                var mediaSource = "assets/video/Shimo.mp4";
                var videoContainer; // object to hold video and associated info
                var video = document.createElement("video"); // create a video element
                video.src = mediaSource;
                // the video will now begin to load.
                // As some additional info is needed we will place the video in a
                // containing object for convenience
                video.autoPlay = false; // ensure that the video does not auto play
                video.loop = true; // set the video to loop.
                video.muted = false;
                videoContainer = {  // we will add properties as needed
                    video : video,
                    ready : false,
                };

                videoContainer.video.pause();



                var si;
                //var vid = document.querySelector('#vid1');
                var roueArriere = document.querySelector('#Roue_x5F_Arriere');
                var roueAvant = document.querySelector('#Roue_x5F_Avant');

                //var div = document.querySelector('#video-container');
                //var vid = document.createElement("<video id='vid1' controls='controls'><source src='http://video.webmfiles.org/big-buck-bunny_trailer.webm' /></video>");
                var cnv = document.querySelector('canvas');
                var ctxt = cnv.getContext('2d');
                //div.appendChild(cnv); // et ajout au DOM





                // On video playing toggle values
                videoContainer.video.onplaying = function() {
                    onplaying = true;
                    onpause = false;
                    console.log("onplaying");
                };

                // On video pause toggle values
                videoContainer.video.onpause = function() {
                    onplaying = false;
                    onpause = true;
                    console.log("onpause");
                };

                // Play video function
                function playVid() {
                    if (video.paused && !onplaying) {
                        videoContainer.video.play();
                        console.log("playVid");
                    }
                }

                // Pause video function
                function pauseVid() {
                    if (!video.paused && !onpause) {
                        videoContainer.video.pause();
                        console.log("pauseVid");
                    }
                }

                //pauseVid();



                videoContainer.video.oncanplay = function() {

                    /*cnv.width = video.videoWidth;
                    cnv.height = video.videoHeight;*/

                    /*video.videoWidth = cnv.width;
                    video.videoHeight= cnv.height;*/

                    video.videoWidth = 1020;
                    video.videoHeight= 300;

                    videoContainer.ready = true;

                    playVid();

                    //videoContainer.video.play();
                    TweenMax.to(roueArriere, 2, {rotation: 360, transformOrigin:"50% 50%", repeat: -1, ease:Linear.easeNone});

                    TweenMax.to(roueAvant, 2, {rotation: 360, transformOrigin:"50% 50%", repeat: -1, ease:Linear.easeNone});

                    var van = document.querySelector('#Van');
                    var carrosserie = document.querySelector('#Carrosserie');
                    var animation = new TimelineMax({repeat: -1});

                    var randomRebond = Math.random() * (30 - 10) + 10;

                    animation.to(carrosserie, 0.2, {y: "+=" + randomRebond + "px", ease:Linear.easeNone})
                        .to(carrosserie, 0.2, {y: "-=" + randomRebond + "10px", ease:Linear.easeNone});

                    van.addEventListener("click", function() {
                        document.querySelector("path.st8").style.fill = "url(#SVGID_6_)";
                        document.querySelector("path.st7").style.fill = "url(#SVGID_7_)";
                    });



                    //cnv.width = 640;
                    //cnv.height = 360;
                    si = setInterval(function() {
                        // Récupère la frame de la vidéo dans le canevas
                        //
                        ctxt.drawImage(videoContainer.video, 0, 0);
                        // Ajoute l'image obtenue au div
                        //
                        //var i = new Image();
                        //i.src = cnv.toDataURL('image/png');
                        //div.appendChild(i);

                    }, 20);
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
                context: ctxt, // the canvas context
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
                };

                video.onpause = function() {
                    clearInterval(si);
                };

                // To handle errors. This is not part of the example at the moment. Just fixing for Edge that did not like the ogv format video
                video.onerror = function(e){
                    document.body.removeChild(cnv);
                    document.body.innerHTML += "<h2>There is a problem loading the video</h2><br>";
                    document.body.innerHTML += "Users of IE9+ , the browser does not support WebM videos used by this demo";
                    document.body.innerHTML += "<br><a href='https://tools.google.com/dlpage/webmmf/'> Download IE9+ WebM support</a> from tools.google.com<br> this includes Edge and Windows 10";

                }


            };




