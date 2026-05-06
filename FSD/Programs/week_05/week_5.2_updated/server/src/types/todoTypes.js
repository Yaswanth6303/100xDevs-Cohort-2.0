import zod from 'zod';

const createTodoSchema = zod.object({
    title: zod.string().min(1, 'Title is required'),
    description: zod.string().min(1, 'Description is required'),
});

const editTodoSchema = zod.object({
    _id: zod.string().min(1, 'Todo ID is required'),
    title: zod.string().min(1, 'Title is required'),
    description: zod.string().min(1, 'Description is required'),
});

const updateTodoSchema = zod.object({
    id: zod.string().min(1, 'Todo ID is required'),
});

const markCompletedSchema = zod.object({
    _id: zod.string().min(1, 'Todo ID is required'),
});

const deleteTodoSchema = zod.object({
    _id: zod.string().min(1, 'Todo ID is required'),
});

export {
    createTodoSchema,
    editTodoSchema,
    updateTodoSchema,
    markCompletedSchema,
    deleteTodoSchema,
};
