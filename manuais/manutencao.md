# Manual de Manutenção do Sistema

## Descrição

Este manual tem o intuito de facilitar o processo de manutenção do Rimor App.

##  Estados dos objetos

No Rimor App os objetos Mapa e Jogador possuem estados.

### Mapa

O mapa no jogo possui os seguintes estados possíveis

Estado|Letra|Descrição
------|----------------------|---------
Incluso|I|Mapa está inativo(Não liberado para o jogo)
Liberado|L|Mapa está liberado para uso dos jogadores. Jogadores ainda não estão jogando.
Ativo|A|Os jogadores estão usando o mapa em uma partida

**Relacionamento com o método *altera_estado()* da classe Mapa**

Parâmetro do método|Estado
-------------------|------
1|Liberado
2|Ativo
3|Incluso

### Jogador

O jogador possui os seguintes estados:

Estado|Letra|Descrição
------|----------------------|---------
Espera|E|O jogador está aguardando a liberação do mapa para jogar.
Desistente|D|O jogador dessitiu do mapa ou da partida.
Ativo|A|O jogador está jogando.
Concluinte|C|O Jogador achou todos os lugares do mapa.  

## Códigos de erros

###  **Mostrados para o usuário**

Código|Erro|Objeto|Tela|
-----|-----|------|----
CS01|Erro de comunicação com o servidor|TODOS|TODAS
CS02|Não consegiui acessar o servidor|TODOS|TODAS
AM01|Falha no cadastro de novo mapa|Mapa|Adicionar Mapa
AM02|Falha no acesso aos dados do servidor|Mapa|Adicionar Mapa
MM01|Falha na obtenção dos mapas do educador|Mapa|Meus Mapas
MPEX01|Falha na exclusão do mapa|Mapa|Meus Mapas
MP01|Erro na obtenção das informações de um mapa específico|Mapa|Gerenciador de Mapa
LE01|Falha login educador|Usuário|Login
LJ01|Falha login jogador|Usuário|Login
PJ01|Erro na obtenção do lugar de início|Mapa|Painel Jogador
PJ02|Erro na obtenção de lugares no mapa|Mapa|Painel Jogador
PJ06|Erro na obtenção da descrição do mapa|Mapa|Painel Jogador
PJ10|Erro na obtenção do próximo lugar após um acerto|Mapa|Painel Jogador

### Descrição detalhada

#### CS01 e CS02

Não foi possível a comunicação. Pode ser problema no servidor Web ou de banco de dados ou não acesso à Internet.

#### PJ01 e PJ02

Falha na comunicação com SGBD na obtenção de dados dos lugares e/ou identificação do mapa.

#### PJ06

Erro no carregamento da descrição do mapa no painel do jogador. Esse erro não afeta a jogabilidade, contudo pode indicar possíveis falhas durante o jogo, pois a identificação do mapa específico pode não estar salva no controlador.

#### PJ10

Falha na comunicação com SGBD na obtenção de dados dos lugares e/ou identificação do mapa. Essa falha refere-se especificamente ao momento após um acerto do jogador.

#### MM01

Erro relacionado a administração do mapa. Pode indicar identificação do mapa corrompida ou erro de acesso de acesso.  
Também pode indicar falha na obtenção na lista de mapas.  
Páginas relacionadas: Meus Mapas e Gerenciador de Mapas.

#### LJ01

Falha no procedimento que verifica a existência do usuário ou mapa informado ou retorno inesperado do Banco de dados.

#### AM01

Falha de conexão com o servidor de banco de dados.

#### AM02

Falha na obtenção de dados do servidor de banco de dados.

#### MPEX01

Falha no servidor de banco de dados(conexão ou procedimentos).

### **Códigos retornados pelas funções PHP**

Todas as funções PHP retornam uma string no formato Json como resposta as solicitações feitas pelos objetos.  
Essa string possui a chave 'ctrl' que contém um número inteiro que indica se a solicitação foi realizada com sucesso ou não conforme mostrado na tabela abaixo:  

|Código|Descrição
|------|---------
|0|Solicitação efetuada com sucesso 
|>= 1|Ocorreu algum erro no processamento da solicitação. Esse erro pode ser de banco de dados ou outros quaisquer.
| -10|Não foi possível criar ou recuperar a sessão.
| -11|Tentou-se acessar um recurso sem realizar o procedimento de login
| -12|Não conseguiu acesso a base de dados.
