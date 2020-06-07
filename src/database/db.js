//criando um banco de dados sqlite com as duas primeiras linhas do código

//importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose() //o verbose traz mais informações na tela

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db") // new acompanhada de um "constructor" = cria um objeto (db)

module.exports = db //exportar o objeto db para ser usado por outras aplicações

//utilizar o objeto de banco de dados para nossas operações
db.serialize( () => { //função para rodar uma sequência de códigos

    //Com comandos SQL, eu vou:

    //1) criar uma tabela (dentro do banco de dados) 
    // db.run(` 
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT 

    //     );
    // `)// run é uma função que executa o que está dentro dela
      // places é o nome da tabela
      // id é o identificador (único), pra não ter dois iguais!
      // mesmo deletando um número da tabela, ele não será reposto se entrar um novo usuário
      // o último tipo (items) não tem vírgula!
      // se existir a tabela, ela não entra no comando "run"
    
    //2) Inserir dados na tabela
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `

    // const values = [
    //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardim América",
    //     "N° 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Papéis e Papelão"
    // ]

    // function afterInsertData (err){
    //     if(err){
    //         return console.log (err) //se houver erro, ele retorna o erro no console.log
    //     }
    //     console.log ("Cadastrado com sucesso") // resposta se n houver erro
    //     console.log(this) //this é um objeto refere-se à resposta, mas n pode usar em arrow functions
    // }

    // db.run(query, values, afterInsertData)//function do tipo "callback": 1)passada como parâmetro de outra função, 
                                                                        // 2) função que vai ser chamada depois de um tempo
    // se coloca afterInsertData(err) ela seria executada imediatamente, mas queremos que ela seja usada depois de cadastrar os dados

    //3) Consultar os dados da tabela
    // db.all(`SELECT * FROM places`, function(err, rows){//* = todos os campos (se quisesse que fosse só os nomes dos registros colocaria "name" ao invés de *)
    //                                                    //rows = registros da tabela (array)
    //     if(err){
    //         return console.log (err) //se houver erro, ele retorna o erro no console.log
    //     }
    //     console.log("Aqui estão os registros")
    //     console.log(rows)
    // })

    //4) Deletar um dado da tabela (extra!!:) )
    // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err, rows){
    //     if(err){
    //         return console.log (err) //se houver erro, ele retorna o erro no console.log
    //     }
    //     console.log("Registro deletado com sucesso. Aqui estão seus registros atualizados:")
    //     console.log(rows)
    // })
})