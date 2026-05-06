//Here we are passing functions in the arguments
function calculateArthemetic(a, b, arthemeticFunction){
    const ans = arthemeticFunction(a, b)
    return ans; 
}

function sum(a, b){
    return a + b;
}

function minus(a, b){
    return a - b;
}

const ans = calculateArthemetic(4, 3, minus); //Here the arthemeticFimalFunction will become minus
console.log(ans); 