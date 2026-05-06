// ------------------------------------------------------
// The problem with basic object typing
// ------------------------------------------------------
//
// When we create an object in TypeScript whose keys are dynamic (like IDs),
// we often want to specify what type of data each key maps to.
//
// A naive way to do that is by using an *index signature*, like this:
//
//   type UserMap = {
//     [key: string]: {
//       name: string;
//       age: number;
//       email: string;
//       password: string;
//     };
//   };
//
// This says:
//   - The object can have any number of string keys.
//   - Each key points to a value that must have the structure { name, age, email, password }.
//
// It works perfectly fine.
// But it looks long and repetitive — especially when you reuse similar patterns.
//
// TypeScript provides a cleaner built-in way to express the same idea: **Record**.

// ------------------------------------------------------
// Defining a User interface
// ------------------------------------------------------
//
// This interface defines the shape of a single user object.
// It tells TypeScript that every user must have:
//   - name: string
//   - age: number
//   - email: string
//   - password: string
//
// Using an interface (or a type) like this is common practice,
// as it allows us to reuse this structure throughout our code.
interface User {
  name: string;
  age: number;
  email: string;
  password: string;
}

// ------------------------------------------------------
// Using Record to type an object
// ------------------------------------------------------
//
// Syntax of Record:
//   Record<KeyType, ValueType>
//
// Meaning:
//   - The keys of the object must be of type `KeyType`
//   - The values of the object must be of type `ValueType`
//
// In our case:
//   Record<string, User>
//   → This means an object where:
//      - each key is a string (for example, "1", "2", "user123")
//      - each value must be a valid `User` object
//
// It’s just a more elegant, concise alternative to writing:
//
//   { [key: string]: User }
//
// Both are equivalent, but Record is more readable and widely used.
const users: Record<string, User> = {
  // Key: '1' (string)
  // Value: an object matching the `User` interface
  '1': {
    name: 'John',
    age: 20,
    email: 'john@example.com',
    password: 'password',
  },

  // Another key-value pair with the same structure
  '2': {
    name: 'Jane',
    age: 21,
    email: 'jane@example.com',
    password: 'password',
  },
};

// ------------------------------------------------------
// Logging the object
// ------------------------------------------------------
//
// When you print the `users` object, you’ll see that it looks
// exactly like a normal JavaScript object.
//
// The `Record` type only exists at compile time (in TypeScript).
// It has **no effect at runtime** — JavaScript doesn’t have Record as a real concept.
//
// It simply helps ensure type safety during development.
console.log(users);

/*
Output (runtime JavaScript):
{
  '1': { name: 'John', age: 20, email: 'john@example.com', password: 'password' },
  '2': { name: 'Jane', age: 21, email: 'jane@example.com', password: 'password' }
}

What TypeScript ensures (compile time):
- Every key must be a string.
- Every value must follow the `User` structure.
- If you accidentally miss a property (e.g., no email) or add an extra one,
  TypeScript will give you an error before you even run the code.
*/
