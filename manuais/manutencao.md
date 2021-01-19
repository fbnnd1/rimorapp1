# Manual de Manutenção do Sistema

## Descrição

Este manual tem o intuito de facilitar o processo de manutenção do Rimor App. O documento descreve algumas características do sistema para auxiliar a implementação de ações de manutenção e/ou correção de erros.

## Fluxos de Informações

Conforme descrito no Readme, o sistema possui arquitetura em camadas, sendo que cada camada troca dados apenas com as camadas adjacentes conforme ilustrado na figura abaixo:

![Arquitetura do sistema](../img/modelos/arq-sist.jpg)

Para facilitar a compreensão e possíveis manutenções no sistema relacionadas a esses fluxos, a seguir serão mostradas tabelas relacionando os métodos disparados pelos objetos das classes com as páginas que os usuários interagem mais os arquivos PHP mais as ações executadas pelo banco de dados.

### Páginas para o Educador

#### **index**

Classe|Método da Classe|Arquivo PHP|Procedure ou Consulta do BD
------|----------------|-----------|---------------------------
Educador|efetua_login()|fl1.php|CALL login_educador(:login, :senha, @status);
Educador|checa_cadastro_login()|f8_educador.php|CALL ve_cad_educador(:login, @status)
Educador|"altera_senha(novasenha)"|f8_educador.php|CALL altera_senha_educador(:login, :senha)
Educador|cad_educador_bd()|f8_educador.php|CALL cadastra_educador(:login, :senha, :nome, :email)

#### **pag01**

Classe|Método da Classe|Arquivo PHP|Procedure ou Consulta do BD
------|----------------|-----------|---------------------------
Mapa|atualiza_lista_mapas([], ultimo)|f3_edu.php|SELECT id, nome, descricao, link_id FROM tbl_mapa WHERE educador_login = 'educador' LIMIT ordem, 3;|
Mapa|exclui_mapa_bd()|f7_edu.php|CALL exclui_mapa(:mapa_id, :mapa_linkid);|
Usuario|sair()|fl3.php|------

#### **pag01a**

Classe|Método da Classe|Arquivo PHP|Procedure ou Consulta do BD
------|----------------|-----------|---------------------------
Mapa|obtem_jogadores()|f6_edu.php|SELECT jogador, pontos, qtde_lugates, duracao, estado FROM tbl_jogo WHERE mapa_id = 'mapaid' ORDER BY qtde_lugates DESC, pontos DESC, duracao ASC ;
Mapa|obtem_info()|f4_edu.php|CALL obtem_info1_mapa(:id, @nome, @desc, @link, @estado);
Mapa|obtem_info()|f4_edu.php|SELECT nome, latitude, longitude, pontos, dica1, dica2 FROM tbl_lugar WHERE mapa_id = 'mapaid' ORDER BY ordem ASC
Mapa|altera_estado(estado)|f5_edu.php|CALL altera_estado_mapa(:id, :estado);
Mapa|altera_estado(estado)|f5_edu.php|CALL deleta_jogadores(:id);
Usuario|sair()|fl3.php|------

#### **pag02**

Classe|Método da Classe|Arquivo PHP|Procedure ou Consulta do BD
------|----------------|-----------|---------------------------
Mapa|checa_nome()|f2_edu.php|CALL checa_nome_mapa(:nomemapa, :educador, @tot_mapa);
Mapa|cadBd()|f1_edu.php|CALL insere_mapa(:educador, :nome, :desc);
Mapa|cadBd()|f1_edu.php|CALL obtem_id_ult_mapa(:educador, @id_mapa);
Mapa|cadBd()|f1_edu.php|CALL insere_lugar(:id_mapa, :lat, :lon, :nome, :dica1, :desc, :pontos, :ordem, :dica2 );
Mapa|cadBd()|f1_edu.php|CALL cad_link_at_mapa(:id_mapa, :link_at_mapa);
Usuario|sair()|fl3.php|------

### Páginas para o Jogador

#### **index**

Classe|Método da Classe|Arquivo PHP|Procedure ou Consulta do BD
------|----------------|-----------|---------------------------
Mapa|obtem_estado()|f7_jogo.php|CALL obtem_estado_mapa(:mapa_id, @estado);
Jogador|altera_estado(estado, mapaid)|f6_jogo.php|CALL altera_estado_jogador(:jogador, :mapa, :estado);
Jogador|entrar_jogo(mapa)|fl2.php|CALL login_jogador(:mapa_id, @status);
Jogador|checa_nome(mapa_id)|f4_jogo.php|CALL checa_nome_jogador(:nomej, :mapa_id, @status);
Jogador|checa_nome(mapa_id)|f4_jogo.php|CALL cad_nome_jogador(:nomej, :mapa_id)
Usuario|sair()|fl3.php|------

#### **painel**

Classe|Método da Classe|Arquivo PHP|Procedure ou Consulta do BD
------|----------------|-----------|---------------------------
Mapa|obtem_estado()|f7_jogo.php|CALL obtem_estado_mapa(:mapa_id, @estado);
Mapa|obtem_lugar_do_mapa(ordem)|f2_jogo.php|CALL obtem_id_mapa(:mapa_link_id, @id_mapa);
Mapa|obtem_lugar_do_mapa(ordem)|f2_jogo.php|CALL obtem_lugar_jogo(:mapa_id, :ordem, @lat, @lon, @dica, @pontos, @desc, @dica_extra, @nome);
Mapa|obtem_jogadores()|f6_edu.php|SELECT jogador, pontos, qtde_lugates, duracao, estado FROM tbl_jogo WHERE mapa_id = 'mapaid' ORDER BY qtde_lugates DESC, pontos DESC, duracao ASC ;
Jogador|atualiza_dados_bd(mapa_id, opcao)|f5_jogo.php|CALL atualiza_dados_jogador1(:jogador, :mapa, :pontos, :lugares, :duracao);
Jogador|atualiza_dados_bd(mapa_id, opcao)|f5_jogo.php|CALL atualiza_dados_jogador2(:jogador, :mapa, :duracao);
Jogador|altera_estado(estado, mapaid)|f6_jogo.php|CALL altera_estado_jogador(:jogador, :mapa, :estado);
Mapa|obtem_lugar_inicial()|f2_jogo.php|CALL obtem_id_mapa(:mapa_link_id, @id_mapa);
Mapa|obtem_lugar_inicial()|f2_jogo.php|CALL obtem_lugar_jogo(:mapa_id, :ordem, @lat, @lon, @dica, @pontos, @desc, @dica_extra, @nome);
Mapa|obtem_descricao()|f3_jogo.php|CALL obtem_descricao_mapa(:mapa_id, @descricao);
Jogador|enfeiticar(nomeadversario, mapaid)|f8_jogo.php|CALL aplica_feitico_alvo(:jogador, :mapa, :adv, @status)
Jogador|desenfeiticar(mapaid)|f8_jogo.php|CALL desfaz_feitico(:jogador, :mapa)
Usuario|sair()|fl3.php|------


##  Estados dos objetos

No Rimor App os objetos Mapa e Jogador possuem estados.

### Mapa

O mapa no jogo possui os seguintes estados possíveis

Estado|Letra|Descrição
------|----------------------|---------
Incluso|I|Mapa está inativo(Não liberado para o jogo)
Liberado|L|O mapa está liberado para uso dos jogadores. Os jogadores ainda não estão jogando.
Ativo|A|Os jogadores estão usando o mapa em uma partida.

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
Desistente|D|O jogador desistiu do mapa ou da partida.
Ativo|A|O jogador está jogando.
Concluinte|C|O jogador achou todos os lugares do mapa.  

## Códigos de erros

###  **Mostrados para o usuário**

Código|Erro|Objeto|Tela|
-----|-----|------|----
CS01|Erro de comunicação com o servidor|TODOS|TODAS
CS02|Não conseguiu acessar o servidor|TODOS|TODAS
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

Erro relacionado a administração do mapa. Pode indicar identificação do mapa corrompida ou erro de acesso.  
Também pode indicar falhas na obtenção na lista de mapas.  
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

Todas as funções PHP retornam uma string no formato Json como resposta às solicitações feitas pelos objetos.  
Essa string possui a chave 'ctrl' que contém um número inteiro que indica se a solicitação foi realizada com sucesso ou não conforme mostrado na tabela abaixo:  

|Código|Descrição
|------|---------
|0|Solicitação efetuada com sucesso 
|>= 1|Ocorreu algum erro no processamento da solicitação. Esse erro pode ser de banco de dados ou outros quaisquer.
| -10|Não foi possível criar ou recuperar a sessão.
| -11|Tentou-se acessar um recurso sem realizar o procedimento de login
| -12|Não conseguiu acesso a base de dados.
