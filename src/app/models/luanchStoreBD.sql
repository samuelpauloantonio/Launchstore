/* COMANDO PARA O MEU BANCO DE DADOS */

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
  "create_at" timestamp DEFAULT (now()),
  "update_at" timestamp DEFAULT (now())
);

CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "product_id" int UNIQUE
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");


/*FUNCTION PROCEDURE E TRIGGERS*/

CREATE FUNCTION setTime()
returns trigger AS $$
begin 

NEW.update_at = now();

return new;

end;
$$
language plpgsql


create Trigger set_timestamp 
before update on products 

for each Row 

execute procedure setTime()