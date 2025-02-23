# Sistema de Gerenciamento de Estoque

Este é um projeto **full stack** desenvolvido com **Java Spring Boot** no backend e **HTML, CSS e JavaScript** no frontend. A aplicação permite realizar operações **CRUD** dinamicamente pela interface do navegador, enquanto o backend processa e armazena os dados no banco de dados **H2**.

## 🚀 Tecnologias Utilizadas

- **Backend:** Java, Spring Boot, Spring Data JPA, H2 Database
- **Frontend:** HTML, CSS, JavaScript
- **Gerenciamento de Dependências:** Maven

## 📌 Funcionalidades

- Cadastro de produtos com os seguintes campos:
  - Nome
  - Descrição
  - Preço
  - Quantidade em estoque
- Interface dinâmica para operações CRUD
- Persistência dos dados utilizando banco de dados H2
- API RESTful para comunicação entre frontend e backend

## ⚙️ Como Executar o Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/Consoli310/stock-management.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd stock-management
   ```
3. Execute o backend com Maven:
   ```sh
   mvn spring-boot:run
   ```
4. Acesse a interface de gerenciamento de estoque no navegador:
   ```
   http://localhost:8080
   ```

## 🗄️ Banco de Dados

O projeto utiliza o banco de dados **H2**, um banco em memória para testes e desenvolvimento. Para acessar o console do H2:

- URL: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
- Usuário: `sa`
- Senha: (deixe em branco)

## 📌 API RESTful

A API do backend expõe as seguintes rotas para manipulação dos produtos:

- **POST** `/products` - Criar um novo produto
- **GET** `/products` - Listar todos os produtos
- **GET** `/products/{id}` - Buscar um produto pelo ID
- **PUT** `/products/{id}` - Atualizar um produto pelo ID
- **DELETE** `/products/{id}` - Remover um produto pelo ID

