import Admin from "../models/Admin.model.js";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//* Route to get all users | GET | "/admin/allUsers"
export const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return next(error);
  }
  if (!users) {
    return res.status(500).json({ message: "No users found." });
  }

  return res.status(200).json({ users });
};

//* Route to get all users | GET | "/admin/allUsers"
export const getAdmin = async (req, res, next) => {
  let admin;
  try {
    admin = await Admin.find();
  } catch (error) {
    return next(error);
  }
  if (!admin) {
    return res.status(500).json({ message: "No users found." });
  }

  return res.status(200).json({ admin });
};

//* Route to create a new admin | POST | "/admin/create"
export const createAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists." });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    return res.status(201).json({
      message: "Admin created successfully.",
      admin: { name: newAdmin.name, email: newAdmin.email },
    });
  } catch (error) {
    return next(error);
  }
};

//* Route to login an admin | POST | "/admin/login"
export const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ message: "No admin account with this email found." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_TOKEN,
      { expiresIn: "360h" }
    );
    return res.json({ message: "Admin login successful.", token, id: admin._id  });
  } catch (error) {
    next(error);
  }
};

//* Route to update an admin's password | PUT | "/admin/:email"
export const updateAdminPassword = async (req, res, next) => {
  const { email } = req.params;
  const { password, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect." });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    next(error);
  }
};
