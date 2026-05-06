/**
 * This function simulates an asynchronous task using a Promise and setTimeout.
 * It resolves with the string "Hi There" after 2 seconds.
 */
function delayedGreeting() {
  let promise = new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Hi There"); // This gets returned after 2 seconds
    }, 2000);
  });

  return promise;
}

/**
 * This asynchronous function uses `.then()` to handle the Promise.
 * It doesn't wait for the Promise to resolve before continuing execution.
 */
async function runWithoutAwait() {
  // Start the async function and attach a .then() callback
  delayedGreeting().then(function (message) {
    console.log(message); // Prints "Hi There" after 2 seconds
  });

  // This line executes immediately without waiting for the above Promise
  console.log("Hi There 1");
}

/**
 * This asynchronous function uses `await` to pause until the Promise resolves.
 * It waits for 2 seconds before continuing to the next line.
 */
async function runWithAwait() {
  let message = await delayedGreeting(); // Waits 2 seconds for the Promise to resolve
  console.log(message); // Prints "Hi There"
  console.log("Hi There 1"); // Then prints "Hi There 1"
}

// Call both functions
runWithoutAwait(); // Executes immediately, prints "Hi There 1", and waits 2s for "Hi There"
runWithAwait(); // Starts, waits 2s, then prints "Hi There" and "Hi There 1"

// This line runs immediately, even before any async code finishes
console.log("Yash");
