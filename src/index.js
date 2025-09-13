import dotenv from 'dotenv';
import dbConnectivity from './database/databaseConnectivity.js';
import app from './app.js';

dotenv.config({
    path: './.env'
});


const port = process.env.PORT || 5000;

const databaseConnectionHandler = async () => {
    try {
        await dbConnectivity();
        app.get('/', (req, res) => {
            res.send(`Welcome to the server, db connection has been successfully established`);
        });

        app.listen(port, () => {
            console.log(`The server is running on port http://localhost:${port}`);
        })
    }
    catch(error) {
        console.log(`The Database connection is failed due to ${error}`);
        process.exit(1);
    }
};

databaseConnectionHandler();
