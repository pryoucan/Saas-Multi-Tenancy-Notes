import dbConnectivity from './database/databaseConnectivity.js';
import app from './app.js';

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await dbConnectivity();
        console.log('Database connected successfully');

        app.listen(port, () => {
            console.log(`The server is running on port http://localhost:${port}`);
        });
    } catch (error) {
        console.log(`The Database connection has failed due to ${error}`);
        process.exit(1);
    }
};

startServer();