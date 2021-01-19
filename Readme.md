# Rimor App

## Descrição do Projeto

A proposta deste projeto é ser uma ferramenta alternativa para um educador da área de Geografia, História e/ou áreas afins possa apresentar para seus alunos lugares com valor histórico cultural quando eles estiverem impossibilitados de visitar esses lugares. A apresentação desses lugares seria feita empregando-se o conceito de gamificação.

## Princípio de Funcionamento do Jogo

O jogo tem o princípio de funcionalidade baseada no jogo de 'caça ao tesouro', onde o jogador se guia por um roteiro descrito em um mapa para chegar no tesouro que é seu objetivo. No Rimor App o objetivo do jogador é chegar **no final do percurso no menor tempo possível**.

O educador montaria um roteiro, mapa, com lugares históricos e dicas sobre esses lugares para serem visualizadas pelos jogadores. Após a conclusão da montagem, ele divulgaria entre seus alunos uma identificação do mapa para eles acessarem.  

O Jogador ao acessar o mapa, de acordo com a dica cadastrada pelo professor na confecção do mapa, ele poderá palpitar se determinado lugar no mapa foi demarcado pelo educador.

## Considerações Importantes

O Rimor App foi desenvolvido com ferramentas gratuitas e com o intuito de adequar-se à maioria dos planos de hospedagem de sites grátis disponíveis para não gerar custos às entidades educacionais e/ou profissionais de educação. Esses planos geralmente dispões de serviços de banco de dados Mysql e PHP.  
O Rimor App foi testado no plano de hospedagem gratuita oferecido pela **[000webhost](https://br.000webhost.com)**.

## Modelo de Negócio (UML: Diagrama de Classes)

![Modelo de Negócio](img/sistema/drg-classes.jpg)

* Educador: Usuário do sistema que cria e roteiriza mapas com lugares escolhidos por ele;
* Mapa: Conjunto de lugares;
* Lugar: Representação de um logradouro que possui valor(es) histórico-cultural(ais);
* Jogador: Usuário que acessa mapa criado por um educador com intuito de descobrir quais lugares compõem o mapa e aprendendo sobre eles.

## Usuários

### Educador

Responsável por criar os mapas para educar estudantes com lugares que possuam algum(uns) valor(es) cultural(ais). Geralmente possui prática no uso de computadores desktop.

### Aluno ou Jogador

Usuário que acessa o sistema para participar de disputas
utilizando os mapas criados pelo educador. Geralmente possui facilidade em usar diversos recursos tecnológicos com acesso à Internet e experiência de utilização de jogos para sistemas computacionais, em destaque smartphones.

## Funcionalidades

### Educador

* Criar mapas personalizados com lugares a sua escolha demarcados;
* Gerar código de acesso ao mapá para compartilhamento com o aluno;
* Monitorar o desempenho dos alunos no uso de um mapa.

### Aluno ou Jogador

* Acessar mapas criados pelo educador;
* Navegar pelo mapa;
* Enviar um palpite se determinado lugar no mapa foi demarcado pelo educador.

Jogabilidade básica (UML: Diagrama de Atividades)

![Jogabilidade básica](img/sistema/drg-atividades.jpg)

## Telas

### Educador

Login

![Tela de Login](img/telas-educador/img01.png)

![Tela de Login](img/telas-educador/img06.png)

Listas de mapas criados

![Lista de mapas](img/telas-educador/img07.png)

Gerenciamento do mapa

![Detalhes de um mapa](img/telas-educador/img20.png)

Criação de mapas

![Tela de criação de mapa](img/telas-educador/img09.png)

![Tela de criação de mapa](img/telas-educador/img12.png)

### Jogador

Tela de acesso ao mapa.

![Tela de acesso ao mapa](img/telas-jogador/img02.png)

Painel do Jogador

![Painel do Jogador](img/telas-jogador/img05.png)

### Observações

* Dependendo do tamanho da tela do dispositivo usado, a disposição dos elementos pode variar;
* Para visualizar mais telas, veja os manuais do educador e jogador.

## Arquitetura do sistema

O sistema foi construído em camadas, onde cada camada pode trocar informações apenas com as camadas adjacentes.

![Arquitetura do sistema simplificada](img/sistema/arq-sist-simples.png)

**Visão**: Possui os componentes que formam as telas mostradas para o usuário;  
**Controle**: Possui programas que tratam as ações e interações do usuário com a tela;  
**Modelo**: Contém a codificação dos objetos do sistema, responsáveis por tratar os dados conforme as solicitações dos usuários;  
**Funções Web**: Responsáve por fazer a comunicação entre a camada de dados e a camada de modelo;  
**Dados**: Fornece e guarda os dados do sistema.

### Fluxo de informações entre as camadas

![Arquitetura do sistema](img/sistema/arq-sist.jpg)

## Tecnologias utilizadas

**Frontend**: HTML, CSS e Javascript. Emprego de Bootstrap 3 e JQuery.  
Para os mapa geográficos e funções de geoprocessamento foram usados recursos do [OpenStreetMap](https://www.openstreetmap.org/).

**Backend**: PHP e banco de dados Mysql.

### Observações:

Para poder manter uma maior compatibilidade com sistemas legados, como por exemplo o Internet Explorer 8, uma vez que é desconhecido o ambiente que o Rimor App será implementado, optou-se por fazer uso de tecnologias que possuem suporte a esses sistemas.

## Jogabilidade e outras informações

Para mais informações sobre criação de mapas, monitoramentos de jogadores, jogabilidade, entre outras informações, veja os manuais do professor e do jogador.

## Organização do diretório 'src'

**backend**: Pasta com o código PHP da camada 'Funções Web'.  
**bd**: Pasta com arquivo SQL para criação da estrutura de dados.  

**frontend**

* estilo: Arquivos para estilização comum entre as páginas;
* ajuda: Manuais de ajuda do educador e aluno;
* scriptsComuns: Arquivos javascript que podem ser usados por todas as páginas.
* professor: Arquivos que compõem as telas do sistema disponíveis para o professor.
* jogador: Arquivos que compõem as telas do sistema disponíveis para os jogadores.

## Implementação do Rimor App (Deploy).

### Requisitos

* Servidor HTTP com PHP;
    *  O PHP deve ter suporte ao PDO e Mysql.
* Servidor de banco de dados MYSQL.

### Instruções de implementação

Após a obtenção de um domínio(no caso para uso na Internet) e servidor para hospedagem do sistema com suporte a PHP, site, realize as seguintes etapas:

1. Na ferramenta de administração do banco de dados Mysql, execute os comandos SQL contido no arquivo 'rimorappbd.sql';

2. No arquivo 'conexao.php' salvo na pasta backend, coloque as informações de acesso ao banco de dados;

Exemplo:

```php

$usuario = "rimor";
$senha   = "rimor123";
$url     = "localhost";
$porta   = "3306";
$bd      = "nomedobancodedados";

```

3. Salve os arquivos PHP dentro de uma pasta no servidor HTTP acessível pela Internet ou Intranet; 

4. No arquivo 'config.js' salvo na pasta 'scriptsComuns', atribua o valor da variável 'str_url_base' o endereço web das pastas onde estão salvas os arquivos PHP;

Exemplo:

```javascript
str_url_base = 'http://dominio.com.br/rimor/funcoes';

```

5. Salve os arquivos correspondentes ao front-end, mantenha a estrutura de diretório da pasta, em outra pasta no servidor de hospedagem.

Para averiguar se o processo de implementação foi concluído com sucesso, acesse a tela inicial do professor e tente realizar seu cadastro.

## Considerações Finais

Assim como todos os softwares, todos os aspectos do Rimor App descritos nesta documentação podem ser aprimorados e ou atualizados com emprego de novas tecnologias e melhores práticas. 
Como descrito anteriormente, o principal objetivo desse projeto é ser uma ferramenta alternativa de ensino sobre lugares com algum valor cultural.  
Esses lugares devem ser preservados e uma das melhores formas de preservação é através do ensino sobre a importância destas localidades.