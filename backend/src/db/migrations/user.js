const {User} = require("../../models");
module.exports = {
    async up(queryInterface, Sequelize) {
        await User.sync();
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};