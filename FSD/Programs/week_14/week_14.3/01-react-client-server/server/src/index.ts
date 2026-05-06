import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5050;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Yaswanth',
    email: 'yaswanth@gmail.com',
    address: {
      city: 'Bangalore',
      state: 'Karnataka',
      houseNumber: '123',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
