import express from 'express';
const app = express();

enum ResponseStatus {
  Success = 200,
  NotFound = 404,
  Error = 500,
}

app.get('/', (req, res) => {
  return res.status(ResponseStatus.Success).json({
    message: 'Success',
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
