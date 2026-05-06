# Internal Behaviour of Promise

# 1. Complete Code

```jsx
const fs = require("fs");

/**
 * Asynchronously reads the contents of 'Sample.txt' using Promises.
 * Returns a Promise that resolves with the file data.
 * This function does not take any arguments.
 * Promises are used to avoid callback hell and make code cleaner.
 */
function readFileAsync() {
    console.log("Inside readFileAsync");

    // A Promise object is created and returned immediately (synchronously)
    return new Promise(function (resolve, reject) {

        console.log("Inside Promise constructor");

        // Asynchronous operation starts here
        fs.readFile("Sample.txt", "utf-8", function (error, fileData) {

            console.log("Inside fs.readFile callback");

            if (error) {
                // If an error occurs → reject the promise
                reject(error);
            } else {
                // If success → resolve the promise
                resolve(fileData);
            }
        });
    });
}

/**
 * Called when the Promise is resolved
 */
function displayFileContent(data) {
    console.log("File Content:\n", data);
}

/**
 * Called when the Promise is rejected
 */
function handleError(err) {
    console.error("Error occurred:", err.message);
}

// Call the function
const filePromise = readFileAsync();

// Immediately log the Promise object
console.log("Promise object:", filePromise);

// Attach handlers
filePromise
    .then(displayFileContent)
    .catch(handleError);
```

---

# 2. Core Concept You MUST Understand

There are **two different things happening at the same time**:

### 1. Synchronous execution (runs immediately)

- Function calls
- Promise creation
- `.then()` and `.catch()` registration

### 2. Asynchronous execution (runs later)

- `fs.readFile()`
- Callback execution
- `resolve()` / `reject()`

This difference is the **most important concept**.

---

# 3. Step-by-Step Internal Execution

## Step 1: Function Call

```jsx
const filePromise = readFileAsync();
```

What happens:

- Function starts executing immediately
- Logs:
    
    ```
    Inside readFileAsync
    ```
    
- A new Promise is created

---

## Step 2: Promise Constructor Runs

Inside:

```
new Promise(function (resolve, reject) { ... });
```

- This constructor runs immediately (synchronously)
- Logs:
    
    ```
    Inside Promise constructor
    ```
    
- `fs.readFile()` is called

Important:

- `fs.readFile()` does NOT block execution
- Node.js sends this task to the system (libuv thread pool)

---

## Step 3: Promise Returned Immediately

The function returns:

```
return new Promise(...)
```

So:

```
filePromise = Promise { <pending> }
```

At this moment:

- File is NOT read yet
- Promise is in **pending state**

From page 2:

> "Promise object: Promise { <pending> }"
> 

---

## Step 4: Logging the Promise

```
console.log("Promise object:", filePromise);
```

Output:

```
Promise object: Promise { <pending> }
```

Reason:

- Async task is still running
- No resolve/reject yet

---

## Step 5: Registering Handlers

```
filePromise
    .then(displayFileContent)
    .catch(handleError);
```

Important internal behavior:

This does NOT execute anything yet.

Instead, JavaScript stores handlers internally:

```
filePromise= {
    state:"pending",
    onFulfilled:displayFileContent,
    onRejected:handleError
}
```

From page 2:

> JS stores handlers for resolve and reject mapping
> 

---

# 4. What Happens in Background

Meanwhile:

```
fs.readFile("Sample.txt", "utf-8", callback)
```

This runs asynchronously.

Node.js:

- Sends it to OS / thread pool
- Continues executing rest of code

---

# 5. When File Reading Completes

At some later time:

```
function (error, fileData) {
    console.log("Inside fs.readFile callback");
}
```

This callback is executed.

Log:

```
Inside fs.readFile callback
```

---

# 6. Two Possible Outcomes

## Case 1: Success

```
resolve(fileData);
```

What happens internally:

```
displayFileContent(fileData);
```

Output:

```
File Content:
<actual file content>
```

---

## Case 2: Error

```
reject(error);
```

What happens internally:

```
handleError(error);
```

Output:

```
Error occurred: <error message>
```

---

# 7. Full Internal Execution Timeline

From the table on page 3:

### Step-by-step flow

1. Call `readFileAsync()` → Sync
2. Promise constructor runs → Sync
3. `fs.readFile()` triggered → Sync start, Async execution
4. Promise returned → Sync
5. Log Promise → Sync (`<pending>`)
6. `.then()` / `.catch()` registered → Sync
7. File read completes → Async
8. Callback runs → Async
9. `resolve()` or `reject()` triggers handlers → Async

This exact sequence is shown clearly in the **table on page 3**

---

# 8. Most Important Mental Model

This is the core idea you should remember:

### When resolved:

```
resolve(data);
```

Internally becomes:

```
displayFileContent(data);
```

---

### When rejected:

```
reject(error);
```

Internally becomes:

```
handleError(error);
```

---

# 9. Key Observations (Very Important)

### 1. Promise is created and returned immediately

- It does NOT wait for async work

### 2. `.then()` and `.catch()` do NOT execute immediately

- They only register callbacks

### 3. `resolve()` and `reject()` trigger stored handlers

- They connect async result → user code

### 4. JavaScript does NOT block

- Everything continues while file is being read

### 5. Order of logs proves async behavior

Expected output order:

```
Inside readFileAsync
Inside Promise constructor
Promise object: Promise { <pending> }
Inside fs.readFile callback
File Content: ...
```

---

# 10. Why Promises Exist

Before Promises:

```
fs.readFile("file.txt", function(err, data) {
    if (!err) {
        fs.readFile("file2.txt", function(err2, data2) {
            ...
        });
    }
});
```

This leads to **callback hell**.

Promises solve this by:

- Flattening structure
- Separating success and error logic
- Making chaining possible

---

# 11. Final Summary

- A Promise represents a **future value**
- It has 3 states:
    - Pending
    - Fulfilled
    - Rejected
- `.then()` handles success
- `.catch()` handles errors
- `resolve()` → triggers `.then()`
- `reject()` → triggers `.catch()`
- Promise execution is:
    - Creation → synchronous
    - Resolution → asynchronous