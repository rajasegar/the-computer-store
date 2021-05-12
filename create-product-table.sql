CREATE TABLE products (
  code INTEGER,
  name VARCHAR(255) NOT NULL ,
  price DECIMAL NOT NULL ,
  manufacturer INTEGER NOT NULL,
  PRIMARY KEY (code), 
  FOREIGN KEY (manufacturer) REFERENCES manufacturers(code)
);
