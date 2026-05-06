// Import the built-in 'fs' (File System) module in Node.js
const fs = require('fs');

// Asynchronous function to read a file named 'Sample.txt'
// The second parameter "UTF-8" specifies the encoding of the file
// The callback function takes two parameters: error (err) and file data (data)
fs.readFile('Sample.txt', 'UTF-8', function (err, data) {
    // This code runs only after the file is read (asynchronously)
    console.log(data); // Print the content of the file
});

// Since fs.readFile is asynchronous, this line gets printed first
console.log('Hello world');

// The following for loop is synchronous and takes a long time to complete
// This simulates a blocking operation that freezes the thread
let a = 0;
for (let i = 0; i < 1000000; i++) {
    a++;
}

// This message is printed only after the loop completes
console.log('Hello Yaswanth');

// Summary of Execution Order:
// 1. "Hello world" is printed first because fs.readFile is asynchronous
// 2. The long-running loop blocks the thread (synchronous operation)
// 3. "Hello Yaswanth" is printed after the loop finishes
// 4. Finally, when the file read completes, the file content is printed
