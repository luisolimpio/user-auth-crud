const { Op } = require("sequelize");
const User = require("../models/User");

class UserController {
  async index(request, response) {
    const filter = request.query;

    const page = filter.page;
    const name = filter.name;
    const email = filter.email;
    const cpf = filter.cpf;

    const perPage = 10;

    let users = [];

    let count = 0;

    try {
      if (name) {
        await User.findAndCountAll({
          where: {
            name: {
              [Op.like]: `%${name.toLowerCase()}%`,
            },
          },
          offset: (Number(page) - 1) * perPage,
          limit: perPage,
        }).then((result) => {
          count = result.count;
          users = result.rows;
        });
      } else if (email) {
        await User.findAndCountAll({
          where: {
            email: {
              [Op.like]: `%${email}%`,
            },
          },
          offset: (Number(page) - 1) * perPage,
          limit: perPage,
        }).then((result) => {
          count = result.count;
          users = result.rows;
        });
      } else if (cpf) {
        await User.findAndCountAll({
          where: {
            cpf: {
              [Op.like]: `%${cpf}%`,
            },
          },
          offset: (Number(page) - 1) * perPage,
          limit: perPage,
        }).then((result) => {
          count = result.count;
          users = result.rows;
        });
      } else {
        await User.findAndCountAll({
          offset: (Number(page) - 1) * perPage,
          limit: perPage,
        }).then((result) => {
          count = result.count;
          users = result.rows;
        });
      }

      let pagination = {
        current_page: Number(page),
        total_pages: 1,
        total: 0,
      };

      if (count) {
        pagination = {
          current_page: Number(page),
          total_pages: Math.ceil(Number(count) / perPage),
          total: Number(count),
        };
      }

      const serializedUsers = users.filter((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          cpf: user.cpf,
        };
      });

      const data = {
        users: serializedUsers,
        pagination,
      };

      return response.status(201).json(data);
    } catch (err) {
      console.error(err);
      return response.status(400).json({ message: "Erro interno no servidor" });
    }
  }

  async store(request, response) {
    const { name, surname, email, password, phone, cpf } = request.body;

    const matchedEmail = await User.findOne({ where: { email } });
    const matchedCpf = await User.findOne({ where: { cpf } });

    if (matchedEmail)
      return response
        .status(401)
        .json({ message: "E-mail já cadastrado!" });

    if (matchedCpf)
      return response.status(401).json({ message: "CPF já cadastrado!" });

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
      return response.status(400).json({ message: "Erro interno no servidor" });
    }
  }

  async show(request, response) {
    const { id } = request.params;

    if (!id) return response.status(400).json({ message: "Id não informado" });

    try {
      const user = await User.findOne({ where: { id } });

      return response.status(200).json(user);
    } catch (err) {
      console.error(err);
      return response.status(400).json({ message: "Erro interno no servidor" });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, surname, email, password, phone, cpf } = request.body;

    if (!id) return response.status(400).json({ message: "Id não informado" });

    const matchedEmail = await User.findOne({ where: { email } });
    const matchedCpf = await User.findOne({ where: { cpf } });

    if (matchedEmail)
      return response
        .status(401)
        .json({ message: "E-mail already registered" });

    if (matchedCpf)
      return response.status(401).json({ message: "CPF já registrado" });

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

      return response.status(201).json({ message: "Usuário foi atualizado" });
    } catch (err) {
      console.error(err);
      return response.status(400).json({ message: "Erro interno no servidor" });
    }
  }

  async destroy(request, response) {
    const { id } = request.params;

    if (!id) return response.status(400).json({ message: "Id não informado" });

    try {
      const deleted = await User.destroy({ where: { id } });

      if (deleted > 0)
        return response.status(200).json({ message: "Usuário foi deletado" });

      return response
        .status(400)
        .json({ message: "Algo deu errado, usuário não foi deletado" });
    } catch (err) {
      console.error(err);
      return response.status(400).json({ message: "Erro interno no servidor" });
    }
  }
}

module.exports = UserController;
