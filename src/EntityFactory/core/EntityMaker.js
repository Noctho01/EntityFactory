const random = require('random')

module.exports = class EntityMaker {
    constructor(schemes) {
        this.entity = this.#schemeSweep(schemes)
    }

    #schemeSweep(schemes) {
        const entity = {}
        Object.keys(schemes).forEach( scheme => {
            entity[scheme] = this.#treatSqueme(schemes[scheme])
        })
        return entity
    }

    #treatSqueme(scheme) {
        /*
            verificando se esquema é necessario, caso sim o codigo
            continua, caso não, a decição de sua criçao sera decidida
            aleatoriamente usando a lib random
        */
        const necessaryScheme = scheme.require ? 1 : random.boolean()
        if (!necessaryScheme) return null

        // Vendo se o scheme possui description e atribuindo minMax
        let minMax
        if (scheme.description) minMax = scheme.description.minMax
            
        return scheme.type
            ? this.#treateType(scheme.type, scheme.description, minMax || null)
            : this.#treateModels(scheme.models, scheme.space, scheme.isArray)
    }


    /*
        chama função que ficara responsavel por
        gerar um valor aleatorio para este campo
        baseado em seu tipo
    */
    #treateType(type, description, minMax) {
        switch (type) {
            case 'email' :
                return this.#generateEmail(description)
            case 'cpf' :
                return this.#generateCpf(description)
            case 'string' :
                return this.#generateString(description)
            case 'inter' :
                return random.int(minMax[0], minMax[1])
            case 'float' :
                return random.float(minMax[0], minMax[1]).toFixed(2)
            case 'booleano' :
                return random.boolean()
            case 'date' :
                return this.#generateDate(description)
        }
    }
    

    /*
        Gera valor aleatorio para o campo baseado
        nos valores disponiveis em @modelos
    */
    #treateModels(models, space, isArray) {
        if (models instanceof Array) return models[random.int(0, models.length - 1)]
        
        const value = []
        Object.keys(models).forEach( item => {
            const possibleValue = models[item][random.int(0, models[item].length - 1)]
            if (value.indexOf(possibleValue) == -1) value.push(possibleValue)
        })

        return isArray
            ? value
            : space
                ? value
                    .toString()
                    .replace(/\,/g, ' ')
                : value
                    .toString()
                    .replace(/\,/g, '')
    }


    // ....................................................................................
    // Geradores de valores ...............................................................

    #generateEmail(description) {
        let address = ''
        const length = random.int(description.minMax[0], description.minMax[1])
        const domainModels = description.domainModels[
            random.int(0, description.domainModels.length - 1)
        ]
        description.include.forEach( item => {
            for (let i = 0; i < ((length / 2 ) - 1); i++) {
                address += item[random.int(0, item.length - 1)]
            }
        })
        return `${address}@${domainModels}.com`
    }

    #generateString(description) {        
        const length = description.leng || random.int(description.minMax[0], description.minMax[1])
        let string = this.#treateLengthString(length, description.include)

        return this.#treateCaseString(string, description.case || 'textCase', description.space)
    }

    #generateDate(description) {
        const year = random.int(description.yMinMax[0], description.yMinMax[1])
        const month = random.int(description.mMinMax[0], description.mMinMax[1])
        const day = random.int(description.dMinMax[0], description.dMinMax[1])
    
        return `${year}-${month}-${day}`
    }

    #generateCpf() {
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

    /*
        Tratamento do tipo de case da string
        cami cases, upper cases, lower cases...
    */
    #treateCaseString(string, caseString, space) {
        let newString = ''

        switch(caseString) {
            case 'camiCase':
                string.forEach( name => {
                    newString += name.replace(name[0], name[0].toUpperCase()) + (space ? " " : '')
                })
                break
        
            case 'lowerCase':
                string.forEach( name => {
                    newString += name.toLowerCase() + (space ? " " : '')
                })
                break

            case 'upperCase':
                string.forEach( name => {
                    newString += name.toUpperCase() + (space ? " " : '')
                })
                break

            case 'textCase':
                string.forEach( name => {
                    if (name == string[0]) {
                        name = name.replace(name[0], name[0].toUpperCase())
                    }
                    newString += name + (space ? " " : '')
                })
                break
        }
        return newString.trim()
    }


    /*
        Tratamento do tamanho do valor voltado
        para o tipo string de DataTypes
    */
    #treateLengthString(length, include) {
        const strings = []
        const string = []
        const div = (length > 3 && length <= 10) ? 2 :
            (length > 10 && length <= 15) ? 3 :
            (length > 15 && length <= 20) ? 4 :
            (length > 20) ? random.int(6, 8) : 1
        
        const index = Math.round(length / div)

        while (string.length != length) {
            string.push(include[random.int(0, include.length -1)])
        }

        for (let i = 0; i < div; i++) {
            let stringTemporaria = ''
            for (let j = 0; j < index + 1; j++) {
                if (string[0]) {
                    stringTemporaria += string[0]
                    string.shift()
                }
            }
            strings.push(stringTemporaria)
        }

        console.log({
            string: string,
            strings: strings
        })

        return strings
    }
}