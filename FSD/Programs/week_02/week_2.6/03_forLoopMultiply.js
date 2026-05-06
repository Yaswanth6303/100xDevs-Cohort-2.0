// Using traditional for loop to multiply elements by 2
const array = [1, 2, 3, 4, 5];
const newArray = [];

for (let i = 0; i < array.length; i++) {
    newArray.push(array[i] * 2);
}

console.log("Using for loop:", newArray);
