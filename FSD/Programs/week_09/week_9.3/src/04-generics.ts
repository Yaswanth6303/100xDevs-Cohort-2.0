// ------------------------------------------------------------------------------------------------
// Example: Generic Function in TypeScript
// ------------------------------------------------------------------------------------------------
//
// A generic function allows you to write a single function that works with
// multiple types, while still preserving type information.
//
// The <T> here is a *type parameter*. It acts as a placeholder that will be
// replaced by the actual type when the function is called.
//
// Syntax:
// function functionName<T>(param: T): T { ... }
//
// It means: "This function accepts a value of type T and returns a value of the same type T."
// ------------------------------------------------------------------------------------------------

// Define a generic function `identity`
// It takes one argument `arg` of type `T` (generic type) and returns the same type `T`
function identity<T>(arg: T): T {
  return arg; // Simply returns what was passed in (identity function)
}

// ------------------------------------------------------------------------------------------------
// Now let’s call this function with different types and see how TypeScript preserves the type.
// ------------------------------------------------------------------------------------------------

// 1️⃣ Example with string
const output = identity<string>('My String');
console.log(output);
// Output: "My String"
// TypeScript knows `output` is a string, so we can safely use string methods like output.toUpperCase()

// 2️⃣ Example with number
const output1 = identity<number>(10);
console.log(output1);
// Output: 10
// TypeScript infers that the return type is number, so all number operations are valid.

// 3️⃣ Example with boolean (true)
const output2 = identity<boolean>(true);
console.log(output2);
// Output: true

// 4️⃣ Example with boolean (false)
const output3 = identity<boolean>(false);
console.log(output3);
// Output: false
// Works the same — the generic type here is boolean.

// 5️⃣ Example with null
const output4 = identity<null>(null);
console.log(output4);
// Output: null
// TypeScript allows null as a valid type when explicitly specified.

// 6️⃣ Example with undefined
const output5 = identity<undefined>(undefined);
console.log(output5);
// Output: undefined
// TypeScript allows undefined as a valid generic type as well.

// 7️⃣ Example with NaN (Not a Number)
// Although NaN is technically a number, it represents an invalid numeric value.
const output6 = identity<number>(NaN);
console.log(output6);
// Output: NaN
// The type is still number, because NaN belongs to the number type category.

// 8️⃣ Example with Infinity (Positive Infinity)
const output7 = identity<number>(Infinity);
console.log(output7);
// Output: Infinity
// Also treated as number — Infinity is a special numeric constant.

// 9️⃣ Example with -Infinity (Negative Infinity)
const output8 = identity<number>(-Infinity);
console.log(output8);
// Output: -Infinity
// Again, still type number — no problem with generic inference.

// Example with Symbol
const output9 = identity<symbol>(Symbol('My Symbol'));
console.log(output9);
// Output: Symbol(My Symbol)
// Symbol is a primitive data type — the generic function handles it easily.

// 11️⃣ Example with BigInt
const output10 = identity<bigint>(BigInt(10));
console.log(output10);
// Output: 10n
// BigInt is another primitive type — represents arbitrarily large integers.
// TypeScript supports it as a valid generic type parameter too.

// ------------------------------------------------------------------------------------------------
// Summary
// ------------------------------------------------------------------------------------------------
//
// - `identity<T>` is a *generic identity function*.
// - It accepts a value of any type and returns the same type.
// - TypeScript “remembers” the type you pass and enforces it on the return value.
// - This ensures type safety while keeping the code reusable.
//
// Without generics, if we used something like:
//    function identity(arg: any): any { return arg; }
// We would lose type information — TypeScript wouldn't know the return type.
//
// But with generics (<T>), we retain *both flexibility and type safety*.
//
// Example benefit:
//    const str = identity("Hello");
//    console.log(str.toUpperCase()); Works — inferred as string.
//
// ------------------------------------------------------------------------------------------------
