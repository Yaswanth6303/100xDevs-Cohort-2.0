import express from 'express';
const app = express();

// Function that return a boolean if the age of the person is greater than 14
function isOldEnough(age) {
  if (age > 14) {
    return true;
  } else {
    return false;
  }
}

app.get('/ride1', function (req, res) {
  const age = req.query.age;
  if (isOldEnough(age)) {
    res.json({
      msg: 'You have successsfully riden a ride.',
    });
  } else {
    res.status(411).json({
      msg: 'You are not old enough to ride this ride.',
    });
  }
});

app.get('/ride2', function (req, res) {
  const age = req.query.age;
  if (isOldEnough(age)) {
    res.json({
      msg: 'You have successsfully riden a ride.',
    });
  } else {
    res.status(411).json({
      msg: 'You are not old enough to ride this ride.',
    });
  }
});
app.listen(3000);

