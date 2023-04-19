import express from "express";

const PORT = process.env.PORT || 8001;
const HOST = process.env.HOST || "localhost";

const app = express();

app.get("/api/v1/users", (req, res) => {
  res.json({
    users: [
      {
        id: 1,
        name: "John Doe",
      },
      {
        id: 2,
        name: "Jane Doe",
      },
    ],
  });
});

// get individual user by id
app.get("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    user: {
      id,
      name: "John Doe",
    },
  });
});

app.put("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    user: {
      id,
      name: "John Doe",
    },
  });
});

app.listen(PORT, () => {
  console.log(`auth-service listening at http://${HOST}:${PORT}`);
});