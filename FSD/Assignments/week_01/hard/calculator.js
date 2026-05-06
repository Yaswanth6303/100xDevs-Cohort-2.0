/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num;
  }

  subtract(num) {
    this.result -= num;
  }

  multiply(num) {
    this.result *= num;
  }

  divide(num) {
    if (num === 0) {
      throw new Error("Division by zero is not allowed");
    }
    this.result /= num;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(expression) {
    // Remove extra spaces and validate the expression
    const cleanExpression = expression.replace(/\s+/g, "");

    // Check for invalid characters (only allow numbers, operators, and parentheses)
    if (!/^[0-9+\-*/().]+$/.test(cleanExpression)) {
      throw new Error("Invalid characters in expression");
    }

    // Check for balanced parentheses
    let parenthesesCount = 0;
    for (let char of cleanExpression) {
      if (char === "(") parenthesesCount++;
      if (char === ")") parenthesesCount--;
      if (parenthesesCount < 0) {
        throw new Error("Invalid parentheses");
      }
    }
    if (parenthesesCount !== 0) {
      throw new Error("Invalid parentheses");
    }

    try {
      // Use Function constructor instead of eval for safer evaluation
      const result = new Function("return " + cleanExpression)();

      // Check for division by zero in the result
      if (!isFinite(result)) {
        throw new Error("Division by zero is not allowed");
      }

      this.result = result;
    } catch (error) {
      if (error.message.includes("Division by zero")) {
        throw new Error("Division by zero is not allowed");
      }
      throw new Error("Invalid expression");
    }
  }
}

module.exports = Calculator;
