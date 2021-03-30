const UserModel = require('../utils/models/user');
function richAPI(app) {
  app.get('/', async function(req, res,next) {
    const users = await UserModel.find();
    res.status(200).json(users);
  })

app.put('/:id', function(req, res,next) {
  res.status(200).json({'data': req.query})
})

app.post('/:id',async function(req, res,next) {
  const data = JSON.parse(req.body.query);
  const {userId, name, email, password} = data;
  const userData = new UserModel({
    userId,
    name,
    email,
    password
  });
  await userData.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(2);
      res.status(200).json({'message': 'note saved'});
   }
  })
})

app.delete('/:id', function(req, res,next) {
  res.status(200).json({'data': 'deleted'})
})
};
module.exports = richAPI;