// Method 4: Using Array.prototype.filter() with a named function

const array = [1, 2, 3, 4, 5, 6, 7, 8];

function filterLogic(n) {
    return n % 2 === 0;
}

const newArray3 = array.filter(filterLogic);

console.log("Even numbers using filter with named function:", newArray3);
