var currentLiftstatus = 0;
const maxFloor = 15;
const minFloor = -2;
var LiftObject = [];
var interval;
var person = 0;
// return person's Direction
const personDirection = (pickupLocation, dropLocation) => {
    if (pickupLocation < dropLocation) {
        return "up";
    } else {
        return "down";
    }
};

function runFunc() {
    if (LiftObject.length === 0) {
        console.log("isEmpty");
    } else {
        liftCore()
    }
}

function up(pickup, drop) {
    for (let i = 0; i < LiftObject.length; i++) {
        if (LiftObject[i].direction > 0) {
            pickup = Math.max(LiftObject[i].startfloor, pickup);
            drop = Math.min(LiftObject[i].endfloor, drop);
        }
    }

    if (currentLiftstatus <= pickup) {
        for (let i = 0; i < LiftObject.length; i++) {
            if (currentLiftstatus === LiftObject[i].startfloor && currentLiftstatus < LiftObject[i].endfloor) {
                console.log("Please Get in : ", currentLiftstatus);
                LiftObject[i].status = true;
                person++;
            }
            if (currentLiftstatus === LiftObject[i].endfloor && LiftObject[i].startfloor == true) {
                console.log("Reached : ", currentLiftstatus);
                LiftObject = LiftObject.filter((obj) => {
                    return obj != LiftObject[i];
                });
                person--;
            }
        }
        console.log("Current Floor : ", currentLiftstatus);
        currentLiftstatus++;
    } else if (person) {
        // If Person still in Lift Then 
        for (let i = 0; i < LiftObject.length; i++) {
            // Assign Max Drop Location is status is true
            if (LiftObject[i].status) {
                drop = Math.max(LiftObject[i].endfloor, drop)
            }
        }
        if (currentLiftstatus <= drop) {
            for (let i = 0; i < LiftObject.length; i++) {
                if (currentLiftstatus === LiftObject[i].startfloor && currentLiftstatus < LiftObject[i].endfloor) {
                    console.log("Please Get in : ", currentLiftstatus);
                    LiftObject[i].status = true;
                    person++;
                }
                if (currentLiftstatus === LiftObject[i].endfloor && LiftObject[i].status) {
                    console.log("Please Get out : ", currentLiftstatus);
                    LiftObject = LiftObject.filter((obj) => {
                        return obj != LiftObject[i];
                    });
                    person--;
                }
            }
            console.log("Current Floor : ", currentLiftstatus);
            currentLiftstatus++;
        }

    } else {
        currentLiftstatus--;
        clearInterval(interval);
        runFunc();
    }

}

function down(pickup, drop) {
    console.log("down call");
    if (pickup < 0 && LiftObject[0].status == true && LiftObject[0].direction == "up") {
        // console.log("test");
        for (let i = 0; i < LiftObject.length; i++) {
            if (currentLiftstatus == LiftObject[i].endfloor && LiftObject[i].direction == "up" && LiftObject[i] == true) {
                console.log("Please Get Out :", currentLiftstatus);
                LiftObject = LiftObject.filter((ele) => ele != LiftObject[i])
                console.log(LiftObject);
                clearInterval(interval);
            }
        }
        currentLiftstatus++;
        console.log("Current Floor : ", currentLiftstatus);
        // console.log("person is in and waiting for up");
    } else if (pickup > 0 && LiftObject[0].status == false) {
        // console.log("test");
        for (let i = 0; i < LiftObject.length; i++) {
            if (currentLiftstatus == LiftObject[i].startfloor && LiftObject[i].direction == "down" && LiftObject[i].status == false) {
                LiftObject[0].status = true
                console.log("Please Get in : ", currentLiftstatus);
            }
        }
        console.log("Current Floor : ", currentLiftstatus);
        currentLiftstatus++;
    } else if (pickup > 0 && LiftObject[0].status) {
        // console.log("test");
        for (let i = 0; i < LiftObject.length; i++) {
            if (currentLiftstatus == LiftObject[i].endfloor && LiftObject[i].status == true && LiftObject[i].direction == "down") {
                console.log("Please Get out :", currentLiftstatus);
                LiftObject = LiftObject.filter((ele) => ele != LiftObject[i])
                console.log(LiftObject);
                clearInterval(interval)
            }
        }
        currentLiftstatus--
        console.log("Current Floor : ", currentLiftstatus);
    } else if (pickup <= 0 && LiftObject[0].direction == "down" && LiftObject[0].status == false) {
        // console.log("test");
        for (let i = 0; i < LiftObject.length; i++) {

            if (currentLiftstatus == LiftObject[i].startfloor && LiftObject[0].status == false) {
                console.log("Please Get in :", currentLiftstatus);
                LiftObject[0].status = true;
                // clearInterval(interval)
            }
            if (currentLiftstatus == LiftObject[i].endfloor && LiftObject[i].status) {
                console.log("Reached :", currentLiftstatus);
                LiftObject = LiftObject.filter((ele) => ele != LiftObject[i])
                console.log(LiftObject);
                // LiftObject[0].status = true;
                clearInterval(interval)
            }
        }

        console.log("Current Floor : ", currentLiftstatus);
        currentLiftstatus -= 1;
    } else {
        console.log("Down fun");
    }
}

function liftCore() {
    let pickup = LiftObject[0].startfloor;
    let drop = LiftObject[0].endfloor;
    let firstDirection = LiftObject[0].direction;
    let lastfloor;
    // UP CALLS
    if (firstDirection == "up" && currentLiftstatus < pickup) {
        for (let i = 0; i < LiftObject.length; i++) {
            lastfloor = Math.max(LiftObject[i].endfloor, drop)
        }
        interval = setInterval(() => {
            up(pickup, lastfloor)
        }, 2000)
    }
    if (firstDirection == "up" && currentLiftstatus > pickup) {
        interval = setInterval(() => {
            down(pickup, drop)
        }, 2000)
    }
    if (firstDirection == "up" && currentLiftstatus == pickup) {
        interval = setInterval(() => {
            up(pickup, drop)
        }, 2000)
    }

    // DOWN CALLS
    if (firstDirection == "down" && currentLiftstatus < pickup) {

        interval = setInterval(() => {
            up(pickup, drop)
        }, 2000)
    }
    if (firstDirection == "down" && currentLiftstatus > pickup) {
        // console.log("test");
        interval = setInterval(() => {
            down(pickup, drop)
        }, 2000)
    }
    if (firstDirection == "down" && currentLiftstatus == pickup) {
        // console.log("test");
        interval = setInterval(() => {
            down(pickup, drop)
        }, 2000)
    }
}



function LiftTransaction(startfloor, endfloor) {
    let direction = personDirection(startfloor, endfloor);
    // validate params
    if (
        startfloor > maxFloor ||
        endfloor > maxFloor ||
        startfloor < minFloor ||
        endfloor < minFloor
    ) {
        console.log("Invalid Floor");
    } else if (startfloor === endfloor) {
        console.log("You are on same floor, Please Enter Another Floor");
    } else if (LiftObject.length === 0) {
        LiftObject.push({
            startfloor: startfloor,
            endfloor: endfloor,
            direction: direction,
            status: false,
        })
        liftCore()
    } else {
        LiftObject.push({
            startfloor: startfloor,
            endfloor: endfloor,
            direction: direction,
            status: false,
        })
    }
}

LiftTransaction(2, 8)
LiftTransaction(4, 5)
LiftTransaction(-2, 6)

// LiftTransaction(2, 1)
// LiftTransaction(6, 2)
// LiftTransaction(-2, 5)

// LiftTransaction(0, -1) // Not Working
// LiftTransaction(0, 5)
// LiftTransaction(2, 8)
// LiftTransaction(4, 8)
// LiftTransaction(-2, -1)  // Not Wroking
// LiftTransaction(-2, 5) // Not Working
// LiftTransaction(5, 3)  //Working but fix 
// LiftTransaction(13, 6) //Working but fix
// LiftTransaction(1, 10)
// LiftTransaction(10, 2) //Working but fix
// LiftTransaction(-2, 4)
// LiftTransaction(8, -2)
// LiftTransaction(9, 15)
// LiftTransaction(7, 5)
// LiftTransaction(5, 7) 