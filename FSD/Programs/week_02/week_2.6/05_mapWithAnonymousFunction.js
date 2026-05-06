// Using map() with an anonymous function
const array = [1, 2, 3, 4, 5];

const newArray = array.map(function(i) {
    return i * 2;
});

console.log("Using map() with anonymous function:", newArray);