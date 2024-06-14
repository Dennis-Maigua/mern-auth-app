require('dotenv').config();
require('./db');

const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});