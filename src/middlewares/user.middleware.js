import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;  

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);  
    req.user = { id: decoded.id };  // Store user id in req.user
    next();  
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
