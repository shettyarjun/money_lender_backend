const express = require('express');
const dotenv = require('dotenv');
const moneylendRoutes = require('./routes/moneylendRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();

dotenv.config();

const port = process.env.PORT || 8000;

app.use(express.json());//to convert post request data string to json by parsing

app.use("/api/money", moneylendRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});