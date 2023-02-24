## API de gerenciamento de usuários

Essa API permite a criação e gerenciamento de usuários, permitindo a criação, listagem, atualização e exclusão de usuários por meio de endpoints REST.
Este projeto consiste em um serviço para criar, atualizar, listar e deletar usuários. O serviço também permite a autenticação de usuários por meio da geração de um token JWT. A autenticação é obrigatória para a utilização das rotas GET /users, GET /users/profile, PATCH /users/:id, DELETE /users/:id e PUT /users/:id/recover.

## Endpoints do Serviço

| Método | Endpoint | Responsabilidade |
| --- | --- |---|
| POST |  /users | Criação de usuários. |
| POST |  /login |  Gera o token JWT. |
| GET |  /users  |  Lista todos os usuários. |
| GET |  /users/profile  |  Retorna os dados do usuário logado  |
| PATCH  | /users/:id  | Atualiza os dados de um usuário. |
| DELETE | /users/:id  | Faz um soft delete do usuário. |
| PUT | /users/:id/recover  | Ativa um usuário que foi inativado. |

## Banco de Dados

O serviço utiliza um banco de dados PostgreSQL com uma tabela users para armazenar os dados das requisições. A tabela users contém as seguintes colunas:

1. id: inteiro, sequencial e chave primária.
2. name: caractere, tamanho máximo de 20 e obrigatório.
3. email: caractere, tamanho máximo de 100, único e obrigatório.
4. password: caractere, tamanho máximo de 120 e obrigatório.
5. admin: booleano, obrigatório e falso por padrão.
6. active: booleano, obrigatório e verdadeiro por padrão.


## Regras do Serviço

Nas rotas POST e PATCH, é necessário serializar os dados de entrada utilizando o zod. Chaves não mapeadas devem ser ignoradas.
Na rota POST /users, as chaves id e active devem ser ignoradas, o próprio serviço deve preencher esses dados.
Na rota PATCH /users, as chaves id, admin e active não podem ser atualizadas, caso enviadas devem ser ignoradas.
A senha não deve ser retornada em todas as rotas do serviço.
