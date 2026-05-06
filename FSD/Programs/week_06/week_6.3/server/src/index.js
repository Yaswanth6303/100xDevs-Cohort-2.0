import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Utility function: generate a random integer in a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/v1/crypto-returns-wazirx", (req, res) => {
  res.json({
    returns: getRandomInt(1000, 10000),
  });
});

app.get("/api/v1/crypto-returns-binance", (req, res) => {
  res.json({
    returns: getRandomInt(1000, 10000),
  });
});

app.get("/api/v1/bank-income", (req, res) => {
  res.json({
    income: getRandomInt(100000, 200000),
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
