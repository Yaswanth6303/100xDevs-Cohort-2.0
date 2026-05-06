// Method 2: Using Array.prototype.filter() with an anonymous function

const array = [1, 2, 3, 4, 5, 6, 7, 8];

const newArray1 = array.filter(function(value) {
    return value % 2 === 0;
});

console.log("Even numbers using filter with anonymous function:", newArray1);
