const express = require("express");
const router = express.Router();
const verificarAutenticacao = require("../middleware/verificarAuth");
const pool = require("../../index");

//buscar um usuário pelo ID
router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      userId,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(200).json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

// rota para validar o usuário usando o token
router.get("/auth/validate", verificarAutenticacao, async (req, res) => {
  try {
    if (!req.isAuthenticated) {
      // se isAuthenticated for falso, significa que o usuário não está logado
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    // obter o ID do usuário a partir do middleware de verificação de autenticação
    const userId = req.userId;

    // buscar as informações do usuário no banco de dados
    const user = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      userId,
    ]);

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // enviar as informações do usuário na resposta
    res.status(200).json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro no servidor." });
  }
});
// Rota para recuperar os posts
router.get("/posts", async (req, res) => {
  try {
    // consulta SQL para buscar os posts em ordem decrescente de hora de criação
    const query = "SELECT * FROM posts ORDER BY hora_criacao DESC";
    const result = await pool.query(query);

    // enviar os posts ordenados por hora de criação na resposta
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

// rota para recuperar os comentários de um post
router.get(
  "/posts/:postId/comentarios",
  verificarAutenticacao,
  async (req, res) => {
    const { postId } = req.params;

    try {
      // verificar se o post existe
      const post = await pool.query("SELECT * FROM posts WHERE id = $1", [
        postId,
      ]);

      if (post.rows.length === 0) {
        return res.status(404).json({ error: "Post não encontrado." });
      }

      // buscar os comentários do post
      const comentarios = await pool.query(
        "SELECT * FROM comentarios WHERE id_post = $1 ORDER BY hora_criacao DESC",
        [postId]
      );

      res.status(200).json(comentarios.rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Erro no servidor." });
    }
  }
);

// rota para retornar os comentários de um post com informações do usuário que comentou
router.get("/posts/:postId/comentarios-detalhados", async (req, res) => {
  const { postId } = req.params;

  try {
    // verificar se o post existe
    const post = await pool.query("SELECT * FROM posts WHERE id = $1", [
      postId,
    ]);

    if (post.rows.length === 0) {
      return res.status(404).json({ error: "Post não encontrado." });
    }

    // buscar os comentários do post com informações do usuário
    const comentarios = await pool.query(
      "SELECT c.*, u.username, u.nome, u.imagem FROM comentarios c INNER JOIN usuarios u ON c.id_usuario = u.id WHERE c.id_post = $1 ORDER BY c.hora_criacao DESC",
      [postId]
    );

    res.status(200).json(comentarios.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

// rota para recuperar o post pelo id
router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    // verificar se o post existe no banco de dados
    const post = await pool.query("SELECT * FROM posts WHERE id = $1", [
      postId,
    ]);

    if (post.rows.length === 0) {
      return res.status(404).json({ error: "Post não encontrado." });
    }

    res.status(200).json(post.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

module.exports = router;
