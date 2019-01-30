CREATE TABLE IF NOT EXISTS country (
  id INT NOT NULL AUTO_INCREMENT,
  country_name VARCHAR(255),
  UNIQUE (country_name),
  PRIMARY KEY (id)
);