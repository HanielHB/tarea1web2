const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);
db.restaurantes = require("./restaurante.model.js")(sequelize, Sequelize);
db.hamburguesas = require("./hamburguesa.model.js")(sequelize, Sequelize);
db.usuarioHamburguesa = require("./usuarioHamburguesa.model.js")(sequelize, Sequelize);
db.review = require("./review.model.js")(sequelize, Sequelize);

// Establecer asociaciones

// one to many restaurante - hamburguesa
db.restaurantes.hasMany(db.hamburguesas, { as: "hamburguesas" });
db.hamburguesas.belongsTo(db.restaurantes, {
    foreignKey: "restauranteId",
    as: "restaurante",
});



// many to many usuario - hamburguesa
db.usuarios.belongsToMany(db.hamburguesas, {
    through: db.usuarioHamburguesa,
    as: "hamburguesasComidas",
    foreignKey: "usuarioId",
});
db.hamburguesas.belongsToMany(db.usuarios, {
    through: db.usuarioHamburguesa,
    as: "usuariosQueComieron",
    foreignKey: "hamburguesaId",
});

// one to many usuario - review
db.usuarios.hasMany(db.review, { as: "reviews" });
db.review.belongsTo(db.usuarios, {
    foreignKey: "usuarioId",
    as: "usuario",
});

// one to many hamburguesa - review
db.hamburguesas.hasMany(db.review, { as: "reviews" });
db.review.belongsTo(db.hamburguesas, {
    foreignKey: "hamburguesaId",
    as: "hamburguesa",
});

module.exports = db;