const fs = require("fs");

// For Clear understanding of the code, visit the following pdf:
//InternalBehaviourofPromise

/**
 * Asynchronously reads the contents of 'Sample.txt' using Promises.
 * Returns a Promise that resolves with the file data.
 * There is no any argument in the function, it is just a function that returns a Promise. Cleaner code compared to callbacks.
 * Promises are introduced to get rid of callback hell.
 */
function readFileAsync() {
  console.log("Inside readFileAsync");

  // Promise is getting returned synchronously (immediately) but the file read is asynchronous means it will
  // be executed later.
  return new Promise(function (resolve, reject) {
    console.log("Inside Promise constructor");

    fs.readFile("Sample.txt", "utf-8", function (error, fileData) {
      console.log("Inside fs.readFile callback"); // Logged when file reading is completed (after some time)

      if (error) {
        // If reading fails, reject the Promise
        // Internally triggers the function passed to .catch()
        reject(error);
      } else {
        // If reading succeeds, resolve the Promise
        // Internally triggers the function passed to .then()
        resolve(fileData);
      }
    });
  });
}

/**
 * Callback function to handle the resolved file content.
 * @param {string} data - The content of the file.
 */
function displayFileContent(data) {
  // This is called when resolve(fileData) is executed
  console.log("File Content:\n", data);
}

/**
 * Callback function to handle errors during file reading.
 * @param {Error} err - The error that occurred.
 */
function handleError(err) {
  // This is called when reject(error) is executed
  console.error("Error occurred:", err.message);
}

// Call the asynchronous function and get a Promise object
const filePromise = readFileAsync(); // Triggers the function above, but file read is still pending

// Log the Promise object immediately — will be in pending state at this moment
console.log("Promise object:", filePromise); // Shows: Promise { <pending> }

// Handle the resolved or rejected state of the Promise
filePromise
  .then(displayFileContent) // Called when the Promise resolves successfully
  .catch(handleError); // Called when the Promise is rejected (e.g., file not found)

/**
 * How It Runs (Execution Flow):
 * 1. The function readFileAsync() is called:
 *    * Logs "Inside readFileAsync" and "Inside Promise constructor" immediately.
 * 2. The file read is triggered using fs.readFile() — this is asynchronous.
 * 3. Meanwhile, the filePromise is still pending and gets logged as:
 *    * → Promise { <pending> }
 * 4. Once the file read is done:
 *    * If successful, resolve(data) is called.
 *    * If there's an error (e.g., file doesn't exist), reject(error) is called.
 * 5. .then(displayFileContent) handles the successful resolution and prints the file content.
 * 6. .catch(handleError) handles any errors during the file read.
 */
