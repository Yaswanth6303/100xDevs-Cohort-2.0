function isLegal(age: number): boolean {
  if (age > 18) {
    return true;
  } else {
    return false;
  }
}

const age = 19;
console.log(isLegal(age));
