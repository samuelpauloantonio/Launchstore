/* COMANDO PARA O MEU BANCO DE DADOS */

DROP SCHEMA public CASCADE ; -- apaga tudo de uma fez --
CREATE SCHEMA public; -- limpa o ckeche  -- 


DROP DATABASE  IF EXISTS launchstoreDB;
CREATE DATABASE launchstoreDB;

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int ,
  "user_id" int,
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
  "product_id" int 
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

 


--CREATE USERS 

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "cpf_cnpj" text UNIQUE NOT NULL,
  "cep" text ,
  "address" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
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




-- connect-pg-simple

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");



--efect cascade when delete users,  and products 
-- serve para apagar  dos ficheiros que têm uma chave estrangeira apagarem em simultanio

ALTER TABLE "products"
DROP CONSTRAINT products_user_id_fkey,
ADD CONSTRAINT products_user_id_fkey 
FOREIGN KEY ("user_id")
REFERENCES "users" ("id")
ON DELETE CASCADE;


ALTER TABLE "files"
DROP CONSTRAINT files_product_id_fkey,
ADD CONSTRAINT files_product_id_fkey
FOREIGN KEY ("product_id") 
REFERENCES "products" ("id")
ON DELETE CASCADE;




-- to run seeds 


DELETE FROM products;
DELETE FROM users;
DELETE FROM files;
DELETE FROM session;


-- restart sequence auto_increment  from tables ids

ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE files_id_seq RESTART WITH 1;