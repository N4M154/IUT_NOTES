--dropping the views in case they exist in the system

drop view Advisor_Selection;
drop view Student_Count;

--dropping the roles in case they exist in the system

drop role student;
drop role course_teacher;
drop role head_of_dept;
drop role admin;


--1 : Create a view named Advisor_Selection that shows the id, name and department name of instructors.

create view Advisor_Selection as
select i.ID, i.name, i.dept_name
from instructor i;

--2 : Create another view named Student_count using Advisor_Selection and advisor to show the name of the instructor and the number students assigned under them.

create view Student_count as
select a.i_id as instructor_id, ad_select.name as instructor_name, count(a.s_id) as student_count
from advisor a
join Advisor_Selection ad_select on a.i_id = ad_select.id 
group by a.i_id, ad_select.name;

--3.a 
create role student;
grant select on namisa.advisor to student;
grant select on namisa.course to student;


--3.b
create role course_teacher;
grant select on namisa.student to course_teacher;
grant select on namisa.course to course_teacher;


--3.c
create role head_of_dept;
grant course_teacher to head_of_dept;
grant insert on namisa.instructor to head_of_dept;



--3.d
create role admin;
grant select on namisa.department to admin;
grant select on namisa.instructor to admin;
grant update(budget) on department to admin;



--4

--student role
create user stdnt1 identified by stdntpass;
grant create session, resource, create tablespace to stdnt1;
grant student to stdnt1;
connect stdnt1/stdntpass;
select * from namisa.advisor;
select * from namisa.course;
--won't work
select * from namisa.time_slot;

connect namisa/123456;
drop user stdnt1 cascade;
show user;

--course_teacher role
create user teacher1 identified by teacherpass;
grant create session, resource, create tablespace to teacher1;
grant course_teacher to teacher1;
connect teacher1/teacherpass;
select * from namisa.student;
select * from namisa.course;
--won't work
select * from namisa.time_slot;

connect namisa/123456;
drop user teacher1 cascade;
show user;

--head_of_dept role
create user hod1 identified by hodpass;
grant create session, resource, create tablespace to hod1;
grant head_of_dept to hod1;
connect hod1/hodpass;
select * from namisa.student;
select * from namisa.course;
--won't work
select * from namisa.time_slot;
insert into namisa.instructor (ID,name,dept_name,salary) 
values ('00012','llll','Physics',50000);

connect namisa/123456;
drop user hod1 cascade;
show user;

--admin role
create user admin1 identified by adminpass;
grant create session, resource, create tablespace to admin1;
grant admin to admin1;
connect admin1/adminpass;
select * from namisa.department;
select * from namisa.instructor;
--won't work
select * from namisa.student;
update namisa.department
set budget=90000
where dept_name='Music';

connect namisa/123456;
drop user admin1 cascade;
show user;
