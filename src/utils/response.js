function sucesso(res, mensagem, dados = null, status = 200, cor = "green") {
    return res.status(status).json({
        type: "success",
        color: cor,
        message: mensagem,
        data: dados
    });
}

function erro(res, mensagem, status = 404) {
    return res.status(status).json({
        type: "error",
        color: "red",
        message: mensagem
    });
}

function invalido(res, mensagem) {
    return res.status(400).json({
        type: "invalid",
        color: "orange",
        message: mensagem
    });
}

module.exports = {
    sucesso,
    erro,
    invalido
};