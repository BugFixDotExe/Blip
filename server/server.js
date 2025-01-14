import router from './routers/index.js';
import dbClient from './utils/dbClient.js'
import cors from 'cors'
import express from 'express';

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static("uploads"))

await dbClient.run()

// Responsible for populating the req.body with incoming POST payload
const port = process.env.PORT || 5000;

app.use('/', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
