// Function to calculate the sum of numbers from 0 to n-1
function calculateSum(n) {
    let sum = 0;

    // Loop through numbers from 0 to n-1 and accumulate the sum
    for (let i = 0; i < n; i++) {
        sum += i;
    }

    // Return the calculated sum
    return sum;
}

// Function that logs the sum to the console
function findSum() {
    // Call the calculateSum function with argument 100 and print the result
    console.log(calculateSum(100));
}

// Schedule the findSum function to run after 1 second (1000 milliseconds)
// This demonstrates asynchronous behavior using setTimeout
setTimeout(findSum, 1000);

// This line will be executed immediately before the setTimeout callback
console.log('Hello, World!');
