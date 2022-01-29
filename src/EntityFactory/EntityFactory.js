const EntityMaker = require('./core/EntityMaker')

module.exports = function EntityFactory(esquema, quantidade) {
    const entidades = []
    for ( let i = 0; i < quantidade; i++ ) {
        entidades.push((new EntityMaker(esquema)).entidade)
    }
    return entidades
}


/* 

[[[ MODELO DE UM ESQUEMA SIMPLES ]]]

const esquema = {
    email: {
        require: true,
        type: DataTypes.email,
        description: {
            minMax: [5, 10],
            dominiosModels: ['gmail', 'hotmail', 'outlook', 'yahoo'],
            include: ['abcdefghijklmnopqrstuvxwyz', '0123456789']
        }
    },
    cpf: {
        require: true,
        type: DataTypes.cpf
    },
    Pais: {
        require: true,
        type: DataTypes.string,
        description: {
            include: 'abcdefghijklmnopqrstuvxwyz',
            space: true,
            minMax: [5, 30],
            case: Cases.textCase
        }
    },
    preco: {
        require: true,
        type: DataTypes.float,
        minMax: [18, 25]
    },
    cep: {
        require: true,
        type: DataTypes.string,
        description: {
            include: '0123456789',
            space: false,
            leng: 8
        }
    },
    nome: {
        require: true,
        space: true,
        modelos: {
            primeiro: ['Vinicius', 'Vanessa', 'Julie'],
            segundo: ['Gomes', 'Silva', 'Dos Santos']
        }
    },
    cidade: {
        require: false,
        type: DataTypes.string,
        description: {
            include: 'baeioucdf',
            minMax: [6, 8],
            space: false
        }
    },
    nascimento : {
        require: true,
        type: DataTypes.data,
        description: {
            yMinMax: [1990, 1999],
            mMinMax: [1, 12],
            dMinMax: [1, 30]
        }
    }
}

 */