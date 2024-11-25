import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import controller from "./controllers/ContactController";
dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;

const app = express(); // cria o servidor e coloca na variável app

// suporta parâmetros JSON no body da requisição
app.use(express.json());

// configura o servidor para receber requisições de qualquer domínio
app.use(cors());

// inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}...`);
});

// define a rota para o pacote /routes
app.use(routes);
