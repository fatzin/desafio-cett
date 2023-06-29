// routes/putRoutes.js
const express = require("express");
const router = express.Router();
const verificarAutenticacao = require("../middleware/verificarAuth");
const pool = require("../../index");

//atualizar informações do usuário
router.put("/updateuser", verificarAutenticacao, async (req, res) => {
  const { userId } = req;
  const { username, nome, email, senha } = req.body;

  try {
    // verificar se o usuário existe
    const userExists = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1",
      [userId]
    );

    if (userExists.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // montar a query de atualização dinamicamente, apenas com os campos fornecidos
    let query = "UPDATE usuarios SET";
    const values = [userId];

    let paramIndex = 2; // indice para os parâmetros na query

    if (username) {
      query += ` username = $${paramIndex},`;
      values.push(username);
      paramIndex++;
    }

    if (nome) {
      query += ` nome = $${paramIndex},`;
      values.push(nome);
      paramIndex++;
    }

    if (email) {
      query += ` email = $${paramIndex},`;
      values.push(email);
      paramIndex++;
    }

    if (senha) {
      query += ` senha = $${paramIndex},`;
      values.push(senha);
      paramIndex++;
    }

    query = query.slice(0, -1);

    // verificar se há campos para atualizar
    if (values.length > 1) {
      // adicionar a cláusula WHERE para atualizar apenas o usuário correto
      query += " WHERE id = $1 RETURNING *";
    } else {
      // se nenhum campo for atualizado, retornar o usuário existente sem executar a query
      query = "SELECT * FROM usuarios WHERE id = $1";
    }

    // executar a query de atualização no banco de dados
    const updatedUser = await pool.query(query, values);

    res.status(200).json(updatedUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

module.exports = router;
