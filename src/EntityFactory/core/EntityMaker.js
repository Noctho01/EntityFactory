const random = require('random')

module.exports = class EntityMaker {
    static DataTypes = {
        email: 'email',
            /* Description
                include: ['letras', 'numeros', 'simbolos']
                minMax: [min, max]
                dominiosModels: ['gmail', 'hotmail', 'yahoo']
                case: Object Cases
            */
           
        cpf: 'cpf',
            /* Description
                null
            */
    
        string: 'string',
            /* Description
                include: 'letras' + 'numeros' + 'simbolos'
                minMax: [min, max]
                leng: tamanho fixo
                case: Object Cases
            */
    
        inter: 'inter',
        float: 'float',
            /* Description
                minMax: [min, max]
            */
    
        booleano: 'booleano',
            /* Description
                null
            */
    
        data: 'data'
            /* Description
                yMaxMin: [1999, 2005]
                mMaxMin: [1, 12]
                dMaxMin: [1, 30]
            */
    }
    static Cases = {
        upperCase: 'upperCase', // UPPER CASE
        lowerCase: 'lowerCase', // lower case
        camiCase: 'camiCase',   // Cami Case
        textCase: 'textCase'    // Text case
    }

    constructor(esquemas) {
        this.entidade = this.#varrerEsquemas(esquemas)
    }

    #varrerEsquemas(esquemas) {
        const entidade = {}
        Object.keys(esquemas).forEach( esquema => {
            entidade[esquema] = this.#tratarEsquema(esquemas[esquema])
        })

        return entidade
    }

    #tratarEsquema(esquema) {
        /*
        Chacando se esquema é necessario, caso sim o codigo
        continua, caso não, a decição de sua criçao sera decidida
        aleatoriamente usando a lib random
        */
        const esquemaNecessario = esquema.require ? 1 : random.boolean()
        if (!esquemaNecessario) return null
            
        return esquema.type ?
            this.#tratamentoType(esquema.type, esquema.description, esquema.minMax || null) :
            this.#tratamentoModelos(esquema.modelos, esquema.space)
    }

    #tratamentoType(type, description, minMax) {
        switch (type) {
            case 'email' :
                return this.#gerarEmail(description)
            case 'cpf' :
                return this.#gerarCpf(description)
            case 'string' :
                return this.#gerarString(description)
            case 'inter' :
                return random.int(minMax[0], minMax[1])
            case 'float' :
                return random.float(minMax[0], minMax[1]).toFixed(2)
            case 'booleano' :
                return random.boolean()
            case 'data' :
                return this.#gerarData(description)
        }
    }

    #tratamentoModelos(modelos, space) {
        if (modelos instanceof Array) return modelos[random.int(0, modelos.length - 1)]
        
        let valor = ''
        Object.keys(modelos).forEach( item => {
            valor += modelos[item][random.int(0, modelos[item].length - 1)] + (space ? " ": "")
        })
        return valor.trim()
    }
    // ....................................................................................
    // Geradores de valores ...............................................................

    #gerarEmail(description) {
        let endereco = ''
        const length = random.int(description.minMax[0], description.minMax[1])
        const dominiosModels = description.dominiosModels[
            random.int(0, description.dominiosModels.length - 1)
        ]
        description.include.forEach( item => {
            for (let i = 0; i < ((length / 2 ) - 1); i++) {
                endereco += item[random.int(0, item.length - 1)]
            }
        })
        return `${endereco}@${dominiosModels}.com`
    }

    #gerarString(description) {        
        const length = description.leng || random.int(description.minMax[0], description.minMax[1])
        let string = this.#tratarLengthString(length, description.include)

        return this.#tratarCaseString(string, description.case || 'textCase', description.space)
    }

    #gerarData(description) {
        const ano = random.int(description.yMinMax[0], description.yMinMax[1])
        const mes = random.int(description.mMinMax[0], description.mMinMax[1])
        const dia = random.int(description.dMinMax[0], description.dMinMax[1])
    
        return `${ano}-${mes}-${dia}`
    }

    #gerarCpf() {
        function CPF() {
            this.generate = function (formatted) {
                formatted = formatted == undefined ? true : formatted;

                var cpf
        
                var n = 9;
                var n1 = rand(n);
                var n2 = rand(n);
                var n3 = rand(n);
                var n4 = rand(n);
                var n5 = rand(n);
                var n6 = rand(n);
                var n7 = rand(n);
                var n8 = rand(n);
                var n9 = rand(n);
        
                var d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
                d1 = 11 - (mod(d1, 11));
                if (d1 >= 10) d1 = 0;
        
                var d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
                d2 = 11 - (mod(d2, 11));
                if (d2 >= 10) d2 = 0;
        
                if (formatted) cpf = '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;
                else cpf = '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;
        
                return cpf;
            };
        
            function rand(n) {
                var ranNum = Math.round(Math.random() * n);
                return ranNum;
            }
        
            function mod(numerator, denominator) {
                return Math.round(numerator - (Math.floor(numerator / denominator) * denominator));
            }
        
        }
        return new CPF().generate()
    }

    // .....................................................................................
    // Metodos de Tratamento reservado .....................................................

    #tratarCaseString(string, caseString, space) {
        let newString = ''

        switch(caseString) {
            case 'camiCase':
                string.forEach( nome => {
                    newString += nome.replace(nome[0], nome[0].toUpperCase()) + (space ? " " : '')
                })
                break
        
            case 'lowerCase':
                string.forEach( nome => {
                    newString += nome.toLowerCase() + (space ? " " : '')
                })
                break

            case 'upperCase':
                string.forEach( nome => {
                    newString += nome.toUpperCase() + (space ? " " : '')
                })
                break

            case 'textCase':
                string.forEach( nome => {
                    if (nome == string[0]) {
                        nome = nome.replace(nome[0], nome[0].toUpperCase())
                    }
                    newString += nome + (space ? " " : '')
                })
                break
        }
        return newString.trim()
    }

    #tratarLengthString(length, include) {
        let strings = []
        
        if (length > 3 && length <= 10) {
            const numStrings = 2

            for ( let i = 0; i < numStrings; i++ ) {
                let string = ''

                for ( let i = 0; i < (length / numStrings); i++ ) {
                    const index = random.int(0, include.length - 1)
                    string += include[index]
                }
                
                strings.push(string)
            }
        } else if (length > 10 && length <= 15) {
            const numStrings = 3
            
            for ( let i = 0; i < numStrings; i++ ) {
                let string = '' 

                for ( let i = 0; i < (length / numStrings); i++ ) {
                    const index = random.int(0, include.length - 1)
                    string += include[index]
                }

                strings.push(string)
            }
        } else if (length > 15 && length <= 20) {
            const numStrings = 4
            
            for ( let i = 0; i < numStrings; i++ ) {
                let string = '' 

                for ( let i = 0; i < (length / numStrings); i++ ) {
                    const index = random.int(0, include.length - 1)
                    string += include[index]
                }

                strings.push(string)
            }
        } else if (length > 20) {
            const numStrings = random.int(6, 8)
            
            for ( let i = 0; i < numStrings; i++ ) {
                let string = '' 

                for ( let i = 0; i < (length / numStrings); i++ ) {
                    const index = random.int(0, include.length - 1)
                    string += include[index]
                }

                strings.push(string)
            }
        }

        return strings
    }
}