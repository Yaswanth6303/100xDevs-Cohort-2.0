// Types and interfaces are mostly similar but there are some key differences
// ---------------------------------------------------------------------------
// Both are used to describe the shape of an object, but they have different capabilities.

// Example 1: Basic object shape definition
// -------------------------------------------

type UserType = {
  firstName: string;
  lastName: string;
  age: number;
};

interface UserInterface {
  firstName: string;
  lastName: string;
  age: number;
}

// Both can be used in the same way:
const user1: UserType = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
};

const user2: UserInterface = {
  firstName: "Alice",
  lastName: "Smith",
  age: 25,
};

console.log("UserType:", user1);
console.log("UserInterface:", user2);

// Example 2: Extending other types or interfaces
// -------------------------------------------------

// Interface can extend other interfaces
interface EmployeeInterface extends UserInterface {
  employeeId: string;
}

// Type can extend other types using intersection (&)
type EmployeeType = UserType & {
  employeeId: string;
};

const emp1: EmployeeInterface = {
  firstName: "Mark",
  lastName: "Lee",
  age: 28,
  employeeId: "EMP123",
};

const emp2: EmployeeType = {
  firstName: "Sara",
  lastName: "Johnson",
  age: 32,
  employeeId: "EMP456",
};

console.log("EmployeeInterface:", emp1);
console.log("EmployeeType:", emp2);

// Example 3: Declaration merging
// ---------------------------------
// Interfaces can merge if declared multiple times

interface Person {
  name: string;
}
interface Person {
  age: number;
}
// Merged automatically → { name: string; age: number }

const person: Person = { name: "Merged Interface", age: 20 };
console.log("Merged Person:", person);

// Type aliases cannot merge
type Animal = { species: string };
// type Animal = { color: string }; // Error: Duplicate identifier

// Example 4: Using Union and Intersection
// ------------------------------------------
// Type aliases can represent unions or intersections

type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  console.log(`ID: ${id}`);
}

printId(123);
printId("123");

// You can also intersect multiple types
type Address = { city: string; country: string };
type ContactInfo = { email: string; phone: string };

type UserWithContact = UserType & Address & ContactInfo;

const userWithContact: UserWithContact = {
  firstName: "David",
  lastName: "Kim",
  age: 40,
  city: "New York",
  country: "USA",
  email: "david@example.com",
  phone: "+1-555-1234",
};

console.log("UserWithContact:", userWithContact);

// Example 5: Interfaces cannot represent unions or primitives
// --------------------------------------------------------------
// The following would be invalid for interfaces:
// interface StringOrNumber = string | number; // Not allowed

// But types can handle primitive aliases easily:
type Point = [number, number]; // Tuple type
const coordinates: Point = [10, 20];
console.log("Coordinates:", coordinates);

// Example 6: Implementing classes
// ----------------------------------

interface CarInterface {
  brand: string;
  drive(): void;
}

// We can implements the `type` in the class but we cannot extend the `type` in the class
type CarType = {
  brand: string;
  drive(): void;
};

class Tesla implements CarInterface {
  brand = "Tesla";
  drive() {
    console.log(`${this.brand} is driving...`);
  }
}

// We cannot extend the `type` in the class
// class Tesla2 extends CarType {}

// Example 7: When to use what
// -------------------------------
// Use 'interface' when:
//   - Defining the shape of objects, especially for libraries or APIs.
//   - You want to allow declaration merging or extensions.
//   - You’re working in an OOP style (classes, inheritance).

// Use 'type' when:
//   - You need to define unions or intersections.
//   - You want to alias primitives, functions, or tuples.
//   - You prefer more flexible type compositions.

// Example 8: Real-world use case example
// -----------------------------------------

// Interface for an API response object
interface ApiResponse {
  success: boolean;
  message: string;
}

// Type for possible response data (union)
type ResponseData = { user: string } | { error: string };

// Combining both
type FullResponse = ApiResponse & {
  data: ResponseData;
};

const response: FullResponse = {
  success: true,
  message: "User fetched successfully",
  data: { user: "John" },
};

console.log("FullResponse:", response);

// Visit 07-README.md for more details