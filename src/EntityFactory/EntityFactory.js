const EntityMaker = require('./core/EntityMaker')

/*
    @esquema = objeto com especificaçoes de negocio para gerar entidade
    @quantidade = quantidade de entidades a serem criadas
*/
module.exports = function EntityFactory(squeme, quantity) {
    const entitys = []
    for ( let i = 0; i < quantity; i++ ) {
        entitys.push((new EntityMaker(squeme)).entity)
    }
    return entitys
}