-- --Find the name of the director of the movie having the highest average rating.

select DIR_FIRSTNAME||' '||DIR_LASTNAME as name, a_r
from director d, DIRECTION t, (
select MOV_ID, avg(REV_STARS) a_r
from rating
group by MOV_ID
having avg(REV_STARS)>=(
select max(a_r)
from (select MOV_ID, avg(REV_STARS) a_r
from rating
group by MOV_ID))) M
where d.DIR_ID=t.DIR_ID and
t.MOV_ID=M.MOV_ID;

-- alternative

select DIR_FIRSTNAME||' '||DIR_LASTNAME as name, a_r
from director d, DIRECTION t, (
select MOV_ID, avg(REV_STARS) a_r
from rating
group by MOV_ID
having avg(REV_STARS)>= All (
select avg(REV_STARS) a_r
from rating
group by MOV_ID)) M
where d.DIR_ID=t.DIR_ID and
t.MOV_ID=M.MOV_ID;





-- --Find the movies and their maximum rating where the minimum number of review is 10 and
-- the minimum movie rating is 3.





-- --Find the movie genre where the male actors acted the most.

select g.GEN_TITLE, count(a.ACT_ID)
from ACTOR a, CASTS c, MTYPE t, GENRES g
where a.ACT_ID=c.ACT_ID and
c.MOV_ID=t.MOV_ID and
t.GEN_ID=g.GEN_ID and
a.ACT_GENDER='M'
group by t.GEN_ID, g.GEN_TITLE
having count(a.ACT_ID)>=(
select max(c_a) from (
select GEN_ID, count(a.ACT_ID) c_a
from ACTOR a, CASTS c, MTYPE t 
where a.ACT_ID=c.ACT_ID and
c.MOV_ID=t.MOV_ID and
a.ACT_GENDER='M'
group by GEN_ID));

-- alternative

Select GEN_TITLE
from GENRES g, (
select a.*, ROWNUM as rank 
from ((select GEN_ID, count(a.ACT_ID) c_a
from ACTOR a, CASTS c, MTYPE t 
where a.ACT_ID=c.ACT_ID and
c.MOV_ID=t.MOV_ID and
a.ACT_GENDER='M'
group by GEN_ID
order by count(a.ACT_ID) desc) a))b 
where g.GEN_ID=b.GEN_ID and
b.rank=1;

;





-- --Find all the movie genre where the number of actors acted is greater then the number of
-- actresses acted.


Select M.GEN_ID, G.GEN_TITLE
from 
(select GEN_ID, count(a.ACT_ID) c_M_a
from ACTOR a, CASTS c, MTYPE t 
where a.ACT_ID=c.ACT_ID and
c.MOV_ID=t.MOV_ID and
a.ACT_GENDER='M'
group by GEN_ID) M,
(select GEN_ID, count(a.ACT_ID) c_F_a
from ACTOR a, CASTS c, MTYPE t 
where a.ACT_ID=c.ACT_ID and
c.MOV_ID=t.MOV_ID and
a.ACT_GENDER='F'
group by GEN_ID) F, GENRES G
where M.GEN_ID =F.GEN_ID (+) and
M.GEN_ID=G.GEN_ID
and nvl(M.c_M_a,0)>nvl(F.c_F_a,0);



CREATE OR REPLACE VIEW MOVIE_SUMMARY AS
SELECT MOV_ID , MOV_TITLE , MOV_LANGUAGE
FROM MOVIE ;



CREATE OR REPLACE VIEW GOOD_DIRECTION AS
SELECT S.MOV_TITLE, DIR_FIRSTNAME, DIR_LASTNAME, S.AVG_RAT
FROM (SELECT MOV_TITLE, AVG(REV_STARS) AS AVG_RAT
            FROM MOVIE NATURAL JOIN RATING
            GROUP BY MOV_TITLE) S, MOVIE V, DIRECTION T, DIRECTOR C
WHERE S.MOV_TITLE=V.MOV_TITLE AND V.MOV_ID=T.MOV_ID AND T.DIR_ID=C.DIR_ID AND
AVG_RAT>=(SELECT AVG(REV_STARS) AS AVG_RAT
            FROM MOVIE NATURAL JOIN RATING);



select * from GOOD_DIRECTION;

Delete from GOOD_DIRECTION 
where AVG_RAT<7;

CREATE ROLE Viewer;
GRANT SELECT ON  MOVIE TO Viewer ;
GRANT SELECT ON  RATING TO Viewer ;

GRANT SELECT ON  MOVIE_SUMMARY TO Viewer ;
GRANT SELECT ON  GOOD_DIRECTION TO Viewer ;

REVOKE ALL ON GOOD_DIRECTION From Viewer ;
REVOKE ALL ON RATING From Viewer ;

GRANT INSERT ON  RATING TO Reviewer ;

CREATE ROLE Admin ;
GRANT SELECT , INSERT , UPDATE , DELETE ON MOVIE TO Admin ;


create user V_103 identified by test123 ;
grant all privileges to V_103;
create user R_432 identified by test123 ;
grant all privileges to R_432;
create user Admin_01 identified by test123 ;
grant all privileges to Admin_01;


grant Viewer to V_103;
grant Reviewer to R_432;
grant Admin to Admin_01;


insert into Sristy.Rating values (913, 9010, 5);

