require('dotenv').config()

const axios = require('axios')
//axios.defaults.headers.Cookie = "access-token=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA0LCJlbWFpbCI6ImFsZWYuZG9nQGdtYWlsLmNvbSIsInRpcG8iOiJhbnVuY2lhbnRlIiwiaWF0IjoxNjQzNzc2OTY3LCJleHAiOjE2NDM3ODA1Njd9.oYqHNFz2Xvq4hF7vvEGuoZ8KoUvpvEBAJehGXS7m8Z8; Path=/; Domain=localhost"

// Esquema de regras de negocio da entidade que sera criada
const scheme = require(`./schemes/${process.env.E}`)

 // Endpoint da api que recebera a requisição POST
const urlApiPlayforward = process.env.R

const EntityFactory = require('./EntityFactory/EntityFactory')
const entitys = EntityFactory(scheme, process.env.Q)

console.log(entitys)

/*
// Varrendo array com objetos entidade criados para efeturar o post
entitys.forEach( async entity => {
    try {
        const postResult = await axios.post(urlApiPlayforward, entity)
        console.log(`${entity.nome} ==> ${postResult.data.message}`)
    } catch (err) {
        console.log(!err.response ? err.message : err.response.data.descrition)
    }
})
*/