var currentLiftstatus = 0;
const maxFloor = 15;
const minFloor = -2;
var LiftObject = [];
var interval;
var person = 0;
var TIMEOUT = 1000;
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
            // drop = Math.min(LiftObject[i].endfloor, drop);
        }
    }
    if (currentLiftstatus <= pickup) {  // 0-5
        for (let i = 0; i < LiftObject.length; i++) {
            // console.log(LiftObject[i]);
            if (currentLiftstatus === LiftObject[i].startfloor && LiftObject[i].status == null) {
                console.log("Please Get in : ", currentLiftstatus);
                LiftObject[i].status = true;
                person++;
                console.log("PERSON : ", person);
            }
            // console.log(`${currentLiftstatus} == ${LiftObject[i].endfloor} == ${LiftObject[i].status}`);
            if (currentLiftstatus === LiftObject[i].endfloor && LiftObject[i].status == true) {
                console.log("Reached : ", currentLiftstatus);
                LiftObject[i].status = false
                LiftObject = LiftObject.filter((obj) => {
                    return obj != LiftObject[i];
                });
                person--;
                // console.log("MINUS PERSON : ", person);
            }
        }
        console.log("Current Floor : ", currentLiftstatus);
        currentLiftstatus++;
    } else if (person) {
        for (let i = 0; i < LiftObject.length; i++) {
            // Assign Max Drop Location is status is true
            if (LiftObject[i].status) {
                drop = Math.max(LiftObject[i].endfloor, drop)
            }
        }
        // console.log("DROP", drop);
        if (currentLiftstatus <= drop) {
            for (let i = 0; i < LiftObject.length; i++) {
                if (currentLiftstatus === LiftObject[i].startfloor && currentLiftstatus < LiftObject[i].endfloor) {
                    console.log("Please Get in : ", currentLiftstatus);
                    LiftObject[i].status = true;
                    person++;
                }
                // console.log(`${currentLiftstatus} == ${LiftObject[i].endfloor} == ${LiftObject[i].status} == null`);
                if (currentLiftstatus === LiftObject[i].endfloor && LiftObject[i].status == true) {
                    console.log("Please Get out : ", currentLiftstatus);
                    LiftObject[i].status = false;
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
        console.log("ELSE UP");
        currentLiftstatus--;
        clearInterval(interval);
        runFunc();
        // runFunc();
    }
}

function down(pickup, drop) {
    // console.log(drop);
    if (LiftObject.length === 0) {
        console.log("The END..");
    } else {
        if (pickup < currentLiftstatus && LiftObject[0].direction == "up") {
            if (LiftObject[0].status == true) {
                for (let i = 0; i < LiftObject.length; i++) {
                    if (currentLiftstatus == LiftObject[i].endfloor && LiftObject[i].direction == "up" && LiftObject[i].status == true) {
                        console.log("Please Get Out :", currentLiftstatus);
                        LiftObject[i].status = false;

                        // console.log("IF I RUN THEN I AAM SAFE");
                        LiftObject = LiftObject.filter((ele) => ele != LiftObject[i])
                        console.log(LiftObject);
                        clearInterval(interval);
                        runFunc();
                    }
                }
                currentLiftstatus++;
                console.log("Current Floor : ", currentLiftstatus);
            }

            // if (currentLiftstatus <= drop) {
            if (LiftObject[0].status == null) {
                for (let i = 0; i < LiftObject.length; i++) {
                    if (currentLiftstatus == LiftObject[i].startfloor && LiftObject[i].direction == "up" && LiftObject[i].status == null) {
                        console.log("Please Get In :", currentLiftstatus);
                        LiftObject[i].status = true;
                        // clearInterval(interval);
                    }
                }
                console.log("Current Floor : ", currentLiftstatus);
                currentLiftstatus--;
            }
            // }
        } else if (pickup > currentLiftstatus && LiftObject[0].status == null) {
            // console.log("test");
            for (let i = 0; i < LiftObject.length; i++) {
                if (currentLiftstatus == LiftObject[i].startfloor && LiftObject[i].direction == "down" && LiftObject[i].status == null) {
                    LiftObject[0].status = true
                    console.log("Please Get in : ", currentLiftstatus);
                }
            }
            console.log("Current Floor : ", currentLiftstatus);
            currentLiftstatus++;
        } else if (pickup > currentLiftstatus && LiftObject[0].status) {
            // console.log("test");
            for (let i = 0; i < LiftObject.length; i++) {
                if (currentLiftstatus == LiftObject[i].endfloor && LiftObject[i].status == true && LiftObject[i].direction == "down") {
                    console.log("Please Get out :", currentLiftstatus);
                    LiftObject[i].status = false;

                    LiftObject = LiftObject.filter((ele) => ele != LiftObject[i])
                    console.log(LiftObject);
                    clearInterval(interval)
                }
            }
            currentLiftstatus--
            console.log("Current Floor : ", currentLiftstatus);
        } else if (pickup <= currentLiftstatus && LiftObject[0].direction == "down") {
            // console.log("test");
            for (let i = 0; i < LiftObject.length; i++) {

                if (currentLiftstatus == LiftObject[i].startfloor && LiftObject[0].status == null) {
                    console.log("Please Get in :", currentLiftstatus);
                    LiftObject[0].status = true;
                    // clearInterval(interval)
                }
                if (currentLiftstatus == LiftObject[i].endfloor && LiftObject[i].status) {
                    console.log("Reached :", currentLiftstatus);
                    LiftObject[i].status = false;

                    LiftObject = LiftObject.filter((ele) => ele != LiftObject[i])
                    console.log(LiftObject);
                    // LiftObject[0].status = true;
                    clearInterval(interval)
                    runFunc()
                }
            }

            console.log("Current Floor : ", currentLiftstatus);
            currentLiftstatus -= 1;
        } else {
            console.log("Down fun");
            runFunc()
        }
    }
}

function liftCore() {
    let pickup = LiftObject[0].startfloor;
    let drop = LiftObject[0].endfloor;
    let firstDirection = LiftObject[0].direction;
    let lastfloor;
    // UP CALLS
    // No matter Lastfloor is there or not
    for (let i = 0; i < LiftObject.length; i++) {
        lastfloor = Math.max(LiftObject[i].endfloor, drop)
    }
    // end last floor

    // console.log("pickup floor :", pickup, "drop floor :", drop, "last floor:", lastfloor);
    // console.log(LiftObject);
    if (firstDirection == "up" && currentLiftstatus < pickup) {
        interval = setInterval(() => {
            up(pickup, lastfloor)
        }, TIMEOUT)
    }
    if (firstDirection == "up" && currentLiftstatus > pickup) {
        // console.log("test");
        interval = setInterval(() => {
            down(pickup, drop)
        }, TIMEOUT)
    }
    if (firstDirection == "up" && currentLiftstatus == pickup) {
        interval = setInterval(() => {
            up(pickup, drop)
        }, TIMEOUT)
    }

    // DOWN CALLS
    if (firstDirection == "down" && currentLiftstatus < pickup) {

        interval = setInterval(() => {
            up(pickup, drop)
        }, TIMEOUT)
    }
    if (firstDirection == "down" && currentLiftstatus > pickup) {
        console.log("test");
        interval = setInterval(() => {
            down(pickup, drop)
        }, TIMEOUT)
    }
    if (firstDirection == "down" && currentLiftstatus == pickup) {
        // console.log("test");
        interval = setInterval(() => {
            down(pickup, drop)
        }, TIMEOUT)
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
            status: null,
        })
        liftCore()
    } else {
        LiftObject.push({
            startfloor: startfloor,
            endfloor: endfloor,
            direction: direction,
            status: null,
        })
    }
}

LiftTransaction(8, 5)
LiftTransaction(2, 1)
LiftTransaction(11, 7)