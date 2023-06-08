<div align=center>
  <img src="../imagens/INFVertical.jpg">
</div>

<div align="center">SEDI - Secretaria de Estado de Desenvolvimento e Inovação</div>
<div align="center">STI - Subsecretaria de Tecnologia da Informação</div>

###### Nome do Sistema: AvalieAqui

###### Estória de Usuário: 6

###### Sprint: 5

###### Nome: Avaliação de Produto

## Histórico

| **Versão** | **Data**   | **Alteração no Documento** | **Autor** |
| ---------- | ---------- | -------------------------- | --------- |
| 1.0        | 08/05/2023 | Criação do documento       | Artur     |

---

**Como:** usuário da plataforma AvalieAqui

**Eu quero:** avaliar um produto cadastrado na plataforma.

**Para:** compartilhar minha experiência com outros usuários.

---

**Cenário 1:** avaliar produto com sucesso

**Dado:** que eu esteja logado na plataforma AvalieAqui;

**Quando:** eu acessar a página do produto que desejo avaliar;

**E:** informar meu ID de usuário e o ID do produto que desejo avaliar;

**E:** selecionar uma nota de 0 a 5 estrelas para minha avaliação;

**E:** escrever um comentário opcional sobre minha experiência com o produto;

**E:** clicar sobre o botão "enviar avaliação";

**Então:** minha avaliação deve ser registrada no sistema;

**E:** outros usuários devem ser capazes de visualizar minha avaliação na página do produto.

---

**Cenário 2:** falha ao tentar avaliar produto ja avaliado

**Dado:** que eu esteja logado na plataforma AvalieAqui;

**E:** que eu já tenha avaliado o produto que desejo avaliar novamente;

**Quando:** eu tentar acessar a página de avaliação do produto em questão;

**Então:** o sistema deve impedir que eu envie uma nova avaliação para o mesmo produto;

**E:** o sistema deve me informar que já avaliei o produto anteriormente e mostrar uma mensagem de erro;

**E:** não devo ser capaz de selecionar uma nova nota ou escrever um novo comentário para a avaliação.
