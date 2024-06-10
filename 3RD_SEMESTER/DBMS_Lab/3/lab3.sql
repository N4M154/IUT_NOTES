--1
--a
create table doctor
(name varchar2(50),specialization char(2),fee number,
constraint pk_nm_sp primary key(name,specialization));

--b
create table patient
(patient_no char(5),name varchar2(20) not null,address varchar(10),
constraint pk_patient_no primary key(patient_no));

--c
create table appointment
(patient_no char(5),name varchar2(20),specialization char(2),
constraint pk_patient_no_name_spec primary key(patient_no,name,specialization));

--2
--a
alter table appointment add appointment_date date null;

--b
alter table appointment drop constraint pk_patient_no_name_spec;
alter table appointment add constraint pk_patient_no_name_spec primary key(patient_no,name,specialization,appointment_date);
--c
alter table appointment rename column patient_no to p_no;
alter table appointment rename column name to d_name;

--d
alter table appointment rename to appointment_info;

--e
alter table appointment_info add constraint fk_appointment_doctor foreign key (d_name,specialization) references doctor(name,specialization);
alter table appointment_info add constraint fk_appointment_patient foreign key (p_no) references patient(patient_no);

--3
insert into doctor (name,specialization,fee) values ('mr. x','cs',2000);
insert into doctor (name,specialization,fee) values ('mr. y','gs',1500);
insert into doctor (name,specialization,fee) values ('mr. z','im',3000);

insert into patient (patient_no,name,address) values ('P-101','a','dhk');
insert into patient (patient_no,name,address) values ('P-102','b','khl');
insert into patient (patient_no,name,address) values ('P-103','c','raj');

insert into appointment_info (p_no,d_name,specialization) values ('P-101','mr. x','cs');
insert into appointment_info (p_no,d_name,specialization) values ('P-102','mr. y','gs');
insert into appointment_info (p_no,d_name,specialization) values ('P-103','mr. z','im');

--4
--a
select name from doctor where fee<1500;

--b
select patient_no from patient where address='khl';

--c
select * from patient,apointment_info;

--d
select * from patient natural join appointment_info;

--e
select * 
from patient,appointment_info 
where patient.patient_no=appointment_info.p_no and 
patient.name=appointment_info.d_name;
--f
--g

--5
--a
update patient set name='k' where name = 'a';
update patient set address='raj' where name = 'dhk';


--b
update doctor set name='ms. y' where name='mr. y';

--c
delete from patient where patient_no='p-101';

--d
delete from doctor;
delete from patient;
delete from appointment_info;


