set serveroutput on;

--1.Write a procedure to that will take a mov_title and show the require time (hour minute) to play that movie in a cinema hall. Let say, there will be an intermission of 15 minutes after each 70 minutes only if the remaining time of the movie is greater than 30 minutes.

drop procedure required_movie_time;

create or replace procedure required_movie_time(
a_mov_title in varchar2,
a_total_time out varchar2
) as
b_total_time number;
b_remaining_time number;
b_intermission number := 15;
b_hours number;
b_minutes number;

begin
select sum(mov_time) into b_total_time
from movie
where mov_title = a_mov_title;


if b_total_time is null then
dbms_output.put_line('movie not found.');
return;
end if;

b_remaining_time := b_total_time;
while b_remaining_time > 30 loop
b_remaining_time := b_remaining_time - 70;
b_remaining_time := greatest(b_remaining_time, 0);
b_total_time := b_total_time + b_intermission;
end loop;


b_hours := trunc(b_total_time / 60);
b_minutes := mod(b_total_time, 60);


a_total_time := b_hours || ' hours ' || b_minutes || ' minutes';
dbms_output.put_line('required time to play "' || a_mov_title || '": ' || a_total_time);
end required_movie_time;
/

--to check

declare
b_total_time varchar2(50);
begin
required_movie_time('Vertigo', b_total_time);
end;
/


--2.Write a procedure to find the N top-rated movies (average rev_stars of a movie is higher than other movies). The procedure will take N as input and print the mov_title upto N movies. If N is greater then the number of movies, then it will print an error message.

drop procedure top_rated_movies;

create or replace procedure top_rated_movies(
a_n in number
) as
b_row_counter number := 0;

begin
declare
b_total_movies number;
begin
select count(*) into b_total_movies
from movie;

if a_n > b_total_movies then
dbms_output.put_line('error: n is greater than the total number of movies.');
return;
end if;
end;

for movie_rec in (
select m.mov_title
from movie m
join rating r on m.mov_id = r.mov_id
group by m.mov_title
order by avg(r.rev_stars) desc
) loop
b_row_counter := b_row_counter + 1;
exit when b_row_counter > a_n;
dbms_output.put_line(movie_rec.mov_title);
end loop;
end top_rated_movies;
/

--to check

begin
top_rated_movies(10);
end;
/

--3.Suppose, there is a scheme that for each rev_stars greater than or equal to 6, a movie will receive $10. Now write a function to calculate the yearly earning (total earning /year in
between current date and release date) of a movie that is obtained from user review.

drop function year_end_earnings;

create or replace function year_end_earnings(
movie_id in number
) return number is
total_earning number := 0;
total_years number := 0;

begin
select trunc(months_between(sysdate, mov_releasedate) / 12)
into total_years
from movie
where mov_id = movie_id;

select count(*) * 10
into total_earning
from rating
where mov_id = movie_id
and rev_stars >= 6;

if total_years = 0 then
return total_earning;
else
return total_earning / total_years;
end if;
end;
/

--to check;

declare
movie_id_to_check number := 906; 
yearly_earning number;

begin
yearly_earning := year_end_earnings(movie_id_to_check);
dbms_output.put_line('yearly earning for movie id ' || movie_id_to_check || ': $' || yearly_earning);
end;
/

--4.Write a function, that given a genre (gen_id) will return genre status, additionally the review count and average rating of that genre.

drop function get_genre_status;

create or replace function genre_status(
a_gen_id in number
)
return varchar2 is
b_review_count number;
b_avg_rating number;
b_avg_review_count_all_genres number;
b_avg_rating_all_genres number;
b_genre_status varchar2(50);

begin
select count(*), avg(r.rev_stars)
into b_review_count, b_avg_rating
from rating r
join mtype mt on r.mov_id = mt.mov_id
where mt.gen_id = a_gen_id;

select avg(review_count), avg(avg_rating)
into b_avg_review_count_all_genres, b_avg_rating_all_genres
from (
select count(*) as review_count, avg(r.rev_stars) as avg_rating
from rating r
join mtype mt on r.mov_id = mt.mov_id
group by mt.gen_id
);

if b_review_count > b_avg_review_count_all_genres and b_avg_rating > b_avg_rating_all_genres then
b_genre_status := 'people''s favorite'; -- modified the string
elsif b_review_count > b_avg_review_count_all_genres and b_avg_rating < b_avg_rating_all_genres then
b_genre_status := 'widely watched';
elsif b_review_count < b_avg_review_count_all_genres and b_avg_rating > b_avg_rating_all_genres then
b_genre_status := 'highly rated';
else
b_genre_status := 'so so';
end if;

return b_genre_status || ' - review count: ' || to_char(b_review_count) ||
', average rating: ' || to_char(b_avg_rating);
end;
/

--to check

declare
b_status varchar2(200);

begin
b_status := genre_status(1001);
dbms_output.put_line('Genre Status: ' || b_status);
end;
/

--5.rite a function, that given two dates will return the most frequent genre of that time (according to movie count) along with the count of movies under that genre which had been released in the given time range .

drop function most_frequent_genre;

create or replace function most_frequent_genre(
start_date in date,
end_date in date
) return varchar2 is
genre_name varchar2(20);
genre_count number;

begin
select gen_title, genre_movie_count into genre_name, genre_count
from (
select g.gen_title, count(*) as genre_movie_count
from genres g
join mtype mt on g.gen_id = mt.gen_id
join movie m on mt.mov_id = m.mov_id
where m.mov_releasedate between start_date and end_date
group by gen_title
order by count(*) desc
)
where rownum = 1;

return genre_name || ' - movie count: ' || genre_count;

exception
when no_data_found then
return 'no movies found within the specified date range.';
end;
/

--to check
declare
most_frequent_genre_info varchar2(50);
begin
most_frequent_genre_info := most_frequent_genre(to_date('1980-05-23', 'yyyy-mm-dd'), to_date('2018-08-17', 'yyyy-mm-dd'));
dbms_output.put_line('Most frequent genre: ' || most_frequent_genre_info);
end;
/





