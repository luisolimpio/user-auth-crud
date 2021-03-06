const User = require("../models/User");

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return response.status(401).json({ message: "Usuário não encontrado" });

    const matchedPassword = await user.matchPassword(password);

    if (!matchedPassword)
      return response.status(401).json({ message: "Senha incorreta" });

    return response.json({
      user,
      token: user.generateToken()
    });
  }
}

module.exports = SessionController;
