const EntityMaker = require('./core/EntityMaker')

/*
    @esquema = objeto com especificaçoes de negocio para gerar entidade
    @quantidade = quantidade de entidades a serem criadas
*/
module.exports = function EntityFactory(esquema, quantidade) {
    const entidades = []
    for ( let i = 0; i < quantidade; i++ ) {
        entidades.push((new EntityMaker(esquema)).entidade)
    }
    return entidades
}