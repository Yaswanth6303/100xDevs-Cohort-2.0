const array = [5, 3, 2, 7, 8, 9];

let largestNumber = 0;
for(let i = 0;i < array.length;i++){
    if(array[i] > largestNumber){
        largestNumber = array[i]
    }
}
console.log(largestNumber);