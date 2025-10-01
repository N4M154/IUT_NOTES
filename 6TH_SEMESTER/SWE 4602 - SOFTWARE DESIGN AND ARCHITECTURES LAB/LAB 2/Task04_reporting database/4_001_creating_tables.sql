DROP TABLE time;
DROP TABLE ratings;


DROP SEQUENCE time_seq;
DROP SEQUENCE ratings_seq;


CREATE SEQUENCE time_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE ratings_seq START WITH 1 INCREMENT BY 1;

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042114',
    '4_001_creating_tables.sql',
    TO_CLOB('Dropped tables and sequnces in case they clash.Created time_seq and ratings_seq sequences.')
);

CREATE TABLE time (
    time_id NUMBER PRIMARY KEY,
    full_date DATE NOT NULL,
    day NUMBER NOT NULL,
    month NUMBER NOT NULL,
    quarter NUMBER NOT NULL,
    year NUMBER NOT NULL,
    weekday VARCHAR2(10) NOT NULL
);

INSERT INTO time (time_id, full_date, day, month, quarter, year, weekday) VALUES (time_seq.NEXTVAL, DATE '2024-01-01', 1, 1, 1, 2024, 'Monday');
INSERT INTO time (time_id, full_date, day, month, quarter, year, weekday) VALUES (time_seq.NEXTVAL, DATE '2024-01-11', 11, 1, 1, 2024, 'Thursday');
INSERT INTO time (time_id, full_date, day, month, quarter, year, weekday) VALUES (time_seq.NEXTVAL, DATE '2024-01-21', 21, 1, 1, 2024, 'Sunday');
INSERT INTO time (time_id, full_date, day, month, quarter, year, weekday) VALUES (time_seq.NEXTVAL, DATE '2024-01-31', 31, 1, 1, 2024, 'Wednesday');
INSERT INTO time (time_id, full_date, day, month, quarter, year, weekday) VALUES (time_seq.NEXTVAL, DATE '2024-02-10', 10, 2, 1, 2024, 'Saturday');
INSERT INTO time (time_id, full_date, day, month, quarter, year, weekday) VALUES (time_seq.NEXTVAL, DATE '2024-02-20', 20, 2, 1, 2024, 'Tuesday');
INSERT INTO time (time_id, full_date, day, month, quarter, year, weekday) VALUES (time_seq.NEXTVAL, DATE '2024-03-01', 1, 3, 1, 2024, 'Friday');
INSERT INTO time (time_id, full_date, day, month, quarter, year, weekday) VALUES (time_seq.NEXTVAL, DATE '2024-03-11', 11, 3, 1, 2024, 'Monday');
INSERT INTO time (time_id, full_date, day, month, quarter, year, weekday) VALUES (time_seq.NEXTVAL, DATE '2024-03-21', 21, 3, 1, 2024, 'Thursday');
INSERT INTO time (time_id, full_date, day, month, quarter, year, weekday) VALUES (time_seq.NEXTVAL, DATE '2024-03-31', 31, 3, 1, 2024, 'Sunday');


INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042112',
    '4_001_creating_tables.sql',
    TO_CLOB('Created time table and inserted sample data.')
);

CREATE TABLE ratings (
    rating_id NUMBER PRIMARY KEY,
    player_id NUMBER NOT NULL,
    quest_id NUMBER NOT NULL,
    rating NUMBER(2,1) CHECK (rating BETWEEN 0 AND 5),
    FOREIGN KEY (player_id) REFERENCES player(player_id),
    FOREIGN KEY (quest_id) REFERENCES quest(quest_id)
);

INSERT INTO ratings (rating_id, player_id, quest_id, rating) VALUES (ratings_seq.NEXTVAL, 1, 1, 4.5);
INSERT INTO ratings (rating_id, player_id, quest_id, rating) VALUES (ratings_seq.NEXTVAL, 2, 3, 3.0);
INSERT INTO ratings (rating_id, player_id, quest_id, rating) VALUES (ratings_seq.NEXTVAL, 3, 2, 5.0);
INSERT INTO ratings (rating_id, player_id, quest_id, rating) VALUES (ratings_seq.NEXTVAL, 4, 5, 4.0);
INSERT INTO ratings (rating_id, player_id, quest_id, rating) VALUES (ratings_seq.NEXTVAL, 6, 6, 2.5);
INSERT INTO ratings (rating_id, player_id, quest_id, rating) VALUES (ratings_seq.NEXTVAL, 7, 7, 1.0);
INSERT INTO ratings (rating_id, player_id, quest_id, rating) VALUES (ratings_seq.NEXTVAL, 8, 8, 3.7);
INSERT INTO ratings (rating_id, player_id, quest_id, rating) VALUES (ratings_seq.NEXTVAL, 9, 9, 4.8);
INSERT INTO ratings (rating_id, player_id, quest_id, rating) VALUES (ratings_seq.NEXTVAL, 10, 10, 0.5);
INSERT INTO ratings (rating_id, player_id, quest_id, rating) VALUES (ratings_seq.NEXTVAL, 1, 5, 3.3);


INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042158',
    '000_creating_tables.sql',
    TO_CLOB('Created ratings table and inserted sample data.')
);