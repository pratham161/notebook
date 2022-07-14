const jwt = require("jsonwebtoken");
const JWT_STRING = "PRATHAMESH&$#*@#ISAgOODBOY";

const fetchUser = (req, res, next) => {
  //GET THE USER FROM JWT TOKEN AND ADD ID TO REQ OBJECT
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_STRING);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  
};

module.exports = fetchUser;
