### Tarefa Grupo 005: Git Exercícios - 28/04/2023.

Responda as questões abaixo (exercite os comandos do git correspondentes). Lembre-se de que o “interessante” não é exatamente o conjunto de respostas, mas o processo de obtê-las e a experiência obtida com a execução dos comandos.

1. Qual o comando para obter a versão instalada do Git?
   - Para obter a versão instalada do Git, basta executar o comando `git --version`.
2. Qual o efeito da execução de cada um dos comandos abaixo?
   1. git help
      - exibe uma lista dos comandos do Git, com opções para obter mais informações sobre um comando específico
   2. git help checkout
      - exibe informações sobre o comando checkout, que permite mover entre diferentes ramos e estados de um repositório Git
   3. git help merge
      - exibe informações sobre o comando merge, que permite combinar alterações de diferentes ramos de um repositório Git
   4. git init
      - cria um novo repositório Git vazio no diretório atual
   5. git add --all
      - adiciona todas as mudanças feitas no diretório atual e seus subdiretórios ao índice (staging area)
   6. git add -u
      - adiciona todas as mudanças feitas nos arquivos já existentes (não novos arquivos) do diretório atual e seus subdiretórios ao índice
   7. git config -l
      - exibe a lista de configurações definidas para o Git no sistema atual
   8. git mv a.txt b.txt
      - renomeia o arquivo `a.txt` para `b.txt` no repositório Git
   9. git reset --hard
      - descarta todas as mudanças feitas desde o último commit, incluindo as alterações nos arquivos rastreados
   10. git log -27
       - exibe as últimas 27 entradas do log do Git, mostrando informações sobre os commits realizados
3. O fluxo “clássico” de interação com o Git é algo como “alterar um ou mais arquivos”, “acrescentar essas mudanças para serem contemplados no próximo commit” e, finalmente, executar um “commit”. Quais os comandos necessários para realizar os dois últimos “passos” desse fluxo?
   - Para adicionar as mudanças ao índice, utilizamos o comando `git add`, seguido do nome dos arquivos ou diretórios que foram alterados. Para realizar o commit, utilizamos o comando `git commit`, que abrirá um editor de texto para escrevermos uma mensagem de commit.
4. Qual o comando deve ser executado para identificar o que foi alterado desde o último “commit”?
   - Para identificar o que foi alterado desde o último commit, utilizamos o comando `git diff`. Se quisermos ver apenas os arquivos modificados e adicionados ao índice, podemos utilizar o comando `git diff --cached`.
5. Em um dado repositório, arquivos simplesmente copiados para lá, ou seja, _untracked_, podem ser exibidos/identificados com que comando?
   - Para exibir os arquivos untracked, ou seja, que não foram adicionados ao repositório Git, podemos utilizar o comando `git status`.
6. Qual o comando para efetuar um _commit_?
   - Para efetuar um commit, utilizamos o comando `git commit -m "mensagem do commit"`. É importante ter adicionado as mudanças ao índice previamente, utilizando o comando `git add`.
7. Qual o comando que devemos empregar para descartar mudanças ocorridas no arquivo teste.txt, por exemplo?
   - Para descartar as mudanças ocorridas em um arquivo específico, podemos utilizar o comando `git checkout -- teste.txt`.
8. O que deve ser feito para que um determinado diretório do seu repositório seja ignorado pelo Git? Faça uma busca por **.gitignore**.
   - Para ignorar um diretório ou arquivo pelo Git, é necessário criar um arquivo chamado `.gitignore` no diretório raiz do repositório, com o nome dos diretórios e/ou arquivos que devem ser ignorados. Por exemplo, para ignorar o diretório `node_modules`, adicionamos a linha `node_modules/` no arquivo `.gitignore`.
9. O que acontece se o seu repositório local for acidentalmente removido?

   - Se o repositório local for acidentalmente removido, as mudanças locais serão perdidas, a menos que exista um repositório remoto com as mesmas informações. Neste caso, é possível clonar novamente o repositório remoto e retomar o trabalho a partir do último commit conhecido.

10. Como clonar um repositório remoto?

    - Para clonar um repositório git remoto, pode-se usar o comando `git clone {{url_do_repositorio}}` no terminal, onde `{{url_do_repositorio}}` é o endereço do repositório remoto que você deseja clonar.

11. Em alguns cenários **git log** pode produzir extensos resultados. Se houver interesse em visualizar o histórico de um repositório, onde cada mudança é fornecida exatamente em uma única linha, qual o comando que deve ser empregado?

    - Para visualizar o histórico de um repositório onde cada mudança é fornecida em uma única linha, pode-se usar o comando `git log --oneline`.

12. Em qual arquivo o Git armazena informações de configuração empregadas por usuário?

    - As informações de configuração empregadas pelo usuário são armazenadas no arquivo `.gitconfig`.

13. Qual o comando para criar um repositório local?

    - Para criar um repositório local, pode-se usar o comando `git init` no diretório que deseja fazer um repositório Git.

14. Qual o nome do diretório criado pelo Git quando se executa o comando **git init**?

    - O nome do diretório criado pelo Git quando se executa o comando `git init` é `.git`.

15. Qual o comando para adicionar todos os arquivos modificados? (Aqueles para os quais **git status** identificam como **modified**?)

    - Para adicionar todos os arquivos modificados ao índice, pode-se usar o comando `git add -u`.

16. O Git faz uso do valor de hash conhecido por SHA1. O que isto significa? Qual o propósito? O que é SHA1?

    - O Git faz uso do valor de hash conhecido por SHA1, que é um algoritmo de criptografia que gera um identificador único para cada objeto Git. O propósito é garantir que cada objeto no repositório possua um identificador único e que a integridade do repositório seja verificada.

17. Qual a palavra para indicar o último _commit_ em vez do valor de hash SHA1 correspondente?

    - A palavra para indicar o último commit é `HEAD`.

18. Quando se cria dois arquivos usando um editor de texto qualquer e, na sequência, executamos o comando **git add -u**, os dois arquivos criados passam de _untracked_ para _new file_?

19. Qual o efeito da execução dos dois comandos abaixo, nesta ordem, em um dado repositório?
    **git reset --soft HEAD~1**
    **git reset --hard**
20. Após o emprego de um ambiente integrado de desenvolvimento (IDE), é comum a criação de arquivos e diretórios. Qual o comando que podemos empregar para remover arquivos e diretórios _untracked_?
21. Qual o nome do arquivo no qual podemos inserir a indicação para o Git de arquivos e diretórios a serem ignorados?
22. Quando se cria o arquivo _MinhaClasse.class_ em um dado diretório e desejamos que arquivos com a extensão .class, como neste caso, sejam ignorados por todos os membros de uma equipe que estão contribuindo com um dado projeto, como devemos proceder?
23. jQuery é uma famosa biblioteca em JavaScript. Consulte detalhes em [jQuery](http://jquery.com). O repositório correspondente encontra-se em [gitRep](https://github.com/jquery/jquery.git). Faça o clone deste repositório.
24. No repositório **jqueryrepo**, criado no passo anterior, qual o efeito do comando
    **git shortlog -sne**?
25. No repositório **jqueryrepo**, qual o efeito de **git remote -v**?
26. Um repositório Git pode ser etiquetado ao longo do tempo. Ou seja, _commits_ específicos podem ser “marcados” ou “etiquetados” para facilitar referências posteriores. Para listar todas as “etiquetas” (_tags_) estabelecidas para um dado repositório, qual comando deve ser executado?
    - O comando git tag é usado para exibir todas as tags instaladas no repositório.
27. Caso um dado repositório retorne muitas “marcas” ou “etiquetas” para o comando **git tag**, como retornar apenas aquelas que atendem a determinado padrão, por exemplo, iniciadas por 2.0?
    - Para retornar apenas tags começando com 2.0, é só usar o comando ` git tag -l "2.0 *" `.
28. Qual o efeito do comando **git tag -a 3.4-gold -m “minha versão ouro”**?
    - O comando git tag -a 3. 4-gold -m "minha versão gold" cria uma nova tag chamada "3. 4-gold" e acrescenta uma descrição de "minha versão gold".
29. Após executado o comando acima, qual o efeito de **git show 3.4-gold**?
    - O comando ` git concerto musical 3. 4-gold ` mostrará informações sobre o último commit na ramificação 3. 4-gold, segurando mensagem de commit, autor, data e momento e mudanças no arquivo.
30. O que o comando **git push origin 3.4-gold** teria como efeito?
    - O comando "git push origin 3. 4-gold" envia todos os commits do branch 3. 4-gold local para o branch remoto de mesmo nome (3. 4-gold) no repositório "origin" remoto. Se a ramificação remota ainda não existir O comando criará uma nova ramificação.
31. Após executar um commit, qual o efeito de **git commit --amend**?
    - O comando ` git commit --amend ` permite que você altere o último commit. Um editor de texto será aberto para que você possa editar a mensagem do commit ou adicionar ou remover arquivos do commit, após salvar as alterações o commit antigo será substituído pelo novo commit.

32. Após executar **git add x.txt**, qual o efeito de **git reset HEAD x.txt**?
    - O comando "git reset HEAD x.txt" remove o arquivo "x.txt" da área de teste (ou índice), mas mantém as alterações no arquivo. 
33. Após alterar o conteúdo de um arquivo committed em passo anterior, qual o efeito do comando **git checkout -- a.txt**?
    - O comando `git checkout -- a.txt` descarta todas as alterações feitas no arquivo `a.txt` no diretório de trabalho e o retorna ao estado do último commit.
34. Qual a diferença entre os comandos **git reset HEAD a.txt** e **git checkout -- a.txt**?
    - A principal diferença entre `git reset HEAD a.txt` e `git checkout -- a.txt` é o efeito que têm na área de stage . O primeiro comando remove o arquivo `a.txt` da área de stage, mas mantém as alterações no arquivo. Já o segundo comando descarta as alterações do arquivo no diretório de trabalho e o retorna ao estado em que estava no último commit.
35. Veja como interpretar o resultado de git diff [aqui](https://medium.com/therobinkim/how-to-read-a-git-diff-6c87a9dc47c5). Execute, em um dos seus projetos, o comando **git diff HEAD~1 HEAD** e certifique-se de que entende o resultado apresentado.
    - O comando git diff HEAD~1 HEAD mostra as difenreças entre o ultimo commit o commit anterior, sendo o primeiro referindo ao ultimo e o HEAD se referindo ao commit atual

INSTRUÇÕES:

1. No seu repositório pessoal, na sua branch, criar a pasta aula05.
2. Commitar este arquivo respondido nesta pasta.
3. A data limite para concluir esta tarefa é dia 01/05/2023, as 23h59min.
