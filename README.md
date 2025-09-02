<<<<<<< HEAD

# FIPE API - Guia Completo de Testes Locais

## 1. Configuração do .env

### Para XAMPP (local)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fipe
DB_USERNAME=root
DB_PASSWORD=root # se não tiver senha, deixar vazio
QUEUE_CONNECTION=sqs
SQS_KEY=test
SQS_SECRET=test
SQS_REGION=us-east-2
SQS_PREFIX=http://localhost:4566/000000000000
SQS_QUEUE=fipemarcas
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_DEFAULT_REGION=us-east-2

### Para Docker
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=fipe
DB_USERNAME=root
DB_PASSWORD=root
QUEUE_CONNECTION=sqs
SQS_KEY=test
SQS_SECRET=test
SQS_REGION=us-east-2
SQS_PREFIX=http://localstack:4566/000000000000
SQS_QUEUE=fipemarcas
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_DEFAULT_REGION=us-east-2

> Obs: Use db e localstack como host dentro do Docker para resolver os serviços corretamente.

## 2. Rodar Laravel local (XAMPP)

Abrir terminal no projeto:
cd c:\xampp\htdocs\fipe-api
php artisan serve

O Laravel vai rodar em: http://127.0.0.1:8000

Migrar banco de dados e rodar seeds:
php artisan migrate
php artisan db:seed

## 3. Rodar Laravel dentro do Docker

Subir containers:
docker-compose up -d

Verificar se estão ativos:
docker-compose ps

Rodar servidor Laravel dentro do container app:
docker-compose exec app php artisan serve --host=0.0.0.0 --port=8000

Migrar banco e seeds dentro do container:
docker-compose exec app php artisan migrate
docker-compose exec app php artisan db:seed

Acessar a API pelo Postman via: http://localhost:8000

## 4. Testar endpoints no Postman

Exemplos de endpoints FIPE API:

- GET /marcas
http://127.0.0.1:8000/marcas

- GET /modelos/{marca_id}
http://127.0.0.1:8000/modelos/1

- GET /anos/{modelo_id}
http://127.0.0.1:8000/anos/5

- GET /valor/{ano_id}
http://127.0.0.1:8000/valor/12

- POST para fila (se houver)
POST http://127.0.0.1:8000/fila
Content-Type: application/json

{
  "mensagem": "Olá Jarvis, testando a fila!"
}

## 5. Testar filas SQS/LocalStack

Rodar worker do Laravel:
php artisan queue:work sqs

Disparar jobs via endpoints ou Tinker:
\App\Jobs\TestSqsJob::dispatch('Mensagem de teste');

Conferir logs em storage/logs/laravel.log:
[2025-08-30 15:45:12] local.INFO: SQS Test Job executado: Mensagem de teste

## 6. Dicas adicionais

- Para teste rápido de API, criar endpoint /teste:
Route::get('/teste', function() {
    return response()->json(['status'=>'ok','time'=>now()]);
});

- Limpar cache/config do Laravel quando mudar .env:
php artisan config:clear
php artisan cache:clear

- Certifique-se que o pacote AWS SDK está instalado:
composer require aws/aws-sdk-php

Este documento cobre todo o fluxo de configuração, execução e teste do projeto FIPE API, tanto localmente no XAMPP quanto via Docker com LocalStack/SQS.
=======
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


>>>>>>> 6ef2afec9b21130749b45382ac3b2cc3d7ca440b
