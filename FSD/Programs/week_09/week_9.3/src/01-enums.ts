enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// By default it will be 0, 1, 2, 3 if we don't assign any value to it
console.log(Direction.Up);
console.log(Direction.Down);
console.log(Direction.Left);
console.log(Direction.Right);

console.log();

enum Directions {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
}

console.log(Directions.Up);
console.log(Directions.Down);
console.log(Directions.Left);
console.log(Directions.Right);

console.log();

function doSomething(keyPressed: Directions) {
  switch (keyPressed) {
    case Directions.Up:
      console.log('Up pressed');
      break;
    case Directions.Down:
      console.log('Down pressed');
      break;
    case Directions.Left:
      console.log('Left pressed');
      break;
    case Directions.Right:
      console.log('Right pressed');
      break;
  }
}

doSomething(Directions.Up);
doSomething(Directions.Down);
doSomething(Directions.Left);
doSomething(Directions.Right);
