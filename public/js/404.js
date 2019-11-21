//Logic refered from https://codepen.io/P3R0/pen/MwgoKv
var matrix = document.getElementById("matrix");
var ctx = matrix.getContext("2d");

// Go FULL screen
matrix.height = window.innerHeight;
matrix.width = window.innerWidth;

// var rain = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑"+ // NOW ALL OF CHINA WILL KNOW
//            "ウェブサイトのメンテナスの下でただいまメナス中です只今メテナス中です"; // JAPAN
//rain = rain.split(""); // array
var rain = ["4","0"];

var fontSize = 24;
var columns = matrix.width/fontSize; // number of columns to fill the screen
var drops = [];

for(var x = 0; x < columns; x++) {
    drops[x] = 1;
}

// draw function
function draw() {
    // black BG
    // translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, matrix.width, matrix.height);

    ctx.fillStyle = "#0f0"; // green rain
    ctx.font = fontSize + "px arial";

    // drop loop
    for(i = 0; i < drops.length; i++) {
        //var text = rain[Math.floor(Math.random() * rain.length)]; // random rain char
        var text = rain[i%2]; 
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);

        // restart drop
        if(drops[i]*fontSize > matrix.height && Math.random() > 0.990) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(draw, 40);