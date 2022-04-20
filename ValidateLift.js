var currentLiftstatus = 0;
const maxFloor = 15;
const minFloor = -2;
var LiftObject = [];
var interval;
var person = 0;
var TIMEOUT = 2000;

function runFunc() {
    if (LiftObject.length === 0) {
        clearInterval(interval);
        console.log("isEmpty");
    } else {
        clearInterval(interval);
        liftCore()
    }
}
function DownPickUpDropCall() {
    for (let i = 0; i < LiftObject.length; i++) {
        if (currentLiftstatus == LiftObject[i].startfloor && currentLiftstatus > LiftObject[i].endfloor && LiftObject[i].status == false) {
            console.log("+ 1");
            LiftObject[i].status = true;
            person++;
        }
        else if (currentLiftstatus == LiftObject[i].endfloor && LiftObject[i].status == true) {
            console.log("- 1");
            LiftObject = LiftObject.filter((obj) => obj != LiftObject[i])
            person--;
        }
    }
    console.log("Current Floor : ", currentLiftstatus);
    currentLiftstatus--;
}
function UpPickUpDropCall() {
    for (let i = 0; i < LiftObject.length; i++) {
        if (currentLiftstatus === LiftObject[i].startfloor && currentLiftstatus < LiftObject[i].endfloor) {
            console.log("+ 1");
            LiftObject[i].status = true;
            person++;
        }
        if (currentLiftstatus === LiftObject[i].endfloor && LiftObject[i].status) {
            console.log("- 1");
            LiftObject = LiftObject.filter((obj) => {
                return obj != LiftObject[i];
            });
            person--;
        }
    }
    console.log("Current Floor : ", currentLiftstatus);
    currentLiftstatus++;
}
function up(pickup, drop) {
    for (let i = 0; i < LiftObject.length; i++) {
        if (LiftObject[i].direction > 0) {
            pickup = Math.max(LiftObject[i].startfloor, pickup);
            drop = Math.min(LiftObject[i].endfloor, drop);
        }
    }
    if (currentLiftstatus <= pickup) {
        UpPickUpDropCall();
    } else if (person) {
        for (let i = 0; i < LiftObject.length; i++) {
            if (LiftObject[i].status) {
                drop = Math.max(LiftObject[i].endfloor, drop)
            }
        }
        if (currentLiftstatus <= drop) {
            UpPickUpDropCall();
        }
    } else {
        currentLiftstatus--;
        runFunc();
    }
}
function down(pickup, drop) {
    for (let i = 0; i < LiftObject.length; i++) {
        if (LiftObject[i].direction < 0) {
            pickup = Math.min(LiftObject[i].startfloor, pickup);
            drop = Math.max(LiftObject[i].endfloor, drop);
        }
    }
    if (currentLiftstatus >= pickup) {
        DownPickUpDropCall();
    }
    else if (person) {
        for (let i = 0; i < LiftObject.length; i++) {
            if (LiftObject[i].status) {
                drop = Math.min(LiftObject[i].endfloor, drop)
            }
        }
        if (currentLiftstatus >= drop) {
            DownPickUpDropCall();
        }
    } else {
        currentLiftstatus++;
        runFunc();
    }
}
function liftCore() {
    let pickup = LiftObject[0].startfloor;  //8
    let drop = LiftObject[0].endfloor;   //-2
    let firstDirection = pickup - drop;   //10
    if (currentLiftstatus < pickup) {
        interval = setInterval(() => up(pickup, drop), TIMEOUT);
    }
    else if (currentLiftstatus > pickup) {
        interval = setInterval(() => down(pickup, drop), TIMEOUT)
    } else {
        firstDirection > 0 ? interval = setInterval(() => down(pickup, drop), TIMEOUT) : interval = setInterval(() => up(pickup, drop), TIMEOUT);
    }
}
function LiftTransaction(startfloor, endfloor) {
    let direction = startfloor - endfloor;
    if (startfloor > maxFloor || endfloor > maxFloor || startfloor < minFloor || endfloor < minFloor) {
        console.log("Invalid Floor");
    } else if (startfloor === endfloor) {
        console.log("You are on same floor, Please Enter Another Floor");
    } else if (LiftObject.length === 0) {
        LiftObject.push({
            startfloor: startfloor,
            endfloor: endfloor,
            direction: direction,
            status: false
        })
        liftCore();
    } else {
        LiftObject.push({
            startfloor: startfloor,
            endfloor: endfloor,
            direction: direction,
            status: false,
        })
    }
}

LiftTransaction(0, 10)
LiftTransaction(2, 15)
LiftTransaction(0, -1)
LiftTransaction(-2, 5)
LiftTransaction(5, 3)   // Not working
LiftTransaction(13, 6)  // Not working
LiftTransaction(1, 10)
LiftTransaction(10, 2)  // Not working
LiftTransaction(8, -2) // Not working
LiftTransaction(-2, 4)
LiftTransaction(9, 15)
LiftTransaction(7, 5)
LiftTransaction(-2, -1)
LiftTransaction(5, 7)