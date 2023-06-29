const express = require("express");
const router = express.Router();
const verificarAutenticacao = require("../middleware/verificarAuth");
const pool = require("../../index");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const chaveSecreta = "fatzin@dev";

// Rota de registro (signUp)
router.post("/auth/signup", async (req, res) => {
  const { username, nome, email, senha, data_nascimento, imagem } = req.body;

  try {
    // Verificar se o usuário já existe no banco de dados
    const userExists = await pool.query(
      "SELECT * FROM usuarios WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Usuário já existe." });
    }

    // Converter a data de nascimento para o formato adequado (AAAA-MM-DD)
    const dataNascimento = moment(data_nascimento, "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );

    // Inserir o novo usuário no banco de dados
    const newUser = await pool.query(
      "INSERT INTO usuarios (username, nome, email, senha, data_nascimento, imagem) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [username, nome, email, senha, dataNascimento, imagem]
    );

    // Gerar um token de autenticação para o novo usuário
    const token = jwt.sign({ userId: newUser.rows[0].id }, chaveSecreta);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

// Rota para fazer login
router.post("/auth/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const user = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // Verificar a senha do usuário
    const isValidPassword = user.rows[0].senha === senha;

    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    // Formatar a data de nascimento
    const dataNascimento = moment(user.rows[0].data_nascimento).format(
      "DD/MM/YYYY"
    );

    // Gerar um token de autenticação para o usuário
    const token = jwt.sign({ userId: user.rows[0].id }, chaveSecreta);

    // Enviar informações do usuário na resposta com a data de nascimento formatada
    res.status(200).json({
      token,
      user: { ...user.rows[0], data_nascimento: dataNascimento },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

// Rota para fazer um post
router.post("/posts", verificarAutenticacao, async (req, res) => {
  const { imagem, texto, id_usuario } = req.body;

  try {
    // Inserir o novo post no banco de dados
    const newPost = await pool.query(
      "INSERT INTO posts (imagem, texto, id_usuario) VALUES ($1, $2, $3) RETURNING *",
      [imagem, texto, id_usuario]
    );

    res.status(201).json(newPost.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

// Rota para comentar um post
router.post(
  "/posts/:postId/comentarios",
  verificarAutenticacao,
  async (req, res) => {
    const { conteudo, id_usuario } = req.body;
    const { postId } = req.params;

    try {
      // Verificar se o post existe
      const post = await pool.query("SELECT * FROM posts WHERE id = $1", [
        postId,
      ]);

      if (post.rows.length === 0) {
        return res.status(404).json({ error: "Post não encontrado." });
      }

      // Inserir o novo comentário no banco de dados
      const newComment = await pool.query(
        "INSERT INTO comentarios (conteudo, id_post, id_usuario) VALUES ($1, $2, $3) RETURNING *",
        [conteudo, postId, id_usuario]
      );

      // Atualizar o contador de comentários do post correspondente
      await pool.query(
        "UPDATE posts SET comentarios = comentarios + 1 WHERE id = $1",
        [postId]
      );

      // Emitir um evento "novoComentario" para o cliente conectado
      io.emit("novoComentario", newComment.rows[0]);

      res.status(201).json(newComment.rows[0]);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Erro no servidor." });
    }
  }
);

module.exports = router;
