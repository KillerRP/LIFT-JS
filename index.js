var currentLiftstatus = 0;
const maxFloor = 15;
const minFloor = -2;
var LiftObject = [];
var interval;
var cnt = 0;


function goingUp(startfloor, endfloor) {

  for (let i = 0; i < LiftObject.length; i++) {
    if (LiftObject[i].direction > 0) {
      startfloor = Math.max(LiftObject[i].startfloor, startfloor);
      endfloor = Math.min(LiftObject[i].endfloor, endfloor);
    }
  }
  if (currentLiftstatus <= startfloor) {
    for (let i = 0; i < LiftObject.length; i++) {
      if (currentLiftstatus === LiftObject[i].startfloor && currentLiftstatus < LiftObject[i].endfloor) {
        console.log("Please Get in : ");
        LiftObject[i].status = true;
        cnt++;
      }
      if (currentLiftstatus === LiftObject[i].endfloor && LiftObject[i].status) {
        console.log("Reached : ", currentLiftstatus);
        LiftObject = LiftObject.filter((item) => {
          return item != LiftObject[i];
        });
        cnt--;
      }
    }
    console.log("Current Floor : ", currentLiftstatus);
    currentLiftstatus++;

  } else if (cnt) {
    for (let i = 0; i < LiftObject.length; i++) {
      if (LiftObject[i].status) {
        endfloor = Math.max(LiftObject[i].endfloor, endfloor);
      }
    }
    if (currentLiftstatus <= endfloor) {
      for (let i = 0; i < LiftObject.length; i++) {
        if (currentLiftstatus === LiftObject[i].startfloor && currentLiftstatus < LiftObject[i].endfloor) {
          console.log("Please Get in : ");
          LiftObject[i].status = true;
          cnt++;
        }
        if (currentLiftstatus === LiftObject[i].endfloor && LiftObject[i].status) {
          console.log("Reached : ", currentLiftstatus);

          LiftObject = LiftObject.filter((item) => {
            return item != LiftObject[i];
          });
          cnt--;
        }
      }
      console.log("Current Floor: ", currentLiftstatus);
      currentLiftstatus++;
    }
  }
  else {
    currentLiftstatus--;
    clearInterval(interval);
    if (LiftObject.length) {
      lift();
    }
  }
}

function goingDown(startfloor, endfloor) {
  for (let i = 0; i < LiftObject.length; i++) {
    if (LiftObject[i].direction < 0) {
      startfloor = Math.min(LiftObject[i].startfloor, startfloor)
      endfloor = Math.max(LiftObject[i].endfloor, endfloor);
    }
  }
  if (currentLiftstatus >= startfloor) {
    console.log("Current Floor : ", currentLiftstatus);
    for (let i = 0; i < LiftObject.length; i++) {
      if (currentLiftstatus === LiftObject[i].startfloor && currentLiftstatus >= LiftObject[i].endfloor) {
        LiftObject[i].status = true;
        console.log("Please Get in : ");
        cnt++;
      }
      else if (currentLiftstatus === LiftObject[i].endfloor && LiftObject[i].status) {
        console.log("Reached Floor : ", currentLiftstatus);
        LiftObject = LiftObject.filter((person) => {
          return person != LiftObject[i];
        });
        cnt--;
      }
    }
    currentLiftstatus--;
  }
  else if (cnt) {
    for (let i = 0; i < LiftObject.length; i++) {
      if (LiftObject[i].status) {
        endfloor = Math.min(LiftObject[i].endfloor, endfloor);
      }
    }

    if (currentLiftstatus >= endfloor) {
      console.log("Current Floor: ", currentLiftstatus);
      for (let i = 0; i < LiftObject.length; i++) {
        if (currentLiftstatus === LiftObject[i].startfloor && currentLiftstatus > LiftObject[i].endfloor) {
          console.log("Please Get in : ");
          LiftObject[i].status = true;
          cnt++;
        }
        else if (currentLiftstatus === LiftObject[i].endfloor && LiftObject[i].status) {
          console.log("Reached Floor : ", currentLiftstatus);
          LiftObject = LiftObject.filter((item) => {
            return item != LiftObject[i];
          });
          cnt--;
        }
      }
      currentLiftstatus--;
    }
  }
  else {
    currentLiftstatus++;
    // console.log("Current Floor ", currentLiftstatus);
    clearInterval(interval);
    if (LiftObject.length) {
      lift();
    }
  }
}


function lift() {
  let startfloor = LiftObject[0].startfloor;
  let endfloor = LiftObject[0].endfloor;
  let direction = startfloor - endfloor; //minus to up  
  let liftDirection = currentLiftstatus - startfloor;
  if (liftDirection < 0) {
    for (let i = 0; i < LiftObject.length; i++) {
      if (direction > 0 && LiftObject[i].direction > 0) {
        startfloor = Math.max(LiftObject[i].startfloor, startfloor)
        endfloor = Math.min(LiftObject[i].endfloor, endfloor);
      }
    }
  }
  else if (liftDirection > 0) {
    for (let i = 0; i < LiftObject.length; i++) {
      if (direction < 0 && LiftObject[i].direction < 0) {
        startfloor = Math.min(LiftObject[i].startfloor, startfloor)
        endfloor = Math.max(LiftObject[i].endfloor, endfloor);
      }
    }
  }
  if (currentLiftstatus < startfloor) {
    interval = setInterval(() => {
      goingUp(startfloor, endfloor);
    }, 2000);
  }
  else if (currentLiftstatus > startfloor) {
    interval = setInterval(() => {
      goingDown(startfloor, endfloor);
    }, 2000);
  }
  else {
    if (startfloor > endfloor) { //directorn > 0 
      interval = setInterval(() => {
        goingDown(startfloor, endfloor);
      }, 2000);
    }
    else {
      interval = setInterval(() => {
        goingUp(startfloor, endfloor);
      }, 2000);
    }
  }
}

function LiftTransaction(startfloor, endfloor) {
  let direction = startfloor - endfloor;
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
    lift()
  }
  else {
    LiftObject.push({
      startfloor: startfloor,
      endfloor: endfloor,
      direction: direction,
      status: false,
    })
  }
};

// LiftTransaction(-1, 5);
// LiftTransaction(5, -2);
LiftTransaction(-2, -1);
// LiftTransaction(10, 3);
