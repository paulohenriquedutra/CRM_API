# API CRM

API REST para gerenciamento de usuários em um sistema de CRM.  

🚧 Projeto em desenvolvimento ativo — ainda em evolução e sujeito a mudanças

---
## Deploy

A API será disponibilizada em ambiente de produção em breve para testes.

🔗 Em breve: ...

## Tecnologias

- Node.js
- Express
- PostgreSQL
- bcrypt

---

## Segurança

- Senhas armazenadas com hash utilizando bcrypt
- Uso de variáveis de ambiente (.env) para dados sensíveis
- Estrutura preparada para autenticação (JWT em breve)

---

## Modelagem do Banco de Dados

### Tabela: users

| Campo          | Tipo        | Descrição                      |
|---------------|------------|--------------------------------|
| id            | SERIAL     | Identificador único            |
| name          | TEXT       | Nome do usuário                |
| email         | TEXT       | Email (único)                  |
| password_hash | TEXT       | Senha criptografada (bcrypt)   |
| created_at    | TIMESTAMP  | Data de criação                |

### Exemplo SQL

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
---

## Como rodar o projeto

> É necessário ter um banco PostgreSQL configurado

### 1. Instale as dependências

```
npm install
```
### 2. Configure o banco de dados(local ou em nuvem)

Crie um arquivo .env na raiz do projeto
<br>local:
```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/crm
```
nuvem:
```env
DATABASE_URL=postgres://usuario:senha@host:porta/database
```

### 3. Inicie o servidor
```
npm run start
```
