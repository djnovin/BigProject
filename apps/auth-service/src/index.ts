import express from "express";

const PORT = process.env.PORT || 8001;
const HOST = process.env.HOST || "localhost";

const app = express();

app.get("/api/v1/auth", (req, res) => {
  res.json("Hello from auth-service");
});

app.listen(PORT, () => {
  console.log(`auth-service listening at http://${HOST}:${PORT}`);
});
