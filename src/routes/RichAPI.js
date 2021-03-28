const axios = require('axios');

function richAPI(app) {
    app.use('/user/:id', async function(req, res, next) {
        const {id} = req.params;
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=0c7a6b113add233831a0d6eec346cd98`)
          .then(response => {
            res.status(200)
            console.log(response.headers)
            res.json({'data': response.headers});
          })
          .catch(error => {
            next(error)
          });
  }); 
};
module.exports = richAPI;