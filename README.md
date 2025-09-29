Documentação da API de Carros

Esta API fornece endpoints para gerenciar informações sobre carros.

Base URL

Assumindo que a API está rodando localmente ou em um servidor, a base URL seria algo como: http://localhost:3000 (ou a porta configurada no seu app.js).

Para acessar em produção, use o domínio do seu servidor (ex: https://sua-api.herokuapp.com ou similar).
Modelos de Dados 
Carro
Representa um veículo automotivo.

Conexão com Banco de Dados
Tipo de Banco de Dados: MongoDB (NoSQL, orientado a documentos).

Provedor: MongoDB Atlas (serviço em nuvem gerenciado pela MongoDB).

Configuração Geral:

A conexão é gerenciada via Mongoose (ORM para Node.js).
No arquivo de configuração (provavelmente config/db-connection.js), 
você deve ter algo como:

import mongoose from 'mongoose';

const connect = () => {
    mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.wlzobev.mongodb.net/apicarros?retryWrites=true&w=majority&appName=Cluster0`
    );
    const connection = mongoose.connection;
    connection.on("error", () => {
        console.log("Erro ao conectar ao MongoDB Atlas.")
    });
    connection.on("open", () =>{
        console.log("Conectado ao MongoDB Atlas com sucesso!!");
    });
};
connect();
export default mongoose;

String de Conexão (URI): Use a URI fornecida pelo MongoDB Atlas, no formato:

mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

Substitua <username>, <password>, <cluster> e <database> pelos valores do seu cluster no Atlas.
Dicas de Segurança:
Nunca exponha a URI em código público (use variáveis de ambiente, como process.env.MONGODB_URI).
No MongoDB Atlas, configure IP Whitelist para permitir apenas conexões do seu servidor/IP.
Ative autenticação e criptografia SSL/TLS (padrão no Atlas).
Coleção no Banco:

Os dados dos carros são armazenados na coleção carros (ou similar, baseada no modelo Mongoose).
O MongoDB Atlas gerencia backups automáticos, escalabilidade e alta disponibilidade.
Possíveis Erros de Conexão:

ECONNREFUSED: Verifique se o cluster Atlas está online e a URI está correta.
Authentication failed: Confirme usuário/senha no Atlas.
Em caso de falha, a API pode retornar 500 Internal Server Error com mensagem de erro no log do servidor.
Testando a Conexão:

No MongoDB Atlas Dashboard: Acesse "Clusters" > "Browse Collections" para ver os dados em tempo real.
No código: Adicione logs para confirmar a conexão ao iniciar a API.

Modelos de Dados
Carro
Representa um veículo automotivo, armazenado como um documento na coleção carros do MongoDB Atlas.

Propriedades:

_id (ObjectId): ID único gerado automaticamente pelo MongoDB.
marca (string): Marca do carro (ex: "Toyota").
modelo (string): Modelo do carro (ex: "Corolla").
ano (number): Ano de fabricação (ex: 2022).
cor (string): Cor do carro (ex: "Prata").
motor (string): Tipo de motor (ex: "1.8 Flex").
data_lancamento (Date): Data de lançamento (ex: ISO string como "2021-09-01T00:00:00.000Z").
__v (number): Contador de versão do documento (gerenciado pelo Mongoose).
Validações (baseadas no esquema Mongoose):

Todos os campos são obrigatórios.
ano deve ser um número positivo.
data_lancamento deve ser uma data válida.

Endpoints

Os endpoints operam sobre os dados armazenados no MongoDB Atlas. Todas as operações (CRUD) são assíncronas e usam promises via Mongoose.

1. Listar todos os carros

URL: /carros
Método: GET
Descrição: Busca todos os documentos da coleção carros no MongoDB Atlas.
Parâmetros: Nenhum.

Respostas:

200 OK:
{
  "carros": [
    {
      "_id": "65b2a7e0f0e1c2d3e4f5a6b7",
      "marca": "Toyota",
      "modelo": "Corolla",
      "ano": 2022,
      "cor": "Prata",
      "motor": "1.8 Flex",
      "data_lancamento": "2021-09-01T00:00:00.000Z",
      "__v": 0
    }
  ]
}

500 Internal Server Error (ex: falha na conexão com Atlas):
{
  "erro": "Erro interno do servidor ao buscar dados do MongoDB Atlas."
}

2. Criar um novo carro

URL: /carros
Método: POST
Descrição: Adiciona um novo carro ao banco de dados.
Corpo da Requisição (JSON):
{
  "marca": "Ford",
  "modelo": "Mustang",
  "ano": 2024,
  "cor": "Vermelho",
  "motor": "5.0 V8",
  "data_lancamento": "2023-05-20T00:00:00.000Z"
}

Respostas:

201 Created: Requisição bem-sucedida, carro criado.

500 Internal Server Error:
{
  "erro": "Erro interno do servidor."
}
3. Listar um carro específico por ID

URL: /carros/:id
Método: GET
Descrição: Retorna os detalhes de um carro específico, identificado pelo seu ID.
Parâmetros de URL:
id (string, obrigatório): O ID único do carro.

Respostas:

200 OK:
        {
          "carro": {
            "_id": "65b2a7e0f0e1c2d3e4f5a6b7",
            "marca": "Toyota",
            "modelo": "Corolla",
            "ano": 2022,
            "cor": "Prata",
            "motor": "1.8 Flex",
            "data_lancamento": "2021-09-01T00:00:00.000Z",
            "__v": 0
          }
        }
        
400 Bad Request:
        {
          "erro": "ID inválida"
        }
        
404 Not Found:
{
  "erro": "Carro não encontrado."
}

500 Internal Server Error: (Sem corpo de resposta, apenas status)

4. Atualizar um carro existente por ID

URL: /carros/:id
Método: PUT
Descrição: Atualiza as informações de um carro existente, identificado pelo seu ID.
Parâmetros de URL:
id (string, obrigatório): O ID único do carro a ser atualizado.

Corpo da Requisição (JSON):
    {
      "marca": "Ford",
      "modelo": "Mustang GT",
      "ano": 2024,
      "cor": "Azul",
      "motor": "5.0 V8 Supercharged",
      "data_lancamento": "2023-05-20T00:00:00.000Z"
    }
    
Respostas:

200 OK:
        {
          "carro": {
            "_id": "65b2a7e0f0e1c2d3e4f5a6b7",
            "marca": "Ford",
            "modelo": "Mustang GT",
            "ano": 2024,
            "cor": "Azul",
            "motor": "5.0 V8 Supercharged",
            "data_lancamento": "2023-05-20T00:00:00.000Z",
            "__v": 0
          }
        }
        

400 Bad Request:
        {
          "erro": "ID inválida"
        }
        

500 Internal Server Error:
{
  "erro": "Erro interno do servidor."
}

5. Deletar um carro por ID

URL: /carros/:id
Método: DELETE
Descrição: Remove um carro do banco de dados, identificado pelo seu ID.
Parâmetros de URL:
id (string, obrigatório): O ID único do carro a ser deletado.

Respostas:

204 No Content: Requisição bem-sucedida, carro deletado. (Sem corpo de resposta)

400 Bad Request:
{
  "erro": "ID inválida"
}

500 Internal Server Error:
{
  "erro": "Erro interno do servidor."
}
