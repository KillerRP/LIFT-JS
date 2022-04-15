var currentLiftstatus = 0;
const maxFloor = 15;
const minFloor = -2;
var LiftObject = [];
var interval;

const personDirection = (startfloor, endfloor) => {
    // startfloor < endfloor ? "up" : "down"    why this is not working?
    if (startfloor < endfloor) {
        return "up";
    } else {
        return "down";
    }

}
const liftDirection = (pickup) => {
    if (currentLiftstatus < pickup) {
        return "up";
    } else {
        return "down";
    }
}

function lift(pickup, drop) {
    //checks if person direction is up && check if lift floor is less than drop (lift is going up and check if drop floor is also greater than current floor)
    if (drop > pickup && currentLiftstatus <= drop) {
        // console.log("going up");
        console.log("Current Floor : ", currentLiftstatus);
        for (let i = 0; i < LiftObject.length; i++) {
            // Check if anyone also want to go up and lift direction is also up then take him.
            if (
                currentLiftstatus == LiftObject[i].startfloor &&
                LiftObject[i].endfloor > currentLiftstatus &&
                LiftObject[i].personStatus == false
            ) {
                console.log("Take Him Also");
                LiftObject[i].personStatus = true;
            }
            // Check if anyone also has same drop floor then drop him.
            if (LiftObject[i].personStatus && LiftObject[i].endfloor == currentLiftstatus) {
                //removes the person 
                LiftObject = LiftObject.filter((person) => {
                    return person != LiftObject[i];
                });
                console.log(LiftObject);
                console.log("Drop him too.");
            }
        }
        currentLiftstatus++
    } else if (drop < pickup && currentLiftstatus >= drop) {
        console.log("Current Floor:", currentLiftstatus);
        for (let i = 0; i < LiftObject.length; i++) {
            if (
                currentLiftstatus == LiftObject[i].startfloor &&
                currentLiftstatus > LiftObject[i].endfloor &&
                !LiftObject[i].personStatus
            ) {
                LiftObject[i].personStatus = true; //adds new pickup if drop point is down
                console.log("NEW PICKUP AT THIS FLOOR ");
                console.log("door open");
            }
            if (LiftObject[i].personStatus && LiftObject[i].endfloor === currentLiftstatus) {
                //removes the perosn
                LiftObject = LiftObject.filter((perosn) => {
                    return perosn != LiftObject[i];
                });
                console.log(LiftObject);
                console.log("Drop him...");
            }
        }
        currentLiftstatus--;
    } else {
        if (currentLiftstatus - 1 === drop) {
            currentLiftstatus = drop;
            // removes first object if status is true
            if (LiftObject.length !== 0) {
                if (LiftObject[0].personStatus) {
                    LiftObject.shift();
                }
            }

            if (LiftObject.length === 0) {
                // console.log("lift is on ", currentLiftstatus, "fpickup");
                clearInterval(interval);
            } else {
                clearInterval(interval);
                liftCall();
            }
        }
        if (currentLiftstatus + 1 === drop) {
            currentLiftstatus = drop;
            if (LiftObject.length !== 0) {
                if (LiftObject[0].personStatus) {
                    LiftObject.shift();
                }
            }
            // console.log(LiftObject);

            if (LiftObject.length === 0) {
                // console.log("lift in on ", currentLiftstatus, "fpickup");
                // console.log("door open");
                clearInterval(interval);
            } else {
                clearInterval(interval);
                liftCall();
            }
        }
    }

}
function gotakeHim(pickup, drop) {
    // console.log("test");
    if (currentLiftstatus < pickup) {

        console.log("Current Floor : ", currentLiftstatus);
        if (currentLiftstatus == pickup) {
            console.log("Please Get in...");
            LiftObject.personStatus = true;
            // clearInterval(interval)
            dropHim(pickup, drop)
        }
        currentLiftstatus += 1
    } else {
        currentLiftstatus = pickup;
        console.log("Current Floor : ", currentLiftstatus);
        clearInterval(interval);
        console.log("Please Get in...");
        interval = setInterval(() => {
            lift(pickup, drop);
        }, 2000);
    }

}

function dropHim(pickup, drop) {
    if (currentLiftstatus > pickup) {

        console.log("Current Floor : ", currentLiftstatus);
        console.log(LiftObject);

        for (let i = 0; i < LiftObject.length; i++) {
            if (
                currentLiftstatus == LiftObject[i].startfloor &&
                currentLiftstatus > LiftObject[i].endfloor
            ) {
                LiftObject[i].personStatus = true; //adds new pickup if drop point is down
            }
        }
        currentLiftstatus -= 1;
    } else {
        currentLiftstatus = pickup;
        // console.log("lift is on ", currentLiftstatus, "fpickup ");
        clearInterval(interval);
        console.log("Please Get in..");
        LiftObject = setInterval(() => {
            lift(pickup, drop);
        }, 2000);
    }
}

function liftCall() {
    let pickup = LiftObject[0].startfloor;
    let drop = LiftObject[0].endfloor;
    // let liftD = liftDirection(pickup);
    // let firstDirection = LiftObject[0].direction;
    // console.log(liftD);


    if (LiftObject[0].personStatus) {
        interval = setInterval(() => {
            lift(pickup, drop);
        }, 2000);
    } else if (pickup < 0) {
        interval = setInterval(() => {
            dropHim(pickup, drop)
        }, 2000);
    } else if (currentLiftstatus !== 0 && currentLiftstatus !== pickup) {
        if (currentLiftstatus <= pickup) {
            interval = setInterval(() => {
                //send the lift to pickup point
                gotakeHim(pickup, drop);
            }, 2000);
        } else {
            interval = setInterval(() => {
                //send the lift to pickup point
                dropHim(pickup, drop);
            }, 2000);
        }
    } else {
        interval = setInterval(() => {
            //send the lift to drop point
            lift(pickup, drop);
        }, 2000);
    }
}

function liftTransaction(startfloor, endfloor) {
    let direction = personDirection(startfloor, endfloor)
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
            personStatus: false
        })
        liftCall()
    } else {
        LiftObject.push({
            startfloor: startfloor,
            endfloor: endfloor,
            direction: direction,
            personStatus: false
        })
    }
}

liftTransaction(1, 5);
liftTransaction(3, 6);
// liftTransaction(-2, 8);

// liftTransaction(2, 5);
// liftTransaction(2, 5);
