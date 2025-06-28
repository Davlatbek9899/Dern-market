const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// .env faylni o'qish
dotenv.config();

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Asosiy test route
app.get("/", (req, res) => {
    res.send("Backend ishlayapti ✅");
});

// MongoDB ulanish va serverni ishga tushirish
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("✅ MongoDB ulandi");
    app.listen(PORT, () => {
        console.log(`✅ Server http://localhost:${PORT} da ishlayapti`);
    });
    })
    .catch(err => {
    console.error("❌ MongoDB ulanishda xatolik:", err);
    });
