const User = require("../models/User");

class UserController {
  async index(request, response) {
    try {
      const users = await User.findAll();

      return response.status(200).json(users);
    } catch (err) {
      console.error(err);
      return response.status(400).send("Server internal error!");
    }
  }

  async store(request, response) {
    const { name, surname, email, password, phone, cpf } = request.body;

    const matchedEmail = await User.findOne({ where: { email } });
    const matchedCpf = await User.findOne({ where: { cpf } });

    if (matchedEmail)
      return response
        .status(401)
        .json({ message: "E-mail already registered" });

    if (matchedCpf)
      return response.status(401).json({ message: "CPF already registered" });

    try {
      const user = await User.create({
        name,
        surname,
        email,
        password,
        phone,
        cpf,
      });

      return response.status(201).json(user);
    } catch (err) {
      console.error(err);
      return response.status(400).json({ message: "Server internal error" });
    }
  }

  async show(request, response) {
    const { id } = request.params;

    if (!id) return response.status(400).json({ message: "Missing user id" });

    try {
      const user = await User.findOne({ where: { id } });

      return response.status(200).json(user);
    } catch (err) {
      console.error(err);
      return response.status(400).json({ message: "Server internal error" });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, surname, email, password, phone, cpf } = request.body;

    if (!id) return response.status(400).json({ message: "Missing user id" });

    try {
      await User.update(
        {
          name,
          surname,
          email,
          password,
          phone,
          cpf,
        },
        { individualHooks: true, where: { id } }
      );

      return response.status(201).json({ message: "User has been updated" });
    } catch (err) {
      console.error(err);
      return response.status(400).json({ message: "Server internal error" });
    }
  }

  async destroy(request, response) {
    const { id } = request.params;

    if (!id) return response.status(400).json({ message: "Missing user id" });

    try {
      const deleted = await User.destroy({ where: { id } });

      if (deleted > 0)
        return response.status(200).json({ message: "User has been deleted" });

      return response
        .status(400)
        .json({ message: "Something went wrong, no user has been deleted" });
    } catch (err) {
      console.error(err);
      return response.status(400).json({ message: "Server internal error" });
    }
  }
}

module.exports = UserController;
