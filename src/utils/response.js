function sucesso(res, mensagem, dados = null, status = 200, cor = "green") {
    return res.status(status).json({
        tipo: "sucesso",
        cor,
        mensagem,
        dados
    });
}

function erro(res, mensagem, status = 404) {
    return res.status(status).json({
        tipo: "erro",
        cor: "red",
        mensagem
    });
}

function invalido(res, mensagem) {
    return res.status(400).json({
        tipo: "invalido",
        cor: "orange",
        mensagem
    });
}

module.exports = {
    sucesso,
    erro,
    invalido
};