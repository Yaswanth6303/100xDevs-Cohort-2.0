import express from 'express';
import { VALUE } from '@repo/common/index';

const app = express();
const PORT = 5050;

app.use(express.json());
console.log(`Name of the VALUE is: ${VALUE}`);

app.get('/healthy', (_req, res) => {
  res.status(200).json({
    message: 'Server is healthy',
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening in the http://localhost:${PORT}`);
});
