DROP PROCEDURE add_quest_rating;
DROP FUNCTION get_quest_average_rating;
-- 4.i)
CREATE OR REPLACE PROCEDURE add_quest_rating (
    p_character_id IN NUMBER,
    p_quest_id IN NUMBER,
    p_rating_value IN NUMBER
) IS
BEGIN
    -- Validate rating range
    IF p_rating_value < 1 OR p_rating_value > 5 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Rating must be between 1 and 5');
    END IF;

    -- Update the quest_participation record
    UPDATE quest_participation
    SET rating = p_rating_value,
        rating_timestamp = SYSTIMESTAMP
    WHERE character_id = p_character_id
      AND quest_id = p_quest_id;

    -- Recalculate average for the quest
    recalculate_quest_ratings;
END;
/

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042114',
    '004_new_stored_procedures.sql',
    TO_CLOB('Created procedure to add a quest rating.')
);


-- 4.ii)

CREATE OR REPLACE FUNCTION get_quest_average_rating (
    p_quest_id IN NUMBER
) RETURN NUMBER IS
    v_avg NUMBER(3,2);
BEGIN
    SELECT ROUND(AVG(rating), 2)
    INTO v_avg
    FROM quest_participation
    WHERE quest_id = p_quest_id
      AND rating IS NOT NULL;

    RETURN v_avg;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN NULL;
END;
/



INSERT INTO change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042158',
    '004_new_stored_procedures.sql',
    TO_CLOB('Created procedure retrieve a quest average rating.')
);
