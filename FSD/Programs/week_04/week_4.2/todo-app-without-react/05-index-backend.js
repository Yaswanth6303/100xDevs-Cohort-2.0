import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let globalId = 6;

const todos = [
    {
        id: 1,
        title: 'Todo 1',
        description: 'This is todo 1',
        completed: false,
    },
    {
        id: 2,
        title: 'Todo 2',
        description: 'This is todo 2',
        completed: false,
    },
    {
        id: 3,
        title: 'Todo 3',
        description: 'This is todo 3',
        completed: false,
    },
    {
        id: 4,
        title: 'Todo 4',
        description: 'This is todo 4',
        completed: false,
    },
    {
        id: 5,
        title: 'Todo 5',
        description: 'This is todo 5',
        completed: false,
    },
];

app.get('/todo', (req, res) => {
    const todo = todos.find(t => t.id == req.query.id);
    res.json({
        todo,
    });
});

app.get('/todos', (req, res) => {
    const randomTodos = [];
    for (let i = 0; i < 5; i++) {
        if (Math.random() > 0.5) {
            randomTodos.push(todos[i]);
        }
    }
    res.json({
        todos: randomTodos,
    });
});

app.post('/todos', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    todos.push({
        id: globalId++,
        title: title,
        description: description,
        completed: false,
    });

    res.status(201).json({ message: 'Todo added successfully' });
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id == id);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = true; // mark as done
    res.json({ message: 'Todo marked as done', todo });
});

app.listen(3000, () => {
    console.log('Server is listening in the 3000');
});
