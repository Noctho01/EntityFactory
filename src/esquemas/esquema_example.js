const  { DataTypes, Cases } = require('../EntityFactory/core/EntityMaker')
const Modelos = require('../modelos/modelos_examples')

module.exports = {
    nome: {
        require: true,
        space: true,
        modelos: Modelos.nome
    },
    email: {
        require: true,
        type: DataTypes.email,
        description: {
            include: ['aeioubaeioucaeioufaeioup', '123456789'],
            minMax: [10, 20],
            dominiosModels: Modelos.email
        }
    },
    senha: {
        require: true,
        type: DataTypes.string,
        description: {
            space: false,
            minMax: [9, 15],
            include: 'abcdaeiou123456789',
            case: Cases.camiCase
        }
    },
    cpf: {
        require: true,
        type: DataTypes.cpf
    },
    data_nascimento: {
        require: true,
        type: DataTypes.data,
        description: {
            yMinMax: [1990, 2010],
            mMinMax: [1, 12],
            dMinMax: [1, 30]
        }
    },
    cep: {
        require: true,
        type: DataTypes.string,
        description: {
            space: false,
            leng: 8,
            include: '0123456789'
        }
    },
    pais: {
        require: true,
        type: DataTypes.string,
        description: {
            space: true,
            minMax: [5, 10],
            include: 'aeioubdc',
            case: Cases.camiCase
        }
    },
    estado: {
        require: true,
        type: DataTypes.string,
        description: {
            space: true,
            minMax: [5, 10],
            include: 'aeioubdc',
            case: Cases.camiCase
        }
    },
    cidade: {
        require: true,
        type: DataTypes.string,
        description: {
            space: true,
            minMax: [5, 10],
            include: 'aeioubdc',
            case: Cases.camiCase
        }
    },
    complemento: {
        require: true,
        type: DataTypes.string,
        description: {
            space: true,
            minMax: [20, 50],
            include: 'abcdefghijklmnopqrstuvxwyz123456789',
            case: Cases.textCase
        }
    }
}