--1
--a.Print your first name.

set serveroutput on;

declare
a_name varchar2(80);
begin
a_name:='Namisa';
dbms_output.put_line('First Name: '|| a_name);
end;
/

--b.Take your student ID as input and print its length.
set serveroutput on;

declare
student_id varchar2(10);
id_length  number;
begin

student_id := &Enter_Student_ID;
id_length := length(student_id);

dbms_output.put_line('The length of the student ID is: ' || id_length);
end;
/

--2
--a
/*Set the salary of each instructor to 9000X where X is the total credits of the courses taught by the instructor.
 Print the names of the instructors whose salaries remain unchanged.*/

set serveroutput on;
 
create or replace procedure updateinstructorsalaries is
cursor c1 is
select i.id, i.name, i.salary, sum(c.credits) as total_credits
from instructor i
join teaches t on i.id = t.id
join course c on t.course_id = c.course_id
group by i.id, i.name, i.salary;

new_salary instructor.salary%type;
begin
for rec in c1 loop
new_salary := 9000 * rec.total_credits;

if new_salary != rec.salary then
update instructor
set salary = new_salary
where id = rec.id;

dbms_output.put_line('salary updated for ' || rec.name || ': ' || rec.salary || ' ---> ' || new_salary);
else
dbms_output.put_line('salary remains unchanged for: ' || rec.name);
end if;
end loop;

commit;
end updateinstructorsalaries;
/

exec UpdateInstructorSalaries;

--b
/*Considering the pre-requisite(s) for each course, print the course title and the names of the students who can
 enroll in them.*/

set serveroutput on;

create or replace procedure prerequisite is
cursor c1 is
select c.title, s.name
from course c
join prereq p on c.course_id = p.course_id
join takes t on p.prereq_id = t.course_id
join student s on t.id = s.id;

begin
for rec in c1 loop
dbms_output.put_line('course title: ' || rec.title || CHR(10) ||'student name: ' || rec.name||CHR(10));
end loop;
end prerequisite;
/
exec prerequisite;

--c
/*Take the name of the student as input from the user. Then print the weekly routine for the student. Each class
 should be printed in the following format:
 <Day>
 <Start Time>- <End Time>
 <Course ID>- <Title>
 <Building>- <Room>
 The days should be sorted based on the regular order of weekdays starting from Monday. If there are multiple
 classes scheduled on the same day, they should be sorted based on the starting time*/

set serveroutput on;

create or replace procedure studentroutine(s_student_name in varchar2) as
begin
for re in 
(select s.name, c.course_id, c.title, ts.day, ts.start_hr, ts.start_min, ts.end_hr, ts.end_min, sec.building, sec.room_number
from student s
left join takes t on s.id = t.id
left join section sec on t.course_id = sec.course_id
left join time_slot ts on sec.time_slot_id = ts.time_slot_id
left join course c on sec.course_id = c.course_id
where s.name = s_student_name
order by ts.day, ts.start_hr, ts.start_min
) loop
dbms_output.put_line('student name: ' || re.name );
dbms_output.put_line('course id: ' || re.course_id );
dbms_output.put_line('course title: ' || re.title );
dbms_output.put_line('day: ' || re.day );
dbms_output.put_line('start time: ' || re.start_hr || ':' || re.start_min );
dbms_output.put_line('end time: ' || re.end_hr || ':' || re.end_min );
dbms_output.put_line('building: ' || re.building);
dbms_output.put_line('room number: ' || re.room_number);
end loop;
end;
/

--check
begin
StudentRoutine('&student_name');
end;
/



--d
/*Find out the list of instructors who do not have any students assigned to them. Then assign them students from
 the same department who do not have any advisor. If there are multiple students from the same department that
 meet the criteria, then select the one with the lowest tot_cred. After that, print the names of the instructors
 who still do not have any students assigned to them.*/

set serveroutput on;

declare
cursor c_instructor is
select i.id, i.name, i.dept_name
from instructor i
left join advisor a on i.id = a.i_id
where a.i_id is null
order by i.dept_name;

cursor c_student is
select s.id, s.name, s.dept_name, s.tot_cred
from student s
left join advisor a on s.id = a.s_id
where a.s_id is null
order by s.dept_name, s.tot_cred;

instructor_id instructor.id%type;
instructor_name instructor.name%type;
instructor_dept instructor.dept_name%type;

student_id student.id%type;
student_name student.name%type;
student_dept student.dept_name%type;
student_tot_cred student.tot_cred%type;

begin
for i_rec in c_instructor loop
instructor_id := i_rec.id;
instructor_name := i_rec.name;
instructor_dept := i_rec.dept_name;

for s_rec in c_student loop
student_id := s_rec.id;
student_name := s_rec.name;
student_dept := s_rec.dept_name;
student_tot_cred := s_rec.tot_cred;

if instructor_dept = student_dept then
insert into advisor values (student_id, instructor_id);
dbms_output.put_line('student ' || student_name || ' assigned to instructor ' || instructor_name);
exit;
end if;
end loop;
end loop;

for i_rec in c_instructor loop
instructor_id := i_rec.id;
instructor_name := i_rec.name;
instructor_dept := i_rec.dept_name;


dbms_output.put_line('instructor ' || instructor_name || ' does not have any students assigned to them.');

end loop;
end;
/


--e
/* Insert a new instructor named ‘John Doe’ in the INSTRUCTOR table. The instructor should be enrolled in the
 department having the highest number of students. The ID of the instructor will be (X − 1), where X is the
 lowest ID value among the existing instructors. The salary of the instructor should be the average among all the
 instructors of the same department. Finally, print the information of the instructor.*/

set serveroutput on;

declare
lowest_id number;
highest_dept department.dept_name%type;
avg_salary number;

begin
--lowest ID among the existing instructors
select min(id) into lowest_id from instructor;

--department with the highest number of students
select dept_name into highest_dept
from 
(select dept_name, count(*) as student_count
from student
group by dept_name
order by count(*) desc
)
where rownum = 1;

--calculate the average salary for the selected department
select avg(salary) into avg_salary
from instructor
where dept_name = highest_dept;

--insert a new instructor named 'john doe'
insert into instructor(id, name, dept_name, salary) values (lowest_id - 1, 'john doe', highest_dept, avg_salary);

dbms_output.put_line('instructor inserted successfully:');
dbms_output.put_line('id: ' || (lowest_id - 1));
dbms_output.put_line('name: john doe');
dbms_output.put_line('department: ' || highest_dept);
dbms_output.put_line('salary: ' || avg_salary);
end;
/

