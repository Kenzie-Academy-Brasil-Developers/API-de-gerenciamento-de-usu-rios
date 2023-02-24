<<<<<<< HEAD
API de gerenciamento de usuários

Este projeto consiste em um serviço para criar, atualizar, listar e deletar usuários. O serviço também permite a autenticação de usuários por meio da geração de um token JWT. A autenticação é obrigatória para a utilização das rotas GET /users, GET /users/profile, PATCH /users/:id, DELETE /users/:id e PUT /users/:id/recover.
=======
## API de gerenciamento de usuários


Essa API permite a criação e gerenciamento de usuários, permitindo a criação, listagem, atualização e exclusão de usuários por meio de endpoints REST.
Este projeto consiste em um serviço para criar, atualizar, listar e deletar usuários. O serviço também permite a autenticação de usuários por meio da geração de um token JWT. A autenticação é obrigatória para a utilização das rotas GET /users, GET /users/profile, PATCH /users/:id, DELETE /users/:id e PUT /users/:id/recover.

## Endpoints do Serviço


| Método | Endpoint | Responsabilidade |
| --- | --- |---|
| Método | Endpoint | Responsabilidade |
| Método | Endpoint | Responsabilidade |
| Método | Endpoint | Responsabilidade |
| Método | Endpoint | Responsabilidade |
| Método | Endpoint | Responsabilidade |
| Método | Endpoint | Responsabilidade |
>>>>>>> 8a0fcff1d80a01b4478af394c5a15a8c6a78091b

Endpoints do Serviço
Método Endpoint Responsabilidade
POST /users Criação de usuários.
POST /login Gera o token JWT.
GET /users Lista todos os usuários.
GET /users/profile Retorna os dados do usuário logado.
PATCH /users/:id Atualiza os dados de um usuário.
DELETE /users/:id Faz um soft delete do usuário.
PUT /users/:id/recover Ativa um usuário que foi inativado.
Requisitos do Serviço
Banco de dados
Deve ser criado um banco de dados em PostgreSQL com uma tabela de usuários para armazenar os dados das requisições. A tabela de usuários deve ter as colunas necessárias para armazenar os seguintes dados:

id: inteiro, sequencial e chave primária.
name: caractere, tamanho máximo de 20 e obrigatório.
email: caractere, tamanho máximo de 100, único e obrigatório.
password: caractere, tamanho máximo de 120 e obrigatório.
admin: booleano, obrigatório e falso por padrão.
active: booleano, obrigatório e verdadeiro por padrão.
Regras
Nas rotas POST e PATCH, é necessário serializar os dados de entrada utilizando o zod. Chaves não mapeadas devem ser ignoradas.
Na rota POST /users, as chaves id e active devem ser ignoradas, o próprio serviço deve preencher esses dados.
Na rota PATCH /users, as chaves id, admin e active não podem ser atualizadas, caso enviadas devem ser ignoradas.
A senha não deve ser retornada em todas as rotas do serviço.
Casos de Erro
E-mail já registrado
O e-mail deve ser único. Nas rotas POST e PATCH /users, caso seja enviado um e-mail já registrado, deve retornar a mensagem de erro abaixo. O status code deve ser o mencionado abaixo.

Status Code: 409 CONFLICT.

json
Copy code
{
  "message": "E-mail already registered"
}
Dados de entrada inválidos
A serialização dos dados de entrada deve ser feita utilizando o zod. Essa serialização deve acontecer em todas as rotas POST e PATCH. Caso de erro ao validar os dados a mensagem retornada deve seguir o seguinte padrão mostrado abaixo. O status code deve ser o mencionado abaixo.

Status Code: 400 BAD REQUEST.

json
Copy code
{
  "name": [ "Required" ],
  "email": [ "Invalid email" ],
  "password": [ "Expected string, received number" ]
}
Token JWT inválido ou inexistente
As rotas GET, PATCH, DELETE e PUT devem estar protegidas por um middleware de validação do token JWT. Caso o token não seja enviado, deve retornar a mensagem de erro abaixo. Caso de um erro na decodificação do token JWT, deve retornar a mensagem de erro padrão da biblioteca. O status code de ambos casos deve ser o mencionado abaixo.

Status Code: 401 UNAUTHORIZED.

json
Copy code
{
  "message": "Missing Bearer Token"
}
