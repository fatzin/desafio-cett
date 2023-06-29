const chaveSecreta = "fatzin@dev";
const jwt = require("jsonwebtoken");

// Função de middleware para verificar a autenticação
function verificarAutenticacao(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ auth: false, message: "Nenhum token foi inserido" });
  }

  jwt.verify(token, chaveSecreta, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Falha para autenticar o token." });
    }

    req.isAuthenticated = true;
    req.userId = decoded.userId;
    next();
  });
}

module.exports = verificarAutenticacao;
