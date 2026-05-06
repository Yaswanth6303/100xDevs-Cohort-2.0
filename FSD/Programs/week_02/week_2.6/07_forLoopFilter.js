// Method 1: Using a traditional for loop to filter even numbers

const array = [1, 2, 3, 4, 5, 6, 7, 8];
const newArray = [];

for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 0) {
        newArray.push(array[i]);
    }
}

console.log("Even numbers using for loop:", newArray);
