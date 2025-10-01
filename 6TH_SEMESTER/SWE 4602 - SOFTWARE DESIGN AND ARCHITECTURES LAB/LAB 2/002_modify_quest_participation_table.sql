ALTER TABLE quest_participation ADD (rating NUMBER(1) CHECK (rating BETWEEN 1 AND 5));

UPDATE quest_participation
SET rating = CASE
    WHEN is_up_vote = 1 THEN 5  
    WHEN is_up_vote = 0 THEN 1  
    ELSE NULL                   
END
WHERE is_up_vote IS NOT NULL;

ALTER TABLE quest_participation DROP COLUMN is_up_vote;

-- 'rating_timestamp' is already present; no action needed


-- insert record into change_log table
INSERT INTO change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042112',
    '002_modify_quest_participation_table.sql',
    TO_CLOB('Migrated is_up_vote column to a 5-star rating system in quest_participation table.')
);
