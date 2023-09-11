const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
        }
    }

    Task.init({
        userId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        dueDate: DataTypes.DATE,
        priority: DataTypes.STRING,
        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Task',
    });

    return Task;
};