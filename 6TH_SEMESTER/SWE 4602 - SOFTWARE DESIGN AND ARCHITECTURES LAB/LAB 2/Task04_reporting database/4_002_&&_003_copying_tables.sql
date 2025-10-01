-- Drop tables if they exist
DROP TABLE fact_quest_participation CASCADE CONSTRAINTS;
DROP TABLE dim_region CASCADE CONSTRAINTS;   
DROP TABLE dim_player CASCADE CONSTRAINTS;
DROP TABLE dim_game_character CASCADE CONSTRAINTS;
DROP TABLE dim_item_type CASCADE CONSTRAINTS;
DROP TABLE dim_item CASCADE CONSTRAINTS;
DROP TABLE dim_player_favorite_item_type CASCADE CONSTRAINTS;
DROP TABLE dim_quest CASCADE CONSTRAINTS;
DROP TABLE dim_character_inventory CASCADE CONSTRAINTS;
DROP TABLE dim_quest_reward CASCADE CONSTRAINTS;
DROP TABLE dim_time CASCADE CONSTRAINTS;
DROP TABLE dim_ratings CASCADE CONSTRAINTS;

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042112',
    '003_copying_tables.sql',
    TO_CLOB('Dropped tables in case they clash for reporting database.')
);


-- Fact Table
CREATE TABLE fact_quest_participation AS
SELECT * FROM quest_participation;


INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042158',
    '003_copying_tables.sql',
    TO_CLOB('Created fact table for reporting database.')
);

-- Dimension Tables
CREATE TABLE dim_region AS
SELECT * FROM region;

CREATE TABLE dim_player AS
SELECT * FROM player;

CREATE TABLE dim_game_character AS
SELECT * FROM game_character;

CREATE TABLE dim_item_type AS
SELECT * FROM item_type;

CREATE TABLE dim_item AS
SELECT * FROM item;

CREATE TABLE dim_player_favorite_item_type AS
SELECT * FROM player_favorite_item_type;

CREATE TABLE dim_quest AS
SELECT * FROM quest;

CREATE TABLE dim_character_inventory AS
SELECT * FROM character_inventory;

CREATE TABLE dim_quest_reward AS
SELECT * FROM quest_reward;

CREATE TABLE dim_time AS
SELECT * FROM time;

CREATE TABLE dim_ratings AS
SELECT * FROM ratings;


INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042114',
    '003_copying_tables.sql',
    TO_CLOB('Created dimension tables for reporting database.')
);