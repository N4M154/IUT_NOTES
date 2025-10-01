
DROP PROCEDURE region_wise_popular_quests;
DROP PROCEDURE top_rewarded_players_by_region;
DROP PROCEDURE quest_ratings_rewards_by_month;
DROP PROCEDURE player_activity_summary;
DROP PROCEDURE monthly_region_engagement;
DROP PROCEDURE popular_high_reward_quests;


INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042158',
    '004_queries.sql',
    TO_CLOB('Dropped stored procedures in case they clash for reporting database.')
);

--a)

CREATE OR REPLACE PROCEDURE region_wise_popular_quests AS
BEGIN
    FOR region_rec IN (
        SELECT r.region_id, r.name AS region_name FROM dim_region r
    ) LOOP
        FOR quest_rec IN (
            SELECT * FROM (
                SELECT q.quest_id, q.name AS quest_name,
                       COUNT(CASE WHEN r.rating >= 3 THEN 1 END) AS positive_ratings,
                       COUNT(CASE WHEN r.rating < 3 THEN 1 END) AS negative_ratings
                FROM dim_quest q
                LEFT JOIN dim_ratings r ON q.quest_id = r.quest_id
                LEFT JOIN dim_player p ON r.player_id = p.player_id
                WHERE p.region_id = region_rec.region_id
                GROUP BY q.quest_id, q.name
                ORDER BY (COUNT(CASE WHEN r.rating >= 3 THEN 1 END) - COUNT(CASE WHEN r.rating < 3 THEN 1 END)) DESC
            ) WHERE ROWNUM <= 5
        ) LOOP
            DBMS_OUTPUT.PUT_LINE(region_rec.region_name || ': ' || quest_rec.quest_name || 
                              ' | +' || NVL(quest_rec.positive_ratings, 0) || 
                              ' | -' || NVL(quest_rec.negative_ratings, 0));
        END LOOP;
    END LOOP;
END;
/


INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042158',
    '004_queries.sql',
    TO_CLOB('Created procedure for Region-Wise Most Popular Quests Based on Votes.')
);

--b)
CREATE OR REPLACE PROCEDURE top_rewarded_players_by_region AS
BEGIN
    FOR region_rec IN (
        SELECT r.region_id, r.name AS region_name FROM dim_region r ORDER BY r.name
    ) LOOP
        FOR player_rec IN (
            SELECT * FROM (
                SELECT p.username, SUM(qr.quantity * i.base_value) AS total_reward
                FROM dim_player p
                JOIN dim_game_character gc ON p.player_id = gc.player_id
                JOIN fact_quest_participation qp ON gc.character_id = qp.character_id
                JOIN dim_quest_reward qr ON qp.quest_id = qr.quest_id
                JOIN dim_item i ON qr.item_id = i.item_id
                WHERE p.region_id = region_rec.region_id AND qp.completed_at IS NOT NULL
                GROUP BY p.username
                ORDER BY total_reward DESC
            ) WHERE ROWNUM <= 5
        ) LOOP
            DBMS_OUTPUT.PUT_LINE(region_rec.region_name || ': ' || player_rec.username || 
                              ' | ' || NVL(player_rec.total_reward, 0));
        END LOOP;
    END LOOP;
END;
/

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042114',
    '004_queries.sql',
    TO_CLOB('Created procedure for Top 5 Most Rewarded Players by Region.')
);

--c)
CREATE OR REPLACE PROCEDURE quest_ratings_rewards_by_month AS
BEGIN
    FOR month_rec IN (
        SELECT DISTINCT t.month, t.year FROM dim_time t ORDER BY t.year, t.month
    ) LOOP
        FOR quest_rec IN (
            SELECT * FROM (
                SELECT q.name, ROUND(AVG(r.rating), 2) AS rating, SUM(qr.quantity * i.base_value) AS reward
                FROM dim_quest q
                LEFT JOIN dim_ratings r ON q.quest_id = r.quest_id
                LEFT JOIN dim_quest_reward qr ON q.quest_id = qr.quest_id
                LEFT JOIN dim_item i ON qr.item_id = i.item_id
                LEFT JOIN fact_quest_participation qp ON q.quest_id = qp.quest_id
                LEFT JOIN dim_time t ON TRUNC(qp.completed_at) = t.full_date
                WHERE t.month = month_rec.month AND t.year = month_rec.year AND qp.completed_at IS NOT NULL
                GROUP BY q.name
                HAVING COUNT(qp.participation_id) > 0
                ORDER BY rating DESC NULLS LAST
            ) WHERE ROWNUM <= 5
        ) LOOP
            DBMS_OUTPUT.PUT_LINE(month_rec.month || '/' || month_rec.year || ': ' || quest_rec.name || 
                              ' | ' || NVL(quest_rec.rating, 0) || ' | ' || NVL(quest_rec.reward, 0));
        END LOOP;
    END LOOP;
END;
/

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042112',
    '004_queries.sql',
    TO_CLOB('Created procedure for Quest Ratings and Rewards Across Months.')
);

--d)

CREATE OR REPLACE PROCEDURE player_activity_summary AS
BEGIN
    FOR player_rec IN (
        SELECT p.player_id, p.username FROM dim_player p ORDER BY p.username
    ) LOOP
        DECLARE
            v_quests NUMBER := 0;
            v_hours NUMBER := 0;
            v_rewards NUMBER := 0;
        BEGIN
            -- Count completed quests
            SELECT COUNT(*) INTO v_quests
            FROM fact_quest_participation qp
            JOIN dim_game_character gc ON qp.character_id = gc.character_id
            WHERE gc.player_id = player_rec.player_id AND qp.completed_at IS NOT NULL;

            -- Calculate total time spent in hours
            SELECT NVL(SUM(
                EXTRACT(HOUR FROM (qp.completed_at - qp.started_at)) +
                EXTRACT(MINUTE FROM (qp.completed_at - qp.started_at))/60
            ), 0) INTO v_hours
            FROM fact_quest_participation qp
            JOIN dim_game_character gc ON qp.character_id = gc.character_id
            WHERE gc.player_id = player_rec.player_id AND qp.completed_at IS NOT NULL;

            -- Calculate total reward points
            SELECT NVL(SUM(qr.quantity * i.base_value), 0) INTO v_rewards
            FROM fact_quest_participation qp
            JOIN dim_game_character gc ON qp.character_id = gc.character_id
            JOIN dim_quest_reward qr ON qp.quest_id = qr.quest_id
            JOIN dim_item i ON qr.item_id = i.item_id
            WHERE gc.player_id = player_rec.player_id AND qp.completed_at IS NOT NULL;

            -- Output results
            DBMS_OUTPUT.PUT_LINE(player_rec.username || ' | ' || v_quests || ' | ' ||
                              ROUND(v_hours, 2) || ' | ' || v_rewards);
        END;
    END LOOP;
END;
/

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042158',
    '004_queries.sql',
    TO_CLOB('Created procedure for  Player Activity Summary (Quests Completed, Total Time, Reward Points).')
);

--e)
CREATE OR REPLACE PROCEDURE monthly_region_engagement AS
BEGIN
    FOR month_rec IN (
        SELECT DISTINCT t.month, t.year FROM dim_time t ORDER BY t.year, t.month
    ) LOOP
        FOR region_rec IN (
            SELECT r.name, COUNT(DISTINCT p.player_id) AS players, COUNT(qp.participation_id) AS quests
            FROM dim_region r
            JOIN dim_player p ON r.region_id = p.region_id
            JOIN dim_game_character gc ON p.player_id = gc.player_id
            JOIN fact_quest_participation qp ON gc.character_id = qp.character_id
            JOIN dim_time t ON TRUNC(qp.completed_at) = t.full_date
            WHERE t.month = month_rec.month AND t.year = month_rec.year AND qp.completed_at IS NOT NULL
            GROUP BY r.name
            ORDER BY players DESC
        ) LOOP
            DBMS_OUTPUT.PUT_LINE(month_rec.month || '/' || month_rec.year || ': ' || 
                              region_rec.name || ' | ' || region_rec.players || ' | ' || region_rec.quests);
        END LOOP;
    END LOOP;
END;
/


INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042112',
    '004_queries.sql',
    TO_CLOB('Created procedure for Monthly Region-Based Number of Player Engagement.')
);


--f)
CREATE OR REPLACE PROCEDURE popular_high_reward_quests AS
BEGIN
    FOR quest_rec IN (
        SELECT * FROM (
            SELECT q.name, COUNT(*) AS plays, 
                   ROUND(AVG(qr.quantity * i.base_value), 2) AS reward,
                   ROUND(AVG(EXTRACT(HOUR FROM (qp.completed_at - qp.started_at)) * 60 +
                   EXTRACT(MINUTE FROM (qp.completed_at - qp.started_at))), 2) AS minutes
            FROM dim_quest q
            JOIN fact_quest_participation qp ON q.quest_id = qp.quest_id
            JOIN dim_quest_reward qr ON q.quest_id = qr.quest_id
            JOIN dim_item i ON qr.item_id = i.item_id
            WHERE qp.completed_at IS NOT NULL
            GROUP BY q.name
            HAVING AVG(qr.quantity * i.base_value) > 100
            AND AVG(EXTRACT(HOUR FROM (qp.completed_at - qp.started_at)) * 60 +
                   EXTRACT(MINUTE FROM (qp.completed_at - qp.started_at))) > 30
            ORDER BY plays DESC
        ) WHERE ROWNUM <= 10
    ) LOOP
        DBMS_OUTPUT.PUT_LINE(quest_rec.name || ' | ' || quest_rec.plays || 
                          ' | ' || quest_rec.reward || ' | ' || quest_rec.minutes);
    END LOOP;
END;
/


INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042114',
    '004_queries.sql',
    TO_CLOB('Created procedure for Most Frequently Played Quests with Average Reward Points Higher than 100 & Average
 Duration More than 30 minutes')
);




SET SERVEROUTPUT ON;

BEGIN
    monthly_region_engagement;
END;
/
