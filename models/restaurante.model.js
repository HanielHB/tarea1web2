module.exports = (sequelize, Sequelize) => {
    const Restaurante = sequelize.define("restaurante", {
        rnombre: {
            type: Sequelize.STRING
        },
        // usuarioId: {
        //     type: Sequelize.INTEGER,
        //     references: {
        //         model: 'usuarios', // Nombre de la tabla de usuarios
        //         key: 'id'
        //     }
        // }
    });
    

    Restaurante.associate = function(models) {
        Restaurante.hasMany(models.Hamburguesa, { foreignKey: 'restauranteId', as: 'hamburguesas' });
        // Restaurante.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
    };
    return Restaurante;
}