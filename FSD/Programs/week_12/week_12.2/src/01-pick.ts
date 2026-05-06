// ------------------------------------------------------
// Defining a "User" interface
// ------------------------------------------------------
// An interface in TypeScript is used to describe the shape (structure)
// of an object. It defines the properties that an object should have,
// along with their data types.
//
// Here, the `User` interface defines what a "User" object looks like.
interface User {
  id: number; // Each user must have a unique numeric ID.
  name: string; // The user's name, represented as a string.
  age: number; // The user's age, represented as a number.
  email: string; // The user's email address, represented as a string.
  password: string; // The user's password, represented as a string.
}

// ------------------------------------------------------
// Alternative approach using another interface (commented out)
// ------------------------------------------------------
// Initially, one might think of creating a separate interface for updating a user.
// For example:
//
// interface UpdateUser {
//   name: string;
//   age: number;
//   password: string;
// }
//
// This approach works fine, but it has a **maintenance problem**.
// If you later change the type of any field in the `User` interface
// (for example, if `age` becomes a `string` instead of a `number`),
// you would also have to manually change it everywhere — including
// here in `UpdateUser` — to keep them consistent.
//
// This duplication can lead to bugs if one is forgotten or missed.

// ------------------------------------------------------
// Using "Pick" to create a new type from an existing interface
// ------------------------------------------------------
// Instead of manually redefining fields, we can use a **utility type**.
// TypeScript provides several built-in utility types like:
//   - `Pick`
//   - `Omit`
//   - `Partial`
//   - `Required`, etc.
//
// `Pick<Type, Keys>` creates a new type by selecting ("picking")
// specific properties (fields) from an existing type or interface.
//
// Here, we use `Pick` to create a new type `UpdateUser`,
// which includes only the properties 'name', 'age', and 'password'
// from the `User` interface.
//
// Advantage: If we later change the data type of `age` in the `User` interface
// (say from `number` to `string`), the `UpdateUser` type automatically
// reflects that change. We don't need to modify anything manually.
//
// This makes the code **more flexible**, **consistent**, and **maintainable**.
type UpdateUser = Pick<User, 'name' | 'age' | 'password'>;

// ------------------------------------------------------
// Defining a function to update a user
// ------------------------------------------------------
// The `updateUser` function takes two parameters:
//  - `user`: The original user object (of type `User`)
//  - `updates`: An object containing updated fields (of type `UpdateUser`)
//
// The function returns a **new object** that merges both the original
// user object and the updates. This ensures immutability —
// instead of modifying the original user, we create a new updated copy.
function updateUser(user: User, updates: UpdateUser) {
  // Using the spread operator `...` merges the two objects.
  // If any property names overlap (like 'name', 'age', or 'password'),
  // the values from `updates` will overwrite those from `user`.
  //
  // Example:
  // user = { name: "John", age: 20 }
  // updates = { name: "Jane", age: 21 }
  // result = { name: "Jane", age: 21 }
  return { ...user, ...updates };
}

// ------------------------------------------------------
// Creating a sample user object
// ------------------------------------------------------
// Here, we create an object `user` that follows the `User` interface structure.
const user: User = {
  id: 1, // user ID
  name: 'John', // user name
  age: 20, // user age
  email: 'john@example.com', // user email
  password: 'password', // user password
};

// ------------------------------------------------------
// Calling the update function
// ------------------------------------------------------
// We now call `updateUser`, passing the existing user and an update object.
//
// The update object includes only the fields defined in `UpdateUser`
// (that is, 'name', 'age', and 'password').
//
// Other properties like 'id' and 'email' will remain unchanged
// because they are not part of `UpdateUser`.
//
// The returned result will be a new user object with the updated values.
const updatedUser = updateUser(user, {
  name: 'Jane', // new name replaces old one
  age: 21, // new age replaces old one
  password: 'newpassword', // new password replaces old one
});

// ------------------------------------------------------
// Printing the result
// ------------------------------------------------------
// We log the updated user to the console.
// You will see that only `name`, `age`, and `password` were updated.
// The rest (`id`, `email`) remain the same.
console.log(updatedUser);

/*
  Output:
  {
    id: 1,
    name: 'Jane',
    age: 21,
    email: 'john@example.com',
    password: 'newpassword'
  }

  This demonstrates that:
  - The function merges updates correctly.
  - Using `Pick` made the code maintainable and safe.
  - The original user remains unmodified.
*/
