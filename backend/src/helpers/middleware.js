// backend\src\helpers\middleware.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }
  token = token.split(' ')[1]; // Remove Bearer from token
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized." });
    }
    req.userId = decoded.id;
    next();
  });
};
