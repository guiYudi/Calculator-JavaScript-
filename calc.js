function printNum(num) {
    get("spanNum").innerHTML = num;
}
function get(o) {
    return document.getElementById(o);
}

var calc = (function () {
    // The following variables have their default values set in
    // the "clear" method, inside the JSON object.
    
    var currVal;
    var secVal;
    var dotFlag;
        // check if dot has been pressed for current number
    var dotPower;
        // tracks how many to the right of the dot it must add digits
    var opFlag;
        // tracks the operation selected previously
    var usingPrevNum;
        // checks if user has changed previous number
    var isSecondaryClear;
        // checks if secVal has the default zero
    
    /* the vars above are encapsulated so they don't get messed
     * by other sources; the following JSON object is returned
     * to the reference, containing the getters, setters and
     * other necessary stuff
     */
    
    return {
        clear: function() {
            // keep all the default values here
            // to keep it maintainable
            currVal = 0;
            secVal = 0;
            dotFlag = false;
            dotPower = 0;
            opFlag = "";
            minusFlag = false;
            usingPrevNum = false;
            isSecondaryClear = true;

            this.refresh();
        },
        clearCurr: function() {
            // this function exists only to improve readability
            var tempSec = secVal;
            var tempOp = opFlag;
            var tempSecClr = isSecondaryClear;
            this.clear();
            // the following vars are related to secVal
            secVal = tempSec;
            opFlag = tempOp;
            isSecondaryClear = tempSecClr;
        },
        refresh: function(r) {
            if (r === undefined)
                r = currVal;
                // show currVal if no parameter passed as argument
            get('spanNum').innerHTML = r;
            if (dotFlag && dotPower === 0)
                get('spanNum').innerHTML += ".";
                // add a dot to the end, even if it's just a 0
        },
        digit: function (d) {
            if (usingPrevNum)
                this.clearCurr();
            usingPrevNum = false;
            if (d < 0) d = -d; // in case the number is negative
            if (dotFlag) {
                currVal += d * Math.pow(10, -(++dotPower));
            } else {
                if (currVal !== 0)
                    currVal *= 10;
                currVal += d;
            }
            this.refresh();
        },
        dot: function() {
            if (usingPrevNum)
                this.clearCurr();
                // if last pressed key was operational key, set
                // currVal to 0.
            dotFlag = true;
            this.refresh();
        },
        operate: function(next) {
            if (isSecondaryClear)
                secVal = currVal;
            if (!usingPrevNum || next === "=") {
                switch (opFlag) {
                    case "+":
                        secVal += currVal;
                        break;
                    case "-":
                        secVal -= currVal;
                        break;
                    case "*":
                        secVal *= currVal;
                        break;
                    case "/":
                        if (currVal === 0) secVal = "ERROR";
                        else secVal /= currVal;
                        break;
                    case "SIGN":
                        currVal = -currVal;
                        this.refresh();
                        return;
                }
            }
            opFlag = (next === "=") ? opFlag : next;
            usingPrevNum = true;
            if (secVal !== 0)
                isSecondaryClear = false;
            if (isSecondaryClear) // check this, so it doesn't show 0
                this.refresh();
            else
                this.refresh(secVal);
        }
    };
}());

window.addEventListener("load", (function(){
    // listeners on buttons
    get("key1").addEventListener("click", (function(){ calc.digit(1); }));
    get("key2").addEventListener("click", (function(){ calc.digit(2); }));
    get("key3").addEventListener("click", (function(){ calc.digit(3); }));
    get("key4").addEventListener("click", (function(){ calc.digit(4); }));
    get("key5").addEventListener("click", (function(){ calc.digit(5); }));
    get("key6").addEventListener("click", (function(){ calc.digit(6); }));
    get("key7").addEventListener("click", (function(){ calc.digit(7); }));
    get("key8").addEventListener("click", (function(){ calc.digit(8); }));
    get("key9").addEventListener("click", (function(){ calc.digit(9); }));
    get("key0").addEventListener("click", (function(){ calc.digit(0); }));
    get("keyClr").addEventListener("click", (function(){ calc.clear(); }));
    get("keySum").addEventListener("click", (function(){ calc.operate("+"); }));
    get("keySub").addEventListener("click", (function(){ calc.operate("-"); }));
    get("keyMul").addEventListener("click", (function(){ calc.operate("*"); }));
    get("keyDiv").addEventListener("click", (function(){ calc.operate("/"); }));
    get("keySig").addEventListener("click", (function(){ calc.operate("SIGN"); }));
    get("keyPer").addEventListener("click", (function(){ calc.operate("%"); }));
    get("keyEqu").addEventListener("click", (function(){ calc.operate("="); }));
    get("keyDot").addEventListener("click", (function(){ calc.dot(); }));
    //get("key").addEventListener("click", (function(){}));
    
    calc.clear(); // this sets all encapsulated values to their default
}));
