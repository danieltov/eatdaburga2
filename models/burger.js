// ! Export the model
module.exports = function(sequelize, DataTypes) {
    // ! Define the new Burger model (a blueprint for my db table)
    const Burger = sequelize.define('Burger', {
        // ! Define a column called 'burger_name
        burger_name: {
            // ! It'a type is string
            type: DataTypes.STRING,
            // ! It does not allow a null value
            allowNull: false,
            // ! It's legnth must be between 10 and 140 characters
            validate: {
                len: [10, 140]
            }
        },
        // ! Define a column called Devoured
        devoured: {
            // ! It's type is boolean
            type: DataTypes.BOOLEAN,
            // ! It's default value is false
            defaultValue: false,
            // ! It does not allow a null value
            allowNull: false
        }
    });
    // ! Return Burger so it can be used
    return Burger;
};
