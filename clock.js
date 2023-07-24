const margin = 50;
const fontSize = 90;
const spacing = 40;
const colonSpacing = 55;
const lineWidth = 30;

function getTime(){
    let n = new Date();
    return  ("0" + n.getHours()).slice(-2) + ":" +
            ("0" + n.getMinutes()).slice(-2) + ":" +
            ("0" + n.getSeconds()).slice(-2);
}

let t; 
let T = getTime();
let times = [10, 13, 17, 21];
let canvas = document.querySelector("canvas#clock");
canvas.width = 950;
canvas.height = 290;
let c = canvas.getContext("2d");
c.strokeStyle = "ivory";
c.fillStyle = "ivory";
c.lineWidth = lineWidth;
c.lineCap = "round";


c.beginPath();
c.arc(margin + (fontSize + spacing)*2 + colonSpacing/2 - lineWidth*3/4, margin + fontSize/2, lineWidth/2, 0, 2 * Math.PI, false);
c.fill();
c.beginPath();
c.arc(margin + (fontSize + spacing)*2 + colonSpacing/2 - lineWidth*3/4, margin + fontSize*3/2, lineWidth/2, 0, 2 * Math.PI, false);
c.fill();
c.beginPath();
c.arc(margin + (fontSize + spacing)*4 + colonSpacing*3/2 - lineWidth*3/4, margin + fontSize/2, lineWidth/2, 0, 2 * Math.PI, false);
c.fill();
c.beginPath();
c.arc(margin + (fontSize + spacing)*4 + colonSpacing*3/2 - lineWidth*3/4, margin + fontSize*3/2, lineWidth/2, 0, 2 * Math.PI, false);
c.fill();

let hasInitiated = false;
function displayTime(){
    requestAnimationFrame(displayTime);
    t = getTime();
    
    let lerp = new Date().getMilliseconds();
    lerp *= 4;
    lerp /= 1000;
    if(lerp > 1.05) {
        T = getTime();
        return;
    }
    lerp = Math.min(lerp, 1);
    
    DIGITS = T.replace(/:/g,'').split('');
    digits = t.replace(/:/g,'').split('');
    //if(t != T)console.log(digits);

    for(let i = 0; i < digits.length; i++){
        if(!hasInitiated){
            transition(i, ((+digits[i]+9)%10).toString() + digits[i], 1);    
        }
        if(DIGITS[i] === digits[i]) continue;
        transition(i, DIGITS[i] + digits[i], lerp);
    }
    hasInitiated = true;
    ////

    
    
};
function backgroundCheck(timeArray){
    let h = new Date().getHours();
    if(h < timeArray[3] && h >= timeArray[2]) document.getElementById("background").className = "evening";
    else if(h < timeArray[2] && h >= timeArray[1]) document.getElementById("background").className = "midday";
    else if(h < timeArray[1] && h >= timeArray[0]) document.getElementById("background").className = "morning";
    else document.getElementById("background").className = "night";
}
displayTime();
backgroundCheck(times);

window.setInterval(backgroundCheck, 2000, times);

function transition(pos, fromTo, lerp){
    let getRelativeCoord = function(x, y){
        return [
            margin + pos*(fontSize + spacing) + (Math.floor(pos/2))*colonSpacing + x*fontSize, 
            margin + y*fontSize
        ];
    }
    
    let tempCoord = [0,0];
    let moveTo = function(x, y){
        tempCoord = getRelativeCoord(x, y);
    };
    let lineTo = function(x, y){
        let p = getRelativeCoord(x, y);
        c.moveTo(tempCoord[0], tempCoord[1]);
        c.lineTo(p[0], p[1]);
        tempCoord = p;
    };

    let start = getRelativeCoord(0, 0);
    let end = getRelativeCoord(1, 2);
    end[0] -= start[0];
    end[1] -= start[1];
    c.clearRect(start[0] - c.lineWidth/2 - 5, start[1] - c.lineWidth/2 - 5, end[0] + c.lineWidth + 10, end[1] + c.lineWidth + 10);    

    c.beginPath();
    switch (fromTo){
        case "01":
            moveTo(0, 0);
            lineTo(1 - lerp, 0);
            lineTo(1 - lerp, 2);
            lineTo(0, 2);
            lineTo(0, 0);
            break;
        case "12":
            moveTo(0, 0);
            lineTo(0 + lerp, 0);
            lineTo(0 + lerp, 1);
            lineTo(0, 1);
            lineTo(0, 2);
            lineTo(0 + lerp, 2);
            break;
        case "23":
            moveTo(0, 0);
            lineTo(1, 0);
            lineTo(1, 1);
            lineTo(lerp, 1);
            lineTo(0, 1);
            lineTo(lerp, 1);
            lineTo(lerp, 2);
            lineTo(1, 2);
            lineTo(0, 2);
            break;
        case "34":
            moveTo(0, 1);
            lineTo(0, 1 - lerp);
            lineTo(0, 1);
            lineTo(1, 1);
            lineTo(1, 0);
            lineTo(lerp, 0);
            lineTo(1, 0);
            lineTo(1, 2);
            lineTo(lerp, 2);
            break;
        case "45":
            moveTo(lerp, 0);
            lineTo(0, 0);
            lineTo(0, 1);
            lineTo(1, 1);
            lineTo(1, lerp);
            lineTo(1, 1);
            lineTo(1, 2);
            lineTo(1 - lerp, 2);
            break;
        case "56":
            moveTo(1, 0);
            lineTo(0, 0);
            lineTo(0, 1);
            lineTo(1, 1);
            lineTo(1, 2);
            lineTo(0, 2);
            lineTo(0, 2 - lerp);
            break;
        case "67":
            moveTo(1, 0);
            lineTo(0, 0);
            lineTo(lerp, 0);
            lineTo(lerp, 1);
            lineTo(1, 1);
            lineTo(1, 2);
            lineTo(lerp, 2);
            lineTo(lerp, 1);
            break;
        case "78":
            moveTo(1, 1);
            lineTo(1, 0);
            lineTo(0, 0);
            lineTo(1 - lerp, 0);
            lineTo(1 - lerp, 1);
            lineTo(1, 1);
            lineTo(1, 2);
            lineTo(1 - lerp, 2);
            lineTo(1 - lerp, 1);
            break;
        case "89":
            moveTo(1, 1);
            lineTo(1, 0);
            lineTo(0, 0);
            lineTo(0, 0);
            lineTo(0, 1);
            lineTo(1, 1);
            lineTo(1, 2);
            lineTo(0, 2);
            lineTo(0, 1 + lerp);
            break;
        case "90":
            moveTo(0, 2);
            lineTo(0, 2 - lerp);
            lineTo(0, 2);
            lineTo(1, 2);
            lineTo(1, 0);
            lineTo(0, 0);
            lineTo(0, 1);
            lineTo(1 - lerp, 1);
            break;

        case "50":
            moveTo(1, 0);
            lineTo(0, 0);
            lineTo(0, 1 + lerp);
            lineTo(1, 1 + lerp);
            lineTo(1, 1 - lerp);
            lineTo(1, 2);
            lineTo(0, 2);
            break;



        case "30":
            moveTo(0, lerp);
            lineTo(0, 0);
            lineTo(1, 0);
            lineTo(1, 1);
            lineTo(lerp, 1);
            lineTo(1, 1);
            lineTo(1, 2);
            lineTo(0, 2);
            lineTo(0, 2 - lerp);
            break;
        case "20":
            moveTo(1,2 - lerp);
            lineTo(1,2);
            lineTo(0,2);
            lineTo(0,1);
            lineTo(1 - lerp,1);

            moveTo(0,lerp);
            lineTo(0,0);
            lineTo(1,0);
            lineTo(1,1);
            break;
        case "10":
            moveTo(0, 0);
            lineTo(lerp, 0);
            lineTo(lerp, 2);
            lineTo(0, 2);
            lineTo(0, 0);
            break;
    }
    c.stroke();
};