const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

// Ro'yxatdan o'tish
router.post("/register", async (req, res) => {
    const { firstName, lastName, gender, email, password } = req.body;

    try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Bu email allaqachon mavjud!" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, gender, email, password: hashed });
    await user.save();

    res.status(201).json({ msg: "Ro'yxatdan muvaffaqiyatli o'tildi" });
    } catch (err) {
    res.status(500).json({ msg: "Serverda xatolik" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Foydalanuvchi topilmadi" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Parol noto‘g‘ri" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "2h" });

    res.json({ msg: "Muvaffaqiyatli login", token });
    } catch (err) {
    res.status(500).json({ msg: "Xatolik yuz berdi" });
    }
});

module.exports = router;
