--210042112

--1
set serveroutput on;

create sequence bio_sequence start with 1 increment by 1 nocache nocycle;
create sequence cse_sequence start with 1 increment by 1 nocache nocycle;
create sequence elec_sequence start with 1 increment by 1 nocache nocycle;
create sequence fin_sequence start with 1 increment by 1 nocache nocycle;
create sequence hist_sequence start with 1 increment by 1 nocache nocycle;
create sequence music_sequence start with 1 increment by 1 nocache nocycle;
create sequence phys_sequence start with 1 increment by 1 nocache nocycle;

create or replace function generate_student_id(b_dept_name varchar2) return varchar2 is
a_sequence_number number;
a_student_id varchar2(10);

begin

case b_dept_name
when 'biology' then
select bio_sequence.nextval into a_sequence_number from dual;
when 'comp. sci.' then
select cse_sequence.nextval into a_sequence_number from dual;
when 'elec. eng.' then
select elec_sequence.nextval into a_sequence_number from dual;
when 'finance' then
select fin_sequence.nextval into a_sequence_number from dual;
when 'history' then
select hist_sequence.nextval into a_sequence_number from dual;
when 'music' then
select music_sequence.nextval into a_sequence_number from dual;
when 'physics' then
select phys_sequence.nextval into a_sequence_number from dual;

else
raise_application_error(-20001, 'no such department name');
end case;

--padding with 0s if necessary
a_student_id := to_char(a_sequence_number, 'fm0000');

return a_student_id;
end generate_student_id;
/

--to check

declare
a_student_id varchar2(10);

begin
-- call the function with the department name
a_student_id := generate_student_id('comp. sci.');

-- display the generated student id
dbms_output.put_line('generated student id: ' || a_student_id);
end;
/


--2
set serveroutput on;

declare
a_student_id varchar2(10);
begin

for student_rec in (select * from student where dept_name = 'Biology' order by name) loop
a_student_id := generate_student_id(student_rec.dept_name);
update student set id = a_student_id where id = student_rec.id;
commit;
end loop;

for student_rec in (select * from student where dept_name = 'Comp. Sci.' order by name) loop
a_student_id := generate_student_id(student_rec.dept_name);
update student set id = a_student_id where id = student_rec.id;
commit;
end loop;

for student_rec in (select * from student where dept_name = 'Elec. Eng.' order by name) loop
a_student_id := generate_student_id(student_rec.dept_name);
update student set id = a_student_id where id = student_rec.id;
commit;
end loop;

for student_rec in (select * from student where dept_name = 'Finance' order by name) loop
a_student_id := generate_student_id(student_rec.dept_name);
update student set id = a_student_id where id = student_rec.id;
commit;
end loop;

for student_rec in (select * from student where dept_name = 'History' order by name) loop
a_student_id := generate_student_id(student_rec.dept_name);
update student set id = a_student_id where id = student_rec.id;
commit;
end loop;p;8

for student_rec in (select * from student where dept_name = 'Music' order by name) loop
a_student_id := generate_student_id(student_rec.dept_name);
update student set id = a_student_id where id = student_rec.id;
commit;
end loop;

for student_rec in (select * from student where dept_name = 'Physics' order by name) loop
a_student_id := generate_student_id(student_rec.dept_name);
update student set id = a_student_id where id = student_rec.id;
commit;
end loop;


dbms_output.put_line('student ids updated successfully.');
end;
/

--3
set serveroutput on;

create or replace trigger generate_student_id_trigger
before insert on student
for each row
declare
a_student_id varchar2(10);

begin
a_student_id := generate_student_id(:new.dept_name);

:new.id := a_student_id;

dbms_output.put_line('generated student id ' || a_student_id || ' for ' || :new.name || ' in department ' || :new.dept_name);
end;
/

--4
set serveroutput on;

create or replace trigger update_tot_cred_trigger
after insert on takes
for each row
declare
a_credits numeric(2, 0);

begin
--get credits of existing courses
select credits into a_credits
from course
where course_id = :new.course_id;

--update
update student
set tot_cred = tot_cred + a_credits
where id = :new.id;

dbms_output.put_line('updated tot_cred for student ' || :new.id || ' after enrolling in course ' || :new.course_id);
end;
/



--5
set serveroutput on;

create or replace trigger enroll_new_student
before insert on student
for each row
declare
a_semester varchar2(6);
a_year number(4);
a_building varchar2(15);
a_room_number varchar2(7);
a_time_slot_id varchar2(4);

begin
-- determine the semester based on the current date
select case
when to_number(to_char(sysdate, 'mm')) between 11 and 12 or to_number(to_char(sysdate, 'mm')) = 1 then 'winter'
when to_number(to_char(sysdate, 'mm')) between 3 and 7 then 'summer'
else 'fall'
end
into a_semester
from dual;

-- get the current year
select to_number(to_char(sysdate, 'yyyy'))
into a_year
from dual;

-- get the department details for the admitted student
select dept_name, building
into :new.dept_name, a_building
from department
where dept_name = :new.dept_name;

-- set or calculate the room number for the student
-- assuming a default room number:
a_room_number := 'defaultroom';

-- enroll the student in courses offered by their own department without prerequisites
for course_rec in (select course_id
from course
where dept_name = :new.dept_name
and course_id not in (select course_id
from prereq))
loop

-- check if a section exists for the course in the current semester and year
select 1
into a_time_slot_id
from section
where course_id = course_rec.course_id
and semester = a_semester
and year = a_year
and rownum = 1;

-- if no section exists, create a new section
if a_time_slot_id is null then
-- get the next available time slot sequentially from monday to friday
select time_slot_id
into a_time_slot_id
from time_slot
where rownum = 1
order by day, start_hr, start_min;

-- create a new section
insert into section (course_id, sec_id, semester, year, building, room_number, time_slot_id)
values (course_rec.course_id, '1', a_semester, a_year, a_building, a_room_number, a_time_slot_id);
end if;

-- enroll the student in the section
insert into takes (id, course_id, sec_id, semester, year, grade) values (:new.id, course_rec.course_id, '1', a_semester, a_year, null);
end loop;

end enroll_new_student;
/

