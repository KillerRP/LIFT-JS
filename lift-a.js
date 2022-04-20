// const btn = document.getElementById("callbtn");
// const sfloorNumber = document.getElementById("sfloor");
// const efloorNumber = document.getElementById("efloor");
let liftFloor = 0;
let newCall = [];
let liftcall;
function lift(pickupFloor, dropFloor) {
  if (dropFloor > pickupFloor && liftFloor <= dropFloor) {
    console.log("going up - current floor:", liftFloor);
    for (let i = 0; i < newCall.length; i++) {
      if (
        liftFloor === newCall[i].pickupCall &&
        newCall[i].dropCall > liftFloor &&
        !newCall[i].inLift
      ) {
        newCall[i].inLift = true; //adds new pickup if drop point is up
        console.log("NEW PICKUP ON THIS FLOOR");
        console.log("door open");
      }
      //drops on same floor as lift if any
      if (newCall[i].inLift && newCall[i].dropCall === liftFloor) {
        //removes the drop call from call list
        newCall = newCall.filter((ele) => {
          return ele != newCall[i];
        });
        console.log("drop point");
        console.log("door open");
      }
    }
    liftFloor++;
    if (liftFloor > 15) {
      console.log("last floor");
    } else {
      console.log("next floor:", liftFloor);
    }
  } else if (dropFloor < pickupFloor && liftFloor >= dropFloor) {
    console.log("going down current floor:", liftFloor);
    for (let i = 0; i < newCall.length; i++) {
      if (
        liftFloor === newCall[i].pickupCall &&
        liftFloor > newCall[i].dropCall &&
        !newCall[i].inLift
      ) {
        newCall[i].inLift = true; //adds new pickup if drop point is down
        console.log("NEW PICKUP AT THIS FLOOR ");
        console.log("door open");
      }
      //drops on same floor as lift if any
      if (newCall[i].inLift && newCall[i].dropCall === liftFloor) {
        //removes the drop call from call list
        newCall = newCall.filter((ele) => {
          return ele != newCall[i];
        });
        console.log("drop point");
        console.log("door open");
      }
    }

    liftFloor--;
    if (liftFloor < -2) {
      console.log("basment -2");
    } else {
      console.log("next floor:", liftFloor);
    }
  } else {
    if (liftFloor - 1 === dropFloor) {
      liftFloor = dropFloor;
      if (newCall.length !== 0) {
        if (newCall[0].inLift) {
          newCall.shift();
        }
      }

      if (newCall.length === 0) {
        console.log("lift is on ", liftFloor, "floor");
        clearInterval(liftcall);
      } else {
        clearInterval(liftcall);
        startLift();
      }
    }
    if (liftFloor + 1 === dropFloor) {
      liftFloor = dropFloor;
      if (newCall.length !== 0) {
        if (newCall[0].inLift) {
          newCall.shift();
        }
      }
      console.log(newCall);

      if (newCall.length === 0) {
        console.log("lift in on ", liftFloor, "floor");
        console.log("door open");
        clearInterval(liftcall);
      } else {
        clearInterval(liftcall);
        startLift();
      }
    }
  }
}
function callLiftUp(pickupFloor, dropFloor) {
  if (liftFloor <= pickupFloor) {
    console.log("current floor:", liftFloor);
    // checks the call on each floor
    //while lift is going up
    for (let i = 0; i < newCall.length; i++) {
      if (
        liftFloor === newCall[i].pickupCall &&
        newCall[i].dropCall > liftFloor
      ) {
        newCall[i].inLift = true; //adds new pickup if drop point is up
        console.log("NEW PICKUP ON THIS FLOOR");
        console.log("door open");
      }
    }
    liftFloor++;
    if (liftFloor > 15) {
      console.log("last floor");
    } else {
      console.log("next floor:", liftFloor);
    }
  } else {
    liftFloor = pickupFloor;
    console.log("lift is on ", liftFloor, "floor ");
    clearInterval(liftcall);
    console.log("door open");
    liftcall = setInterval(() => {
      lift(pickupFloor, dropFloor);
    }, 2000);
  }
}

function callLiftDown(pickupFloor, dropFloor) {
  if (liftFloor >= pickupFloor) {
    console.log("current floor:", liftFloor);

    // checks the call on each floor
    //while lift is going down
    for (let i = 0; i < newCall.length; i++) {
      if (
        liftFloor === newCall[i].pickupCall &&
        liftFloor > newCall[i].dropCall
      ) {
        newCall[i].inLift = true; //adds new pickup if drop point is down
        console.log("NEW PICKUP AT THIS FLOOR ");
        console.log("door open");
      }
    }
    liftFloor--;
    if (liftFloor < pickupFloor) {
      console.log("lift is in basement");
    } else {
      console.log("next floor:", liftFloor);
    }
  } else {
    liftFloor = pickupFloor;
    console.log("lift is on ", liftFloor, "floor ");
    clearInterval(liftcall);
    console.log("door open");
    liftcall = setInterval(() => {
      lift(pickupFloor, dropFloor);
    }, 2000);
  }
}

function startLift() {
  let temp = [];
  //checks the lift calls
  if (newCall.length === 0) {
    console.log("end");
    clearInterval(liftcall);
  } else {
    for (let i = 0; i < newCall.length; i++) {
      if (i + 1 !== newCall.length) {
        if (newCall[i].dropCall < newCall[i + 1].dropCall) {
          temp = newCall[i];
          newCall[i] = newCall[i + 1];
          newCall[i + 1] = temp;
        }
      }
    }
    console.log(newCall);
    let pickupFloor = newCall[0].pickupCall;
    let dropFloor = newCall[0].dropCall;
    // checks lift is not empty
    if (newCall[0].inLift) {
      liftcall = setInterval(() => {
        //sends lift to the dropFloor
        lift(pickupFloor, dropFloor);
      }, 2000);
    } else {
      //life floor status check
      if (liftFloor === 0 && pickupFloor > liftFloor) {
        liftcall = setInterval(() => {
          //send the lift to pickup point
          callLiftUp(pickupFloor, dropFloor);
        }, 2000);
      } else if (pickupFloor < 0) {
        liftcall = setInterval(() => {
          //send the lift to pickup point
          callLiftDown(pickupFloor, dropFloor);
        }, 2000);
      } else if (liftFloor !== 0 && liftFloor !== pickupFloor) {
        if (liftFloor <= pickupFloor) {
          liftcall = setInterval(() => {
            //send the lift to pickup point
            callLiftUp(pickupFloor, dropFloor);
          }, 2000);
        } else {
          liftcall = setInterval(() => {
            //send the lift to pickup point
            callLiftDown(pickupFloor, dropFloor);
          }, 2000);
        }
      } else {
        liftcall = setInterval(() => {
          //send the lift to drop point
          lift(pickupFloor, dropFloor);
        }, 2000);
      }
    }
  }
}

const liftMy = (s,e) => {
  let pickupFloor = parseInt(s);
  let dropFloor = parseInt(e);
  console.log("lift in onclick", newCall);
  //adding new calls
  if (
    pickupFloor < -1 ||
    pickupFloor > 15 ||
    dropFloor < -1 ||
    dropFloor > 15
  ) {
    console.log("invalid");
  } else {
    if (newCall.length === 0) {
      newCall.push({
        pickupCall: pickupFloor,
        dropCall: dropFloor,
        inLift: false,
      });
      console.log(newCall);

      startLift();
    } else {
      newCall.push({
        pickupCall: pickupFloor,
        dropCall: dropFloor,
        inLift: false,
      });
    }
  }
};


liftMy(0,5)
liftMy(5,8)
liftMy(4,8)
liftMy(3,5)
liftMy(2,8)
liftMy(1,10)
liftMy(9,15)
liftMy(5,7)
// newCall(-2,7)
// newCall()




// newCall.push({
//   pickupCall: 6,
//   dropCall: 8,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 7,
//   dropCall: -2,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 8,
//   dropCall: 13,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 7,
//   dropCall: 10,
//   inLift: false,
// });
// 
// newCall.push({
//   pickupCall: 0,
//   dropCall:+ -1,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 1,
//   dropCall: 10,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: -2,
//   dropCall: -1,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 2,
//   dropCall: 15,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: -2,
//   dropCall: 5,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 5,
//   dropCall: 3,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 13,
//   dropCall: 6,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 1,
//   dropCall: 10,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 10,
//   dropCall: 2,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: -2,
//   dropCall: 4,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 8,
//   dropCall: -2,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 9,
//   dropCall: 15,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 7,
//   dropCall: 5,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: -2,
//   dropCall: -1,
//   inLift: false,
// });
// newCall.push({
//   pickupCall: 5,
//   dropCall: 7,
//   inLift: false,
// });
startLift();