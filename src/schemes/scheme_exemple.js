const  { DataTypes, Cases } = require('../EntityFactory/core/EntityMaker')
const Models = require('../models/models_example')

module.exports = {
    name: {
        require: true,
        space: true,
        models: Models.names
    },
    email: {
        require: true,
        type: DataTypes.email,
        description: {
            include: ['aeioubaeioucaeioufaeioup', '123456789'],
            minMax: [10, 20],
            domainModels: Models.emails
        }
    },
    password: {
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
    birth_date: {
        require: true,
        type: DataTypes.date,
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
    countries: {
        require: true,
        space: false,
        models: Models.countries
    },
    state: {
        require: true,
        type: DataTypes.string,
        description: {
            space: true,
            minMax: [5, 10],
            include: 'aeioubdc',
            case: Cases.camiCase
        }
    },
    city: {
        require: true,
        type: DataTypes.string,
        description: {
            space: true,
            minMax: [5, 10],
            include: 'aeioubdc',
            case: Cases.camiCase
        }
    },
    complement: {
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