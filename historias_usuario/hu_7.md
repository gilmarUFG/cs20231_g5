<div align=center>
  <img src="../imagens/INFVertical.jpg">
</div>


<div align="center">SEDI - Secretaria de Estado de Desenvolvimento e Inovação</div>
<div align="center">STI - Subsecretaria de Tecnologia da Informação</div>

###### Nome do Sistema: AvalieAqui
###### Estória de Usuário: 7
###### Sprint: 5
###### Nome: Vizualizar Média de Avaliação do Produto

## Histórico
|**Versão**|**Data**|**Alteração no Documento**|**Autor**|
|------|----|---------|-----|
| 1.0 | 08/05/2023 | Criação do documento | Filipe |

---

**Como:** um usuário do AvalieAqui

**Eu quero:** visualizar a média das avaliações de um produto específico na plataforma AvalieAqui.

**Para:** poder ter uma ideia geral da qualidade desse produto.

---

**Cenário 1:** visualizar a média das avaliações com sucesso

**Dado:** que eu esteja logado no AvalieAqui;

**E:** que existam avaliações cadastradas para o produto que eu desejo visualizar a média;

**Quando:** eu acessar a página do produto específico;

**Então:** o sistema deve exibir a média das avaliações do produto em forma de estrelas ou pontuação.

---

**Cenário 2:** nenhum avaliação cadastrada

**Dado:** que eu esteja logado no AvalieAqui;

**E:** que não existam avaliações cadastradas para o produto que eu desejo visualizar a média;

**Quando:** eu acessar a página do produto específico;

**Então:** o sistema deve exibir uma mensagem informando que ainda não existem avaliações para o produto.

---

**Cenário 3:** usuário não logado

**Dado:** que eu não esteja logado no AvalieAqui;

**Quando:** eu acessar a página do produto específico;

**Então:** o sistema deve exibir a média das avaliações do produto em forma de estrelas ou pontuação, porém deve mostrar uma mensagem indicando que é necessário fazer login para ver mais informações sobre o produto.

---

**Cenário 4:** produto não encontrado

**Dado:** que eu esteja logado no AvalieAqui;

**E:** que o produto que eu desejo visualizar a média não exista na plataforma;

**Quando:** eu acessar a página do produto específico;

**Então:** o sistema deve exibir uma mensagem informando que o produto não foi encontrado.
