// Create a map function that takes 2 inputs an array, and a transforamtion callback / function
// and transforms the array into a new one using the transformation fn

function map(arr, transformationFn) {
    // Create an empty array to store the transformed values
    const transformedArr = [];
    
    // Iterate over each element in the original array
    for (let i = 0; i < arr.length; i++) {
      // Apply the transformation function to the current element
      const transformedValue = transformationFn(arr[i]);
      
      // Add the transformed value to the new array
      transformedArr.push(transformedValue);
    }
    
    // Return the new array with transformed values
    return transformedArr;
}
  
  // Example usage:
const numbers = [1, 2, 3, 4, 5];
  
  // Define a transformation function (e.g., square each number)
function square(x) {  
    return x * x;
}
  
  // Use the map function to transform the array
const squaredNumbers = map(numbers, square);
console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]
  