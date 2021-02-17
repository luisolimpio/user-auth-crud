const { Sequelize } = require("sequelize");
const { Model, DataTypes } = require("sequelize");
const { hash, compare } = require("bcryptjs");
const jwt = require('jsonwebtoken');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        phone: DataTypes.STRING,
        cpf: {
          type: DataTypes.STRING,
          unique: true,
        },
      },
      {
        sequelize,
        hooks: {
          beforeCreate: async (user) => {
            if (user.password)
              user.password_hash = await hash(user.password, 8);
          },
          beforeUpdate: async (user) => {
            if (user.password)
              user.password_hash = await hash(user.password, 8);
          }
        },
      }
    );
  }

  matchPassword(password) {
    return compare(password, this.password_hash);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, process.env.APP_JWT_SECRET);
  }
}

module.exports = User;
