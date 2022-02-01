const Models = require('../models/models_example')

/*
    type's:
        - 'email'         // "email123@domain.com"
        - 'cpf'           // "xxxxxxxxxxx"
        - 'string'        // "this is a string"
        - 'inter'         // 58
        - 'float'         // 58.25
        - 'date'          // "1999-01-15"
        - 'booleano'      // true/false

    case's:
        - 'upperCase'     // UPPER CASE
        - 'lowerCase'     // lower case
        - 'camiCase'      // Cami Case
*/

module.exports = {
    name: {
        require: true,
        space: true,
        models: Models.names
    },
    email: {
        require: true,
        type: 'email',
        description: {
            include: ['aeioubaeioucaeioufaeioup', '123456789'],
            minMax: [10, 20],
            domainModels: Models.emails
        }
    },
    password: {
        require: true,
        type: 'string',
        description: {
            space: false,
            minMax: [9, 15],
            include: 'abcdaeiou123456789',
            case: 'camiCase'
        }
    },
    cpf: {
        require: true,
        type: 'cpf'
    },
    birth_date: {
        require: true,
        type: 'date',
        description: {
            yMinMax: [1990, 2010],
            mMinMax: [1, 12],
            dMinMax: [1, 30]
        }
    },
    cep: {
        require: true,
        type: 'string',
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
        type: 'string',
        description: {
            space: true,
            minMax: [5, 10],
            include: 'aeioubdc',
            case: 'camiCase'
        }
    },
    city: {
        require: true,
        type: 'string',
        description: {
            space: true,
            minMax: [5, 10],
            include: 'aeioubdc',
            case: 'camiCase'
        }
    },
    complement: {
        require: true,
        type: 'string',
        description: {
            space: true,
            minMax: [20, 50],
            include: 'abcdefghijklmnopqrstuvxwyz123456789',
            case: 'textCase'
        }
    }
}