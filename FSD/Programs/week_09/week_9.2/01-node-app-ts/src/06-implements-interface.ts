interface Person {
  name: string;
  age?: number; // Optional property
  greet(phrase: string): void;
}

class Employee implements Person {
  // Instance variables
  name: string;
  age?: number; // Optional property

  constructor(name: string, age?: number) {
    this.name = name;
    if (age !== undefined) {
      this.age = age;
    }
  }

  greet(phrase: string): void {
    console.log(`${phrase} ${this.name}`);
  }
}

const employee = new Employee("John", 30);
employee.greet("Hello");
