### cs_20235

Repositório definido para a manutenção do controle de versão dos artefatos do projeto de construção de uma API Rest para:

A API REST AvalieAqui permite o cadastro de usuários e produtos, bem como a avaliação de produtos cadastrados pelos usuários. Para realizar o cadastro de usuário, são solicitados os dados de nome, CPF, e-mail e senha. Já para cadastrar um produto, são necessários o nome do produto, descrição e categoria. A listagem de produtos cadastrados pode ser acessada pelos usuários, assim como a avaliação de um produto, que requer o ID do usuário, o ID do produto e uma nota de 0 a 5 estrelas. A média das avaliações de um produto também pode ser consultada pelos usuários. A plataforma AvalieAqui possui algumas regras de negócio, como a validação de que um usuário não pode avaliar o mesmo produto mais de uma vez, a exigência de login para avaliação de produto e a restrição de criação de apenas uma conta por usuário. Essas regras visam garantir a veracidade e integridade das avaliações realizadas pelos usuários na plataforma AvalieAqui.

### Grupo

Esta API será construída pelos componentes do grupo 5:

| Matrícula | Nome                             | Usuário Git                                           |
| --------- | -------------------------------- | ----------------------------------------------------- |
| 202105018 | Alany Gabriely Lourenço da Silva | [AlanyLourenco](https://github.com/AlanyLourenco)     |
| 201905524 | Artur Rocha Lapot                | [Lapot300](https://github.com/Lapot300)               |
| 202105029 | Filipe Duarte Rocha Paço         | [FilipePaco](https://github.com/FilipePaco)           |
| 201905533 | Henrique Martins Costa           | [StokerBR](https://github.com/StokerBR)               |
| 201711025 | Paulo Victor de Castro Reis      | [pauloviictorUFG](https://github.com/pauloviictorUFG) |

### Requisitos Funcionais

1. RF001 - <descrever>
2. RF002 - <descrever>
3. RF003 - <descrever>
4. RF004 - <descrever>
5. RF005 - <descrever>

### Requisitos Não Funcionais

<Descrever os requisitos não funcionais identificados no mesmo modelo da descrição dos requisitos funcionais>

### Regras de Negócio
<<<<<<< HEAD
1. RN01 - Usuários não podem avaliar o mesmo produto mais de uma vez: o sistema deve validar se o usuário já avaliou o produto antes de permitir que ele faça uma nova avaliação.
2. RN02 - Usuários precisam estar logados para avaliar um produto: o sistema deve exigir que o usuário faça login antes de permitir que ele faça uma avaliação.
3. RN03 - O usuário só pode criar e ter uma única conta no sistema de avaliação de produtos (validar pelo CPF e e-mail).

### Tecnologia de _Front-end_
A tecnologia utilizada no front-end será VueJS com NuxtJS, utilizando javascript
=======

1. RN01 - <descrever>
2. RN02 - <descrever>

<Adicionar outras regras, se existirem.>

### Tecnologia de _Front-end_

<Descrever a tecnologia que será utilizada no _front-end_.>
>>>>>>> c74c1d91fceef252801fe8839e8e54178ffd50a1

### Tecnologia de _Back-end_

Nodejs com o framework NestJs, utilizando typescript

### Tecnologia de Persistência de Dados

Banco de dados PostgreSQL

### Local do _Deploy_
<<<<<<< HEAD
O deploy será feito em uma instância Amazon EC2, um serviço AWS
=======

<Descrever onde será feito o _deploy_ da API.>
>>>>>>> c74c1d91fceef252801fe8839e8e54178ffd50a1

### Cronograma de Desenvolvimento

| Iteração | Tarefa                            | Data Início | Data Fim   | Responsável  | Situação   |
| -------- | --------------------------------- | ----------- | ---------- | ------------ | ---------- |
| 1        | Especificar História de Usuário 1 | 02/05/2023  | 03/05/2023 | Paulo Victor | Programada |
