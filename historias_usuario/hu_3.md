<div align=center>
  <img src="./imagens/INFVertical.jpg">
</div>


<div align="center">SEDI - Secretaria de Estado de Desenvolvimento e Inovação</div>
<div align="center">STI - Subsecretaria de Tecnologia da Informação</div>

###### Nome do Sistema: AvalieAqui
###### Estória de Usuário: 3
###### Sprint: 3
###### Nome: Login do Administrador

## Histórico
|**Versão**|  **Data**  |**Alteração no Documento**|   **Autor**  |
|----------|------------|--------------------------|--------------|
|    1.0   | 09/05/2023 |   Criação do documento   | Paulo Victor |

---

**Como:** administrador da plataforma AvalieAqui

**Eu quero:** realizar login na plataforma.

**Para:** acessar os recursos da plataforma.

---

**Cenário 1:** login com sucesso

**Dado:** que eu seja um administrador cadastrado na plataforma AvalieAqui;

**E:** possua o login de administrador e senha válidos

**Quando:** eu acessar a página de login da plataforma;

**E:** informar o meu login e senha corretos;

**E:** clicar sobre o botão de login;

**Então:** o sistema deve autenticar minhas credenciais

**E:** redirecionar-me para a página inicial do painel administrativo.

---

**Cenário 2:** Falha ao realizar login devido a login incorreto

**Dado:** que eu seja um administrador cadastrado na plataforma AvalieAqui;

**Quando:** eu acessar a página de login da plataforma;

**E:** informar um login incorreto;

**E:** informar a senha correta;

**E:** clicar no botão "Entrar";

**Então:** o sistema deve negar meu acesso aos recursos da plataforma

**E:** exibir uma mensagem de erro informando que o login ou senha estão incorretos

---

**Cenário 3:** Falha ao realizar login devido a senha incorreta

**Dado:** que eu seja um administrador cadastrado na plataforma AvalieAqui;

**E:** possua um e-mail e senha válidos

**Quando:** eu acessar a página de login da plataforma;

**E:** informar o e-mail correto;

**E:** informar uma senha incorreta;

**E:** clicar no botão "Entrar";

**Então:** o sistema deve negar meu acesso aos recursos da plataforma

**E:** exibir uma mensagem de erro informando que o e-mail ou senha estão incorretos