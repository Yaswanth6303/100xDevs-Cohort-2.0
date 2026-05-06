import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        // Use environment variables for database connection
        const connectionString =
            process.env.MONGODB_URI || 'mongodb+srv://localhost:27017/todo_application';

        await mongoose.connect(connectionString);
        console.log('✅ Database connected successfully!');
    } catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1);
    }
};

export default connectDatabase;
