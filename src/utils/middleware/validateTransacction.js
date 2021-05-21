const UserModel = require('../models/user');
const validateTransaccion = async (req, res, next) => {
    const {since, ammount} = req.body;
    try{
        const userData = await UserModel.findById(since);
        const {userPersonalData:{money:{total} } } = userData
        if(total >= ammount || total !== 0){
            return next();
        }
    }catch(e){
        res.status(401).json({'message': 'you can´t do this transacction'});
    }
}
module.exports = validateTransaccion;
