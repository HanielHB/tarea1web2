module.exports = (sequelize, Sequelize) => {
    const Hamburguesa = sequelize.define("hamburguesa", {
        hnombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.TEXT
        },
    
        restauranteId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'restaurantes', // Nombre de la tabla de restaurantes
                key: 'id'
            }
        }
    });

    Hamburguesa.associate = function(models) {
        Hamburguesa.belongsTo(models.Restaurante, { foreignKey: 'restauranteId', as: 'restaurante' });
    };
    return Hamburguesa;
}