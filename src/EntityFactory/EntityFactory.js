const EntityMaker = require('./core/EntityMaker')

/**
 * 
 * @param {object} squeme objeto com especificaçoes de negocio para gerar entidade
 * @param {number} quantity quantidade de entidades a serem criadas
 * @returns {array} EntityMaker Instances
 */
module.exports = function EntityFactory(squeme, quantity) {
    const entitys = []
    for ( let i = 0; i < quantity; i++ ) {
        entitys.push((new EntityMaker(squeme)).entity)
    }
    return entitys
}