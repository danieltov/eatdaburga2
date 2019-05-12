CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burger (
    id INT AUTO_INCREMENT NOT NULL,
    burger_name varchar(50) null,
    devoured boolean default false null,
    createdAT TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
);