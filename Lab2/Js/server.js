const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JDoodle API credentials (replace with your own)
const clientId = "YOUR_JDOODLE_CLIENT_ID";
const clientSecret = "YOUR_JDOODLE_CLIENT_SECRET";

// Endpoint để chạy mã
app.post("/api/run", async (req, res) => {
  const { code, language } = req.body;

  const languageConfig = {
    python: { language: "python3", versionIndex: "3" },
    javascript: { language: "nodejs", versionIndex: "3" },
    java: { language: "java", versionIndex: "4" },
    c: { language: "c", versionIndex: "4" },
  };

  const config = languageConfig[language];
  if (!config) {
    return res.json({ error: "Ngôn ngữ không được hỗ trợ." });
  }

  const data = {
    script: code,
    language: config.language,
    versionIndex: config.versionIndex,
    clientId: clientId,
    clientSecret: clientSecret,
  };

  try {
    const response = await axios.post(
      "https://api.jdoodle.com/v1/execute",
      data
    );
    res.json(response.data);
  } catch (error) {
    res.json({ error: "Lỗi khi chạy mã." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
