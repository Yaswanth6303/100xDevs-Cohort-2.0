const fs = require("fs");

function putCopyRightToFile(cb) {
  fs.readFile("a.txt", "utf-8", function (err, data) {
    data = data + "CopyRight 2023 by Yaswanth Gudivada";

    fs.writeFile("a.txt", data, function () {
      cb();
    });
  });
}

putCopyRightToFile(function () {
  console.log("Copy right is inserted in the given file.");
});
