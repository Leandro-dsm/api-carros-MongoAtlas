# 🚗 API de Carros

Esta API fornece endpoints para gerenciar informações sobre carros.

---

## 📌 Base URL

- **Local**: `http://localhost:3000`
- **Produção**: `https://sua-api.herokuapp.com` (ou domínio configurado no servidor)

---

## 🗄️ Conexão com Banco de Dados

- **Banco de Dados**: MongoDB (NoSQL, orientado a documentos)  
- **Provedor**: MongoDB Atlas (nuvem)  
- **ORM**: Mongoose  

### Exemplo de Conexão

```javascript
import mongoose from 'mongoose';

const connect = () => {
    mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.wlzobev.mongodb.net/apicarros?retryWrites=true&w=majority&appName=Cluster0`
    );
    const connection = mongoose.connection;
    connection.on("error", () => {
        console.log("Erro ao conectar ao MongoDB Atlas.");
    });
    connection.on("open", () => {
        console.log("Conectado ao MongoDB Atlas com sucesso!!");
    });
};
connect();
export default mongoose;
```

### String de Conexão (URI)

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

🔒 **Dicas de Segurança**:
- Nunca exponha a URI em código público (use variáveis de ambiente, ex: `process.env.MONGODB_URI`).
- Configure **IP Whitelist** no Atlas.
- Ative **autenticação** e **criptografia SSL/TLS** (padrão no Atlas).

---

## 📑 Modelo de Dados

### Carro

Representa um veículo automotivo, armazenado na coleção **carros**.

| Campo           | Tipo     | Descrição                                      |
|-----------------|----------|------------------------------------------------|
| `_id`           | ObjectId | ID único gerado pelo MongoDB                   |
| `marca`         | string   | Marca do carro (ex: `"Toyota"`)                |
| `modelo`        | string   | Modelo do carro (ex: `"Corolla"`)              |
| `ano`           | number   | Ano de fabricação (ex: `2022`)                 |
| `cor`           | string   | Cor do carro (ex: `"Prata"`)                   |
| `motor`         | string   | Tipo de motor (ex: `"1.8 Flex"`)               |
| `data_lancamento` | Date   | Data de lançamento (ISO string)                |
| `__v`           | number   | Contador de versão (gerenciado pelo Mongoose)  |

### 🔎 Validações
- Todos os campos são **obrigatórios**.
- `ano` deve ser um **número positivo**.
- `data_lancamento` deve ser uma **data válida**.

---

## 🔗 Endpoints

### 1. Listar todos os carros
- **URL**: `/carros`  
- **Método**: `GET`  
- **Descrição**: Retorna todos os carros cadastrados.

**Resposta 200 OK**
```json
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
```

---

### 2. Criar um novo carro
- **URL**: `/carros`  
- **Método**: `POST`  
- **Descrição**: Cria um novo carro.

**Corpo da Requisição**
```json
{
  "marca": "Ford",
  "modelo": "Mustang",
  "ano": 2024,
  "cor": "Vermelho",
  "motor": "5.0 V8",
  "data_lancamento": "2023-05-20T00:00:00.000Z"
}
```

**Resposta 201 Created**
```json
{
  "mensagem": "Carro criado com sucesso!"
}
```

---

### 3. Buscar carro por ID
- **URL**: `/carros/:id`  
- **Método**: `GET`  
- **Descrição**: Retorna detalhes de um carro específico.

**Resposta 200 OK**
```json
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
```

---

### 4. Atualizar carro por ID
- **URL**: `/carros/:id`  
- **Método**: `PUT`  
- **Descrição**: Atualiza os dados de um carro existente.

**Corpo da Requisição**
```json
{
  "marca": "Ford",
  "modelo": "Mustang GT",
  "ano": 2024,
  "cor": "Azul",
  "motor": "5.0 V8 Supercharged",
  "data_lancamento": "2023-05-20T00:00:00.000Z"
}
```

**Resposta 200 OK**
```json
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
```

---

### 5. Deletar carro por ID
- **URL**: `/carros/:id`  
- **Método**: `DELETE`  
- **Descrição**: Remove um carro pelo ID.

**Resposta 204 No Content**
(Sem corpo de resposta)

---

## ⚠️ Possíveis Erros

| Código | Descrição                                |
|--------|------------------------------------------|
| 400    | ID inválida                              |
| 404    | Carro não encontrado                     |
| 500    | Erro interno do servidor / falha no Atlas |

---

## 🧪 Testando a API

- **MongoDB Atlas** → Dashboard > Clusters > Browse Collections  
- **Ferramentas** → Postman, Insomnia ou cURL  
- **Logs no servidor** → Confirmar conexão e erros no console  

---

✍️ **Autor**: [Seu Nome]  
📅 **Última atualização**: 2025
