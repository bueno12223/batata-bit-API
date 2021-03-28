const express = require('express');
const notFoundHandler = require('../../video-api/utils/middleware/notFoundHandler');
const app = express();

const richAPI = require('./routes/RichAPI');

richAPI(app);
  
app.use(notFoundHandler)


// 404 not found

// midlewares

// error handler


app.listen(3000, function () {
    console.log(`http://localhost:3000`);   
});