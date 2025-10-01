DROP PROCEDURE recalculate_quest_ratings;


ALTER TABLE quest ADD (
    average_rating NUMBER(3,2)
);

CREATE OR REPLACE PROCEDURE recalculate_quest_ratings IS
BEGIN
    FOR r IN (
        SELECT quest_id
        FROM quest
    ) LOOP
        UPDATE quest
        SET average_rating = (
            SELECT ROUND(AVG(rating), 2)
            FROM quest_participation
            WHERE quest_id = r.quest_id AND rating IS NOT NULL
        )
        WHERE quest.quest_id = r.quest_id;
    END LOOP;
END;
/



INSERT INTO change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042112',
    '003_add_average_quest_rating.sql',
    TO_CLOB('Added average_rating column to quest table and procedure to update it based on ratings.')
);

