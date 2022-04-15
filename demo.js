var up = [];
var down = [];
const maxFloor = 15;
const minFloor = -2;
var direction = true;

function start(startfloor, endfloor) {
    if (startfloor > endfloor) {
        down.push({ startfloor, endfloor, direction })
    } else {
        up.push(startfloor, endfloor, direction)
    }
    console.log("UP --", up);
    console.log("Down --", down);
}

start(5, 6)