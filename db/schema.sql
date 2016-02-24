DROP TABLE if EXISTS masseuists CASCADE;
DROP TABLE if EXISTS proficiencies CASCADE;
DROP TABLE if EXISTS massages CASCADE;

CREATE TABLE masseuists (
       id SERIAL PRIMARY KEY UNIQUE,
       name VARCHAR(255),
       img_url VARCHAR(255)
);

CREATE TABLE massages (
       id SERIAL PRIMARY KEY UNIQUE,
       name VARCHAR(255)
);

CREATE TABLE proficiencies (
       masseuist_id INTEGER REFERENCES masseuists (id),
       massage_id INTEGER REFERENCES massages (id),
       PRIMARY KEY (masseuist_id, massage_id)
);
