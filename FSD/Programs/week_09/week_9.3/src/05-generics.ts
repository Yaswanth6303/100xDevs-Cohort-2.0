// ------------------------------------------------------------------------------------------------
// Example: Generic Function - firstElementGeneric<T>
// ------------------------------------------------------------------------------------------------
//
// In this example, we’ll explore how to use *generics* in TypeScript
// to write a single function that works with any array type (number[], string[], etc.)
// while maintaining type safety and preventing mixed-type mistakes.
//
// We’ll also see what happens when we use a UNION type (number | string)
// as the generic argument.
// ------------------------------------------------------------------------------------------------

// Define a generic function that takes an array of type T and returns the first element
// - <T> : Type parameter placeholder
// - nums : array of elements of type T (T[])
// - return type : T | undefined (undefined if the array is empty)
function firstElementGeneric<T>(nums: T[]): T | undefined {
  return nums[0]; // Returns the first element of the array (or undefined)
}

// ------------------------------------------------------------------------------------------------
// Example 1: String array
// ------------------------------------------------------------------------------------------------
const output = firstElementGeneric<string>(['Yaswanth', 'Gudivada']);
console.log(output);
// Output: "Yaswanth"
// TypeScript infers `output` as `string | undefined`
// You can safely call string methods using optional chaining, e.g. output?.toUpperCase()

// ------------------------------------------------------------------------------------------------
// Example 2: Number array
// ------------------------------------------------------------------------------------------------
const output1 = firstElementGeneric<number>([1, 2, 3]);
console.log(output1);
// Output: 1
// TypeScript infers `output1` as `number | undefined`

// ------------------------------------------------------------------------------------------------
// Example 3: Boolean array
// ------------------------------------------------------------------------------------------------
const output2 = firstElementGeneric<boolean>([true, false]);
console.log(output2);
// Output: true
// TypeScript infers `output2` as `boolean | undefined`

// ------------------------------------------------------------------------------------------------
// Example 4: Number array with multiple elements
// ------------------------------------------------------------------------------------------------
const output3 = firstElementGeneric<number>([1, 2, 3, 4, 5]);
console.log(output3);
// Output: 1
// Works fine — still returns the first element (of type number)

// ------------------------------------------------------------------------------------------------
// Example 5: Invalid — Two type parameters (Not Allowed)
// ------------------------------------------------------------------------------------------------
//
// The following call is invalid:
//
// let output4 = firstElementGeneric<string, number>([1, 2, 'Yaswanth', 'Gudivada']);
//
// Reason:
// - The function is defined as `firstElementGeneric<T>` → only ONE generic parameter <T>.
// - You can’t pass <string, number> because that would require the function
//   to have been defined as `firstElementGeneric<T, U>`.
//
// So this will throw a compile-time TypeScript error:
// "Expected 1 type argument, but got 2."
//
// ------------------------------------------------------------------------------------------------
// Example 6: Union Type as Generic Argument
// ------------------------------------------------------------------------------------------------
//
// Instead of passing two generic types, we can pass a *union type* as a single argument.
// This allows mixed arrays (e.g., number + string) — but with limitations.
//
// Here, T = number | string
// So, nums is of type (number | string)[]
// and the return type is (number | string) | undefined
const output6 = firstElementGeneric<number | string>([1, 2, 3, 4, 5, 'Yaswanth', 'Gudivada']);
console.log(output6);
// Output: 1
// This is valid because we’re using ONE generic type — which itself is a union type.

// But now the return type is `number | string | undefined`
// That means we must check its type before using type-specific operations.

// Invalid: TypeScript doesn't know if it's a number or string
// console.log(output6.toUpperCase()); // Error: Property 'toUpperCase' does not exist on type 'number | string'

// Correct way: Use type narrowing
if (typeof output6 === 'string') {
  console.log(output6.toUpperCase()); // Works fine when output6 is a string
} else {
  console.log(output6); // Works fine when output6 is a number
}

// ------------------------------------------------------------------------------------------------
// Summary
// ------------------------------------------------------------------------------------------------
//
// ✔ The function `firstElementGeneric<T>` works for any array type.
// ✔ TypeScript preserves the type information — so return type matches input type.
// ✔ If the array can contain mixed types, you can use a union type (like number | string).
// ✔ You must still handle type narrowing when you use union types.
// ✔ Passing two generic parameters (<string, number>) won’t work since the function defines only one (<T>).
//
// ------------------------------------------------------------------------------------------------
// Type Inference Example (No need to explicitly write <T>)
// ------------------------------------------------------------------------------------------------
//
// TypeScript can *automatically infer* the generic type from the arguments:
const inferredString = firstElementGeneric(['TypeScript', 'Generics']);
console.log(inferredString?.toUpperCase()); // Works, inferred as string | undefined

const inferredNumber = firstElementGeneric([100, 200, 300]);
console.log(inferredNumber?.toFixed(2)); // Works, inferred as number | undefined
//
// This shows how TypeScript’s inference system automatically determines <T>
// based on the argument you pass.
// ------------------------------------------------------------------------------------------------
