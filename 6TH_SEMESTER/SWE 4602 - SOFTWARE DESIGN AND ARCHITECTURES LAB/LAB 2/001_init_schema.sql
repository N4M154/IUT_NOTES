-- DROPS

DROP INDEX idx_character_player;
DROP INDEX idx_inventory_character;
DROP INDEX idx_quest_participation_quest;
DROP INDEX idx_quest_reward_quest;
DROP INDEX idx_qp_char;

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042112',
    '001_init_schema.sql',
    TO_CLOB('Dropped indices in case they clash.')
);

DROP TABLE quest_reward CASCADE CONSTRAINTS;
DROP TABLE quest_participation CASCADE CONSTRAINTS;
DROP TABLE character_inventory CASCADE CONSTRAINTS;
DROP TABLE quest CASCADE CONSTRAINTS;
DROP TABLE player_favorite_item_type CASCADE CONSTRAINTS;
DROP TABLE item CASCADE CONSTRAINTS;
DROP TABLE item_type CASCADE CONSTRAINTS;
DROP TABLE game_character CASCADE CONSTRAINTS;
DROP TABLE player CASCADE CONSTRAINTS;
DROP TABLE region CASCADE CONSTRAINTS;

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042158',
    '001_init_schema.sql',
    TO_CLOB('Dropped tables in case they clash.')
);


DROP SEQUENCE region_seq;
DROP SEQUENCE player_seq;
DROP SEQUENCE character_seq;
DROP SEQUENCE item_type_seq;
DROP SEQUENCE item_seq;
DROP SEQUENCE participation_seq;
DROP SEQUENCE quest_seq;

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042114',
    '001_init_schema.sql',
    TO_CLOB('Dropped sequences in case they clash.')
);

-- DDLs

CREATE SEQUENCE region_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE player_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE character_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE item_type_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE item_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE participation_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE quest_seq START WITH 1 INCREMENT BY 1;

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042112',
    '001_init_schema.sql',
    TO_CLOB('Created sequences for region, player, character, item_type, item, participation, and quest.')
);

CREATE TABLE region (
    region_id NUMBER PRIMARY KEY,
    name VARCHAR2(50) NOT NULL,
    description CLOB
);

INSERT INTO region (region_id, name, description) VALUES (region_seq.NEXTVAL, 'Region1', 'Description of Region 1');
INSERT INTO region (region_id, name, description) VALUES (region_seq.NEXTVAL, 'Region2', 'Description of Region 2');
INSERT INTO region (region_id, name, description) VALUES (region_seq.NEXTVAL, 'Region3', 'Description of Region 3');
INSERT INTO region (region_id, name, description) VALUES (region_seq.NEXTVAL, 'Region4', 'Description of Region 4');
INSERT INTO region (region_id, name, description) VALUES (region_seq.NEXTVAL, 'Region5', 'Description of Region 5');
INSERT INTO region (region_id, name, description) VALUES (region_seq.NEXTVAL, 'Region6', 'Description of Region 6');
INSERT INTO region (region_id, name, description) VALUES (region_seq.NEXTVAL, 'Region7', 'Description of Region 7');
INSERT INTO region (region_id, name, description) VALUES (region_seq.NEXTVAL, 'Region8', 'Description of Region 8');
INSERT INTO region (region_id, name, description) VALUES (region_seq.NEXTVAL, 'Region9', 'Description of Region 9');
INSERT INTO region (region_id, name, description) VALUES (region_seq.NEXTVAL, 'Region10', 'Description of Region 10');

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042158',
    '001_init_schema.sql',
    TO_CLOB('Created region table and inserted sample data.')
);

CREATE TABLE player (
    player_id NUMBER PRIMARY KEY,
    username VARCHAR2(50) NOT NULL UNIQUE,
    email VARCHAR2(100) NOT NULL UNIQUE,
    password_hash VARCHAR2(255) NOT NULL,
    region_id NUMBER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    FOREIGN KEY (region_id) REFERENCES region(region_id)
);

INSERT INTO player (player_id, username, email, password_hash, region_id, created_at, last_login) VALUES (player_seq.NEXTVAL, 'user1', 'user1@example.com', 'hash1', 1, SYSTIMESTAMP, SYSTIMESTAMP);
INSERT INTO player (player_id, username, email, password_hash, region_id, created_at, last_login) VALUES (player_seq.NEXTVAL, 'user2', 'user2@example.com', 'hash2', 5, SYSTIMESTAMP, SYSTIMESTAMP);
INSERT INTO player (player_id, username, email, password_hash, region_id, created_at, last_login) VALUES (player_seq.NEXTVAL, 'user3', 'user3@example.com', 'hash3', 2, SYSTIMESTAMP, SYSTIMESTAMP);
INSERT INTO player (player_id, username, email, password_hash, region_id, created_at, last_login) VALUES (player_seq.NEXTVAL, 'user4', 'user4@example.com', 'hash4', 8, SYSTIMESTAMP, SYSTIMESTAMP);
INSERT INTO player (player_id, username, email, password_hash, region_id, created_at, last_login) VALUES (player_seq.NEXTVAL, 'user5', 'user5@example.com', 'hash5', 3, SYSTIMESTAMP, SYSTIMESTAMP);
INSERT INTO player (player_id, username, email, password_hash, region_id, created_at, last_login) VALUES (player_seq.NEXTVAL, 'user6', 'user6@example.com', 'hash6', 9, SYSTIMESTAMP, SYSTIMESTAMP);
INSERT INTO player (player_id, username, email, password_hash, region_id, created_at, last_login) VALUES (player_seq.NEXTVAL, 'user7', 'user7@example.com', 'hash7', 2, SYSTIMESTAMP, SYSTIMESTAMP);
INSERT INTO player (player_id, username, email, password_hash, region_id, created_at, last_login) VALUES (player_seq.NEXTVAL, 'user8', 'user8@example.com', 'hash8', 2, SYSTIMESTAMP, SYSTIMESTAMP);
INSERT INTO player (player_id, username, email, password_hash, region_id, created_at, last_login) VALUES (player_seq.NEXTVAL, 'user9', 'user9@example.com', 'hash9', 8, SYSTIMESTAMP, SYSTIMESTAMP);
INSERT INTO player (player_id, username, email, password_hash, region_id, created_at, last_login) VALUES (player_seq.NEXTVAL, 'user10', 'user10@example.com', 'hash10', 10, SYSTIMESTAMP, SYSTIMESTAMP);

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042114',
    '001_init_schema.sql',
    TO_CLOB('Created player table and inserted sample data.')
);

CREATE TABLE game_character (
    character_id NUMBER PRIMARY KEY,
    player_id NUMBER NOT NULL,
    name VARCHAR2(50) NOT NULL,
    class VARCHAR2(30) NOT NULL,
    char_level NUMBER DEFAULT 1,
    experience NUMBER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES player(player_id),
    UNIQUE (player_id, name)
);

INSERT INTO game_character (character_id, player_id, name, class, char_level, experience, created_at) VALUES (character_seq.NEXTVAL, 1, 'Char1', 'Class1', 2, 374, SYSTIMESTAMP);
INSERT INTO game_character (character_id, player_id, name, class, char_level, experience, created_at) VALUES (character_seq.NEXTVAL, 5, 'Char2', 'Class3', 9, 381, SYSTIMESTAMP);
INSERT INTO game_character (character_id, player_id, name, class, char_level, experience, created_at) VALUES (character_seq.NEXTVAL, 7, 'Char3', 'Class1', 4, 561, SYSTIMESTAMP);
INSERT INTO game_character (character_id, player_id, name, class, char_level, experience, created_at) VALUES (character_seq.NEXTVAL, 10, 'Char4', 'Class2', 5, 61, SYSTIMESTAMP);
INSERT INTO game_character (character_id, player_id, name, class, char_level, experience, created_at) VALUES (character_seq.NEXTVAL, 7, 'Char5', 'Class2', 1, 949, SYSTIMESTAMP);
INSERT INTO game_character (character_id, player_id, name, class, char_level, experience, created_at) VALUES (character_seq.NEXTVAL, 8, 'Char6', 'Class3', 9, 915, SYSTIMESTAMP);
INSERT INTO game_character (character_id, player_id, name, class, char_level, experience, created_at) VALUES (character_seq.NEXTVAL, 8, 'Char7', 'Class2', 7, 315, SYSTIMESTAMP);
INSERT INTO game_character (character_id, player_id, name, class, char_level, experience, created_at) VALUES (character_seq.NEXTVAL, 9, 'Char8', 'Class1', 7, 829, SYSTIMESTAMP);
INSERT INTO game_character (character_id, player_id, name, class, char_level, experience, created_at) VALUES (character_seq.NEXTVAL, 1, 'Char9', 'Class2', 2, 757, SYSTIMESTAMP);
INSERT INTO game_character (character_id, player_id, name, class, char_level, experience, created_at) VALUES (character_seq.NEXTVAL, 1, 'Char10', 'Class2', 10, 766, SYSTIMESTAMP);

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042112',
    '001_init_schema.sql',
    TO_CLOB('Created game_character table and inserted sample data.')
);

CREATE TABLE item_type (
    item_type_id NUMBER PRIMARY KEY,
    name VARCHAR2(50) NOT NULL UNIQUE,
    description CLOB
);

INSERT INTO item_type (item_type_id, name, description) VALUES (item_type_seq.NEXTVAL, 'ItemType1', 'Description for item type 1');
INSERT INTO item_type (item_type_id, name, description) VALUES (item_type_seq.NEXTVAL, 'ItemType2', 'Description for item type 2');
INSERT INTO item_type (item_type_id, name, description) VALUES (item_type_seq.NEXTVAL, 'ItemType3', 'Description for item type 3');
INSERT INTO item_type (item_type_id, name, description) VALUES (item_type_seq.NEXTVAL, 'ItemType4', 'Description for item type 4');
INSERT INTO item_type (item_type_id, name, description) VALUES (item_type_seq.NEXTVAL, 'ItemType5', 'Description for item type 5');
INSERT INTO item_type (item_type_id, name, description) VALUES (item_type_seq.NEXTVAL, 'ItemType6', 'Description for item type 6');
INSERT INTO item_type (item_type_id, name, description) VALUES (item_type_seq.NEXTVAL, 'ItemType7', 'Description for item type 7');
INSERT INTO item_type (item_type_id, name, description) VALUES (item_type_seq.NEXTVAL, 'ItemType8', 'Description for item type 8');
INSERT INTO item_type (item_type_id, name, description) VALUES (item_type_seq.NEXTVAL, 'ItemType9', 'Description for item type 9');
INSERT INTO item_type (item_type_id, name, description) VALUES (item_type_seq.NEXTVAL, 'ItemType10', 'Description for item type 10');

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042158',
    '001_init_schema.sql',
    TO_CLOB('Created item_type table and inserted sample data.')
);

CREATE TABLE item (
    item_id NUMBER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    item_type_id NUMBER NOT NULL,
    rarity VARCHAR2(20) NOT NULL,
    base_value NUMBER NOT NULL,
    description CLOB,
    FOREIGN KEY (item_type_id) REFERENCES item_type(item_type_id)
);

INSERT INTO item (item_id, name, item_type_id, rarity, base_value, description) VALUES (item_seq.NEXTVAL, 'Item1', 5, 'Common', 11, 'Item 1 description.');
INSERT INTO item (item_id, name, item_type_id, rarity, base_value, description) VALUES (item_seq.NEXTVAL, 'Item2', 6, 'Common', 72, 'Item 2 description.');
INSERT INTO item (item_id, name, item_type_id, rarity, base_value, description) VALUES (item_seq.NEXTVAL, 'Item3', 9, 'Common', 83, 'Item 3 description.');
INSERT INTO item (item_id, name, item_type_id, rarity, base_value, description) VALUES (item_seq.NEXTVAL, 'Item4', 8, 'Common', 67, 'Item 4 description.');
INSERT INTO item (item_id, name, item_type_id, rarity, base_value, description) VALUES (item_seq.NEXTVAL, 'Item5', 5, 'Common', 48, 'Item 5 description.');
INSERT INTO item (item_id, name, item_type_id, rarity, base_value, description) VALUES (item_seq.NEXTVAL, 'Item6', 10, 'Common', 91, 'Item 6 description.');
INSERT INTO item (item_id, name, item_type_id, rarity, base_value, description) VALUES (item_seq.NEXTVAL, 'Item7', 7, 'Common', 61, 'Item 7 description.');
INSERT INTO item (item_id, name, item_type_id, rarity, base_value, description) VALUES (item_seq.NEXTVAL, 'Item8', 9, 'Common', 42, 'Item 8 description.');
INSERT INTO item (item_id, name, item_type_id, rarity, base_value, description) VALUES (item_seq.NEXTVAL, 'Item9', 5, 'Common', 42, 'Item 9 description.');
INSERT INTO item (item_id, name, item_type_id, rarity, base_value, description) VALUES (item_seq.NEXTVAL, 'Item10', 7, 'Common', 58, 'Item 10 description.');

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042114',
    '001_init_schema.sql',
    TO_CLOB('Created item_id table and inserted sample data.')
);


CREATE TABLE player_favorite_item_type (
    player_id NUMBER NOT NULL,
    item_type_id NUMBER NOT NULL,
    marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (player_id, item_type_id),
    FOREIGN KEY (player_id) REFERENCES player(player_id),
    FOREIGN KEY (item_type_id) REFERENCES item_type(item_type_id)
);

INSERT INTO player_favorite_item_type (player_id, item_type_id, marked_at) VALUES (1, 4, SYSTIMESTAMP);
INSERT INTO player_favorite_item_type (player_id, item_type_id, marked_at) VALUES (9, 9, SYSTIMESTAMP);
INSERT INTO player_favorite_item_type (player_id, item_type_id, marked_at) VALUES (9, 6, SYSTIMESTAMP);
INSERT INTO player_favorite_item_type (player_id, item_type_id, marked_at) VALUES (1, 2, SYSTIMESTAMP);
INSERT INTO player_favorite_item_type (player_id, item_type_id, marked_at) VALUES (3, 4, SYSTIMESTAMP);
INSERT INTO player_favorite_item_type (player_id, item_type_id, marked_at) VALUES (10, 3, SYSTIMESTAMP);
INSERT INTO player_favorite_item_type (player_id, item_type_id, marked_at) VALUES (4, 4, SYSTIMESTAMP);
INSERT INTO player_favorite_item_type (player_id, item_type_id, marked_at) VALUES (6, 4, SYSTIMESTAMP);
INSERT INTO player_favorite_item_type (player_id, item_type_id, marked_at) VALUES (8, 3, SYSTIMESTAMP);
INSERT INTO player_favorite_item_type (player_id, item_type_id, marked_at) VALUES (6, 4, SYSTIMESTAMP);

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042112',
    '001_init_schema.sql',
    TO_CLOB('Created player_favorite_item_type table and inserted sample data.')
);

CREATE TABLE quest (
    quest_id NUMBER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    description CLOB,
    min_level NUMBER DEFAULT 1,
    reward_experience NUMBER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO quest (quest_id, name, description, min_level, reward_experience, created_at) VALUES (quest_seq.NEXTVAL, 'Quest1', 'Description for Quest 1', 2, 813, SYSTIMESTAMP);
INSERT INTO quest (quest_id, name, description, min_level, reward_experience, created_at) VALUES (quest_seq.NEXTVAL, 'Quest2', 'Description for Quest 2', 5, 488, SYSTIMESTAMP);
INSERT INTO quest (quest_id, name, description, min_level, reward_experience, created_at) VALUES (quest_seq.NEXTVAL, 'Quest3', 'Description for Quest 3', 5, 756, SYSTIMESTAMP);
INSERT INTO quest (quest_id, name, description, min_level, reward_experience, created_at) VALUES (quest_seq.NEXTVAL, 'Quest4', 'Description for Quest 4', 4, 212, SYSTIMESTAMP);
INSERT INTO quest (quest_id, name, description, min_level, reward_experience, created_at) VALUES (quest_seq.NEXTVAL, 'Quest5', 'Description for Quest 5', 3, 668, SYSTIMESTAMP);
INSERT INTO quest (quest_id, name, description, min_level, reward_experience, created_at) VALUES (quest_seq.NEXTVAL, 'Quest6', 'Description for Quest 6', 3, 224, SYSTIMESTAMP);
INSERT INTO quest (quest_id, name, description, min_level, reward_experience, created_at) VALUES (quest_seq.NEXTVAL, 'Quest7', 'Description for Quest 7', 2, 637, SYSTIMESTAMP);
INSERT INTO quest (quest_id, name, description, min_level, reward_experience, created_at) VALUES (quest_seq.NEXTVAL, 'Quest8', 'Description for Quest 8', 3, 199, SYSTIMESTAMP);
INSERT INTO quest (quest_id, name, description, min_level, reward_experience, created_at) VALUES (quest_seq.NEXTVAL, 'Quest9', 'Description for Quest 9', 1, 225, SYSTIMESTAMP);
INSERT INTO quest (quest_id, name, description, min_level, reward_experience, created_at) VALUES (quest_seq.NEXTVAL, 'Quest10', 'Description for Quest 10', 2, 352, SYSTIMESTAMP);

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042158',
    '001_init_schema.sql',
    TO_CLOB('Created quest table and inserted sample data.')
);

CREATE TABLE character_inventory (
    character_id NUMBER NOT NULL,
    item_id NUMBER NOT NULL,
    quantity NUMBER DEFAULT 1,
    acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (character_id, item_id),
    FOREIGN KEY (character_id) REFERENCES game_character(character_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);

INSERT INTO character_inventory (character_id, item_id, quantity, acquired_at) VALUES (4, 5, 3, SYSTIMESTAMP);
INSERT INTO character_inventory (character_id, item_id, quantity, acquired_at) VALUES (10, 5, 3, SYSTIMESTAMP);
INSERT INTO character_inventory (character_id, item_id, quantity, acquired_at) VALUES (7, 3, 3, SYSTIMESTAMP);
INSERT INTO character_inventory (character_id, item_id, quantity, acquired_at) VALUES (8, 1, 5, SYSTIMESTAMP);
INSERT INTO character_inventory (character_id, item_id, quantity, acquired_at) VALUES (5, 2, 5, SYSTIMESTAMP);
INSERT INTO character_inventory (character_id, item_id, quantity, acquired_at) VALUES (6, 7, 3, SYSTIMESTAMP);
INSERT INTO character_inventory (character_id, item_id, quantity, acquired_at) VALUES (7, 10, 3, SYSTIMESTAMP);
INSERT INTO character_inventory (character_id, item_id, quantity, acquired_at) VALUES (5, 9, 4, SYSTIMESTAMP);
INSERT INTO character_inventory (character_id, item_id, quantity, acquired_at) VALUES (5, 5, 2, SYSTIMESTAMP);
INSERT INTO character_inventory (character_id, item_id, quantity, acquired_at) VALUES (6, 7, 3, SYSTIMESTAMP);

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042114',
    '001_init_schema.sql',
    TO_CLOB('Created character_inventory table and inserted sample data.')
);

CREATE TABLE quest_participation (
    participation_id NUMBER PRIMARY KEY,
    character_id NUMBER NOT NULL,
    quest_id NUMBER NOT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    is_up_vote NUMBER(1) NULL,
    rating_timestamp TIMESTAMP NULL,
    FOREIGN KEY (character_id) REFERENCES game_character(character_id),
    FOREIGN KEY (quest_id) REFERENCES quest(quest_id),
    UNIQUE (character_id, quest_id)
);

INSERT INTO quest_participation (participation_id, character_id, quest_id, started_at, completed_at, is_up_vote, rating_timestamp) VALUES (participation_seq.NEXTVAL, 2, 1, SYSTIMESTAMP, SYSTIMESTAMP, 1, SYSTIMESTAMP);
INSERT INTO quest_participation (participation_id, character_id, quest_id, started_at, completed_at, is_up_vote, rating_timestamp) VALUES (participation_seq.NEXTVAL, 9, 2, SYSTIMESTAMP, SYSTIMESTAMP, 0, SYSTIMESTAMP);
INSERT INTO quest_participation (participation_id, character_id, quest_id, started_at, completed_at, is_up_vote, rating_timestamp) VALUES (participation_seq.NEXTVAL, 10, 8, SYSTIMESTAMP, SYSTIMESTAMP, 1, SYSTIMESTAMP);
INSERT INTO quest_participation (participation_id, character_id, quest_id, started_at, completed_at, is_up_vote, rating_timestamp) VALUES (participation_seq.NEXTVAL, 5, 9, SYSTIMESTAMP, SYSTIMESTAMP, 1, SYSTIMESTAMP);
INSERT INTO quest_participation (participation_id, character_id, quest_id, started_at, completed_at, is_up_vote, rating_timestamp) VALUES (participation_seq.NEXTVAL, 7, 10, SYSTIMESTAMP, SYSTIMESTAMP, 0, SYSTIMESTAMP);
INSERT INTO quest_participation (participation_id, character_id, quest_id, started_at, completed_at, is_up_vote, rating_timestamp) VALUES (participation_seq.NEXTVAL, 9, 9, SYSTIMESTAMP, SYSTIMESTAMP, 1, SYSTIMESTAMP);
INSERT INTO quest_participation (participation_id, character_id, quest_id, started_at, completed_at, is_up_vote, rating_timestamp) VALUES (participation_seq.NEXTVAL, 9, 10, SYSTIMESTAMP, SYSTIMESTAMP, 1, SYSTIMESTAMP);
INSERT INTO quest_participation (participation_id, character_id, quest_id, started_at, completed_at, is_up_vote, rating_timestamp) VALUES (participation_seq.NEXTVAL, 7, 1, SYSTIMESTAMP, SYSTIMESTAMP, 0, SYSTIMESTAMP);
INSERT INTO quest_participation (participation_id, character_id, quest_id, started_at, completed_at, is_up_vote, rating_timestamp) VALUES (participation_seq.NEXTVAL, 3, 2, SYSTIMESTAMP, SYSTIMESTAMP, 1, SYSTIMESTAMP);
INSERT INTO quest_participation (participation_id, character_id, quest_id, started_at, completed_at, is_up_vote, rating_timestamp) VALUES (participation_seq.NEXTVAL, 9, 6, SYSTIMESTAMP, SYSTIMESTAMP, 1, SYSTIMESTAMP);

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042112',
    '001_init_schema.sql',
    TO_CLOB('Created quest-participation table and inserted sample data.')
);

CREATE TABLE quest_reward (
    quest_id NUMBER NOT NULL,
    item_id NUMBER NOT NULL,
    quantity NUMBER DEFAULT 1,
    drop_chance NUMBER(5,2) DEFAULT 100.00,
    PRIMARY KEY (quest_id, item_id),
    FOREIGN KEY (quest_id) REFERENCES quest(quest_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);

INSERT INTO quest_reward (quest_id, item_id, quantity, drop_chance) VALUES (3, 4, 1, 88.67);
INSERT INTO quest_reward (quest_id, item_id, quantity, drop_chance) VALUES (7, 2, 3, 92.89);
INSERT INTO quest_reward (quest_id, item_id, quantity, drop_chance) VALUES (6, 2, 2, 55.94);
INSERT INTO quest_reward (quest_id, item_id, quantity, drop_chance) VALUES (10, 8, 3, 97.92);
INSERT INTO quest_reward (quest_id, item_id, quantity, drop_chance) VALUES (4, 4, 3, 66.25);
INSERT INTO quest_reward (quest_id, item_id, quantity, drop_chance) VALUES (3, 4, 3, 91.31);
INSERT INTO quest_reward (quest_id, item_id, quantity, drop_chance) VALUES (3, 8, 1, 71.46);
INSERT INTO quest_reward (quest_id, item_id, quantity, drop_chance) VALUES (9, 5, 3, 71.04);
INSERT INTO quest_reward (quest_id, item_id, quantity, drop_chance) VALUES (4, 8, 1, 83.48);
INSERT INTO quest_reward (quest_id, item_id, quantity, drop_chance) VALUES (3, 3, 2, 65.85);

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042158',
    '001_init_schema.sql',
    TO_CLOB('Created quest_reward table and inserted sample data.')
);

CREATE INDEX idx_character_player ON game_character(player_id);
CREATE INDEX idx_inventory_character ON character_inventory(character_id);
CREATE INDEX idx_quest_participation_quest ON quest_participation(quest_id);
CREATE INDEX idx_quest_reward_quest ON quest_reward(quest_id);
CREATE INDEX idx_qp_char ON quest_participation(character_id);


INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042114',
    '001_init_schema.sql',
    TO_CLOB('Created indices for game_character, character_inventory, quest_participation, and quest_reward tables.')
);