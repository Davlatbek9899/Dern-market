const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB ulandi");
    app.listen(5000, () => {
        console.log("Server http://localhost:5000 da ishlayapti");
    });
    })
    .catch(err => console.error("MongoDB ulanishda xatolik:", err));
