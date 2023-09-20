const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');  // Make sure the path is correct if your file structure is different

const app = express();

// Middleware
app.use(cors());  // This allows your frontend to communicate with your backend without CORS issues.
app.use(bodyParser.json());  // This allows you to handle JSON post data.

// Use your routes
app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
