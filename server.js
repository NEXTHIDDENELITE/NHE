const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// ✅ STEP 1: middleware (এটাই missing ছিল)
app.use(cors());
app.use(express.json()); // JSON data ধরার জন্য
app.use(express.urlencoded({ extended: true })); // form data ধরার জন্য

// ✅ STEP 2: তোমার Telegram info
const BOT_TOKEN = "8475138855:AAFQMWnAHUJqGsx06QZFw60lXugY15ynkig";
const CHAT_ID = "8135816344";

// ✅ STEP 3: SEND route
app.post("/send", async (req, res) => {

  let uid = req.body.uid;

  // 🔍 DEBUG (check uid আসতেছে কিনা)
  console.log("UID:", uid);

  if (!uid) {
    return res.json({ status: "no uid" });
  }

  try {
    await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      params: {
        chat_id: CHAT_ID,
        text: `🔥 NEW TRIAL REQUEST\nUID: ${uid}`
      }
    });

    res.json({ status: "sent" });

  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }
});

// ✅ STEP 4: status check
app.get("/status", (req, res) => {
  res.json({ status: "ok" });
});

// ✅ STEP 5: SERVER START (IMPORTANT CHANGE)
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running...");
});