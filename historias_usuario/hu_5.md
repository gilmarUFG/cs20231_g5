<div align=center>
  <img src="./imagens/INFVertical.jpg">
</div>

<div align="center">SEDI - Secretaria de Estado de Desenvolvimento e Inovação</div>
<div align="center">STI - Subsecretaria de Tecnologia da Informação</div>

###### Nome do Sistema: AvalieAqui

###### Estória de Usuário: 5

###### Sprint: 4

###### Nome: Listagem de Produtos

## Histórico

| **Versão** | **Data**   | **Alteração no Documento** | **Autor** |
| ---------- | ---------- | -------------------------- | --------- |
| 1.0        | 08/05/2023 | Criação do documento       | Artur     |

---

**Como:** um usuário do AvalieAqui

**Eu quero:** ver uma lista de todos os produtos cadastrados na plataforma.

**Para:** poder escolher qual produto avaliar.

---

**Cenário 1:** listar produtos com sucesso

**Dado:** que eu esteja logado na plataforma AvalieAqui;

**Quando:** eu acessar a seção de produtos;

**Então:** devo ser capaz de visualizar uma lista com todos os produtos cadastrados;

**E:** essa lista deve conter informações básicas sobre cada produto, como nome, imagem e categoria.

---

**Cenário 2:** falha na listagem de produtos por falta de itens

**Dado:** que eu esteja logado na plataforma AvalieAqui;

**E:** que não haja nenhum produto cadastrado na plataforma;

**Quando:** eu acessar a seção de produtos;

**Então:** devo ser informado de que não há nenhum produto cadastrado na plataforma;

**E:** não devo ver nenhuma lista de produtos.
