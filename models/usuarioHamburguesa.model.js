module.exports = (sequelize, Sequelize) => {
    const UsuarioHamburguesa = sequelize.define("usuario_hamburguesa", {
        usuarioId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        },
        hamburguesaId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'hamburguesas',
                key: 'id'
            }
        }
    });

    return UsuarioHamburguesa;
}