
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) NOT NULL,
  username VARCHAR(50) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  join_date DATETIME NOT NULL,
  UNIQUE (username),
  PRIMARY KEY (id)
);
