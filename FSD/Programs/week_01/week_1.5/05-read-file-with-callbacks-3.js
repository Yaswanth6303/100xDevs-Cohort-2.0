// Import the 'fs' module to interact with the file system
const fs = require("fs");

/**
 * Custom asynchronous function to read a file using a callback.
 * This function uses the built-in fs.readFile, which is inherently asynchronous.
 *
 * @param {function} callback - A function that will be called with the file content once it's read.
 */
function readFileAndPrint(callback) {
  // NOTE: This function itself is not declared as 'async' and does not return a Promise.
  // However, it performs an asynchronous operation using fs.readFile (Node.js callback-style async).
  // It returns immediately after initiating the file read operation.

  fs.readFile("Sample.txt", "utf-8", function (error, fileContent) {
    if (error) {
      // If an error occurs while reading the file, log it and return
      console.error("Error reading file:", error);
      return;
    }

    // On successful read, invoke the callback function with the file content
    callback(fileContent);
  });
}

/**
 * Handles the file content once it has been successfully read.
 * @param {string} content - The content of the file.
 */
function handleFileContent(content) {
  console.log("File Content:\n", content);
}

// Initiates the file reading process and passes handleFileContent as the callback
readFileAndPrint(handleFileContent);

// This will be printed before file content due to non-blocking nature of fs.readFile
console.log("Hello");
