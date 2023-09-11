const {UserToken} = require("../../models");
module.exports = {
    async up(queryInterface, Sequelize) {
        await UserToken.sync();
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('usertokens');
    }
};