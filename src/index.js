require('dotenv').config()

const axios = require('axios')

// Esquema de regras de negocio da entidade que sera criada
const scheme = require(`./schemes/${process.env.SCHEME_ENV}.js`)

// Endpoint da api que recebera a requisição POST
const urlApiPlayforward = process.env.ROUTE_ENV

const EntityFactory = require('./EntityFactory/EntityFactory')
const entitys = EntityFactory(scheme, process.env.QUANTITY_ENV)

// Varrendo array com objetos entidade criados para efeturar o post
entitys.forEach( async entity => {
    try {
        const postResult = await axios.post(urlApiPlayforward, entity)
        console.log(`${entity.nome} ==> ${postResult.data.message}`)
    } catch (err) {
        console.log('\n\n')
        console.log(err)
        //console.log(!err.response ? err.message : err.response.data.descrition)
    }
})