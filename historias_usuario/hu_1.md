<div align=center>
  <img src="./imagens/INFVertical.jpg">
</div>


<div align="center">SEDI - Secretaria de Estado de Desenvolvimento e Inovação</div>
<div align="center">STI - Subsecretaria de Tecnologia da Informação</div>

###### Nome do Sistema: AvalieAqui
###### Estória de Usuário: 1
###### Sprint: 3
###### Nome: Cadastro do usuário

## Histórico
|**Versão**|**Data**|**Alteração no Documento**|**Autor**|
|------|----|---------|-----|
| 1.0 | 08/05/2023 | Criação do documento | Henrique |

---

**Como:** um usuário do AvalieAqui

**Eu quero:** me cadastrar na plataforma, fornecendo meu nome, CPF, e-mail e senha.

**Para:** poder fazer login na plataforma e utilizar seus recursos.

---

**Cenário 1:** cadastra o usuário com sucesso

**Dado:** que eu ainda não tenha cadastro no AvalieAqui;

**Quando:** eu acessar a página de registro da plataforma;

**E:** preencher os campos de nome, CPF, e-mail e senha;

**E:** clicar sobre o botão de registro;

**Então:** o sistema deve armazenar meus dados de registro e redirecionar-me para a página de login.

---

**Cenário 2:** falha no cadastro do usuário por e-mail já cadastrado

**Dado:** que o e-mail que eu informei já esteja cadastrado no AvalieAqui;

**Quando:** eu acessar a página de registro da plataforma;

**E:** preencher os campos de nome, CPF, e-mail e senha;

**E:** clicar sobre o botão de registro;

**Então:** o sistema deve exibir uma mensagem de erro informando que o e-mail já está cadastrado;

---

**Cenário 3:** falha no cadastro do usuário por CPF já cadastrado

**Dado:** que o CPF que eu informei já esteja cadastrado no AvalieAqui;

**Quando:** eu acessar a página de registro da plataforma;

**E:** preencher os campos de nome, CPF, e-mail e senha;

**E:** clicar sobre o botão de registro;

**Então:** o sistema deve exibir uma mensagem de erro informando que o CPF já está cadastrado;

---

**Cenário 4:** falha no cadastro do usuário por não preencher campos obrigatórios

**Quando:** eu acessar a página de registro da plataforma;

**E:** preencher parcialmente os campos, ou nenhum deles;

**E:** clicar sobre o botão de registro;

**Então:** o sistema deve exibir uma mensagem de erro informando que os campos obrigatórios não foram preenchidos;