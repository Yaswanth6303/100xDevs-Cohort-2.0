// Using map() with a named function
const array = [1, 2, 3, 4, 5];

function transform(i) {
    return i * 2;
}

const newArray = array.map(transform);
console.log("Using map() with named function:", newArray);
