const MongoLib = require('../lib/mongo');
const dataBase = new MongoLib;
function userAPI(app) {
  // GET ALL
  app.get('/',async (req,res,next) => {
    const body = req.body;
    if(!body.name && !body.email){
      return res.status(401).json({'message': 'params not found'})
    }
    try{
      let user = await dataBase.getByParams(body);
      user[0].password = undefined;
      res.status(200).json(user);
    } catch(err){
      console.log(err);
    }
  })
    
  // GET BY ID
  app.get('/:id',async (req,res,next) => {
    const id = req.params.id;
    try{
      const user = await dataBase.getById(id);
      user.password = undefined;
      res.status(200).json(user);
    } catch(err){
      console.log(err);
    }
  })

app.put('/:id',async (req, res,next) => {
  const id = req.params.id;
  const {userId, name, email, password} = req.body;
  await dataBase.put({ userId, name, email, password}, id) 
  res.status(201).json({'message': 'user upated'})
})

app.post('/',(req,res,next) => {
  const {userId, name, email, password} = req.body;
  const id = dataBase.post({userId, name, email, password});
  res.status(201).json({'message': 'user upated', 'id': id})
})

app.delete('/:id', function(req, res,next) {
  res.status(200).json({'data': 'deleted'})
})
};
module.exports = userAPI;