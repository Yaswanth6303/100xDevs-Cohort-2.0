interface User {
  name: string;
  age: number;
}

function sumOfAge(user1: User, user2: User): number {
  return user1.age + user2.age;
}

const result = sumOfAge({ name: 'John', age: 20 }, { name: 'Jane', age: 30 });
console.log(result);
