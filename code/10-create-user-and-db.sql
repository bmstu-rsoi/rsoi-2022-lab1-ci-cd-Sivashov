--CREATE ROLE program WITH PASSWORD 'test';
GRANT ALL PRIVILEGES ON DATABASE persons TO program;
ALTER ROLE program WITH LOGIN;

create table if not exists Persons(
	id int not null generated always as identity primary key,
	name varchar(50) not null,
	address varchar(50) not null,
	work varchar(50) not null,
	age int not null check(age >= 0)
);

insert into Persons(name, address, work, age) values ('Dmitriy Orlov', 'Moscow', 'Teacher', 22),
												('Anna Dark', 'Minsk', 'Driver', 31);
--select table_schema from information_schema.tables where table_name = 'persons';
