// const submitbtn = document.getElementById("submitbtn");
// const StartFloorNo = document.querySelector("#startfloor");
// const EndFloorNo = document.querySelector("#endfloor");
var currentLiftstatus = 0;
const maxFloor = 15;
const minFloor = -2;
var LiftObject = [];
var upList = [];
var downList = [];
var interval;

// return person's Direction
const personDirection = (pickupLocation, dropLocation) => {
    if (pickupLocation < dropLocation) {
        return "up";
    } else {
        return "down";
    }
};
function removeDuplicate(array) {
    let unique = {};
    array.forEach(function (i) {
        if (!unique[i]) {
            unique[i] = true;
        }
    });
    return Object.keys(unique);
}
function doorOpen(currentLiftstatus) {
    console.log("Open Door : ", currentLiftstatus);
}
function up() {
    if (upList[0] < 0) {
        if (upList[0] == -2) {
            console.log("Current Floor : ", currentLiftstatus);
            currentLiftstatus -= 1;
            // console.log("Basement");

            if (upList[0] == currentLiftstatus) {
                doorOpen(currentLiftstatus)
                upList.shift();
                // console.log(upList);
            }
        }
        if (upList[0] == -1 && upList[0] > currentLiftstatus) {
            console.log("Current Floor : ", currentLiftstatus);
            currentLiftstatus += 1;
            // console.log("Basement");

            if (upList[0] == currentLiftstatus) {
                doorOpen(currentLiftstatus)
                upList.shift();
                // console.log(upList);
            }
        }

        // console.log("Current Floor : ", currentLiftstatus);
        // currentLiftstatus -= 1;
        // console.log("Basement");

        if (upList[0] == currentLiftstatus) {
            doorOpen(currentLiftstatus)
            upList.shift();
            // console.log(upList);
        }

    } else {
        console.log("Current Floor : ", currentLiftstatus);
        currentLiftstatus += 1;
        if (upList.some((v) => v == currentLiftstatus)) {
            doorOpen(currentLiftstatus)
            upList.shift();
            // console.log(upList);
        }

    }
}
function down() {
    if (currentLiftstatus > downList[0]) {
        // console.log("--");
        console.log("Current Floor : ", currentLiftstatus);
        currentLiftstatus -= 1;
        // // console.log("Basement");

        if (downList[0] == currentLiftstatus) {
            doorOpen(currentLiftstatus)
            downList.shift();
            console.log(downList);
        }

    } else {
        // console.log("++");
        console.log("Current Floor : ", currentLiftstatus);
        currentLiftstatus += 1;
        if (downList[0] == currentLiftstatus) {
            doorOpen(currentLiftstatus)
            downList.shift();
            // console.log(upList);
        }

    }
}
function lift() {
    let firstDirection = LiftObject[0].direction;
    console.log("UP LIST -", upList);
    if (upList.length === 0 && downList.length === 0) {
        console.log("The End");
        clearInterval(interval)
    } else {
        // UP
        if (firstDirection == "up") {
            if (upList.length) {
                up()
            } else {
                down()
            }
        }

        // DOWN
        if (firstDirection == "down") {
            if (downList.length) {
                down()
            } else {
                up()
            }
        }
    }
}

/**
 * Lift Call Function.
 *
 * @param {number} startfloor Please tell us Where you are.
 * @param {number} endfloor Please Enter Where you want to go.
 * @return Send Lift For Pickup and Drop.
 */
function LiftTransaction(startfloor, endfloor) {
    let direction = personDirection(startfloor, endfloor);
    if (
        startfloor > maxFloor ||
        endfloor > maxFloor ||
        startfloor < minFloor ||
        endfloor < minFloor
    ) {
        console.log("Invalid Floor");
    } else if (startfloor === endfloor) {
        console.log("You are on same floor, Please Enter Another Floor");
    } else {
        LiftObject.push({
            startfloor: startfloor,
            endfloor: endfloor,
            direction: direction,
            status: false,
        })
        if (startfloor > endfloor) {
            downList.push({ startfloor, endfloor, statusbar: false })
        } else {
            upList.push({ startfloor, endfloor, statusbar: false })
        }
        upList.sort(function (a, b) { return a - b })
        downList.sort(function (a, b) { return a - b })
        upList = removeDuplicate(upList)
        downList = removeDuplicate(downList)
        upList.sort(function (a, b) { return a - b })
        downList.sort(function (a, b) { return a - b })
        downList.reverse(function (a, b) { return a - b })
        console.log(LiftObject);
    }
}

LiftTransaction(0, -1)
LiftTransaction(0, 10)
LiftTransaction(2, 15)
LiftTransaction(-2, 5)
LiftTransaction(5, 3)
LiftTransaction(13, 6)
LiftTransaction(1, 10)
LiftTransaction(10, 2)
LiftTransaction(-2, 4)
LiftTransaction(8, -2)
LiftTransaction(9, 15)
LiftTransaction(7, 5)
LiftTransaction(-2, -1)
LiftTransaction(5, 7)
// up
// LiftTransaction()
// LiftTransaction(0, 10)
// LiftTransaction(2, 15)
// LiftTransaction(-2, 5)
// LiftTransaction(1, 10)
// LiftTransaction(-2, 4)
// LiftTransaction(9, 15)
// LiftTransaction(-2, -1)
// LiftTransaction(5, 7)
// down
// LiftTransaction(0, -1)
// LiftTransaction(7, 5)
// LiftTransaction(10, 2)
// LiftTransaction(8, -2)
// LiftTransaction(13, 6)
// LiftTransaction(5, 3)

// Invalid Floors
// LiftTransaction(13, 13)  // same floor
// LiftTransaction(16, 16)  // invalid floor
// LiftTransaction(0, 20)  // invalid floor
// LiftTransaction(-3, 0)  // invalid floor
// LiftTransaction(10, 10)  // same floor
// LiftTransaction(20, 20) //invalid floor

interval = setInterval(() => {
    lift()
}, 1000)