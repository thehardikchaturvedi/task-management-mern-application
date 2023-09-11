const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserToken extends Model {
        static associate(models) {
            UserToken.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user"
            })
        }
    }

    UserToken.init({
        userId: DataTypes.INTEGER,
        type: DataTypes.STRING
    }, {
        sequelize,
        modelName: "UserToken",
    });

    return UserToken;
};