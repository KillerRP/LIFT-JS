let callQueue = [];
let liftcall;
var liftFloor = 0; // lift's current floor

//================================================================================

let cnt = 0;
function up(pickupFloor, dropFloor) {
  // console.log(callQueue);

  for (let i = 0; i < callQueue.length; i++) {
    if (callQueue[i].direction > 0) {
      pickupFloor = Math.max(callQueue[i].pickup, pickupFloor);
      dropFloor = Math.min(callQueue[i].drop, dropFloor);
    }
  }

  if (liftFloor <= pickupFloor) {
    for (let i = 0; i < callQueue.length; i++) {
      if (liftFloor === callQueue[i].pickup && liftFloor < callQueue[i].drop) {
        console.log("🚪🚶 : ", liftFloor);
        callQueue[i].inLift = true;
        cnt++;
      }
      if (liftFloor === callQueue[i].drop && callQueue[i].inLift) {
        console.log("🚪🕺 : ", liftFloor);
        callQueue = callQueue.filter((ele) => {
          return ele != callQueue[i];
        });
        cnt--;
      }
    }
    console.log("🚪⬆️ : ", liftFloor);
    liftFloor++;
  }
  else if (cnt) {
    // console.log("lift is at floor number : ", liftFloor);
    for (let i = 0; i < callQueue.length; i++) {
      if (callQueue[i].inLift) {
        dropFloor = Math.max(callQueue[i].drop, dropFloor);
      }
    }
    if (liftFloor <= dropFloor) {
      // console.log("going up, current floor : ", liftFloor);
      for (let i = 0; i < callQueue.length; i++) {
        if (liftFloor === callQueue[i].pickup && liftFloor < callQueue[i].drop) {
          console.log("🚪🚶 : ", liftFloor);
          callQueue[i].inLift = true;
          cnt++;
        }
        if (liftFloor === callQueue[i].drop && callQueue[i].inLift) {
          console.log("🚪🕺 : ", liftFloor);
          callQueue = callQueue.filter((ele) => {
            return ele != callQueue[i];
          });
          cnt--;
        }
      }
      // if(liftFloor != dropFloor){
      //   liftFloor++;
      // }
      console.log("🚪⬆️ : ", liftFloor);
      liftFloor++;
    }
  }
  else {
    liftFloor--;
    // console.log("lift is at floor number : ", liftFloor);
    clearInterval(liftcall);
    if (callQueue.length) {
      callLift();
    }
  }
}

//================================================================================

function down(pickupFloor, dropFloor) {

  for (let i = 0; i < callQueue.length; i++) {
    if (callQueue[i].direction < 0) {
      pickupFloor = Math.min(callQueue[i].pickup, pickupFloor)
      dropFloor = Math.max(callQueue[i].drop, dropFloor);
    }
  }


  if (liftFloor >= pickupFloor) {
    // console.log("going down, current floor : ", liftFloor);
    for (let i = 0; i < callQueue.length; i++) {
      if (liftFloor === callQueue[i].pickup && liftFloor > callQueue[i].drop) {
        console.log("🚪🚶 : ", liftFloor);
        callQueue[i].inLift = true;
        cnt++;
      }
      else if (liftFloor === callQueue[i].drop && callQueue[i].inLift) {
        console.log("🚪🕺 : ", liftFloor);
        callQueue = callQueue.filter((ele) => {
          return ele != callQueue[i];
        });
        cnt--;
      }
    }
    console.log("🚪⬇️: ", liftFloor);
    liftFloor--;
  }
  else if (cnt) {
    // console.log("lift is at floor number : ", liftFloor);
    for (let i = 0; i < callQueue.length; i++) {
      if (callQueue[i].inLift) {
        dropFloor = Math.min(callQueue[i].drop, dropFloor);
      }
    }

    if (liftFloor >= dropFloor) {
      console.log("🚪⬇️: ", liftFloor);
      for (let i = 0; i < callQueue.length; i++) {
        if (liftFloor === callQueue[i].pickup && liftFloor > callQueue[i].drop) {
          console.log("🚪🚶 : ", liftFloor);
          callQueue[i].inLift = true;
          cnt++;
        }
        else if (liftFloor === callQueue[i].drop && callQueue[i].inLift) {
          console.log("🚪🕺 : ", liftFloor);
          callQueue = callQueue.filter((ele) => {
            return ele != callQueue[i];
          });
          cnt--;
        }
      }
      // if(liftFloor != dropFloor){
      //   liftFloor--;
      // }
      liftFloor--;
    }
  }
  else {
    liftFloor++;
    console.log("🚪 ", liftFloor);
    clearInterval(liftcall);
    if (callQueue.length) {
      callLift();
    }
  }
}

//================================================================================

function callLift() {
  console.log(callQueue);
  let pickupFloor = callQueue[0].pickup;
  let dropFloor = callQueue[0].drop;
  let direction = pickupFloor - dropFloor; //minus to up - 
  let liftDirection = liftFloor - pickupFloor;
  console.log("Pick :", pickupFloor, "END : ", dropFloor);
  if (liftDirection < 0) {
    for (let i = 0; i < callQueue.length; i++) {
      if (direction > 0 && callQueue[i].direction > 0) {
        pickupFloor = Math.max(callQueue[i].pickup, pickupFloor)
        dropFloor = Math.min(callQueue[i].drop, dropFloor);
      }
    }
  }
  else if (liftDirection > 0) {
    for (let i = 0; i < callQueue.length; i++) {
      if (direction < 0 && callQueue[i].direction < 0) {
        pickupFloor = Math.min(callQueue[i].pickup, pickupFloor)
        dropFloor = Math.max(callQueue[i].drop, dropFloor);
      }
    }
  }
  console.log("Pick :", pickupFloor, "END : ", dropFloor);
  // console.log(pickupFloor, dropFloor);

  if (liftFloor < pickupFloor) {    //up
    liftcall = setInterval(() => {
      up(pickupFloor, dropFloor);
    }, 2000);
  }
  else if (liftFloor > pickupFloor) {
    liftcall = setInterval(() => {
      down(pickupFloor, dropFloor);
    }, 2000);
  }
  else {
    if (direction > 0) {
      liftcall = setInterval(() => {
        down(pickupFloor, dropFloor);
      }, 2000);
    }
    else {
      liftcall = setInterval(() => {
        up(pickupFloor, dropFloor);
      }, 2000);
    }
  }
}

//================================================================================

let LiftTransaction = (pickupFloor, dropFloor) => {
  let direction = pickupFloor - dropFloor; //

  if (isNaN(pickupFloor) || isNaN(dropFloor)) {
    console.log("Please enter number value");
  }
  else if (pickupFloor === dropFloor) {
    console.log("You are on the same floor...");
  }
  else if (pickupFloor > 15 || dropFloor > 15 || pickupFloor < -2 || dropFloor < -2) {
    console.log("Floor does not exist");
  }
  else if (callQueue.length === 0) {
    callQueue.push({
      pickup: pickupFloor,
      drop: dropFloor,
      inLift: false,
      direction: direction,
    });
    callLift();
  }
  else {
    callQueue.push({
      pickup: pickupFloor,
      drop: dropFloor,
      inLift: false,
      direction: direction,
    });
  }
};

LiftTransaction(8, -2)
// LiftTransaction(0, -1)
// LiftTransaction(0, 10)
// LiftTransaction(2, 15)
// LiftTransaction(-2, 5)
// LiftTransaction(5, 3)
// LiftTransaction(13, 6)
// LiftTransaction(1, 10)
// LiftTransaction(10, 2)
// LiftTransaction(-2, 4)
// LiftTransaction(8, -2)
// LiftTransaction(9, 15)
// LiftTransaction(7, 5)
// LiftTransaction(-2, -1)

