require('dotenv').config()

const axios = require('axios')

// Esquema de regras de negocio da entidade que sera criada
const esquema = require(`./esquemas/${process.env.E}`)

 // Endpoint da api que recebera a requisição POST
const urlApiPlayforward = process.env.R

const EntityFactory = require('./EntityFactory/EntityFactory')
const entidades = EntityFactory(esquema, process.env.Q) 

// Varrendo array com objetos entidade criados para efeturar o post
entidades.forEach( async entidade => {
    try {
        const postResult = await axios.post(urlApiPlayforward, entidade)
        console.log(`${entidade.nome} ==> ${postResult.data.message}`)
    } catch (err) {
        console.log(!err.response ? err.message : err.response.data.descrition)
    }
})
