import jwt from "jsonwebtoken";

export const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.adminId = decoded.id; 
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
