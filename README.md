
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
