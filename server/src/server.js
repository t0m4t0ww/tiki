const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./route/index');
const connectDB = require('./config/connect');

app.use(cors({ origin: process.env.CORS_CLIENT, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

route(app);

connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
