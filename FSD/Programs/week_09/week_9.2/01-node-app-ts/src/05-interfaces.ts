interface User {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

const user = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  age: 20,
};

function isLegalUser(user: User) {
  if (user.age > 18) {
    return true;
  } else {
    return false;
  }
}

function greetPerson(user: User) {
  console.log(`Hello ${user.firstName} ${user.lastName}`);
}

console.log(isLegalUser(user));
greetPerson(user);
