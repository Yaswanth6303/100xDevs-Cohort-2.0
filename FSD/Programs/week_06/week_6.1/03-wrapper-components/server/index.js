import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/todos', (req, res) => {
    let randomTodos = [];
    for (let i = 0; i < 5; i++) {
        if (Math.random() > 0.5) {
            randomTodos.push({
                id: i,
                title: `Todo ${i}`,
                description: `This is todo ${i}`,
            });
        }
    }

    return res.status(200).json({
        todos: randomTodos,
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
