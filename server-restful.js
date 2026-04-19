const express = require("express");
const app = express();
const PORT = 3000;

const { sucesso, erro, invalido } = require("./src/utils/response");
require("colors");
app.use(express.json());


function logRequest(req, res, next) {
    const start = Date.now();

    res.on("finish", () => {
        const time = Date.now() - start;

        let color = "green";

        if (res.statusCode >= 400) color = "red";
        else if (res.statusCode >= 300) color = "yellow";

        console.log(
            `${req.method} ${req.url} - ${res.statusCode} - ${time}ms`[color]
        );
    });

    next();
}

app.use(logRequest);


let produtos = [
    { id: 1, nome: "Notebook Gamer", preco: 7500, estoque: 30, categoria: "Eletrônicos" },
    { id: 2, nome: "Mouse Gamer", preco: 250, estoque: 100, categoria: "Periféricos" },
    { id: 3, nome: "Teclado Mecânico", preco: 600, estoque: 80, categoria: "Periféricos" },
    { id: 4, nome: "Monitor 24", preco: 1100, estoque: 40, categoria: "Eletrônicos" }
];


app.get("/", (req, res) => {
  res.send("Bem-vindo à API de Produtos!");
});


//Rota para listagem de produtos
app.get("/produtos", (req, res) => {
    return sucesso(res, "Lista de produtos", produtos, 200, "blue");
});


//Rota para buscar produtos
app.get("/produtos/:id", (req, res) => {
    const produto = produtos.find(p => p.id == req.params.id);

    if (!produto) {
        return erro(res, "Produto não encontrado", 404);
    }

    return sucesso(res, "Produto encontrado", produto);
});


//Rota para cadastro de produtos
app.post("/produtos", (req, res) => {
    const { nome, preco, estoque, categoria } = req.body;

    if (!nome || preco <= 0) {
        return invalido(res, "Nome e preço > 0 obrigatórios");
    }

    const novo = {
        id: produtos.length + 1,
        nome,
        preco,
        estoque,
        categoria
    };

    produtos.push(novo);

    return sucesso(res, "Produto criado com sucesso", novo, 201, "green");
});


//Rota para atualizar produto
app.put("/produtos/:id", (req, res) => {
    const index = produtos.findIndex(p => p.id == req.params.id);

    if (index === -1) {
        return erro(res, "Produto não encontrado", 404);
    }

    const { nome, preco, estoque, categoria } = req.body;

    if (!nome || preco <= 0) {
        return invalido(res, "Nome e preço > 0 obrigatórios");
    }

    produtos[index] = {
        id: Number(req.params.id),
        nome,
        preco,
        estoque,
        categoria
    };

    return sucesso(res, "Produto atualizado", produtos[index], 200, "cyan");
});


//Bonus Atualização parcial
app.patch("/produtos/:id", (req, res) => {
    const produto = produtos.find(p => p.id == req.params.id);

    if (!produto) {
        return erro(res, "Produto não encontrado", 404);
    }

    if (req.body.nome !== undefined) produto.nome = req.body.nome;

    if (req.body.preco !== undefined) {
        if (req.body.preco <= 0) {
            return invalido(res, "Preço deve ser maior que 0");
        }
        produto.preco = req.body.preco;
    }

    if (req.body.estoque !== undefined) produto.estoque = req.body.estoque;
    if (req.body.categoria !== undefined) produto.categoria = req.body.categoria;

    return sucesso(res, "Produto atualizado parcialmente", produto, 200, "yellow");
});


//Rota para Deletar Produto
app.delete("/produtos/:id", (req, res) => {
    const index = produtos.findIndex(p => p.id == req.params.id);

    if (index === -1) {
        return erro(res, "Produto não encontrado", 404);
    }

    const removido = produtos.splice(index, 1);

    return sucesso(
        res,
        "Produto removido com sucesso",
        removido[0],
        200,
        "red"
    );
});


app.use((req, res) => {
  return erro(res, "Rota não encontrada", 404);
})


app.listen(PORT, () => {
    console.log(`API de Produtos rodando em http://localhost:${PORT}`);
});