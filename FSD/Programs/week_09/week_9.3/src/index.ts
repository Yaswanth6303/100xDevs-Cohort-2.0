enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let count = 0;

function doSomething(keyPressed: Direction) {
  switch (keyPressed) {
    case Direction.Up:
      count++;
      console.log('Up pressed → count incremented:', count);
      break;

    case Direction.Down:
      count--;
      console.log('Down pressed → count decremented:', count);
      break;

    case Direction.Right:
      count *= 2;
      console.log('Right pressed → count multiplied by 2:', count);
      break;

    case Direction.Left:
      count /= 2;
      console.log('Left pressed → count divided by 2:', count);
      break;

    default:
      console.log('Unknown key pressed');
  }
}

// Simulate key presses:
doSomething(Direction.Up); // count = 1
doSomething(Direction.Up); // count = 2
doSomething(Direction.Right); // count = 4
doSomething(Direction.Left); // count = 2
doSomething(Direction.Down); // count = 1
