<div align=center>
  <img src="./imagens/INFVertical.jpg">
</div>


<div align="center">SEDI - Secretaria de Estado de Desenvolvimento e Inovação</div>
<div align="center">STI - Subsecretaria de Tecnologia da Informação</div>

###### Nome do Sistema: AvalieAqui
###### Estória de Usuário: 3
###### Sprint: 3
###### Nome: Cadastro de novo produto na plataforma

## Histórico
|**Versão**|  **Data**  |**Alteração no Documento**|   **Autor**  |
|----------|------------|--------------------------|--------------|
|    1.0   | 09/05/2023 |   Criação do documento   | Paulo Victor |

---

**Como:** administrador da plataforma AvalieAqui

**Eu quero:** cadastrar um novo produto na plataforma

**Para:** permitir que ele possa ser avaliado pelos demais usuários.

---

**Cenário 1:** Cadastro de produto com sucesso

**Dado:** que eu seja um administrador autenticado na plataforma AvalieAqui;

**E:** esteja na página de cadastro de produtos;

**Quando:** eu preencher o nome, descrição e categoria do produto corretamente;

**E:** clicar no botão "Cadastrar Produto";

**Então:** o sistema deve salvar o novo produto na plataforma

**E:** exibir uma mensagem de sucesso informando que o produto foi cadastrado.

---

**Cenário 2:** Falha ao cadastrar produto devido a campos obrigatórios não preenchidos

**Dado:** que eu seja um administrador autenticado na plataforma AvalieAqui;

**E:** esteja na página de cadastro de produtos;

**Quando:** eu deixar algum campo obrigatório (nome, descrição ou categoria) em branco;

**E:** clicar no botão "Cadastrar Produto";

**Então:** o sistema deve negar o cadastro do produto

**E:** exibir uma mensagem de erro informando que todos os campos obrigatórios devem ser preenchidos.

---

**Cenário 3:** Falha ao cadastrar produto devido a nome de produto já existente

**Dado:** que eu seja um administrador autenticado na plataforma AvalieAqui;

**E:** esteja na página de cadastro de produtos;

**E:** já exista um produto cadastrado com o mesmo nome;

**Quando:** eu preencher o nome, descrição e categoria do produto com informações válidas;

**E:** o nome do produto for igual ao de um produto já cadastrado;

**E:** clicar no botão "Cadastrar Produto";

**Então:** o sistema deve negar o cadastro do produto

**E:** exibir uma mensagem de erro informando que já existe um produto com o mesmo nome cadastrado na plataforma.