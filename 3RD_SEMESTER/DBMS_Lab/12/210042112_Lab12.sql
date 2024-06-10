--create the tables and insert records

drop table accountproperty cascade constraints;
drop table account cascade constraints;
drop table balance cascade constraints;
drop table transaction cascade constraints;

create table accountproperty(
id int,
name varchar(50),
profitrate numeric(10,2),
graceperiod int,
constraint pk_id_property primary key(id)
);

create table account(
id int,
name varchar(50),
acccode int,
openingdate timestamp,
lastdateinterest timestamp,
constraint pk_id_account primary key(id),
constraint fk_acccode foreign key(acccode) references accountproperty(id)
);


create table balance(
accno int,
principalamount numeric(10,2),
profitamount numeric(10,2),
constraint pk_accno primary key(accno),
constraint fk_accno foreign key(accno) references account(id)
);

create table transaction(
tid int,
accno int,
amount numeric(10,2),
transactiondate timestamp,
constraint pk_tid primary key(tid),
constraint fk_accno_transaction foreign key(accno) references account(id)
);


insert into accountproperty(id,name,profitrate,graceperiod) values (2002, 'monthly', 2.8, 1);
insert into accountproperty(id,name,profitrate,graceperiod) values (3003, 'quarterly', 4.2, 4);
insert into accountproperty(id,name,profitrate,graceperiod) values (4004, 'biyearly', 6.8, 6);
insert into accountproperty(id,name,profitrate,graceperiod) values (5005, 'yearly', 8, 12);


insert into account(id,name,acccode,openingdate,lastdateinterest) values (1, 'Account A', 2002,timestamp '2022-01-01 00:00:00',timestamp '2023-11-25 00:00:00');
insert into account(id,name,acccode,openingdate,lastdateinterest) values (2, 'Account B', 3003,timestamp '2022-02-03 00:00:00',timestamp '2023-10-27 00:00:00');
insert into account(id,name,acccode,openingdate,lastdateinterest) values (3, 'Account C', 4004,timestamp '2022-05-17 00:00:00',timestamp '2023-09-12 00:00:00');
insert into account(id,name,acccode,openingdate,lastdateinterest) values (4, 'Account D', 5005,timestamp '2022-03-19 00:00:00',timestamp '2023-12-25 00:00:00');


insert into balance(accno,principalamount,profitamount) values (1,1000,50);
insert into balance(accno,principalamount,profitamount) values (2,2000,25);
insert into balance(accno,principalamount,profitamount) values (3,3000,35);
insert into balance(accno,principalamount,profitamount) values (4,2500,32);

insert into transaction(tid,accno,amount,transactiondate) values (1, 1, 100,timestamp '2023-11-01 00:00:00');
insert into transaction(tid,accno,amount,transactiondate) values (2, 2, 50,timestamp '2023-09-01 00:00:00');
insert into transaction(tid,accno,amount,transactiondate) values (3, 3, 70,timestamp '2023-08-01 00:00:00');
insert into transaction(tid,accno,amount,transactiondate) values (4, 4, 200,timestamp '2023-05-01 00:00:00');

set serveroutput on;

--1
drop sequence account_id_seq;
drop function generate_account_id;

create sequence account_id_seq start with 1;
create or replace function generate_account_id(
a_name in varchar2,
a_acc_code in int,
a_opening_date in timestamp
) return varchar2 is
b_acc_code varchar2(4);
b_opening_date varchar2(8);
b_name_initials varchar2(3);
b_serial_no varchar2(6);
b_account_id varchar2(25);

begin
b_acc_code := lpad(to_char(a_acc_code), 4, '0');
  
b_opening_date := to_char(a_opening_date, 'yyyymmdd');

b_name_initials := upper(substr(a_name, 1, 3));

select lpad(account_id_seq.nextval, 6, '0') into b_serial_no from dual;

b_account_id := b_acc_code || b_opening_date || '.' || b_name_initials || '.' || b_serial_no;

return b_account_id;
end;
/

--to check

declare
b_new_account_id varchar2(50);

begin
b_new_account_id := generate_account_id('Account A', 2002, TIMESTAMP '2022-01-01 00:00:00');
dbms_output.put_line('New Account ID: ' || b_new_account_id);
end;
/


--2

drop table accountproperty cascade constraints;
drop table account cascade constraints;
drop table balance cascade constraints;
drop table transaction cascade constraints;

drop sequence account_id_seq;

create sequence account_id_seq start with 1;

create table accountproperty(
acc_id varchar2(50), 
name varchar(50),
profitrate numeric(10,2),
graceperiod int,
constraint pk_acc_id_property primary key(acc_id)
);

create table account(
acc_id varchar2(50),
name varchar(50),
acccode varchar2(50),
openingdate timestamp,
lastdateinterest timestamp,
constraint pk_acc_id_account primary key(acc_id),
constraint fk_acccode foreign key(acccode) references accountproperty(acc_id)
);

create table balance(
acc_id varchar2(50),
principalamount numeric(10,2),
profitamount numeric(10,2),
constraint pk_acc_id primary key(acc_id),
constraint fk_acc_id foreign key(acc_id) references account(acc_id)
);

create table transaction(
tid int,
acc_id varchar2(50),
amount numeric(10,2),
transactiondate timestamp,
constraint pk_tid primary key(tid),
constraint fk_acc_id_transaction foreign key(acc_id) references account(acc_id)
);

drop function generate_account_id;

create or replace function generate_account_id(
a_name in varchar2,
a_acc_code in varchar2,
a_opening_date in timestamp
) return varchar2 is
b_acc_code varchar2(4);
b_opening_date varchar2(8);
b_name_initials varchar2(3);
b_serial_no varchar2(6);
b_account_id varchar2(50);

begin
b_acc_code := lpad(to_char(a_acc_code), 4, '0');

b_opening_date := to_char(a_opening_date, 'yyyymmdd');

b_name_initials := upper(substr(a_name, 1, 3));

select lpad(account_id_seq.nextval, 6, '0') into b_serial_no from dual;

b_account_id := b_acc_code || b_opening_date || '.' || b_name_initials || '.' || b_serial_no;

return b_account_id;
end;
/

--to check
declare
b_new_account_id varchar2(50);
begin
-- generate account_id using the function
b_new_account_id := generate_account_id('account a', 2002, timestamp '2022-01-01 00:00:00');



-- insert into accountproperty using the generated account_id
insert into accountproperty(acc_id, name, profitrate, graceperiod)
values (b_new_account_id, 'account a', 2.8, 1);

-- insert into account using the generated account_id
insert into account(acc_id, name, acccode, openingdate, lastdateinterest)
values (b_new_account_id, 'account a', b_new_account_id, timestamp '2022-01-01 00:00:00', timestamp '2023-11-25 00:00:00');

-- insert into balance using the generated account_id
insert into balance(acc_id, principalamount, profitamount)
values (b_new_account_id, 1000, 50);

-- insert into transaction using the generated account_id
insert into transaction(tid, acc_id, amount, transactiondate)
values (1, b_new_account_id, 100, timestamp '2023-11-01 00:00:00');

commit;
end;
/

select * from accountproperty;
select * from account;
select * from balance;
select * from transaction;


--3
drop trigger assign_account_id;

create or replace trigger assign_account_id
before insert on account
for each row
begin
:new.acc_id := generate_account_id(:new.name, :new.acccode, :new.openingdate);
end;
/

--to check

insert into account(name, acccode, openingdate, lastdateinterest) values ('New Account', '200220220101.ACC.000001', TIMESTAMP '2023-11-25 00:00:00', TIMESTAMP '2024-01-01 00:00:00');

--4
drop trigger insert_into_balance;

create or replace trigger insert_into_balance
after insert on account
for each row
begin
insert into balance(acc_id, principalamount, profitamount)
values (:new.acc_id, 5000, 0);
end;
/

--to check

-- Insert a new account record
insert into account(name, acccode, openingdate, lastdateinterest) values ('New Account1', '200220220101.ACC.000001', TIMESTAMP '2023-11-25 00:00:00', TIMESTAMP '2024-01-01 00:00:00');

-- Check the balance table for the newly inserted account
select * from balance where acc_id = '200220231125.NEW.000004';

--5
drop trigger update_principal_amount;

create or replace trigger update_principal_amount
after insert on transaction
for each row
begin
update balance
set principalamount = principalamount + :new.amount
where acc_id = :new.acc_id;
end;
/

--to check
-- Insert a new transaction for an existing account
insert into transaction(tid, acc_id, amount, transactiondate) vaues (2, '200220220101.ACC.000001', 200, TIMESTAMP '2023-12-15 00:00:00');

-- Check the balance table for the account after the new transaction
select * from balance where acc_id = '200220220101.ACC.000001';





