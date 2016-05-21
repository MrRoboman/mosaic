/// (C) Ken Fyrstenberg Nilsen, Abdias Software, CC3.0-attribute.
var ctx = canvas.getContext('2d'),
    img = new Image(),
    play = false;

/// turn off image smoothing - this will give the pixelated effect
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

// img.crossOrigin = "Anonymous";

/// wait until image is actually available
img.onload = pixelate;

/// some image, we are not struck with CORS restrictions as we
/// do not use pixel buffer to pixelate, so any image will do
img.src = 'apples-marked.jpg';

/// MAIN function
function pixelate(v) {

    /// if in play mode use that value, else use slider value
    var size = (play ? v : blocks.value) * 0.01,

        /// cache scaled width and height
        w = canvas.width * size,
        h = canvas.height * size;

        // for overlay
        // ctx.globalAlpha = 1;

    /// draw original image to the scaled size
    ctx.drawImage(img, 0, 0, w, h);

    /// then draw that scaled image thumb back to fill canvas
    /// As smoothing is off the result will be pixelated
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

    // overlay
    // ctx.globalAlpha = 0.2;
    // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

/// This runs the demo animation to give an impression of
/// performance.
function toggleAnim() {

    /// limit blocksize as we don't want to animate tiny blocks
    var v = Math.min(25, parseInt(blocks.value, 10)),
        dx = 0.5; /// "speed"

    /// toggle play flag set by button "Animate"
    play = !play;

    /// and update button's text
    animate.value = play ? 'Stop' : 'Animate';

    /// if in play mode start loop
    if (play === true) anim();

    /// animation loop
    function anim() {

        /// increase or decrease value
        v += dx;

        /// if at min or max reverse delta
        if (v <= 1 || v > 25) dx = -dx;

        /// pixelate image with current value
        pixelate(v);

        /// loop
        if (play === true) requestAnimationFrame(anim);
    }
}

/// event listeneners for slider and button
blocks.addEventListener('change', pixelate, false);
animate.addEventListener('click', toggleAnim, false);



canvas.addEventListener("mousemove", function(e) {
    // var pos = findPos(this); console.log(pos);
    var x = e.pageX;
    var y = e.pageY;
    var coord = "x=" + x + ", y=" + y;
    var c = canvas.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data;
    console.log(p[0],p[1],p[2]);
    // var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    // console.log(hex);
    // $('#status').html(coord + "<br>" + hex);
});





/// poly-fill for requestAnmationFrame with fallback for older
/// browsers which do not support rAF.
window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
