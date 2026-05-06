// Method 3: Using Array.prototype.filter() with an arrow function

const array = [1, 2, 3, 4, 5, 6, 7, 8];

const newArray2 = array.filter(value => value % 2 === 0);

console.log("Even numbers using filter with arrow function:", newArray2);
