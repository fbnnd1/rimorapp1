/*Criação de banco de dados e tabelas */

create database rimorappdb;

use rimorappdb;

create table tbl_educador (
	login varchar(50) not null primary key,
    senha varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci not null,
    email varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci not null,
    nome varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci not null
);

create table tbl_mapa (
    id int NOT NULL AUTO_INCREMENT,
    educador_login varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci not null,
    nome varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci not null,
    descricao varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci,
    link_id VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
     `estado` CHAR( 1 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'I',
    primary key (id),
    CONSTRAINT FK_MapaEdu FOREIGN KEY (educador_login) REFERENCES tbl_educador(login)
 );

CREATE TABLE tbl_lugar (
    mapa_id int NOT NULL ,
    latitude varchar( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
    longitude varchar( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
    nome varchar( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
    dica1 varchar( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci,
    dica2 varchar( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'Sem dica extra.',
    descricao varchar( 200 ) CHARACTER SET utf8 COLLATE utf8_general_ci,
    pontos int not null,
    ordem int not null,
    PRIMARY KEY ( mapa_id, latitude, longitude ),
    CONSTRAINT FK_LugarMapa FOREIGN KEY (mapa_id) REFERENCES tbl_mapa(id)
);

/*Tabela com o intuito de armazenar informações temporárias*/
CREATE TABLE tbl_jogo (
    mapa_id VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    jogador varchar( 30 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
    pontos int null  DEFAULT 0,
    qtde_lugates int null  DEFAULT 0,
    estado CHAR(1) NULL  DEFAULT 'E'
    duracao VARCHAR( 8 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '00:00:00',
    enfeiticado_por VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL
);


/* Procedimentos */

/*
==============
Educador
===============
*/

/* verifica login educador */
DELIMITER $$

CREATE PROCEDURE login_educador(IN p_login VARCHAR(50) CHARSET utf8, IN p_senha VARCHAR(255) CHARSET utf8, OUT p_total INT)

BEGIN

SELECT COUNT(*) INTO p_total FROM tbl_educador WHERE login = p_login AND senha = p_senha;

END $$

DELIMITER ;

/* verifica cadastro educador */
DELIMITER $$

CREATE PROCEDURE ve_cad_educador(IN p_login VARCHAR(50) CHARSET utf8, OUT p_total INT)

BEGIN

SELECT COUNT(*) INTO p_total FROM tbl_educador WHERE login = p_login;

END $$

DELIMITER ;

/* cadastra educador */
DELIMITER $$

CREATE PROCEDURE cadastra_educador(IN p_login VARCHAR(50) CHARSET utf8, IN p_senha VARCHAR(255) CHARSET utf8, IN p_nome VARCHAR(100) CHARSET utf8, IN p_email VARCHAR(100) CHARSET utf8)

BEGIN

INSERT INTO `tbl_educador` ( `login` , `senha`, `email`, `nome` )
VALUES (p_login,p_senha, p_email, p_nome );

END $$

DELIMITER ;

/* altera senha educador */
DELIMITER $$

CREATE PROCEDURE altera_senha_educador(IN p_login VARCHAR(50) CHARSET utf8, IN p_senha VARCHAR(255) CHARSET utf8)

BEGIN

UPDATE `tbl_educador` SET senha = p_senha WHERE login = p_login;

END $$

DELIMITER ;

/*
==============
Mapa
===============
*/

/* verifica mapa liberado - Login do Jogador */
DELIMITER $$

CREATE PROCEDURE login_jogador(IN p_mapaid VARCHAR(100) CHARSET utf8, OUT p_total INT)

BEGIN

SELECT COUNT(*) INTO p_total FROM tbl_mapa WHERE link_id = p_mapaid AND estado IN ('L');

END $$

DELIMITER ;

/* verifica mapa liberado para jogo */
DELIMITER $$

CREATE PROCEDURE checa_liberacao_mapa(IN p_mapaid VARCHAR(100) CHARSET utf8, OUT p_total INT)

BEGIN

SELECT COUNT(*) INTO p_total FROM tbl_mapa WHERE link_id = p_mapaid and estado in ('A') ;

END $$

DELIMITER ;

/*INSERE MAPA*/
DELIMITER $$

CREATE PROCEDURE insere_mapa(IN mapa_edu VARCHAR(50) CHARSET utf8, IN mapa_nome VARCHAR(50) CHARSET utf8, IN mapa_desc VARCHAR(100) CHARSET utf8)

BEGIN

INSERT INTO `tbl_mapa`(`educador_login`, `nome`, `descricao`) VALUES (mapa_edu,mapa_nome,mapa_desc);

END $$

DELIMITER ;

/*OBTÉM ÚLTIMO ID DO MAPA*/
DELIMITER $$

CREATE PROCEDURE obtem_id_ult_mapa(IN mapa_edu VARCHAR(50) CHARSET utf8, OUT p_mapa_id INT)

BEGIN

SELECT id INTO p_mapa_id FROM `tbl_mapa` ORDER BY id DESC LIMIT 1;

END $$

DELIMITER ;

/*CADASTRADA ID ATIVACAO*/
DELIMITER $$

/*CREATE PROCEDURE cad_link_at(IN mapa_edu VARCHAR(50), IN p_mapa_id INT, )*/
CREATE PROCEDURE cad_link_at_mapa( IN p_mapa_id INT, IN p_link VARCHAR(100) CHARSET utf8 )

BEGIN

UPDATE tbl_mapa SET link_id = p_link WHERE id = p_mapa_id;

END $$

DELIMITER ;

/* Checa nome mapa */
DELIMITER $$

CREATE PROCEDURE checa_nome_mapa(IN p_nome_mapa VARCHAR(50) CHARSET utf8, IN p_edu_mapa VARCHAR(50) CHARSET utf8, OUT p_tot_mapa INT)

BEGIN

SELECT COUNT(*) INTO p_tot_mapa FROM tbl_mapa WHERE nome = p_nome_mapa AND educador_login = p_edu_mapa;

END $$

DELIMITER ;

/*obtem ID mapa pelo link */
DELIMITER $$

CREATE PROCEDURE obtem_id_mapa(IN p_mapa_linkid VARCHAR(100) CHARSET utf8, OUT p_id INT)

BEGIN

SELECT id INTO p_id FROM tbl_mapa WHERE link_id = p_mapa_linkid ;

END $$

DELIMITER ;

/*obtem descrição mapa pelo id */
DELIMITER $$

CREATE PROCEDURE obtem_descricao_mapa(IN p_mapa_id INT, OUT p_desc VARCHAR(100) CHARSET utf8)

BEGIN

SELECT descricao INTO p_desc FROM tbl_mapa WHERE id = p_mapa_id ;

END $$

DELIMITER ;

/*Altera estado mapa*/
DELIMITER $$

CREATE PROCEDURE altera_estado_mapa(IN p_mapa_id  INT, IN p_estado CHAR(1) CHARSET utf8)

BEGIN

UPDATE tbl_mapa SET estado = p_estado WHERE id = p_mapa_id;

END $$

DELIMITER ;

/* Obtém estado mapa */

DELIMITER $$

CREATE PROCEDURE obtem_estado_mapa(IN p_mapaid VARCHAR(100) CHARSET utf8, OUT p_estado CHAR(1) CHARSET utf8)

BEGIN

SELECT estado INTO p_estado FROM tbl_mapa WHERE link_id = p_mapaid;

END $$

DELIMITER ;

/*Obtém informações do mapa*/
DELIMITER $$

CREATE PROCEDURE obtem_info1_mapa(IN p_mapa_id INT, OUT p_nome_mapa VARCHAR(50) CHARSET utf8, OUT p_mapa_desc VARCHAR(100) CHARSET utf8, OUT p_mapa_linkid VARCHAR(100) CHARSET utf8, OUT p_estado CHAR(1) CHARSET utf8 )

BEGIN

SELECT nome, descricao, link_id, estado INTO p_nome_mapa, p_mapa_desc, p_mapa_linkid, p_estado FROM tbl_mapa WHERE id = p_mapa_id;

END $$

DELIMITER ;

/*Exclui Mapa*/
DELIMITER $$

/*Exclui dados do mapa*/
CREATE PROCEDURE exclui_mapa(IN p_mapa_id INT, IN p_mapa_linkid VARCHAR(100) CHARSET utf8)

BEGIN

DELETE FROM tbl_jogo WHERE mapa_id = p_mapa_linkid;

DELETE FROM tbl_lugar WHERE mapa_id = p_mapa_id;

DELETE FROM tbl_mapa WHERE id = p_mapa_id;

END $$

DELIMITER ;

/*
==============
Lugar
===============
*/

/*Obtem lugar jogo*/

DELIMITER $$

CREATE PROCEDURE obtem_lugar_jogo(IN p_mapaid INT, IN p_ordem INT,  OUT p_lat VARCHAR(50) CHARSET utf8, OUT p_lon VARCHAR(50) CHARSET utf8, OUT p_dica VARCHAR(100) CHARSET utf8, OUT p_pontos INT, OUT p_descricao VARCHAR(200) CHARSET utf8, OUT p_dica_extra VARCHAR(100) CHARSET utf8, OUT p_nome VARCHAR(50) CHARSET utf8)

BEGIN

SELECT latitude, longitude, dica1, pontos, descricao, dica2, nome
INTO p_lat, p_lon, p_dica, p_pontos, p_descricao, p_dica_extra, p_nome
FROM tbl_lugar WHERE mapa_id = p_mapaid AND ordem = p_ordem;

END $$

DELIMITER ;

/*INSERE LUGAR*/
DELIMITER $$

CREATE PROCEDURE insere_lugar(IN lugar_mapa_id INT, IN lugar_lat VARCHAR(50) CHARSET utf8, IN lugar_lon VARCHAR(50) CHARSET utf8, IN lugar_nome VARCHAR(50) CHARSET utf8, IN lugar_dica VARCHAR(100) CHARSET utf8, IN lugar_desc VARCHAR(200) CHARSET utf8, IN lugar_pontos INT, IN lugar_ordem INT, IN lugar_dica2 VARCHAR(100) CHARSET utf8)

BEGIN

INSERT INTO `tbl_lugar`(`mapa_id`, `latitude`, `longitude`, `nome`, `dica1`, `descricao`, `pontos`, `ordem`, `dica2`) VALUES 
(lugar_mapa_id,lugar_lat,lugar_lon,lugar_nome,lugar_dica,lugar_desc,lugar_pontos, lugar_ordem, lugar_dica2);

END $$

DELIMITER ;

/*
==============
Jogador
===============
*/

/* checa nome jogador */
DELIMITER $$
 
CREATE PROCEDURE checa_nome_jogador(IN p_jogador VARCHAR(30) CHARSET utf8, IN p_mapaid VARCHAR(100) CHARSET utf8, OUT p_total INT)
BEGIN

SELECT COUNT(*) INTO p_total FROM tbl_jogo WHERE mapa_id = p_mapaid AND jogador =  p_jogador;

END $$

DELIMITER ;

/*
CALL checa_nome_jogador(@valor);
SELECT @valor;
*/

DELIMITER $$

/*CREATE PROCEDURE cad_link_at(IN mapa_edu VARCHAR(50), IN p_mapa_id INT, )*/
CREATE PROCEDURE cad_nome_jogador( IN p_jogador VARCHAR(30) CHARSET utf8, IN p_mapa_id VARCHAR(100) CHARSET utf8 )

BEGIN

INSERT INTO tbl_jogo (mapa_id ,jogador) VALUES (p_mapa_id, p_jogador);

END $$

DELIMITER ;

/*Altera estado jogador*/
DELIMITER $$

CREATE PROCEDURE altera_estado_jogador(IN pjogador VARCHAR(30) CHARSET utf8, IN p_mapa_id  VARCHAR(100) CHARSET utf8, IN p_estado CHAR(1) CHARSET utf8)

BEGIN

UPDATE tbl_jogo SET estado = p_estado WHERE jogador = pjogador AND mapa_id = p_mapa_id;

END $$

DELIMITER ;


/*Atualiza dados do jogador*/
DELIMITER $$

CREATE PROCEDURE atualiza_dados_jogador1(IN p_jogador VARCHAR(30) CHARSET utf8, IN p_mapa_linkid VARCHAR(100) CHARSET utf8, IN p_pontos INT, IN p_lugares INT, IN p_duracao VARCHAR(8) CHARSET utf8)

BEGIN

UPDATE tbl_jogo SET pontos = p_pontos, qtde_lugares = p_lugares, duracao = p_duracao
WHERE jogador = p_jogador AND mapa_id = p_mapa_linkid;

END $$

DELIMITER ;

/*Atualizada duração do jogo pra o jogador*/
DELIMITER $$

CREATE PROCEDURE atualiza_dados_jogador2(IN p_jogador VARCHAR(30) CHARSET utf8, IN p_mapa_linkid VARCHAR(100) CHARSET utf8, IN p_duracao VARCHAR(8) CHARSET utf8)

BEGIN

UPDATE tbl_jogo SET duracao = p_duracao
WHERE jogador = p_jogador AND mapa_id = p_mapa_linkid;

END $$

DELIMITER ;

/* DELETA JOGADOES*/
DELIMITER $$

CREATE PROCEDURE deleta_jogadores(IN p_mapa_linkid VARCHAR(100) CHARSET utf8)

BEGIN

DELETE FROM tbl_jogo WHERE mapa_id = p_mapa_linkid;

END $$

DELIMITER ;

/*VE mágia 1- não enfeituçado, 0 enfeitiçado*/
DELIMITER $$
 
CREATE PROCEDURE ve_feitico(IN p_mapaid VARCHAR(100) CHARSET utf8, IN p_alvo VARCHAR(30) CHARSET utf8, OUT p_saida VARCHAR(30) CHARSET utf8)
BEGIN


SELECT enfeiticado_por INTO p_saida FROM tbl_jogo WHERE mapa_id = p_mapaid AND jogador =  p_alvo AND (enfeiticado_por <> '' OR NOT ISNULL(enfeiticado_por) );

END $$

DELIMITER ;

/*Aplica mágia*/
DELIMITER $$

CREATE PROCEDURE aplica_feitico_alvo(IN p_jogador VARCHAR(30) CHARSET utf8, IN p_mapaid VARCHAR(100) CHARSET utf8, IN p_alvo VARCHAR(30) CHARSET utf8, OUT p_saida INT)
BEGIN

DECLARE int_t INT;

SELECT COUNT(*) INTO int_t FROM tbl_jogo WHERE mapa_id = p_mapaid AND jogador =  p_alvo AND (enfeiticado_por = '' OR ISNULL(enfeiticado_por) );

UPDATE tbl_jogo SET enfeiticado_por = p_jogador WHERE mapa_id = p_mapaid AND jogador =  p_alvo AND int_t = 1;

SELECT int_t INTO p_saida;

END $$

DELIMITER ;

/*Desfaz mágia*/
DELIMITER $$

CREATE PROCEDURE desfaz_feitico(IN p_jogador VARCHAR(30) CHARSET utf8, IN p_mapaid VARCHAR(100) CHARSET utf8)
BEGIN

UPDATE tbl_jogo SET enfeiticado_por = '' WHERE mapa_id = p_mapaid AND jogador =  p_jogador;

END $$

DELIMITER ;

