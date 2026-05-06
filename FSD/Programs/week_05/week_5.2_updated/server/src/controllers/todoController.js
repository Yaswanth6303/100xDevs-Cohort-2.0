import Todo from '../models/Todo.js';

// Create a new todo
export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.validatedData;

        const newTodo = await Todo.create({
            title,
            description,
            completed: false,
        });

        res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: newTodo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating todo',
            error: error.message,
        });
    }
};

// Get all todos
export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({}).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: todos,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching todos',
            error: error.message,
        });
    }
};

// Mark todo as completed
export const markTodoCompleted = async (req, res) => {
    try {
        const { _id } = req.validatedData;

        const updatedTodo = await Todo.findByIdAndUpdate(_id, { completed: true }, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo marked as completed successfully',
            data: updatedTodo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating todo',
            error: error.message,
        });
    }
};

// Delete todo
export const deleteTodo = async (req, res) => {
    try {
        const { _id } = req.validatedData;

        const deletedTodo = await Todo.findByIdAndDelete(_id);

        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
            data: deletedTodo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting todo',
            error: error.message,
        });
    }
};

// Edit todo
export const editTodo = async (req, res) => {
    try {
        const { _id, title, description } = req.validatedData;

        const updatedTodo = await Todo.findByIdAndUpdate(
            _id,
            { title, description },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
            data: updatedTodo,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating todo',
            error: error.message,
        });
    }
};
