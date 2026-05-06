// ------------------------------------------------------
// Problem background
// ------------------------------------------------------
// In JavaScript (and by default in TypeScript), objects are **mutable**.
// That means their properties can be changed even if the variable
// itself is declared with `const`.
//
// Example:
//   const obj = { name: "John" };
//   obj.name = "Jane";  allowed
//
// The `const` keyword only prevents *reassignment* of the variable itself,
// NOT the modification of the object’s internal properties.
//
// In other words, this is disallowed:
//   obj = {};
// But this is allowed:
//   obj.name = "Jane";
//
// If we want to make certain object properties **completely unchangeable**
// (so that they can never be reassigned after initialization),
// TypeScript provides the **readonly** modifier.

// ------------------------------------------------------
// Defining a type with readonly properties
// ------------------------------------------------------
// Here we define a `User` type (you can also use `interface`).
// The `readonly` keyword in TypeScript makes a property immutable,
// meaning once assigned, it cannot be changed later.
//
// So in this example:
// - `id` and `name` cannot be modified after object creation.
// - `age`, `email`, and `password` can still be changed.
type User = {
  readonly id: number; // cannot be reassigned after initialization
  readonly name: string; // cannot be reassigned after initialization
  age: number; // can be changed later
  email: string; // can be changed later
  password: string; // can be changed later
};

// ------------------------------------------------------
// Creating a User object
// ------------------------------------------------------
// Even though the variable `user` is declared as `const`, it doesn’t make
// the properties of the object immutable.
//
// What `const` ensures is that we can’t reassign `user` to point to a new object.
// But we can still modify the internal properties — unless they are marked `readonly`.
const user: User = {
  id: 1,
  name: 'John',
  age: 20,
  email: 'john@example.com',
  password: 'password',
};

// ------------------------------------------------------
// Trying to modify readonly properties
// ------------------------------------------------------
// Uncommenting the following lines would cause TypeScript compile-time errors:
//
// user.name = 'Jane'; // Error: Cannot assign to 'name' because it is a read-only property.
// user.id = 2;        // Error: Cannot assign to 'id' because it is a read-only property.
//
// The compiler protects these properties from being changed.
//
// However, note: at **runtime** (in JavaScript after compilation), this restriction
// doesn’t exist — it’s purely a **TypeScript compile-time check** for safety.
//
// So the protection is mainly for development, preventing accidental updates
// in your code before it’s run.

// ------------------------------------------------------
// Modifying non-readonly property
// ------------------------------------------------------
// Here, `age` is not readonly, so we can safely change it.
user.age = 21; // allowed, because 'age' is not readonly.

console.log(user);

/*
Output:
{
  id: 1,
  name: 'John',
  age: 21,                  // updated successfully
  email: 'john@example.com',
  password: 'password'
}
*/

// ------------------------------------------------------
// Summary of const vs readonly
// ------------------------------------------------------
//
// `const` → prevents reassignment of the variable.
//              You can’t point the variable to a new object.
//              But the object’s internal fields can still change.
//
// `readonly` → prevents modification of a specific property inside an object.
//                  You can’t reassign that property once initialized.
//
// Example difference:
//
//   const user = { name: "John" };
//   user = {};             // Error (const restriction)
//   user.name = "Jane";    // Works (unless 'name' is readonly)
//
//   type User = { readonly name: string };
//   const user: User = { name: "John" };
//   user.name = "Jane";    // Error (readonly restriction)
//
// In practice, developers often use both:
//   - `const` for variables that shouldn’t be reassigned.
//   - `readonly` for object fields that shouldn’t be changed.

// ------------------------------------------------------
// Bonus: Readonly utility type
// ------------------------------------------------------
// TypeScript also provides a built-in `Readonly<T>` utility type,
// which makes **all** properties of a type readonly.
//
// Example:
//
//   type User = {
//     id: number;
//     name: string;
//   };
//
//   type ReadonlyUser = Readonly<User>;
//
//   const user: ReadonlyUser = { id: 1, name: 'John' };
//   user.name = 'Jane'; // Error: Cannot assign to 'name' because it is a read-only property.
//
// This is useful if you want to make an entire object immutable
// rather than marking each field individually.
