const Models = require('../models/models')

module.exports = {
    nome: {
        require: true,
        space: true,
        models: Models.games
    },
    generos: {
        require: true,
        space: false,
        models: [
            [parseInt(Math.random() * (11 - 1) + 1), parseInt(Math.random() * (11 - 1) + 1), parseInt(Math.random() * (11 - 1) + 1)],
            [parseInt(Math.random() * (11 - 1) + 1), parseInt(Math.random() * (11 - 1) + 1), parseInt(Math.random() * (11 - 1) + 1)],
            [parseInt(Math.random() * (11 - 1) + 1), parseInt(Math.random() * (11 - 1) + 1), parseInt(Math.random() * (11 - 1) + 1)],
        ]
    },
    plataforma_id: {
        require: true,
        type: 'inter',
        description: {
            minMax: [1, 18]
        }
    },
    classificacao_id: {
        require: true,
        type: 'inter',
        description: {
            minMax: [1, 7]
        }
    },
    descricao: {
        require: true,
        type: 'string',
        description: {
            space: true,
            include: 'aeiouaoaeiouaodfgaeiouaobpl',
            minMax: [20, 50],
            case: 'textCase'
        }
    },
    preco: {
        require: true,
        type: 'float',
        description: {
            minMax: [40, 200]
        }
    },
    estoque: {
        require: true,
        type: 'inter',
        description: {
            minMax: [1, 5]
        }
    }
}