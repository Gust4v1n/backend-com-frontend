const http = require('http');
const fs = require('fs');
const path = require('path');
const colors = require('colors')

const dados = {//aqui é a arraylist contendo os pacotes de viagem
    pacote1: {
        nome: "Pacote Rio de Janeiro",
        descricao: "Viajem para rio de janeiro",
        preco: 100
    },
    pacote2: {
        nome: "Pacote São Paulo",
        descricao: "Viajem para são paulo",
        preco: 200
    },
    pacote3: {
        nome: "Pacote Salvador",
        descricao: "Viajem para salvador",
        preco: 300
    }
}

const server = http.createServer((req, res) => {
    //aqui abre requisicao para api/agencia, e vai exibir a array list  con o JSON.stringify(dados)
    if (req.url === '/api/agencia') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(dados)); 
    }

    //aqui abre requisicao para o arquivo index
    let filePath = path.join(__dirname, 'frontend', req.url === '/' ? 'index.html' : req.url);

    //aqui abre requisicao para o arquivo agencia.html
    if (req.url === '/Agencia-De-Viagens') {
        filePath = path.join(__dirname, 'frontend', 'agencia.html');
    }

    //aqui pega os tipo de arquivo pela extensao e envia pro servidor, para o servidor lidar de maneira certa com o tipo de extensao do arquivo
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }

    //aqui abre requisicao para o arquivo 404 quando nenhuma url for encontrada
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, 'frontend', '404.html'), (error, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content404, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end('Erro no servidor: ' + err.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});


//aqui inicia o servidor na porta 3000
server.listen(3000,()=>{
    console.log(colors.green("Servidor Rodando!!!"))
})
