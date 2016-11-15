/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

var Uln200xa_lib = require('jsupm_uln200xa');

// Instantiate a ULN2003XA stepper object
var myUln200xa_obj = new Uln200xa_lib.ULN200XA(4096, 8, 9, 10, 11);

// Tested maximum
var maxMotorSpeed = 7;
var rotationSpeed = 5;

/**
 * Sleep for a period of time
 * @param milliseconds: time to sleep
 */
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

/**
 * Move forward a specified number of steps, primarily for calibration.
 * @param direction: direction to move motor, either "forward" or "reverse"
 * @param steps: number of steps to step motor forward
 */
myUln200xa_obj.calibrate = function(direction, steps)
{
    if (direction === 'forward')
    {
        console.log(direction);
        rotateDirection = Uln200xa_lib.ULN200XA.DIR_CW
    } else if (direction === 'reverse')
    {
        rotateDirection = Uln200xa_lib.ULN200XA.DIR_CCW
    } else
    {
        console.log('ERROR: direction must be "forward" or "reverse"');
        return
    }
    myUln200xa_obj.setSpeed(maxMotorSpeed);
    myUln200xa_obj.setDirection(rotateDirection);
    console.log('Stepping forward %s steps', steps);
    myUln200xa_obj.stepperSteps(steps);
};

/**
 * Rotate motor forward by a percentage and return back to 0
 * @param percentRotation: percent rotation of a full circle to travel
 */
myUln200xa_obj.stepPercentAndReturn = function(percentRotation)
{
    if (rotationSpeed > maxMotorSpeed) {
        console.log('ERROR: motor speed cannot exceed %s', maxMotorSpeed);
        return
    }

    fullRotation = 4096;
    steps = fullRotation * .01 * percentRotation;
    console.log(steps);

    myUln200xa_obj.setSpeed(rotationSpeed);
    myUln200xa_obj.setDirection(Uln200xa_lib.ULN200XA.DIR_CW);

    console.log('rotating %s percentRotation', percentRotation);
    myUln200xa_obj.stepperSteps(steps);

    sleep(1000);

    console.log('rotating back');
    myUln200xa_obj.setDirection(Uln200xa_lib.ULN200XA.DIR_CCW);
    myUln200xa_obj.stepperSteps(steps);
};

/**
 * Step forward to a number, based on a total.
 * The total should represent a 360 degree rotation.
 * @param unitsToStep: number of units to step forward
 * @param maximumUnits: number of units representing a full rotation
 */
myUln200xa_obj.stepUnitOfTotalAndReturn = function(unitsToStep, maximumUnits)
{
    if (rotationSpeed > maxMotorSpeed) {
        console.log('ERROR: motor speed cannot exceed %s', maxMotorSpeed);
        return
    }

    percentRotation = unitsToStep / maximumUnits * 100;
    fullRotation = 4096;
    steps = fullRotation * .01 * percentRotation;
    console.log(steps);

    myUln200xa_obj.setSpeed(rotationSpeed);
    myUln200xa_obj.setDirection(Uln200xa_lib.ULN200XA.DIR_CW);

    console.log('rotating %s percentRotation', percentRotation);
    myUln200xa_obj.stepperSteps(steps);

    sleep(1000);

    console.log('rotating back');
    myUln200xa_obj.setDirection(Uln200xa_lib.ULN200XA.DIR_CCW);
    myUln200xa_obj.stepperSteps(steps);
};

myUln200xa_obj.stepPercentAndReturn(25);
myUln200xa_obj.stepUnitOfTotalAndReturn(300, 1000);