// ------------------------------------------------------
// Problem statement
// ------------------------------------------------------
// In the previous example (in `01-pick.ts`), we used `Pick` to select specific
// properties ('name', 'age', 'password') from the `User` interface for updates.
//
// However, there’s one limitation:
//   - With `Pick`, all the selected properties are **required**.
//   - That means whenever we call `updateUser`, we must provide all three fields
//     (name, age, and password).
//
// Example (from previous file):
//     updateUser(user, { name: 'Jane', age: 21, password: 'newpassword' });
//
// But in real-world scenarios, we may want to update **only one or two fields**
// instead of all of them. For example, maybe we just want to change the name
// or only the password.
//
// To make this possible, we can use the **Partial** utility type.

// ------------------------------------------------------
// The User interface
// ------------------------------------------------------
// This defines what a "User" object looks like.
// The interface ensures that any user must have all these properties.
interface User {
  id: number; // unique identifier for the user
  name: string; // name of the user
  age: number; // age of the user
  email: string; // email address
  password: string; // password
}

// ------------------------------------------------------
// Using Partial with Pick
// ------------------------------------------------------
// Step 1: `Pick<User, 'name' | 'age' | 'password'>`
//   → creates a type that includes only these three fields from User.
//
// Step 2: `Partial<...>`
//   → makes all properties inside that type optional.
//
// Combined effect:
//   - We can now update any subset of 'name', 'age', or 'password'.
//   - None of them are required.
//
// For example, this is valid:
//     { name: "Jane" }
//
// Also valid:
//     { password: "newpass" }
//
// Or all together:
//     { name: "Jane", age: 25, password: "newpass" }
//
// Summary: You can choose to update one, multiple, or all fields freely.
type UpdateUser = Partial<Pick<User, 'name' | 'age' | 'password'>>;

// ------------------------------------------------------
// Function to update a user
// ------------------------------------------------------
// The function takes:
//   - `user`: the existing user object
//   - `updates`: a partial set of fields we want to modify
//
// The function merges both objects using the spread operator `...`.
// If a property exists in `updates`, it will override the one in `user`.
// Otherwise, the original value remains unchanged.
//
// This approach ensures **immutability** (original user object isn't modified)
// and flexibility (we can update any subset of fields).
function updateUser(user: User, updates: UpdateUser) {
  // The spread operator merges the `user` and `updates` objects.
  // Since updates are optional, only provided properties overwrite the original.
  return { ...user, ...updates };
}

// ------------------------------------------------------
// Example usage
// ------------------------------------------------------
// Create a sample user object.
const user: User = {
  id: 1,
  name: 'John',
  age: 20,
  email: 'john@example.com',
  password: 'password',
};

// ------------------------------------------------------
// Updating only one field (thanks to Partial)
// ------------------------------------------------------
// Now we update only the 'name' field.
//
// If we used just `Pick` (without `Partial`),
// this would cause a TypeScript error because 'age' and 'password'
// would also be required.
//
// But since we wrapped it with `Partial`, we can safely update only 'name'.
const updatedUser = updateUser(user, { name: 'Jane' });

// ------------------------------------------------------
// Output
// ------------------------------------------------------
// The resulting object keeps all other properties the same,
// and only the provided ones get updated.
console.log(updatedUser);

/*
Output:
{
  id: 1,
  name: 'Jane',               // updated
  age: 20,                    // unchanged
  email: 'john@example.com',  // unchanged
  password: 'password'        // unchanged
}

This demonstrates the use of Partial + Pick:
- `Pick` → select only the fields we’re allowed to update.
- `Partial` → make them optional so we can choose which ones to update.
*/
