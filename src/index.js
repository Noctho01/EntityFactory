require('dotenv').config()

const axios = require('axios')
const esquema = require(`./esquemas/${process.env.E}`)
const urlApiPlayforward = `http://localhost:3030/${process.env.E}`

const EntityFactory = require('./EntityFactory/EntityFactory')
const entidades = EntityFactory(esquema, process.env.Q)

entidades.forEach( async entidade => {
    try {
        const postResult = await axios.post(urlApiPlayforward, entidade)
        console.log(`${entidade.nome} ==> ${postResult.data.message}`)
    } catch (err) {
        console.log(!err.response ? err.message : err.response.data.descrition)
    }
})
