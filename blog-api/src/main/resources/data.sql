DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS categories;
 
CREATE TABLE articles (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  category VARCHAR(250) NOT NULL,
  title VARCHAR(250) NOT NULL,
  author VARCHAR(250) NOT NULL,
  date SMALLDATETIME NOT NULL,
  content TEXT(10000) NOT NULL
);
 
INSERT INTO articles (category, title, author, date, content) VALUES
  ('politiques','Présidentielle', 'David', '2022-03-12 12:35:18', 'C’est une « marche pour la VIe République » devenue un rendez-vous traditionnel du candidat qui se présente pour la troisième fois consécutive au scrutin présidentiel, un moyen de se donner des forces, dans la dernière ligne droite. Dimanche 20 mars, Jean-Luc Mélenchon va tenter d’amplifier sa dynamique de campagne en rassemblant plusieurs dizaines de milliers de personnes dans une marche qui aura lieu à Paris dès 14 heures. Elle se déroulera de la place de la Bastille à celle de la République.

S’il avait échoué à se qualifier au second tour en 2017, en arrivant quatrième avec 19,58 % des voix, le candidat de La France insoumise donné dans les sondages à nouveau au pied du podium des intentions de vote, assure, cette fois-ci, « bien sentir » ses chances de pouvoir se qualifier. Un argumentaire qui trouve écho dans sa dynamique de campagne lente mais durable mesurable dans les sondages depuis janvier, tandis que le seuil d’entrée pour le second tour ne cesse de s’abaisser.'),
  ('sports','Victoire', 'Jean', '2022-03-11 23:50:10', 'Victoire des Français en rugby'),
  ('cultures','Concerts', 'Lucas', '2022-03-10 09:10:45', 'Concerts prévus prochainement');

 CREATE TABLE categories (
  category_id INT AUTO_INCREMENT  PRIMARY KEY,
  name VARCHAR(250) NOT NULL
);

INSERT INTO categories (name) VALUES
  ('politiques'),
  ('cultures'),
  ('faits divers'),
  ('sports');
  
CREATE TABLE category_article (
	category_id INT NOT NULL,
	article_id INT NOT NULL
);

INSERT INTO category_article (category_id, article_id) VALUES
	(1,1),
	(4,2),
	(2,3);
	