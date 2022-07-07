const Sequelize = require('sequelize');

// 회원
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        // 이름
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        // 전화번호
        phone: {
          type: Sequelize.STRING,
          allowNull: false
        },
        // 아이디
        user_id: {
          type: Sequelize.STRING,
          allowNull: false
        },
        // 비밀번호
        password: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
      }
    );
  }
};
