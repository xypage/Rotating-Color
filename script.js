let background = document.getElementById("background");

let hue = 0; // not for the user to change
let step = 0.5; // how fast hue changes
let saturation = 100; // 100 is full color, so that's the default
let lightness = 50; // lightness gives black at 0 and white at 100 so 50 is "normal"
function colorSpin() {
    // could just use the `${}` syntax but since this is so simple might as well use something more backwards compatible
    background.style.backgroundColor = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
    // modulo is unnecessary but it keeps the number small even if you run it for a while,
    // which shouldn't actually become an issue, but I'm erring on the side of caution
    hue = (hue + step) % 360; 

}

// runs colorSpin every "delay" milliseconds, calling it again will stop the changing,
// calling it again will start it changing again
let intervalID = null;
let delay = 1; // in milliseconds
function toggle() {
    if(intervalID) {
        clearInterval(intervalID);
        intervalID = null;
    } else {
        intervalID = setInterval(colorSpin, delay);
    }
}

background.onclick = toggle;

toggle();

console.log("There are 4 variables you can change:\n\
\t- `delay`: How many milliseconds between color updates, defaults to 1.\n\
\t- `step`: How fast the hue changes per update, hue is essentially\n\
    \tthe color wheel and it represents degrees, so as it goes from 0-360 it goes\n\
    \taround the wheel and back to where it started.\n\
    \t\t- Since it's wrapping around at 360, having a step between\n\
            \t180 and 360 is essentially the same as that step - 360, in other\n\
            \twords a negative rotation with magnitude < 180, so just making\n\
            \t`step` huge won't make the color change faster.\n\
    \t\t- With delay at 1 (all these examples will assume this), having\n\
            \tstep 0.1 and below the change starts to be slow enough that\n\
            \tyou can't tell it's happening directly right away.\n\
    \t\t- With step at 0.5 (the default), you get a noticeable but still\n\
            \tslow transition across the color wheel.\n\
    \t\t- Having step at 1 gives a pretty fast but\n\
            \toverall smooth slide through the colors.\n\
    \t\t- With step over 8 it starts to look like it's flashing.\n\
    \t\t- The most aggressive strobe (that I've tested)\n\
            \tappears to be when step is 87.\n\
\t- `saturation`: How saturated the color is, 100 is full,\n\
    \t0 is shades of grey, defaults to 100.\n\
\t- `lightness`: How light the color is, 100 is just white, 0 is\n\
    \tjust black, in between you're getting shades of your hue, default is 50.\n\
\nYou can also change `hue` directly, if you have a specific color you want, or a specific place in the wheel you'd like to start.");