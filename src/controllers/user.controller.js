import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 


//* Route to create a new user | POST | "/user/create"
export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Respond with success message and the new user (without password)
    return res.status(201).json({
      message: "User created successfully.",
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    return next(error);
  }
};

//* Route to login a user | POST | "/user/login"
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No account in this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_TOKEN,
      { expiresIn: "3h" }
    );
    return res.json({ message: "Login successful", token, id: user._id });
  } catch (error) {
    next(error);
  }
};

//* Route to update a user's password | PUT | "/user/:email"
 export const updatePassword = async (req, res, next) => {
  const { email } = req.params;
  const { password, newPassword } = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
      });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully." });
    
  } catch (error) {
    next(error);
  }
};