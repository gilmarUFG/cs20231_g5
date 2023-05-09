<div align="center">SEDI - Secretaria de Estado de Desenvolvimento e Inovação</div>
<div align="center">STI - Subsecretaria de Tecnologia da Informação</div>

###### Nome do Sistema: AvalieAqui
###### Estória de Usuário: 9
###### Sprint: 6
###### Nome: Editar Informações de um Produto

## Histórico
|**Versão**|**Data**|**Alteração no Documento**|**Autor**|
|------|----|---------|-----|
| 1.0 | 08/05/2023 | Criação do documento | Alany |

**Como:** um administrador do AvalieAqui

**Eu quero:** editar as informações de um produto já cadastrado

**Para:** manter as informações dos produtos atualizadas na plataforma

---

**Cenário 1:** editar informações do produto com sucesso

**Dado:** que eu esteja logado na plataforma como administrador;

**E:** a página de gerenciamento de produtos esteja carregada;

**Quando:** eu selecionar o produto que desejo editar;

**E:** alterar suas informações, como nome, descrição ou categoria;

**E:** clicar sobre o botão de salvar;

**Então:** o sistema deve salvar as informações atualizadas do produto e redirecionar-me para a página de listagem de produtos.

---

**Cenário 2:** editar informações do produto com campos inválidos

**Dado:** que eu esteja logado na plataforma como administrador;

**E:** a página de gerenciamento de produtos esteja carregada;

**Quando:** eu selecionar o produto que desejo editar;

**E:** tentar alterar suas informações com campos inválidos, como um nome em branco;

**E:** clicar sobre o botão de salvar;

**Então:** o sistema deve apresentar uma mensagem de erro informando que há campos inválidos e não deve salvar as informações atualizadas do produto.

---

**Cenário 3:** editar informações do produto com usuário não autorizado

**Dado:** que eu esteja logado na plataforma como um usuário comum;

**E:** a página de gerenciamento de produtos esteja carregada;

**Quando:** eu tentar acessar a página de edição de um produto;

**Então:** o sistema deve apresentar uma mensagem de erro informando que não tenho permissão para acessar essa página.

---

**Cenário 4:** editar informações de um produto inexistente

**Dado:** que eu esteja logado na plataforma como administrador;

**E:** a página de gerenciamento de produtos esteja carregada;

**Quando:** eu tentar selecionar um produto que não existe;

**Então:** o sistema deve apresentar uma mensagem de erro informando que o produto não foi encontrado.
