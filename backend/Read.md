# SOFSHELF


## Funcionalidades



## Tecnologias Usadas

- Node.js
- Prisma
- Yarn
- Outras tecnologias

## Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- Yarn instalado
- Banco de dados configurado

### Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/
    ```

2. Navegue até a pasta do projeto:

    ```bash
    cd nome-do-repositorio
    ```

3. Instale as dependências:

    ```bash
    yarn install
    ```

### Rodando o servidor

1. Para rodar o servidor localmente, use o seguinte comando:

    ```bash
    yarn dev
    ```

    Isso irá iniciar o servidor e você poderá acessar a aplicação localmente.

### Prisma Studio

Se você estiver utilizando o Prisma Studio e receber um erro relacionado à conexão ou ao localhost, especialmente um erro dizendo que a conexão com o banco de dados falhou, você pode tentar rodar o Prisma Studio na porta específica. Para isso, use o comando abaixo:

```bash
yarn prisma studio --port 5556
