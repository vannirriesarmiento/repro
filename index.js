const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const config = require('./config/keys');

app.use(bodyParser.json());

require('./routes/dialogflowRoutes')(app);
require('./routes/fulfillmentRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
 
    app.get('*', (req, res) => {
       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
 }

const PORT = process.env.PORT || 5000;
app.listen(PORT);