// Import the 'fs' module to interact with the file system
const fs = require("fs");

/**
 * Creating our own function to read a file asynchronously.
 * Most async functions you write will typically involve using operations like setTimeout, fs.readFile, or
 * fetch, which are inherently asynchronous.
 * This function asynchronously reads the content of the specified file and passes it to a callback function.
 * @param {string} filePath - The path to the file that should be read.
 */
function readFileAndPrint(filePath) {
  // NOTE: This function is synchronous in definition (not declared with 'async' or returning a Promise)
  // However, it performs an asynchronous operation using the fs.readFile callback-based API.
  // The function returns immediately after scheduling the async task — it does NOT wait for the file to be read.

  // Both fs.readFile and setTimeout are asynchronous operations.
  // fs.readFile is a Node.js API that reads the content of a file asynchronously.
  // setTimeout is a JavaScript Browser API that schedules a function to be executed after a delay.
  // First fs.readFile is called, it schedules the file read and moves on.
  // Then setTimeout is called, it schedules the function to be executed after a delay.

  // Start reading the file asynchronously
  fs.readFile(filePath, "utf-8", function (error, fileContent) {
    // This callback is executed later, after file reading is complete
    // To simulate delay, we wrap the logic inside a setTimeout

    console.log("Timer for 3 seconds");
    setTimeout(function () {
      if (error) {
        // Log the error if the file cannot be read
        console.error("Error reading file:", error);
        return;
      }

      // If no error, pass the file content to the handler function
      handleFileContent(fileContent);
    }, 3000); // Delay the handling by 3 seconds after the file is read
  });
}

/**
 * Handles the file content once it has been read.
 * @param {string} content - The content of the file.
 */
function handleFileContent(content) {
  // Simply log the file content to the console
  console.log("File Content:\n", content);
}

// Start of actual execution

// 1️⃣ Call the function to read the file asynchronously.
// This triggers fs.readFile but does NOT block — it schedules the file read and moves on.
readFileAndPrint("Sample.txt");

// 2️⃣ This line runs immediately after scheduling the file read.
console.log("Hello"); // Will be printed first

// 3️⃣ This loop is synchronous and very heavy — it blocks the main thread for a long time.
let sum = 0;
for (let i = 0; i < 10000000000; i++) {
  sum += i;
}

// 4️⃣ After the loop finishes, this line prints the computed sum
console.log(sum);

// 📝 Meanwhile:
// - While the loop is running, the file might finish reading in the background (libuv thread pool).
// - The callback from fs.readFile will wait until the call stack is clear.
// - After the loop ends, the event loop picks the fs.readFile callback,
//   then `setTimeout` is triggered which waits for 3 seconds.
// - After 3 seconds, `handleFileContent()` runs and logs the file content.

// After understanding the above code, visit the following code
// 05-read-file-with-callbacks-3.js
// Here the function readFileAndPrint is synchronous in definition but it is asynchronous in execution same
// for 05-read-file-with-callbacks-3.js but here we used callbacks in argument of the function.
