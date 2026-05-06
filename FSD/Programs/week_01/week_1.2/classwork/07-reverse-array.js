const array = [2, 4, 6, 8, 10];
const originalArray = [8, 5, 4, 7, 9];

function reverseArray(array){
    for(let i = 0;i < array.length;i++){
        return array.reverse();
    }
}
function reverseArray1(arr) {
    const length = arr.length;
    for (let i = 0; i < Math.floor(length / 2); i++) {
        const temp = arr[i];
        arr[i] = arr[length - 1 - i];
        arr[length - 1 - i] = temp;
    }
}

const reversedArray = reverseArray(array);
console.log("Reversed Array:", array)
reverseArray1(originalArray);
console.log("Reversed Array:", originalArray);