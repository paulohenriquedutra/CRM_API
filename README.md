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

---

### Tabela: clients

| Campo       | Tipo        | Descrição                      |
|------------|------------|--------------------------------|
| id         | SERIAL     | Identificador único            |
| name       | TEXT       | Nome do cliente                |
| email      | TEXT       | Email do cliente (opcional)    |
| phone      | TEXT       | Telefone                       |
| company    | TEXT       | Empresa                        |
| created_at | TIMESTAMP  | Data de criação                |

---

### Tabela: leads

| Campo       | Tipo        | Descrição                      |
|------------|------------|--------------------------------|
| id         | SERIAL     | Identificador único            |
| name       | TEXT       | Nome do lead                   |
| email      | TEXT       | Email do lead                  |
| phone      | TEXT       | Telefone                       |
| status     | TEXT       | Status (new, contacted, lost, converted) |
| source     | TEXT       | Origem do lead                 |
| created_at | TIMESTAMP  | Data de criação                |

---

### Tabela: tasks

| Campo       | Tipo        | Descrição                      |
|------------|------------|--------------------------------|
| id         | SERIAL     | Identificador único            |
| user_id    | INT        | Usuário responsável            |
| client_id  | INT        | Cliente relacionado            |
| title      | TEXT       | Título da tarefa              |
| description| TEXT       | Descrição da tarefa           |
| status     | TEXT       | Status (pending, done)        |
| due_date   | TIMESTAMP  | Data de vencimento            |
| created_at | TIMESTAMP  | Data de criação               |

---

### Tabela: interactions

| Campo       | Tipo        | Descrição                      |
|------------|------------|--------------------------------|
| id         | SERIAL     | Identificador único            |
| client_id  | INT        | Cliente relacionado            |
| user_id    | INT        | Usuário responsável           |
| type       | TEXT       | Tipo (call, email, meeting)    |
| note       | TEXT       | Observação                    |
| created_at | TIMESTAMP  | Data da interação             |

---

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'new',
  source TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INT,
  client_id INT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE interactions (
  id SERIAL PRIMARY KEY,
  client_id INT,
  user_id INT,
  type TEXT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```


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
