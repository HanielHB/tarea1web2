module.exports = app => {
    require('./restaurantes.routes')(app);
    require('./hamburguesas.routes')(app);
    require('./usuarios.routes')(app);
    require('./home.routes')(app);
    
}