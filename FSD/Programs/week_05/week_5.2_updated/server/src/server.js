import app from './app.js';
import connectDatabase from './config/database.js';

const PORT = process.env.PORT || 3000;

// Connect to database
connectDatabase();

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📝 API Base URL: http://localhost:${PORT}/api`);
});
