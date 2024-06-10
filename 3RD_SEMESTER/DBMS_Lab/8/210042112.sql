drop table branch;
drop table ditrict;
drop table division;
drop table country;
drop table employee;
drop table items;
drop table customer;
drop table department;

create table branch
(branch_id char(5),
constraint pk_branch_id primary key(branch_id));

create table district
(district_id char(5),
division_id char(5),
constraint pk_district_id primary key(district_id),
constraint fk_division_id foreign key(division_id) references division(division_id) on delete cascade);

create table division
(division_id char(5),
constraint pk_division_id primary key(division_id));

create table country
(country_id char(5),
constraint pk_country_id primary key(country_id));

create table employee
(employee_id char(5),
name varchar2(50),
date_of_birth date,
contact varchar2(11),
branch_id char(5),
constraint pk_employee_id primary key(employee_id),
constraint fk_branch_id foreign key(branch_id) references branch(branch_id) on delete cascade);

create table items
(item_id char(5),
name varchar2(10),
description varchar2(20),
unit_price decimal(5,2),
customer_id char(5),
constraint pk_item_id primary key(item_id),
constraint fk_customer_id foreign key(customer_id) references customer(customer_id) on delete cascade));

create table customer
(customer_id char(5),
name varchar2(20),
contact varchar2(11),
address varchar2(50),
district_id char(5),
constraint pk_customer_id primary key(customer_id),
constraint fk_district_id foreign key(district_id) references district(district_id) on delete cascade);


create table department
(dept_id char(5),
name varchar2(20),
constraint pk_dept_id primary key(dept_id));

--SQL
--1
select d.division_id, 
(select count(*) from district where 
district.division_id = d.division_id) as all_districts
from division d;

--2
select district_id,
from district
where 
(select count(*) from customer where 
customer.district_id = district.district_id) >= 200;

--3
select c.name as customer_name, 
(select count(*) from items ib where 
ib.customer_id = c.customer_id) as total_items_bought
from customer c
where c.name = 'Alfred';

--4


--5