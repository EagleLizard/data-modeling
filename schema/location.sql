CREATE TABLE IF NOT EXISTS location (
  id INT NOT NULL AUTO_INCREMENT,
  location_name VARCHAR(255) NOT NULL,
  country_id INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (location_name),
  FOREIGN KEY (country_id) REFERENCES country(id)
);