// ------------------------------------------------------
// Problem background — Why do we need Exclude?
// ------------------------------------------------------
//
// In TypeScript, you can create a **union type** to represent multiple
// possible values for a variable or function parameter.
//
// Example:
//   type EventType = 'click' | 'scroll' | 'mousemove';
//
// This means `event` can be any of the three string literals.
//
// Sometimes, you may want to reuse this type but *remove* one or more options.
// For example, maybe your function should handle only 'click' and 'mousemove',
// but not 'scroll'.
//
// You could manually redefine a new type like this:
//   type ExcludeType = 'click' | 'mousemove';
//
// But that becomes hard to maintain — if `EventType` changes in the future
// (say, you add 'keydown'), you must manually update all the dependent types.
//
// TypeScript provides a built-in solution: **Exclude**

// ------------------------------------------------------
// Define the original union type
// ------------------------------------------------------
// This defines all possible event types as a **union of string literals**.
type EventType = 'click' | 'scroll' | 'mousemove';

// ------------------------------------------------------
// Using Exclude
// ------------------------------------------------------
//
// Syntax: Exclude<UnionType, ExcludedMembers>
//
// It creates a **new type** by removing one or more members
// from a union type.
//
// In this example:
//   Exclude<EventType, 'scroll'>
//
// Step-by-step:
//   - Start with: 'click' | 'scroll' | 'mousemove'
//   - Remove 'scroll'
//   - Result: 'click' | 'mousemove'
//
// So ExcludeType becomes a new union type **without 'scroll'**.
type ExcludeType = Exclude<EventType, 'scroll'>;

// ------------------------------------------------------
// Function definition using the new type
// ------------------------------------------------------
//
// The function `handleEvent` accepts only those event types
// that are part of `ExcludeType`, i.e., 'click' or 'mousemove'.
//
// If you try to pass 'scroll', TypeScript will throw a compile-time error.
// This ensures strict type safety and prevents invalid event names
// from being passed accidentally.
const handleEvent = (event: ExcludeType) => {
  console.log(event);
};

// ------------------------------------------------------
// Function calls — what’s allowed and what’s not
// ------------------------------------------------------
//
// These are valid because they exist in ExcludeType.
handleEvent('click'); // Works fine
handleEvent('mousemove'); // Works fine

// This would cause a TypeScript error if uncommented,
// because 'scroll' was removed from the type using Exclude.
// handleEvent('scroll');

/*
Error message (from TypeScript):
Argument of type '"scroll"' is not assignable to parameter of type '"click" | "mousemove"'.
*/

// ------------------------------------------------------
// Concept Summary — How Exclude works internally
// ------------------------------------------------------
//
// The built-in definition of Exclude (simplified) looks like this:
//
//   type Exclude<T, U> = T extends U ? never : T;
//
// Let’s break it down with our example:
//
//   T = 'click' | 'scroll' | 'mousemove'
//   U = 'scroll'
//
// TypeScript processes each member of the union individually:
//
//   'click' extends 'scroll' ? never : 'click'        → 'click'
//   'scroll' extends 'scroll' ? never : 'scroll'      → never
//   'mousemove' extends 'scroll' ? never : 'mousemove' → 'mousemove'
//
// Combine results: 'click' | never | 'mousemove' = 'click' | 'mousemove'
//
// Result = 'click' | 'mousemove'
//
// So Exclude basically filters out unwanted members from a union type.
// It’s like a **type-level filter function**!

// ------------------------------------------------------
// Real-world use cases for Exclude
// ------------------------------------------------------
//
// Removing specific states from a type:
//     type UserRole = 'admin' | 'editor' | 'guest';
//     type RestrictedRole = Exclude<UserRole, 'guest'>;
//     // Result: 'admin' | 'editor'
//
// Creating strict types for function arguments:
//     type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
//     type SafeMethod = Exclude<HTTPMethod, 'DELETE'>;
//
// Handling discriminated unions in APIs:
//     type ApiResponse = SuccessResponse | ErrorResponse | LoadingState;
//     type WithoutLoading = Exclude<ApiResponse, LoadingState>;
//
// Useful in large codebases to refine reusable types
//     without redefining them from scratch.

// ------------------------------------------------------
// Related utility types
// ------------------------------------------------------
//
// TypeScript provides several built-in utility types for manipulating unions:
//
// | Utility Type | Description | Example |
// |---------------|--------------|----------|
// | **Exclude<T, U>** | Removes types from T that are assignable to U | `Exclude<'a' | 'b', 'a'> → 'b'` |
// | **Extract<T, U>** | Keeps only types from T that are assignable to U | `Extract<'a' | 'b', 'a'> → 'a'` |
// | **Omit<T, K>** | Removes keys from object types | `Omit<User, 'password'>` |
// | **Pick<T, K>** | Selects keys from object types | `Pick<User, 'name'>` |
// | **Partial<T>** | Makes all properties optional | `Partial<User>` |
// | **Readonly<T>** | Makes all properties readonly | `Readonly<User>` |

// Together, these utilities make TypeScript’s type system extremely powerful
// and expressive — allowing developers to write flexible, safe, and reusable code.
