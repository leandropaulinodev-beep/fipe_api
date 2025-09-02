# API Estoque (Node.js + Express + Sequelize + MySQL)

## Estrutura
- Estrutura com **Express** (rotas, controllers, middlewares).
- **Sequelize** com **MySQL** e associações:
  - `Categoria` 1:N `Produto`
  - `Cliente` 1:1 `Endereco`
- CRUD completo: **categorias**, **produtos**, **clientes** (com endereço).
- Scripts úteis: `sync:db` e `seed`.

## Como rodar

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o .env conforme seu MySQL (DB_HOST, DB_NAME, DB_USER, DB_PASS)
   ```

3. **Criar o banco** (se ainda não existir), ex. via MySQL:
   ```sql
   CREATE DATABASE api_estoque CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

4. **Sincronizar tabelas** (opcional, pois o servidor já sincroniza ao subir):
   ```bash
   npm run sync:db
   ```

5. **Rodar**
   ```bash
   npm run dev
   ```
   - Servidor em: `http://localhost:3000`
   - Saúde: `GET http://localhost:3000/api/`

6. **Seed (dados exemplo)**
   ```bash
   npm run seed
   ```

## Endpoints 

### Categorias
- `GET /api/categorias` — lista todas
- `GET /api/categorias/:id` — detalhes
- `POST /api/categorias` — cria `{ "nome": "Bebidas" }`
- `PUT /api/categorias/:id` — atualiza `{ "nome": "..." }`
- `DELETE /api/categorias/:id` — remove

### Produtos
- `GET /api/produtos`
- `GET /api/produtos/:id`
- `POST /api/produtos` — cria
  ```json
  { "nome": "Coca-Cola Lata 350ml", "preco": 4.99, "estoque": 100, "categoriaId": 1 }
  ```
- `PUT /api/produtos/:id` — atualiza
- `DELETE /api/produtos/:id` — remove

### Clientes
- `GET /api/clientes`
- `GET /api/clientes/:id`
- `POST /api/clientes` — cria (com endereço opcional)
  ```json
  {
    "nome": "Leandro",
    "email": "leandro@test.com",
    "telefone": "11 99999-9999",
    "endereco": {
      "rua": "Rua Exemplo",
      "numero": "123",
      "cidade": "São Paulo",
      "estado": "SP",
      "cep": "01000-000"
    }
  }
  ```
- `PUT /api/clientes/:id` — atualiza dados e endereço
- `DELETE /api/clientes/:id` — remove

## Dicas e anotações (estilo aula)

- **Sequelize** é o ORM que mapeia JS ⇄ SQL. Cada `define` vira uma tabela.
- `sequelize.sync({ alter: true })` atualiza o schema conforme os models (bom pra dev). Em produção, prefira **migrations**.
- **Associações**:
  - `Produto.belongsTo(Categoria)` cria uma `categoriaId` em `produtos`.
  - `Cliente.hasOne(Endereco)` cria uma `clienteId` em `enderecos`.
- **Estrutura**:
  - `controllers` = regras de negócio (chamam o ORM e montam resposta).
  - `routes` = só roteamento, sem lógica.
  - `middlewares` = tratamento 404/erros/segurança.

- **Próximos passos V2**:
  - Adicionar **autenticação JWT** (reutilizando a tabela `users`).
  - Criar **migrations** com `sequelize-cli`.
  - Implementar paginação/filtros nos GETs.


