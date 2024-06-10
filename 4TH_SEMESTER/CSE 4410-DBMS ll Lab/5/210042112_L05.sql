--1
set serveroutput on;

declare
total_affected_depts number(5);
total_depts number(5);

begin
update department
set budget = budget * 0.9
where budget > 99999;


select count(*) into total_depts from department;

select count(*) into total_affected_depts
from department
where budget <= 99999;

dbms_output.put_line('total departments: '|| total_depts);
dbms_output.put_line('(For reference)number of departments affected: ' || total_affected_depts);
dbms_output.put_line('number of departments not affected: ' || (total_depts - total_affected_depts));
end;
/

--2
set serveroutput on;

declare
a_day varchar2(1);
a_start_hr number(2);
a_end_hr number(2);
a_instructor_name instructor.name%type;

cursor c1 is
select distinct i.name
from instructor i
join teaches t on i.id = t.id
join section s on t.course_id = s.course_id and t.sec_id = s.sec_id and t.semester = s.semester and t.year = s.year
join time_slot ts on s.time_slot_id = ts.time_slot_id
where ts.day = a_day and ts.start_hr >= a_start_hr and ts.end_hr <= a_end_hr;

begin
-- input
dbms_output.put_line('enter the day of the week:');
a_day := &a_day;
dbms_output.put_line('enter the starting hour:');
a_start_hr := &a_start_hr;
dbms_output.put_line('enter the ending hour:');
a_end_hr := &a_end_hr;

-- fetch
open c1;
loop
fetch c1 into a_instructor_name;
exit when c1%notfound;
dbms_output.put_line(a_instructor_name);
end loop;
close c1;
end;
/

--3
set serveroutput on;

declare
a_n number;
a_id student.id%type;
a_name student.name%type;
a_dept_name student.dept_name%type;
a_course_count number;

cursor c1 is
select s.id, s.name, s.dept_name, count(*) as course_count
from student s
join takes t on s.id = t.id
group by s.id, s.name, s.dept_name
order by course_count desc;

begin
-- input
dbms_output.put_line('enter the number of top students to fetch:');
a_n := &a_n;

-- fetch
open c1;
for i in 1..a_n loop
fetch c1 into a_id, a_name, a_dept_name, a_course_count;
exit when c1%notfound;
dbms_output.put_line('id: ' || a_id || ', name: ' || a_name || ', department: ' || a_dept_name || ', courses taken: ' || a_course_count || CHR(10));
end loop;
close c1;
end;
/


--4
set serveroutput on;

declare
a_dept_name department.dept_name%type;
a_max_id student.id%type;
a_new_id student.id%type;

cursor c1 is
select dept_name
from (
select dept_name, count(*) as student_count
from student
group by dept_name
order by student_count asc
)
where rownum = 1;

cursor c2 is
select max(id) as max_id
from student;

begin
-- fetch dept
open c1;
fetch c1 into a_dept_name;
close c1;

-- fetch max id
open c2;
fetch c2 into a_max_id;
close c2;

a_new_id := to_number(a_max_id) + 1;

-- insert
insert into student (id, name, dept_name, tot_cred) values (to_char(a_new_id), 'jane doe', a_dept_name, 0);

end;
/

--5
set serveroutput on;

declare
a_student_id student.id%type;
a_student_name student.name%type;
a_dept_name student.dept_name%type;
a_instructor_id instructor.id%type;
a_instructor_name instructor.name%type;
a_advised_count number;

cursor c1 is
select id, name, dept_name
from student
where id not in
(
select s_id from advisor
);

cursor c2(dept_name_in varchar2) is
select id, name
from
(
select i.id, i.name, count(a.s_id) as advised_count
from instructor i
left join advisor a on i.id = a.i_id
where i.dept_name = dept_name_in
group by i.id, i.name
order by advised_count asc
)
where rownum = 1;

begin
open c1;

loop
fetch c1 into a_student_id, a_student_name, a_dept_name;
exit when c1%notfound;

open c2(a_dept_name);
fetch c2 into a_instructor_id, a_instructor_name;
close c2;

insert into advisor (s_id, i_id)
values (a_student_id, a_instructor_id);

select count(*) into a_advised_count
from advisor
where i_id = a_instructor_id;

dbms_output.put_line('student: ' || a_student_name || ', advisor: ' || a_instructor_name || ', students advised: ' || a_advised_count);
end loop;

close c1;
end;
/
