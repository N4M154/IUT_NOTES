--1
set serveroutput on;

declare
a_name varchar2(80);
begin
a_name:='Bravo';
dbms_output.put_line('Name of my set: '|| a_name);
end;
/

--2
select mov_country, most_frequent_genre
from (
select mov.mov_country, gen.gen_title as most_frequent_genre, row_number() over (partition by mov.mov_country order by count(*) desc) as genre_rank
from
movie mov, mtype, genres gen
where
mov.mov_id = mtype.mov_id
and mtype.gen_id = gen.gen_id
group by mov.mov_country, gen.gen_title
) rankedgenres
where genre_rank = 1;

--3
select distinct
director.dir_firstname, director.dir_lastname
from director
where
director.dir_id in (
select distinct
direction.dir_id
from direction, rating
where
direction.mov_id = rating.mov_id
and rating.rev_stars in (
select distinct
rev_stars
from (
select rev_stars, dense_rank() over (order by rev_stars desc) as rnk
from rating
) ranked_ratings
where
rnk in (2, 3, 5)
)
);

--4

--5

--6
