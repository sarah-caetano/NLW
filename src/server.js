const express = require("express") // começar o servidor
const server = express()

// pegar o banco de dados
const db = require("./database/db.js") // pode colocar ou não o .js ele vai entender
                                       // por causa da função "module.exports = db" no arquivo db.js, é possível exportar o objeto pra cá

// Obs: SearchEngine: transforma o html em dinâmico! :) com dados reais -nunjucks!
// configurar (static) pasta pública para que elas estejam disponíveis no projeto
server.use(express.static("public")) //é assim que fala pro js onde estão os outros arquivos

// habilitar o uso do req.body nesta aplicação
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server, //ligou o nunjucks ao server
    noCache: true    //não use versões antigas dos outros arquivos usados para configurar as páginas
})

// configurar caminhos da minha aplicação
// página inicial
// req = requisição
// res = resposta
server.get("/", (req, res) => { //arrow function
    // res.send("Cheguei aqui") //ele deu a resposta ao servidor, escrevendo isso na página
    // res.sendFile(__dirname + "/views/index.html") //pegar o index.html (abri-lo)
    return res.render("index.html") //render = renderiza o index.html, ou seja, passa pelo motor do nunjucks o index.html
})

server.get("/create-point", (req, res) => {

    // req.query: Query Strings da nossa url
    console.log(req.query) 
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body: é o corpo do formulário
    // console.log(req.body) // req.body tem a msma função do req.query 
                             // pra ver se os dados estão sendo passados de uma página à outra, 
                             // aqui usa body pq o verbo HTML é POST

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items //no caso do JS pode-se colocar a vírgula aqui, mas no SQL não (arquivo SQL: db.js)
    ]

    function afterInsertData (err){
        if(err){
            console.log (err) //se houver erro, ele retorna o erro no console.log
            return res.send("Houve erro de cadastro!")
        }

        console.log ("Cadastrado com sucesso") // resposta se n houver erro
        console.log(this)

        // return res.send("ok") //queremos que apareça "ok" depois de o usuário ser cadastrado
        return res.render("create-point.html", {saved: true}) // o "saved: true" é a função que informa que os dados foram cadastrados! 
    }

    db.run(query, values, afterInsertData)

    //return res.send("ok") //o formulário escreveu "ok" na página usando o verbo post, pessoas só conseguem usar o get
})

server.get("/search", (req, res) => {// aqui a página começa a ficar inteligente: pega informações do banco de dados!

    const search = req.query.search

    if (search == "") {
        // pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }

    // pegar os dados do banco de dados (função vinda da pasta db.js, função serialize(), tópico 3)
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){ //importante lembrar: o rows é um array! E o '${search}' é a cidade que o usuário pesquisou
        if(err){
            return console.log (err) //se não der certo de achar a tabela de dados places, retorna erro
        }
        // console.log("Aqui estão os registros")
        // console.log(rows) //essas duas linhas servem para ver os dados chegando

        const total = rows.length

        //se não der erro, passe a informação (dados) da tabela (do array rows(=places) - banco de dados) para a página html
        return res.render("search-results.html", {places: rows, total: total}) //quando o valor e a propriedade têm nomes iguais (total: total), pode colocar apenas "total"
    })  
})

//ligar o servidor (listen)
server.listen(3000)

// IMPORTANT COMMENTS FROM CLASS:
// 1) get e post são chamados "verbos do HTML"
// 2) Nessa linha: db.all(`SELECT * FROM places WHERE city = '${search}'`, function(err, rows)
// o usuário tinha que escrever exatamente o nome da cidade, não dava muita "liberdade", na
// nova linha que está lá agora, o usuário pode escrever coisas antes da palavra registrada no db 
// ou depois, por exemplo: ele pesquisa SUL, mas não tem essa ciadade na db, mas existe Rio do Sul 
// (informações antes, a % antes do ${search} acessa essa) e existe Sulamericana (a % depois), mostrando
// pro usuário pontos dessas cidades relacionadas à palavra Sul (Lembrar: o = foi trocado por LIKE)
