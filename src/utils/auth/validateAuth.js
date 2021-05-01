const validateAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }
    res.redirect("/log-in");
    
}
module.exports = validateAuth;