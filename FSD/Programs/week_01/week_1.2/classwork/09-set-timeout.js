function greet(){
    console.log("Hello World");
}

function greetAliean(){
    console.log("Hello Aliean")
}

// Here I am calling greet function as argument for setTimeout
// This setTimeout is a callback function of the browser. It will take a function as argument and a delay 
// time as argument and saying to the browser to call the function after the delay time.
setTimeout(greet, 5 * 1000); // This function will execute after 5 seconds

// setInterval will call the function for every one second after the execution of previous function.
// setInterval(greet, 1 * 1000)