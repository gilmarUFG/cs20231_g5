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

1. **RF001 - Cadastro de Usuário**: permite que um usuário se cadastre na plataforma para avaliar os produtos. Os dados necessários para o cadastro são nome, e-mail e senha.
2. **RF002 - Cadastro de Produto**: permite que um administrador cadastre um produto na plataforma para ser avaliado pelos usuários. Os dados necessários para o cadastro são nome do produto, descrição, categoria e preço.
3. **RF003 - Listagem de Produtos**: permite que os usuários visualizem uma lista de todos os produtos cadastrados na plataforma.
4. **RF004 - Avaliação de Produto**: permite que os usuários avaliem os produtos cadastrados na plataforma. Os dados necessários para a avaliação são o ID do usuário, o ID do produto e a nota (de 6 a 5 estrelas).
5. **RF005 - Média de Avaliações de Produto**: permite que os usuários visualizem a média das avaliações de um produto cadastrado na plataforma.

### Requisitos Não Funcionais

1. **RNF001 - Segurança**: a plataforma AvalieAqui deve garantir a segurança das informações dos usuários e dos produtos cadastrados, bem como a privacidade das avaliações realizadas pelos usuários.>
2. **RNF002 - <Performance**: a plataforma AvalieAqui deve ter uma boa performance, garantindo que os usuários possam acessar e utilizar a plataforma de forma rápida e eficiente, mesmo em momentos de pico de acesso.
3. **RNF003 - Escalabilidade**: a plataforma AvalieAqui deve ser escalável, permitindo que possa suportar um grande número de usuários e produtos cadastrados sem comprometer a sua performance.
4. **RNF004 - <Usabilidade**: a plataforma AvalieAqui deve ser fácil de usar e intuitiva para os usuários, permitindo que possam realizar as suas avaliações de forma rápida e eficiente.
5. **RNF005 - Disponibilidade**: a plataforma AvalieAqui deve estar disponível para acesso dos usuários durante a maior parte do tempo, visando garantir que as avaliações possam ser realizadas a qualquer momento. Para isso, deve ter um bom tempo de atividade (uptime) e um sistema de backup e recuperação de dados eficiente em caso de falhas.

### Regras de Negócio

1. RN01 - Usuários não podem avaliar o mesmo produto mais de uma vez: o sistema deve validar se o usuário já avaliou o produto antes de permitir que ele faça uma nova avaliação.
2. RN02 - Usuários precisam estar logados para avaliar um produto: o sistema deve exigir que o usuário faça login antes de permitir que ele faça uma avaliação.
3. RN03 - O usuário só pode criar e ter uma única conta no sistema de avaliação de produtos (validar pelo CPF e e-mail).

### Tecnologia de _Front-end_
A tecnologia utilizada no front-end será VueJS com NuxtJS, utilizando javascript

### Tecnologia de _Back-end_
Nodejs com o framework NestJs, utilizando typescript

### Tecnologia de Persistência de Dados
Banco de dados PostgreSQL

### Local do _Deploy_
O deploy será feito em uma instância Amazon EC2, um serviço AWS

### Cronograma de Desenvolvimento

| Iteração | Tarefa                            | Data Início | Data Fim   | Responsável  | Situação   |
| -------- | --------------------------------- | ----------- | ---------- | ------------ | ---------- |
| 1        | Especificar História de Usuário 1 | 02/05/2023  | 03/05/2023 | Paulo Victor | Programada |
