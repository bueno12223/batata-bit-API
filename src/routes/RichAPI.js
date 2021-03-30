const MongoLib = require('../lib/mongo');
const dataBase = new MongoLib
function richAPI(app) {
  // GET ALL
  app.get('/',(req,res,next) => dataBase.getAll(req,res,next) )
  // GET BY ID
  app.get('/:id',(req,res,next) => dataBase.get(req,res,next) )

app.put('/:id',(req, res,next) => dataBase.put(req,res,next) )

app.post('/:id',(req,res,next) => dataBase.post(req,res,next) )

app.delete('/:id', function(req, res,next) {
  res.status(200).json({'data': 'deleted'})
})
};
module.exports = richAPI;