const {Task} = require("../../models");
module.exports = {
    async up(queryInterface, Sequelize) {
        await Task.sync();
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tasks');
    }
};