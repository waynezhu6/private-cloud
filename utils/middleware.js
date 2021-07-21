// a collection of utility middleware functions

const hasParams = (...params) => {
  // checks if mandatory params are present
  return function(req, res, next){
    for(param of params){
      if(!req.params[param]){
        res.status(400);
        return res.send(`Missing param ${param}`);
      }
    }
    next();
  }
};


const hasBody = (...keys) => {
  // checks if mandatory params are present
  return function(req, res, next){
    for(key of keys){
      if(!req.body[key]){
        res.status(400);
        return res.send(`Missing key ${key} from body`);
      }
    }
    next();
  }
};


module.exports = { hasParams, hasBody }
