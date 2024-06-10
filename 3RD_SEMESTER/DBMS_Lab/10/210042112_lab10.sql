--1 
--(a) Print your name.

set serveroutput on;

begin
dbms_output.put_line('My Name');
end;
/

--(b) Take your student ID as input and print its length.

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

--(c) Take two numbers as input and print their product.

set serveroutput on;

declare
num1 number;
num2 number;
product number;
begin

num1 := &Enter_First_number;
num2 := &Enter_Second_number;

product := num1 * num2;

dbms_output.put_line('The product of ' || num1 || ' and ' || num2 || ' is: ' || product);
end;
/

--(d) Print the current system time in 12-hour format.

set serveroutput on;

declare
current_time varchar2(20);
begin

current_time := to_char(sysdate, 'hh:mi:ss am');

dbms_output.put_line('The current system time is: ' || current_time);
end;
/

--(e) Take a number as input and print whether it is a whole number or a fraction.

set serveroutput on;

declare
input_number number;
remainder number;
begin

input_number := &Enter_number;
remainder := mod(input_number, 1);

if remainder = 0 then
dbms_output.put_line('The number is a whole number.');
else
dbms_output.put_line('The number is a fraction.');
end if;
end;
/

--(f) Write a procedure that takes a number as an argument and prints whether it is a composite number or not.

create or replace procedure check_composite(a_number in number) is
b_count number := 0;
begin

for i in 2..a_number/2 loop
if mod(a_number, i) = 0 then
b_count := b_count + 1;
end if;
end loop;

if b_count > 0 then
dbms_output.put_line(a_number || ' is a composite number.');
else
dbms_output.put_line(a_number || ' is not a composite number.');
end if;
end check_composite;
/

--to check
begin
check_composite(15);
end;
/

--2

--(a) Write a procedure to find the N top-rated movies and their details (Top-rated means top
highest average rating). The procedure will take N as input and print the details up to
N movies. If N is greater than the number of movies, then it will print an error message.

create or replace procedure find_top_rated_movies(p_n in number) is
v_movie_count number;
v_top_count number := p_n;
begin
-- Check if there are any movies
select count(*) into v_movie_count from movie;

if v_movie_count = 0 then
dbms_output.put_line('Error: No movies found.');
else
-- If N is greater than the number of movies, set N to the number of movies
if p_n > v_movie_count then
v_top_count := v_movie_count;
dbms_output.put_line('Note: N is greater than the number of movies. Showing details for all movies.');
end if;

-- Cursor to fetch the N top-rated movies
for movie_data in(
select
m.mov_id,
m.mov_title,
m.mov_year,
m.mov_time,
m.mov_language,
m.mov_releasedate,
m.mov_country,
avg(R.rev_stars) as avg_rating
from
movie m
join rating r on m.mov_id = r.mov_id
group by
m.mov_id,
m.mov_title,
m.mov_year,
m.mov_time,
m.mov_language,
m.mov_releasedate,
m.mov_country
order by
avg_rating desc
) loop
exit when v_top_count = 0;
      
dbms_output.put_line('Movie ID: ' || movie_data.MOV_ID);
dbms_output.put_line('Title: ' || movie_data.MOV_TITLE);
dbms_output.put_line('year: ' || movie_data.mov_year);
dbms_output.put_line('time: ' || movie_data.MOV_time);
dbms_output.put_line('language: ' || movie_data.MOV_language);
dbms_output.put_line('Release Date: ' || TO_CHAR(movie_data.MOV_releasedate, 'YYYY-MM-DD'));
dbms_output.put_line('Country: ' || movie_data.MOV_COUNTRY);
dbms_output.put_line('Average Rating: ' || TO_CHAR(movie_data.AVG_RATING, 'FM99990.999'));
dbms_output.put_line('------------------------');
      
v_top_count := v_top_count - 1;
end loop;
end if;
end find_top_rated_movies;
/

--to check
begin
find_top_rated_movies(3); 
end;
/

--(b) Write a function to find the movie status (“Solo”, “Ensemble”). If the total number of actors/actresses in a movie is 1, then the status should be “Solo”, else it should be “Ensemble”. The function will take the title of the movie as input as input and return the status.

create or replace function get_movie_status(p_title in varchar2) return varchar2 is
v_actor_count number;
v_status varchar2(10);
begin

select count(*) into v_actor_count
from casts
where mov_id = (select mov_id from movie where mov_title = p_title);


if v_actor_count = 1 then
v_status := 'Solo';
else
v_status := 'Ensemble';
end if;


return v_status;
end get_movie_status;
/

--to check
set serveroutput on;

declare
v_movie_title varchar2(50) := 'Vertigo'; 
v_movie_status varchar2(10);
begin
v_movie_status := get_movie_status(v_movie_title);
dbms_output.put_line('Movie Status for ' || v_movie_title || ': ' || v_movie_status);
end;
/

--(c) Write a procedure to find the possible nominees for the Oscars. A director is eligible for an Oscar if at least one of their movies has an average rating of at least 7. Also, the movie should be reviewed by more than 10 reviewers.

create or replace procedure find_oscar_nominees is
begin
-- Cursor to fetch eligible directors
for director_data in(
select
d.dir_id,
d.dir_firstname,
d.dir_lastname
from
director d
join direction dn on d.dir_id = dn.dir_id
join movie m on dn.mov_id = m.mov_id
join rating r on m.mov_id = r.mov_id
group by
d.dir_id,
d.dir_firstname,
d.dir_lastname
having
avg(r.rev_stars) >= 7
and count(distinct r.rev_id) > 10
) loop
dbms_output.put_line('Director ID: ' || director_data.DIR_ID);
dbms_output.put_line('Name: ' || director_data.DIR_firstname || ' ' || director_data.DIR_LASTNAME);
dbms_output.put_line('------------------------');
end loop;
end find_oscar_nominees;
/

--to check
set serveroutput on;

begin
find_oscar_nominees;
end;
/

--(d) Write a function that will take the title of the movie as input and find the movie category based on Table 1.

create or replace function get_movie_category(p_title in varchar2) return varchar2 is
v_category varchar2(20);
begin
-- Query to determine the movie category
select
case
when avg_rating > 6.5 and mov_year between 1950 and 1959 then 'Fantastic Fifties'
when avg_rating > 6.7 and mov_year between 1960 and 1969 then 'Sweet Sixties'
when avg_rating > 6.9 and mov_year between 1970 and 1979 then 'Super Seventies'
when avg_rating > 7.1 and mov_year between 1980 and 1989 then 'Ecstatic Eighties'
when avg_rating > 7.3 and mov_year between 1990 and 1999 then 'Neat Nineties'
else 'Garbage'
end
into v_category
from (
select m.mov_year, avg(r.rev_stars) as avg_rating
from movie m
join rating r on m.mov_id = r.mov_id
where m.mov_title = p_title
group by m.mov_year
);

-- return the movie category
return v_category;
end get_movie_category;
/

--to check
declare
v_movie_title varchar2(50) := 'Vertigo'; 
v_movie_category varchar2(20);
begin
v_movie_category := get_movie_category(v_movie_title);
dbms_output.put_line('Movie Category for ' || v_movie_title || ': ' || v_movie_category);
end;
/





