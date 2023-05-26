<div align=center>
  <img src="../imagens/INFVertical.jpg">
</div>


<div align="center">SEDI - Secretaria de Estado de Desenvolvimento e Inovação</div>
<div align="center">STI - Subsecretaria de Tecnologia da Informação</div>

###### Nome do Sistema: AvalieAqui
###### Estória de Usuário: 2
###### Sprint: 3
###### Nome: Login do usuário

## Histórico
|**Versão**|**Data**|**Alteração no Documento**|**Autor**|
|------|----|---------|-----|
| 1.0 | 08/05/2023 | Criação do documento | Henrique |

---

**Como:** um usuário do AvalieAqui

**Eu quero:** realizar login na plataforma, fornecendo meu e-mail e senha.

**Para:** acessar os recursos disponíveis na plataforma.

---

**Cenário 1:** login com sucesso

**Dado:** que eu já tenha cadastro no AvalieAqui;

**Quando:** eu acessar a página de login da plataforma;

**E:** preencher os campos de e-mail e senha corretamente;

**E:** clicar sobre o botão de login;

**Então:** o sistema deve autenticar minhas credenciais e me redirecionar para a página principal da plataforma, permitindo-me acessar seus recursos.

---

**Cenário 2:** falha no login por usuário não cadastrado

**Dado:** que eu não tenha cadastro no AvalieAqui;

**Quando:** eu acessar a página de login da plataforma;

**E:** preencher os campos de e-mail e senha;

**E:** clicar sobre o botão de login;

**Então:** o sistema deve exibir uma mensagem de erro informando que o usuário não está cadastrado.

---

**Cenário 3:** falha no login por e-mail e/ou senha incorretos

**Dado:** que eu já tenha cadastro no AvalieAqui;

**Quando:** eu acessar a página de login da plataforma;

**E:** preencher os campos de e-mail e senha incorretamente;

**E:** clicar sobre o botão de login;

**Então:** o sistema deve exibir uma mensagem de erro informando que o e-mail e/ou senha estão incorretos.