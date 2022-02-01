<h1 align="center"> :busts_in_silhouette: EntityFactory :factory: </h1>
<p> Gera entidades de formulários (usuários, produtos, categorias etc) e envia para o body da requisição post de sua API </p>
<br>

<h2>:ballot_box: Dependencias </h2>

- axios : https://axios-http.com/docs/intro
- npm random : https://github.com/transitive-bullshit/random
- npm cross-env : https://www.npmjs.com/package/cross-env

<br>

<h2> :sunny: Get Started</h2>

~~~
> git init
> git clone https://github.com/Noctho01/EntityFactory.git
> npm install
~~~

<p> O diretorio deste programa está em /src, dentro voce encontrara o arquivo index.js que possui um pequeno codigo que vai automatizar o envio das requisiçoes POST para o     endereço endpoint especificado. <p>
<br>
 
<h2>:mechanical_arm: Executando programa </h2>

~~~
> set E=nome_esquema&& set Q=quantidade_entidades_geradas&& set R=rota&& node src/index.js
~~~

<p> Dentro do diretorio do programa (fora de src) escreva este comando a cima, EntityFactory utiliza a dependencia cross-env para declarar variaveis de ambiente na linha de comando do cmd. </p>
<p><b>set E=nome_esquema</b><br> especifica qual esquema o programa vai ler para gerar a entidade. <br> ex: "set E=clientes&&" </p>
<p><b>set Q=quantidade_entidades_geradas</b><br> informa o numero total de entidades a serem geradas. <br> ex: "set Q=20&&" </p>
<p><b>set R=rota</b><br> informa a rota da requisição, deve ser informado com "http" ou "https no inicio. <br> ex: set R=http:localhost:3030/cadastrar/cliente&& </p>
 <br>

<br> 
<h2>:wrench::gear: Configurando </h2>
<p> O proposito final deste programa é aumotaizar o preenchimento de aplicações json usadas para enviar dados no corpo da requisição (atualmente suporta apenas o formato JSON).
Para isso EntityFactory faz juiz ao nome criando (fabricando) entidades especificadas pelo desenvolvedor, assim criando dados ficticios para serem enviados ao corpo da requisição POST/PUT/PATH... A chave para que EntityFactory crie essas entidades está nos esquemas </p>

<h3>:page_facing_up: Esquemas </h3>
<p> Encarregados de armazenar as regras de negocio da entidade, especificando quais são os campos para os fomularios/json e as regras para gerar seu valor aleatoriamente. </p>
<br>

<h3>:memo: Criando um esquema </h3>
<p> dentro do diretorio /src/schemes, crie um arquivo com o nome da entidade que pretende criar <br> Exemplo: <code>user.js</code></p>

~~~~js
const { DataTypes, Cases } = require('../EntityFactory/core/EntityMaker')

module.exports = { /* esquema aqui */ }
~~~~

<p> Na primeira linha importamos os objetos que auxiliarão na especifação das regras no esquema</p>
<p><b><i>DataTypes</i></b> : objeto com especificação dos tipos de dados que podem ser gerados <br> <b><i>Cases</i></b> : objeto com especificações dos tipos de cases de uma string (cami cases, upper cases...)<p>

#

<p> Em seguida voce deve informar as regras do esquema, segue agora como montar um esquema </p>

~~~~js
module.exports = {
  email: {
    require: true,
    type: DataTypes.string,
    description: {
      space: true,
      minMax: [5, 10],
      include: 'aeioubdc',
      case: Cases.camiCase
    }
  }
}
~~~~


<h4><code> require </code></h4>
<p> especifica se o campo é obrigatorio ou não, caso não seja, o campo pode ser ou não criado, a decisao é feita aleatoriamente</p>

<h4><code> type </code></h4>
<p> usando DataTypes, deve informar qual será o tipo do valor deste campo
<br>
<ul>
  <li><b>email</b> ==> abc123@foo.com</li>
  <li><b>cpf</b> ==> gera um cpf valido sem pontos "xxxxxxxxxxx"</li>
  <li><b>date</b> ==> 1999/01/12 gera apenas datas, não gera horarios</li>
  <li><b>string</b> ==> valores em string, podem conter letras, numeros ou caracteres especiais (isso é determinado na propriedade <b><i>include</i></b> de string)</li>
  <li><b>inter</b> ==> valores inteiros do tipo numero</li>
  <li><b>float</b> ==> valores float do tipo numero</li>
  <li><b>booleano</b> ==> valores booleanos true, false || 1, 0</li>
</ul>
</p>

<h4><code> description </code></h4>
<p> Especifica as regras aplicadas naquele campo, porem elas seguem o seu tipo. Casa tipo de dados possui um grupo especifico de descriços</p>
<h4> Campos de description </h4>

| campo           | type                                               | valores                                                    | função                                                                                                                                                                                          |
|-----------------|----------------------------------------------------|------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| space           | DataTypes.string Modelos                           | true/false or null                                         | especifica se o texto na string deve conter espaços entre palavras ex: space:true >> "Vitoria Reges" / space:false >> "VitoriaReges"                                                            |
| minMax          | DataTypes.string  DataTypes.inter  DataTypes.float | [valMin, valMax]                                           | valMin: valor minimo que pode ser gerado pelo programa valMax: valor maximo que pode ser gerado pelo programa  (obs: para o tipo string possui a funcionalidade de limitar o tamanho da string) |
| leng            | DataTypes.string                                   | numero inteiro                                             | valor fixo do tamanho da string                                                                                                                                                                 |
| case            | DataTypes.string                                   | 'camiCase', 'upperCase', 'lowerCase', 'textCase'           | valor em string dos tipos de case da string ex case: Cases.camiCase \|\| "camiCase" >> "FubarDeMilho"                                                                                           |
| include         | DataTypes.string DataTypes.email                   | tipo email: ['abc', '123', '...'] tipo string: 'abc123...' | campo obrigatorio, especifica os caracteres que serão usados para gerar o valor do campo ex: <string> include: "bo15" >> "b1oob55" <email> include: ["bo", "15"] >> boob515@email.com           |
| dominionsModels | DataTypes.email                                    | ['gmail', 'hotmail', 'yahoo', '...']                       | campo obrigatorio para tipo email, especifica em um array os host de email                                                                                                                      |
| yMinMax         | DataTypes.date                                     | [anoMinimo, anoMaximo]                                     | especifica o ano minimo e maximo a ser gerado pelo programa ex: yMinMax: [2002, 2004] >> 2002 \|\| 2003 \|\| 2004                                                                               |
| mMinMax         | DataTypes.date                                     | [mesMinimo, mesMaximo]                                     | especifica o mes minimo e maximo a ser gerado pelo programa ex: mMinMax: [1, 12] >> 8 \|\| ...                                                                                                  |
| dMinMax         | DataTypes.date                                     | [diaMinimo, diaMaximo]                                     | especifica o dia minimo e maximo a ser gerado pelo programa ex: dMinMax: [1, 31] >> 19 \|\| ...                                                                                                 |
<br>

<br> 
 <h2>:kaaba: Modelos </h2>
 <p> Os modelos são valores que voce estabelece para que sejam escolhidos aleatoriamente para aquele campo em especifico, campos que possuem modelos não precisam ter um tipo, apenas usando a propriedade <code>modelos</code> e nele passando um array com os possiveis valores a serem escolhidos.<br> Dentro de /src/models voce deve criar um arquivo chamado models.js </p>
 
 ~~~~js
 // Exemplo de um arquivo modelos.js
 
 module.exports = {
    // Modelos aqui ...
    nomes: {
        primeiro: [
            'Gabriel', 'Gustavo', 'Pedro', 'Maria',
            'Rafael', 'Lucas', 'Alex', 'Barbara',
            'Natalia', 'Geni', 'Jose', 'Antonio',
            'Marcia'
        ],
        segundo: [
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
    paises: [
        'Brasil', 'Estados Unidos',
        'Argentina', 'China'
    ],

}
 ~~~~
 
 <p> O mesmo deve exportar um objeto que possua chaves que voce possa usar como referencia, e seus valores devem ser arrays ou objetos com arrays. os valores dentro de cada array seram usados pelo EntityFactory para gerar strigns com valores aleatorios baseado nos modelos.<p>
 
 <h3>:page_facing_up::kaaba: Esquemas com Modelos </h3>
 
 ~~~~js
 const { DataTypes, Cases } = require('../EntityFactory/core/EntityMaker')
 const Models = require('../models/models_examples')
 
 module.exports = { /* Esquema aqui */ }
 ~~~~
 
 <br>
 <p> Na segunda linha importamos um modulo que possui os <b><i>Modelos</i></b> de dados que voce deve especificar em /src/modelos/modelo.js </p>
 
 ~~~~js
 module.exports = {
   nome: {
     require: true,
     space: true,
     models: Models.nomes || ['Pedro', 'Carla', 'Marcos', 'Felipe', 'Angela'] || { primeiroNome: ['Pedro', 'Marcos'], segundoNome: ['Da Silva', 'Dos Santos'] }
   }
 }
 ~~~~
 
 <p> como dito antes, ao criar um campo que utiliza modelos, não é informado o tipo do mesmo, <code>require</code> e <code>space</code> possuem a mesma função em campos tipados porem <code>space</code> não precisa está dentro de uma propriedade <code>description</code> quando se trata de um campo com modelos. </p>
 
#

