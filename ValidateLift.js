var currentLiftstatus = 0;
const maxFloor = 15;
const minFloor = -2;
var LiftObject = [];
var interval;

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
    if (pickup >= 0 && LiftObject[0].direction == "up") {
        for (let i = 0; i < LiftObject.length; i++) {
            if (currentLiftstatus == LiftObject[i].startfloor && LiftObject[i].status == false && LiftObject[i].direction == "up") {
                LiftObject[i].status = true
                console.log("Please Get in : ", currentLiftstatus);
            }
            if (currentLiftstatus == LiftObject[i].endfloor && LiftObject[i].status == true && LiftObject[i].direction == "up") {
                console.log("Please Get Out :", currentLiftstatus);
                LiftObject = LiftObject.filter((ele) => ele != LiftObject[i])
                console.log(LiftObject);
                clearInterval(interval);
                runFunc();
            }
        }
        console.log("Current Floor : ", currentLiftstatus);
        currentLiftstatus++;
    } else if (pickup < 0 && currentLiftstatus >= minFloor && !LiftObject[0].status) {
        // console.log("test");
        if (currentLiftstatus == pickup && !LiftObject[0].status && LiftObject[0].direction == "up") {
            LiftObject[0].status = true
            console.log("Please Get in : ", currentLiftstatus);
            clearInterval(interval)
            interval = setInterval(() => {
                down(pickup, drop)
            }, 2000)
        }
        console.log("Current Floor : ", currentLiftstatus);
        currentLiftstatus--;
        // console.log("Basment Call");
        // } else if (pickup < 0 && currentLiftstatus == minFloor && LiftObject[0].status) {
        //     currentLiftstatus++
        //     console.log("Current Floor", currentLiftstatus);
        //     if (currentLiftstatus == drop && LiftObject[0].status && LiftObject[0].direction == "up") {
        //         console.log("Reached Floor :", currentLiftstatus);
        //         clearInterval(interval);
        //     }
    } else if (pickup >= 0 && LiftObject[0].direction == "down" && !LiftObject[0].status) {
        for (let i = 0; i < LiftObject.length; i++) {
            if (currentLiftstatus == LiftObject[i].startfloor && !LiftObject[i].status && LiftObject[i].direction == "down") {
                LiftObject[0].status = true
                console.log("Please Get in : ", currentLiftstatus);
                console.log("Call Down Func");
                interval = setInterval(() => {
                    down(pickup, drop)
                }, 2000)
                // clearInterval(interval)
            }
            // if (currentLiftstatus == LiftObject[i].endfloor && LiftObject[i].status && LiftObject[i].direction == "up") {
            //     console.log("Please Get Out :", currentLiftstatus);
            //     LiftObject = LiftObject.filter((ele) => ele != LiftObject[i])
            //     console.log(LiftObject);
            //     clearInterval(interval);
            //     runFunc();
            // }
        }
        console.log("Current Floor : ", currentLiftstatus);
        currentLiftstatus++;
    } else {
        // clearInterval(interval)
        // break;
        // console.log("up Call");
    }

}

function down(pickup, drop) {
    // console.log("down call");
    if (pickup < 0 && LiftObject[0].status && LiftObject[0].direction == "up") {
        // console.log("test");
        currentLiftstatus++;
        console.log("Current Floor : ", currentLiftstatus);
        if (currentLiftstatus == drop && LiftObject[0].direction == "up") {
            console.log("Please Get Out :", currentLiftstatus);
            LiftObject = LiftObject.filter((ele) => ele != LiftObject[0])
            console.log(LiftObject);
            clearInterval(interval);
        }

        // console.log("person is in and waiting for up");
    } else if (pickup > 0 && !LiftObject[0].status) {
        // console.log("test");
        console.log("Current Floor : ", currentLiftstatus);
        currentLiftstatus++;
        if (currentLiftstatus == pickup && LiftObject[0].direction == "down") {
            LiftObject[0].status = true
            console.log("Please Get in : ", currentLiftstatus);
        }
    } else if (pickup > 0 && LiftObject[0].status) {
        // console.log("test");
        currentLiftstatus--
        console.log("Current Floor : ", currentLiftstatus);
        if (currentLiftstatus == drop && LiftObject[0].status) {
            console.log("Please Get out :", currentLiftstatus);
            clearInterval(interval)
        }
    } else if (pickup <= 0 && LiftObject[0].direction == "down" && !LiftObject[0].status) {
        console.log("test");
        console.log("Current Floor : ", currentLiftstatus);
        console.log(LiftObject);
        if (currentLiftstatus == pickup && !LiftObject[0].status) {
            console.log("Please Get in :", currentLiftstatus);
            LiftObject[0].status = true;
            // clearInterval(interval)
        }
        currentLiftstatus -= 1;
        if (currentLiftstatus == drop && LiftObject[0].status) {
            console.log("Reached :", currentLiftstatus);
            // LiftObject[0].status = true;
            clearInterval(interval)
        }
    } else {
        console.log("Down fun");
    }
}

function liftCore() {
    let pickup = LiftObject[0].startfloor;
    let drop = LiftObject[0].endfloor;
    let firstDirection = LiftObject[0].direction;

    if (firstDirection == "up") {
        interval = setInterval(() => {
            up(pickup, drop)
        }, 2000)
    } else if (pickup > 0 && firstDirection == "down") {
        interval = setInterval(() => {
            up(pickup, drop)
        }, 2000)
    } else if (pickup <= 0 && firstDirection == "down") {
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

// LiftTransaction(0, -1) 
// LiftTransaction(0, 5)
// LiftTransaction(2, 8)
// LiftTransaction(4, 8)
// LiftTransaction(-2, -1)

// LiftTransaction(-2, 5)
// LiftTransaction(5, 3)
// LiftTransaction(13, 6)
// LiftTransaction(1, 10)
// LiftTransaction(10, 2)
// LiftTransaction(-2, 4)
// LiftTransaction(8, -2)
LiftTransaction(9, 15)
LiftTransaction(7, 5)
// LiftTransaction(5, 7) 