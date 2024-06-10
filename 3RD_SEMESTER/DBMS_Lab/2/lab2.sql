--1
create user C_210042112 identified by cse4308;
grant all privileges to C_210042112;
connect C_210042112/cse4308;
show user;

--2
create table instructor
(
    id varchar2(6), 
    name varchar2(20) not null,
    dept_name varchar2(20),
    salary number not null,
    constraint pk_id primary key (id),
    constraint salary_check check (salary > 20000)
);

--3
insert into instructor (id,name,dept_name,salary) values ('10101', 'Srinivasan', 'Comp. Sci.', 65000);
insert into instructor (id,name,dept_name,salary) values ('12121', 'Wu', 'Finance', 90000);
insert into instructor (id,name,dept_name,salary) values ('15151', 'Mozart', 'Music', 40000);
insert into instructor (id,name,dept_name,salary) values ('22222', 'Einstein', 'Physics', 95000);
insert into instructor (id,name,dept_name,salary) values ('32343', 'El Said', 'History', 60000);
insert into instructor (id,name,dept_name,salary) values ('00456', 'Gold', 'Physics', 87000);
insert into instructor (id,name,dept_name,salary) values ('45565', 'Katz', 'Comp. Sci.', 75000);
insert into instructor (id,name,dept_name,salary) values ('58583', 'Califieri', 'History', 62000);
insert into instructor (id,name,dept_name,salary) values ('76543', 'Singh', 'Finance', 80000);
insert into instructor (id,name,dept_name,salary) values ('76766', 'Crick', 'Biology', 72000);
insert into instructor (id,name,dept_name,salary) values ('03821', 'Brandt', 'Comp. Sci.', 92000);
insert into instructor (id,name,dept_name,salary) values ('98345', 'Kim', 'Elec. Eng.', 80000);

--4
--a
select * from instructor;

--b
select id,name from instructor;

--c
select name,dept_name from instructor where salary>70000;

--d
select name,dept_name from instructor where salary<=80000 and salary>=10000;

--e
select id,name from instructor where dept_name='Comp. Sci.';

--f
select name,salary from instructor where dept_name='Finance';

--g
select id,name from instructor where dept_name='Comp. Sci.' or salary>75000;

--h
select dept_name from instructor;

--5
drop table instructor cascade constraints;


