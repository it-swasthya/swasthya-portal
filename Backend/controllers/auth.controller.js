import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import dotenv from "dotenv";
import { generateTokens } from '../utils/generateToken.js';
dotenv.config();



export const registerUser = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const { email, password, ...rest } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...rest, email, password: hashed });
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const payload = { id: user.User_id };
    const { accessToken, refreshToken } = generateTokens(payload);

    // Save refresh token to DB
    user.refresh_token = refreshToken;
    await user.save();

    // Cookie options
    const options = {
      httpOnly: true,
      secure: false,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Login successful",
        user: {
          id: user.User_id,
          email: user.email,
          name: `${user.first_name} ${user.last_name}`,
        },
        accessToken,
        refreshToken
      });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    console.log("Cookies received on logout:", req.cookies);

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token missing" });
    }

    const user = await User.findOne({ where: { refresh_token: refreshToken } });
    if (!user) {
      return res.status(403).json({ message: "Invalid token or already logged out" });
    }

    user.refresh_token = null;
    await user.save();

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "None", 
    };

    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



export const checkMeLoggedin = async (req, res) => {
  try {
    const userId = req.user?.id; // From access token
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findByPk(userId, {
      attributes: ["User_id", "email", "first_name", "last_name"]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User authenticated",
      user: {
        id: user.User_id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`
      }
    });
  } catch (err) {
    console.error("checkMeLoggedin error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const refreshTokenHandler = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: 'Refresh token missing' });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // Find user with matching refresh token
    const user = await User.findOne({
      where: { User_id: decoded.id, refresh_token: token },
    });

    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Generate new access token only
    const accessToken = jwt.sign(
      { id: user.User_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    // Set new access token in cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'Lax',
    });

    res.status(200).json({
      message: 'Access token refreshed',
      accessToken,
      user: {
        id: user.User_id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
      },
    });

  } catch (err) {
    console.error('Refresh token error:', err);
    return res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};
