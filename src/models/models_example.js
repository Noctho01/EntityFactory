/*
    exporta objeto com modelos em arrays

    Ex:
    {
        nomes: [ "Pedro", "Paulo", "Luis", "Andre", "Alencar" ],
        cidades: [ "Brasilia", "Minas Gerais", "São Paulo" ]

        ou

        nomes: {
            primeiro: ['Vinicius', 'Pedro', 'Angela'],
            segundo: ['Da Silva', 'Dos Santos', 'Silva']
        }
    }
*/

module.exports = {
    // Modelos aqui ...
    names: {
        firstNames: [
            'Gabriel', 'Gustavo', 'Pedro', 'Maria',
            'Rafael', 'Lucas', 'Alex', 'Barbara',
            'Natalia', 'Geni', 'Jose', 'Antonio',
            'Marcia'
        ],
        secondNames: [
            'Dos Santos', 'Da Silva', 'Alencar',
            'De Nobrega', 'Diniz', 'Oliveira',
            'Dos Anjos', 'Gomes', 'Cunha',
            'Souza', 'Rodrigues'
        ]
    },
    emails: [
        'gmail', 'hotmail', 'alura',
        'yahoo', 'outlook', 'apple'
    ],
    countries: [
        'Brasil', 'Estados Unidos',
        'Argentina', 'China'
    ],

}