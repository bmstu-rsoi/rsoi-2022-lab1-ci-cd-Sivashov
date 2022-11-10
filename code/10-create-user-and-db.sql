--CREATE ROLE program WITH PASSWORD 'test';
GRANT ALL PRIVILEGES ON DATABASE persons TO program;
ALTER ROLE program WITH LOGIN;

create table if not exists Persons(
	id int not null generated always as identity primary key,
	name varchar(50) not null,
	age int not null check(age >= 0),
	gender boolean not null
);

insert into Persons(name, age, gender) values ('Dmitriy Orlov', 22, true), ('Anna Dark', 31, false);
--select table_schema from information_schema.tables where table_name = 'persons';
