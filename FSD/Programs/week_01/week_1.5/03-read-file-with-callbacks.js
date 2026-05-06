// Import the 'fs' module to interact with the file system
const fs = require('fs');

/**
 * Creating a own async function to read a file
 * Most async functions you write will typically involve using operations like setTimeout, fs.readFile, or
 * fetch, which are inherently asynchronous.
 * Asynchronously reads the content of the specified file and passes it to a callback function.
 * @param {string} filePath - The path to the file that should be read.
 */
function readFileAndPrint(filePath) {
    // NOTE: This function is synchronous in definition (not declared with 'async' or returning a Promise)
    // However, it performs an asynchronous operation using the fs.readFile callback-based API.
    // The function returns immediately after scheduling the async task — it does NOT wait for the file to be read.
    fs.readFile(filePath, 'utf-8', function (error, fileContent) {
        if (error) {
            // Log the error if the file cannot be read
            console.error('Error reading file:', error);
            return;
        }

        // If no error, pass the file content to the handler function
        handleFileContent(fileContent);
    });
}

/**
 * Handles the file content once it has been read.
 * @param {string} content - The content of the file.
 */
function handleFileContent(content) {
    console.log('File Content:\n', content);
}

// Call the function with the file name
readFileAndPrint('Sample.txt');

console.log('Hello');

// After understanding the above code, visit the following code
// 04-read-file-with-callbacks-2.js

