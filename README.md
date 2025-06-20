# SOFSHELF

Sistema de gestão de estoque com controle de movimentações, desenvolvido com Node.js, Prisma e Yarn.

---

## Funcionalidades

- Cadastro de produtos
- Controle de entrada e saída de estoque
- Visualização de movimentações
- Integração com banco de dados relacional
- API RESTful para consumo via frontend ou outros serviços

---

## Tecnologias Usadas

- [Node.js](https://nodejs.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Yarn](https://yarnpkg.com/)
- [Express.js](https://expressjs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [MongoDB](https://www.mongodb.com/)

---

##  Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter os seguintes itens instalados na sua máquina:

- Node.js
- Yarn
- Banco de dados (MongoDB ou PostgreSQL)
- `.env` configurado corretamente

---

### Instalação

1. Clone o repositório:

    ```bash
   git clone https://github.com/jvjfe/Sofshelf
    ```

2. Navegue até a pasta do projeto:

    ```bash
    cd Sofshelf
    ```

3. Instale as dependências:

    ```bash
    yarn install
    ```

---

###  Rodando o Servidor

Para iniciar o servidor localmente:

```bash
yarn dev
````

> Isso iniciará o servidor em modo de desenvolvimento. A aplicação ficará disponível localmente, geralmente em `http://localhost:3000`.

---

###  Acessar o Prisma Studio

Caso queira visualizar ou editar o banco de dados com Prisma Studio:

```bash
yarn prisma studio
```

Se ocorrer erro de conexão (ex: `ECONNREFUSED`, `localhost connection failed`, etc), tente especificar a porta:

```bash
yarn prisma studio --port 5556
```

---

### Configuração do Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte modelo:

```env
# URL de conexão com o banco de dados
DATABASE_URL="mongodb+srv://usuario:senha@servidor/banco"

# Chave secreta para autenticação JWT
JWT_SECRET="sua-chave-secreta"
```

> Nunca suba seu `.env` para o repositório público. Adicione-o ao `.gitignore`.

---
## 👥 Desenvolvido por

- [João Vítor Justino Ferri](https://github.com/jvjfe)
- [João David Petrovich](https://github.com/JDPetrovich)
