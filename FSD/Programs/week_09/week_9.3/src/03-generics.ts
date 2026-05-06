// ------------------------------------------------------------------------------------------------
// In this example, we are exploring how TypeScript handles unions (number | string)
// and why we may need generics to preserve type information properly.
// ------------------------------------------------------------------------------------------------

// Define a type alias `Input` that can be either a number or a string
type Input = number | string;

// Define a function `firstElement` that takes an array of Input (number | string)
// and returns the first element from that array.
function firstElement(nums: Input[]) {
  return nums[0]; // The return type is inferred as `Input`, i.e., number | string
}

// Call `firstElement` with an array of numbers
let output = firstElement([1, 2, 3]);
console.log(output); // Output: 1 — works fine

// Call `firstElement` with an array of strings
output = firstElement(['Yaswanth', 'Gudivada']);

// Problem:
// Even though we passed a string array, TypeScript only knows that `output` is of type `Input`
// i.e., number | string. So we cannot safely call string-specific methods like `toUpperCase()`
// without narrowing the type.
//
// Example (uncomment to see error):
// console.log(output?.toUpperCase()); // Not possible because Input = number | string

// Call `firstElement` with a mixed array of numbers and strings
let result = firstElement([1, 2, 3, 'Yaswanth', 'Gudivada']);
console.log(result); 
// This works because the function parameter type `Input[]`
// allows a mix of numbers and strings in the same array.
// ------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------
// Now let’s fix one part of the issue — preventing mixed arrays (number + string together).
// We’ll define a new function that accepts *either* number[] OR string[], but not both at once.
// ------------------------------------------------------------------------------------------------

function firstElementArray(nums: number[] | string[]) {
  return nums[0];
}

// This will give a compile-time error because the array has both numbers and strings.
// The function signature enforces that the array must be *only numbers* OR *only strings*.
//
// let resultArray = firstElementArray([1, 2, 3, 'Yaswanth', 'Gudivada']);
// console.log(resultArray);

// So now we’ve solved the "mixed array" problem.
// The function is type-safe — either `number[]` or `string[]`, not both.
// ------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------
// But... one problem still remains!
// ------------------------------------------------------------------------------------------------

// We still can’t do this safely:
//
// console.log(output?.toUpperCase());
//
// Because TypeScript still treats the return type of `firstElement`
// (and even `firstElementArray`) as `number | string`.
//
// So even though we *know* we passed an array of strings,
// TypeScript doesn’t “remember” that — it has lost the type information.
//
// ------------------------------------------------------------------------------------------------
// Solution: Use GENERICS
// ------------------------------------------------------------------------------------------------
//
// Generics allow the function to “remember” the specific type of elements
// passed to it. That way, when we pass a string array, the return type
// automatically becomes `string` (not number | string).
//
// See in file: 05-generics.ts
//
// In that version, the function will look like this:
//
// function firstElementGeneric<T>(nums: T[]): T {
//   return nums[0];
// }
//
// Now TypeScript can infer the type:
//
// const output = firstElementGeneric(['Yaswanth', 'Gudivada']);
// console.log(output.toUpperCase()); // Works perfectly!
// ------------------------------------------------------------------------------------------------
