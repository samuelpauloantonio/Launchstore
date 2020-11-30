/* COMANDO PARA O MEU BANCO DE DADOS */

DROP DATABASE  IF EXISTS launchstoreDB
CREATE DATABASE launchstoreDB

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int UNIQUE,
  "user_id" int UNIQUE,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" int,
  "price" int NOT NULL,
  "quantity" int DEFAULT 0,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);


INSERT INTO  categories(name) VALUES ('comida');
INSERT INTO  categories(name) VALUES('eletrônicos');
INSERT INTO  categories(name) VALUES('automóveis');

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "product_id" int UNIQUE
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");




--CREATE USERS 

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int UNIQUE,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "cpf_cnpj" text UNIQUE NOT NULL,
  "cep" text ,
  "address" text,
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now())
);


-- FORENGIN KEY 

ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

-- create procedure

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$

BEGIN 

NEW.updated_at = NOW();
RETURN NEW;

END;

$$ LANGUAGE plpgsql;


-- TRIGGER
-- auto update_at products

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products 
FOR EACH ROW 

EXECUTE PROCEDURE trigger_set_timestamp();


-- auto update_at users

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW 

EXECUTE PROCEDURE trigger_set_timestamp();

