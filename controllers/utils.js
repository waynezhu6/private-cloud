// a collection of utility middleware functions

const hasParams = (...params) => {
  // checks if mandatory params are present
  return function(req, res, next){
    for(param of params){
      if(!req.params[param])
        res.send(`Missing param ${param}`);
    }
    next();
  }
};

module.exports = { hasParams }