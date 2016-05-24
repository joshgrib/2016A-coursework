/************************
**    'in' iterator    **
************************/
var nums = [1, 2, 3, 4, 5];
var x;
var sum = 0;
for(x in nums){
    sum += nums[x];
}
console.log(sum);//15


/************************
**  Function closures  **
************************/
function makeAdder(x){
    let resp = function(y){
        return x + y;
    }
    return resp;
}
let addFour = makeAdder(4);
console.log(addFour(5)); //9

function makeCounter(){
    var count = 0;
    let add = function(x){
        count += x;
        return count;
    }
    return add;
}
let adder = makeCounter();
console.log(adder(0)); //0
console.log(adder(4)); //4
console.log(adder(3)); //7
console.log(adder(3)); //10


/************************
**                     **
************************/
