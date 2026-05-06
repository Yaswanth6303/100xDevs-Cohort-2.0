const fs = require("fs").promises;

async function readFileAndWrite() {
  try {
    const data = await fs.readFile("b.txt", "utf-8");
    const newData = data + " with that Added some more new content in the file";
    await fs.writeFile("b.txt", newData);
    return newData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function printData(data) {
  console.log(data);
}

async function main() {
  try {
    const data = await readFileAndWrite();
    printData(data);
  } catch (error) {
    console.error("Error in main:", error);
  }
}

main();
