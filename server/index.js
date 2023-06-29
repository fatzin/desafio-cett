const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const app = express();
const port = 8000;

// Configuração do banco de dados
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "", //insira nome da sua database
  password: "", //insira a senha da sua database
  port: 5432,
});

module.exports = pool;

app.use(cors());
app.use(express.json());

const io = new Server({
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Alguém conectou");

  socket.on("disconnect", () => {
    console.log("Alguém desconectou");
  });
});

// Importa as rotas
const postRoutes = require("./requests/POST/postRoutes");
const getRoutes = require("./requests/GET/getRoutes");
const putRoutes = require("./requests/PUT/putRoutes");

// Rota raiz
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Configura as rotas
app.use("/api/post", postRoutes);
app.use("/api/get", getRoutes);
app.use("/api/put", putRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
