var d = new Promise(function (resolve) {
  setTimeout(function () {
    resolve("Hello");
  }, 1000);
});

function callback() {
  console.log(d);
  console.log("Hello World");
}

console.log(d);
d.then(callback);
