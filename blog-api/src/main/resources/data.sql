DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS categories;
 
CREATE TABLE articles (
  id INT AUTO_INCREMENT  PRIMARY KEY,
  category VARCHAR(250) NOT NULL,
  author VARCHAR(250) NOT NULL,
  date SMALLDATETIME NOT NULL,
  content TEXT(10000) NOT NULL
);
 
INSERT INTO articles (category, author, date, content) VALUES
  ('politiques', 'David', '2022-03-12 12:35:18', 'Présidentielle bientôt les votes'),
  ('sports', 'Jean', '2022-03-11 23:50:10', 'Victoire des Français en rugby'),
  ('cultures', 'Lucas', '2022-03-10 09:10:45', 'Concerts prévus prochainement');

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
	