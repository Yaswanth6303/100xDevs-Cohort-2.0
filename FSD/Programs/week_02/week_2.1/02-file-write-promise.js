const fs = require("fs");

function readFileAndWrite() {
  return new Promise((resolve, reject) => {
    fs.readFile("b.txt", "utf-8", (error, data) => {
      data += "Added New Content in the file";

      fs.writeFile("b.txt", (data, error) => {
        if (error) reject(error);
        resolve(data);
      });
    });
  });
}

function printData(data) {
  console.log(data);
}

readFileAndWrite().then(printData);
