## Tecnologias utilizadas
Api NodeJS backend e como banco de dados o PostgreSQL através do Sequelize. E o instalador de pacotes Yarn.

## Rodando o Projeto
Para rodar o projeto é necessário ter o instalador de pacotes yarn ou npm. Será necessário que você execute alguns comandos em seu terminal ou prompt de comando:


    Dentro da pasta backend do projeto, pelo terminal rode os comandos:

    1º yarn install // vai instalar todas as dependencias necessárias
    2º yarn sequelize db:create // vai criar um database local
    3º yarn sequelize db:migrate // vai criar as migrations(tabelas no banco)
    4º yarn dev // vai iniciar o servidor local