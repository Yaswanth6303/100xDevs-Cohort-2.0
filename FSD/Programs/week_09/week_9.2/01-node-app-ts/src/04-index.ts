function callBackFunction(fn: () => void) {
  setTimeout(fn, 1000);
}

function callBackFunctionInteger(
  fn: (a: number, b: number) => number,
  a: number,
  b: number
): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = fn(a, b);
      resolve(result);
    }, 1000);
  });
}

callBackFunction(function () {
  console.log("Hello, World!");
});

const x = 5;
const y = 10;
const result = callBackFunctionInteger((a, b) => a + b, x, y);
result.then((result) => {
  console.log(result);
});
