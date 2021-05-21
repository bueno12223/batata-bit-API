const validateAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).json({'message': 'you are not authenticate'});
    
}
module.exports = validateAuth;