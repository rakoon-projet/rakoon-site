onload=function(){var e,t,s=document.querySelector("canvas"),n=s.getContext("2d"),a=document.getElementById("container"),o=(document.getElementById("interactive-container"),!1),r=document.createElement("video"),i=document.querySelector(".scene"),c=document.querySelector(".plan"),d=document.getElementById("scene1"),l=document.getElementById("scene2"),u=document.querySelector("#scene1 #plan1"),m=(document.querySelector("#scene1 #plan2"),document.querySelector("#scene2 #plan1")),g=(document.getElementById("svg-falaise"),document.getElementById("Scene1Plan1Fond1")),v=document.getElementById("Scene1Plan1Fond2"),w=document.getElementById("Scene1Plan1Fond1et2"),p=(document.getElementById("Scene1Plan1Fond3"),document.getElementById("Scene1Plan1NuagesArriere1")),y=document.getElementById("Scene1Plan1NuagesArriere2"),x=document.getElementById("Scene1Plan1NuagesArriere3"),f=document.getElementById("Scene1Plan1NuagesAvant1"),h=document.getElementById("Scene1Plan1NuagesAvant2"),E=document.getElementById("Scene1Plan1NuagesAvant3"),L=document.getElementById("Scene1Plan1NuagesAvant4"),T=document.getElementById("Scene1Plan1NuagesAvant5"),I=document.getElementById("Scene1Plan1NuagesAvant6"),P=document.querySelector("#Combi"),M=document.querySelector("#Carrosserie"),B=document.getElementById("roueArriere"),A=document.getElementById("roueAvant"),b=document.getElementById("playButton");r.src="assets/video/ours-1.mp4",r.autoPlay=!1,r.loop=!1,r.muted=!1,r.setAttribute("width",a.offsetWidth),r.setAttribute("height",a.offsetHeight),t={video:r,ready:!1},s.width=r.width,s.height=r.height,b.addEventListener("click",function(){if(!0===t.ready){console.log(r.currentTime),a.addEventListener("mouseover",function(e){var t=e.pageX,n=e.pageY,a=0,o=0;a=s.width/2-t,o=s.height/2-n,TweenMax.to(g,2,{css:{transform:"translateX("+a/17+"px) translateY("+o/17+"px)"},ease:Power2.easeOut,overwrite:"none"}),TweenMax.to(v,2,{css:{transform:"translateX("+a/30+"px) translateY("+o/30+"px)"},ease:Power2.easeOut,overwrite:"none"}),TweenMax.to(T,2,{css:{transform:"translateX("+a/6+"px) translateY("+o/6+"px)"},ease:Power2.easeOut,overwrite:"none"}),TweenMax.to(f,2,{css:{transform:"translateX("+a/6+"px) translateY("+o/6+"px)"},ease:Power2.easeOut,overwrite:"none"}),TweenMax.to(L,2,{css:{transform:"translateX("+a/6+"px) translateY("+o/6+"px)"},ease:Power2.easeOut,overwrite:"none"}),TweenMax.to(E,2,{css:{transform:"translateX("+a/10+"px) translateY("+o/10+"px)"},ease:Power2.easeOut,overwrite:"none"}),TweenMax.to(I,2,{css:{transform:"translateX("+a/10+"px) translateY("+o/10+"px)"},ease:Power2.easeOut,overwrite:"none"}),TweenMax.to(h,2,{css:{transform:"translateX("+a/15+"px) translateY("+o/15+"px)"},ease:Power2.easeOut,overwrite:"none"}),TweenMax.to(y,2,{css:{transform:"translateX("+a/30+"px) translateY("+o/30+"px)"},ease:Power2.easeOut,overwrite:"none"}),TweenMax.to(x,2,{css:{transform:"translateX("+a/30+"px) translateY("+o/30+"px)"},ease:Power2.easeOut,overwrite:"none"}),TweenMax.to(p,2,{css:{transform:"translateX("+a/60+"px) translateY("+o/60+"px)"},ease:Power2.easeOut,overwrite:"none"})}),TweenMax.to(w,7,{css:{transform:"scale(1.06)"},ease:Linear.easeOut}),t.video.paused&&!o&&t.video.play(),e=setInterval(function(){n.drawImage(t.video,0,0,t.video.width,t.video.height)},20),d.classList.add("isActive"),u.classList.add("isActive"),setTimeout(function(){console.log(r.currentTime),i.classList.remove("isActive"),c.classList.remove("isActive"),setTimeout(function(){console.log(r.currentTime),d.classList.remove("isActive"),l.classList.add("isActive"),m.classList.add("isActive"),function(){TweenMax.to(P,10,{x:"700px",transformOrigin:"50% 50%",repeat:-1,ease:Linear.easeNone}),TweenMax.to(B,2,{rotation:360,transformOrigin:"50% 50%",repeat:-1,ease:Linear.easeNone}),TweenMax.to(A,2,{rotation:360,transformOrigin:"50% 50%",repeat:-1,ease:Linear.easeNone});var e=20*Math.random()+10;new TimelineMax({repeat:-1}).to(M,.2,{y:"+="+e+"px",ease:Linear.easeNone}).to(M,.2,{y:"-="+e+"10px",ease:Linear.easeNone}),P.addEventListener("mouseover",function(e){e.target.classList.contains("blueGradient")?(e.target.classList="",e.target.classList.add("st44")):(e.target.classList="",e.target.classList.add("st45"),e.target.classList.add("blueGradient"))}),a.addEventListener("click",function(){var e=new TimelineLite;e.to(P,.1,{y:-300,ease:Power1.easeOut}).to(P,.2,{y:300,ease:Back.easeIn})})}()},7500)},7500),TweenMax.to(a,3,{opacity:1,ease:Linear.easeNone}),TweenMax.to(b,1,{opacity:0,onComplete:function(){b.style.display="none",b.style.visibility="hidden"}})}}),t.video.oncanplaythrough=function(){console.log("video prete"),t.ready=!0},t.video.onplaying=function(){!(o=!0)},t.video.onpause=function(){!(o=!1),clearInterval(e)},r.onerror=function(){document.body.removeChild(s),document.body.innerHTML+="<h2>There is a problem loading the video</h2><br>",document.body.innerHTML+="Users of IE9+ , the browser does not support WebM videos used by this demo",document.body.innerHTML+="<br><a href='https://tools.google.com/dlpage/webmmf/'> Download IE9+ WebM support</a> from tools.google.com<br> this includes Edge and Windows 10"},window.onresize=function(){r.setAttribute("width",a.offsetWidth),r.setAttribute("height",a.offsetHeight),s.width=r.width,s.height=r.height}};