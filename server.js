const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

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
            `${req.method} ${req.originalUrl} - ${res.statusCode} - ${time}ms`[color]
        );
    });

    next();
}


app.use(logRequest);


let products = [
    { id: 1, nome: "Notebook Gamer", preco: 7500, estoque: 30, categoria: "Eletrônicos" },
    { id: 2, nome: "Mouse Gamer", preco: 250, estoque: 100, categoria: "Periféricos" },
    { id: 3, nome: "Teclado Mecânico", preco: 600, estoque: 80, categoria: "Periféricos" },
    { id: 4, nome: "Monitor 24", preco: 1100, estoque: 40, categoria: "Eletrônicos" }
];


app.get("/", (req, res) => {
    res.send("Welcome to Products API");
});


app.get("/health", (req, res) => {
    return sucesso(res, "API is running", {
        uptime: process.uptime()
    });
});


app.get("/products", (req, res) => {
    return sucesso(res, "Products list", products, 200, "blue");
});


// Get product by ID
app.get("/products/:id", (req, res) => {
    const produto = products.find(p => p.id == req.params.id);

    if (!produto) {
        return erro(res, "Product not found", 404);
    }

    return sucesso(res, "Product found", produto);
});


// Create product
app.post("/products", (req, res) => {
    const { nome, preco, estoque, categoria } = req.body;

    if (!nome || preco <= 0) {
        return invalido(res, "Name and price are required and must be greater than 0");
    }

    const novo = {
        id: products.length + 1,
        nome,
        preco,
        estoque,
        categoria
    };

    products.push(novo);

    return sucesso(res, "Product created successfully", novo, 201, "green");
});


// Update product (PUT)
app.put("/products/:id", (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);

    if (index === -1) {
        return erro(res, "Product not found", 404);
    }

    const { nome, preco, estoque, categoria } = req.body;

    if (!nome || preco <= 0) {
        return invalido(res, "Name and price are required and must be greater than 0");
    }

    products[index] = {
        id: Number(req.params.id),
        nome,
        preco,
        estoque,
        categoria
    };

    return sucesso(res, "Product updated", products[index], 200, "cyan");
});


// Partial update (PATCH)
app.patch("/products/:id", (req, res) => {
    const produto = products.find(p => p.id == req.params.id);

    if (!produto) {
        return erro(res, "Product not found", 404);
    }

    if (req.body.nome !== undefined) produto.nome = req.body.nome;

    if (req.body.preco !== undefined) {
        if (req.body.preco <= 0) {
            return invalido(res, "Price must be greater than 0");
        }
        produto.preco = req.body.preco;
    }

    if (req.body.estoque !== undefined) produto.estoque = req.body.estoque;
    if (req.body.categoria !== undefined) produto.categoria = req.body.categoria;

    return sucesso(res, "Product partially updated", produto, 200, "yellow");
});


// Delete product
app.delete("/products/:id", (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);

    if (index === -1) {
        return erro(res, "Product not found", 404);
    }

    const removido = products.splice(index, 1);

    // Mantido 200 para retorno com body (mais simples para portfólio)
    return sucesso(
        res,
        "Product removed successfully",
        removido[0],
        200,
        "red"
    );
});


app.use((req, res) => {
    return erro(res, `Route ${req.originalUrl} not found`, 404);
});


app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});