// ------------------------------------------------------
// Problem background — Why use Map instead of plain objects?
// ------------------------------------------------------
//
// In earlier examples, we used plain objects or Record<string, User>
// to store users by their IDs.
//
// Example:
//   const users = {
//     '1': { name: 'John', age: 20, ... },
//     '2': { name: 'Jane', age: 21, ... }
//   };
//
// While this works fine, it has some limitations:
//
// All keys are automatically converted to strings.
// The object inherits from `Object.prototype`, so it can have unwanted keys.
// No built-in methods like size counting, iteration, or ordering.
// Mutating and checking existence (`in` operator) is less expressive.
//
// The solution: use **Map**, a built-in JavaScript class designed
// specifically for key-value data management.
//
// `Map` is available natively in modern JavaScript and works perfectly
// with TypeScript for strong type-checking.

// ------------------------------------------------------
// 2️⃣ Define the User type
// ------------------------------------------------------
// Just like before, this describes what a single user object looks like.
// Using a `type` here helps TypeScript ensure that all user data
// stored in the map matches this shape.
type User = {
  name: string;
  age: number;
  email: string;
  password: string;
};

// ------------------------------------------------------
// 3️⃣ Create a new Map
// ------------------------------------------------------
// Syntax:
//   new Map<KeyType, ValueType>()
//
// In this case:
//   - The key type is `string` (like user IDs: "1", "2", etc.)
//   - The value type is `User` (the structure defined above)
//
// So the `users` Map will store key-value pairs of type:
//   Map<string, User>
//
// Compared to a plain object:
//   - Keys can be of *any* type (not just strings).
//   - The order of insertion is preserved.
//   - You get built-in methods for common operations.
const users = new Map<string, User>();

// ------------------------------------------------------
// 4️⃣ Add data into the Map
// ------------------------------------------------------
// We use the `.set(key, value)` method to add a key-value pair.
//
// If a key already exists, `.set()` will overwrite the old value.
//
// Example:
//   users.set('1', { name: 'John', ... });
//   users.set('1', { name: 'Alex', ... });  // overwrites the previous '1'
users.set('1', {
  name: 'John',
  age: 20,
  email: 'john@example.com',
  password: 'password',
});

users.set('2', {
  name: 'Jane',
  age: 21,
  email: 'jane@example.com',
  password: 'password',
});

// ------------------------------------------------------
// 5️⃣ Retrieve data from the Map
// ------------------------------------------------------
// We use `.get(key)` to fetch the value associated with a specific key.
//
// If the key exists, `.get()` returns the value (in our case, a `User` object).
// If the key doesn’t exist, `.get()` returns `undefined` (not an error).
console.log(users.get('1')); // Returns John's user object
console.log(users.get('2')); // Returns Jane's user object
console.log(users.get('3')); // Returns undefined (since '3' doesn't exist)

// ------------------------------------------------------
// 6️⃣ Check the size of the Map
// ------------------------------------------------------
// The `.size` property gives the number of entries currently in the Map.
console.log(users.size); // Output: 2

// ------------------------------------------------------
// 7️⃣ Check if a key exists
// ------------------------------------------------------
// `.has(key)` returns `true` if the key exists, otherwise `false`.
// It’s similar to checking `if (key in object)` for plain objects,
// but safer and more explicit.
console.log(users.has('1')); // true
console.log(users.has('2')); // true
console.log(users.has('3')); // false

// ------------------------------------------------------
// 8️⃣ Summary of Map methods used
// ------------------------------------------------------
//
// Method        | Description
// ---------------|--------------------------------------------------
// `.set(k, v)`   | Adds or updates an entry in the map.
// `.get(k)`      | Retrieves the value for the key `k`.
// `.has(k)`      | Checks if the key `k` exists.
// `.size`        | Returns total number of entries.
// `.delete(k)`   | Removes the entry for the key `k`.
// `.clear()`     | Removes all entries from the map.
// `.forEach()`   | Loops through all key-value pairs.
// `.keys()` / `.values()` / `.entries()` | Iterate over keys, values, or both.

// ------------------------------------------------------
// 9️⃣ Example of iteration (optional)
// ------------------------------------------------------
// We can easily loop over the map entries using `for...of` or `forEach`.
//
// Example:
// for (const [id, user] of users) {
//   console.log(`ID: ${id}, Name: ${user.name}`);
// }
//
// Or using forEach:
users.forEach((user, id) => console.log(`User ${id}: ${user.name}`));
