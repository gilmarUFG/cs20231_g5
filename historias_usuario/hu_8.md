<div align=center>
  <img src="./imagens/INFVertical.jpg">
</div>


<div align="center">SEDI - Secretaria de Estado de Desenvolvimento e Inovação</div>
<div align="center">STI - Subsecretaria de Tecnologia da Informação</div>

###### Nome do Sistema: AvalieAqui
###### Estória de Usuário: 8
###### Sprint: 6
###### Nome: Editar dados do Usuário
## Histórico
|**Versão**|**Data**|**Alteração no Documento**|**Autor**|
|------|----|---------|-----|
| 1.0 | 08/05/2023 | Criação do documento | Filipe |

**Como:** um usuário do AvalieAqui

**Eu quero:** poder editar meus dados de usuário (nome, CPF, e-mail e senha)

**Para:** manter meus dados atualizados na plataforma.

---

**Cenário 1:** editar nome e CPF com sucesso

**Dado:** que eu já esteja logado no AvalieAqui;

**Quando:** eu acessar a página de perfil;

**E:** editar meu nome e CPF;

**E:** clicar sobre o botão de salvar;

**Então:** o sistema deve atualizar meus dados de usuário e exibir uma mensagem de sucesso.

---

**Cenário 2:** editar e-mail com sucesso

**Dado:** que eu já esteja logado no AvalieAqui;

**Quando:** eu acessar a página de perfil;

**E:** editar meu e-mail;

**E:** clicar sobre o botão de salvar;

**Então:** o sistema deve enviar um e-mail de confirmação para o novo endereço de e-mail e atualizar meus dados de usuário após confirmação.

---

**Cenário 3:** editar senha com sucesso

**Dado:** que eu já esteja logado no AvalieAqui;

**Quando:** eu acessar a página de perfil;

**E:** editar minha senha;

**E:** clicar sobre o botão de salvar;

**Então:** o sistema deve atualizar minha senha e exibir uma mensagem de sucesso.

---

**Cenário 4:** tentativa de editar com dados inválidos

**Dado:** que eu já esteja logado no AvalieAqui;

**Quando:** eu acessar a página de perfil;

**E:** tentar editar meus dados com informações inválidas;

**E:** clicar sobre o botão de salvar;

**Então:** o sistema deve exibir uma mensagem de erro informando que há dados inválidos e impedir a atualização dos dados de usuário.
