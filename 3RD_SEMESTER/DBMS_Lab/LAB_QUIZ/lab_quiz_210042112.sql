--DDL
--TEAM TABLE

create table team
(
team_id char(3),
name varchar2(50),
city_name varchar(50),
constraint pk_team_id primary key(team_id)
);

--PLAYER TABLE

create table
(
player_number_id char(3),
name varchar2(50),
dob date,
start_year char(4),
position varchar(10),
goal_number int,
yellow_card boolean,
red_card boolean,
constraint pk_player_number_id primary key(player_number_id)
);

--MATCH TABLE

create table match
(
match_id char(3),
match_date date,
match_city varchar2(20),
home_team_score int,
opponent_team_score int
player_number_id char(3),
constraint pk_match_id primary key(match_id),
constraint fk_player_number_id foreign key(player_number_id) references player(player_number_id),
constraint fk_team_id foreign key(team_id) references team(team_id)
);

--REFEREE TABLE

create table referee
(
ref_id char(3),
referee_type varchar(10),
ref_name varchar2(50),
ref_dob date,
years_of_experience int,
constraint pk_ref_id primary key(ref_id),
constraint fk_match_id foreign key(match_id) references match(match_id)
);


--QUERY 1

select count(*)
from match m
where m.home_team_score>m.opponent_team_score
and m.match_city=
(select city_name from team t 
where t.team_id = m.team_id);


--QUERY 2

select m.match_date,m.home_team_score,m.opponent_team_score,(
select count(*) 
from player p
where p.player_number_id=m.player_number_id
and p.yellow_card=1) as home_team_yellow,(
select count(*) 
from player p
where p.player_number_id<>m.player_number_id
and p.yellow_card=1) as opponent_team_yellow,(
select count(*) 
from player p
where p.player_number_id=m.player_number_id
and p.red_card=1) as home_team_red,(
select count(*) 
from player p
where p.player_number_id<>m.player_number_id
and p.red_card=1) as opponent_team_red
from match m;

--VIEW

create view match_history as
select
m.match_date,m.home_team_score,m.opponent_team_score,(
select t.name from team t
where m.home_team_score>m.opponent_team_score
and t.team_id=m.team_id
union all
select t.name from team t
where m.home_team_score<m.opponent_team_score
and t.team_id=m.team_id) as winner_team,(
select max(goal_number)
from player p
where p.player_number_id=(
select m.player_number_id
from match m)
)as highest_goal
from match m;






 