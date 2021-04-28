
const validateTransaccion = async (req, res, next) => {
    const id = req.params.id;
    try{
        const userData = await UserModel.findById(id);
        console.log('hye')
        const {userPersonalData:{money:{total} } } = userData
        console.log(userData)
        if(total <= ammount || total === 0){
            return res.status(401).json({'message': 'you can´t do this transacction'});
        }else{
            return next();
        }
    }catch(e){
        res.status(404).json({'message': 'user not found'});
    }
}
module.exports = validateTransaccion;
