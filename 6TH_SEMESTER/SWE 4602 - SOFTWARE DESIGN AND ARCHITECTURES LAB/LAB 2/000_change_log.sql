DROP SEQUENCE change_log_seq;
DROP TABLE change_log;


CREATE TABLE change_log (
    id NUMBER PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    created_by VARCHAR2(50) NOT NULL,
    script_name VARCHAR2(100) NOT NULL,
    script_details CLOB
);

CREATE SEQUENCE change_log_seq START WITH 1 INCREMENT BY 1;

INSERT into change_log (
    id, applied_at, created_by, script_name, script_details
) VALUES (
    change_log_seq.NEXTVAL,
    SYSTIMESTAMP,
    '210042114',
    '000_change_log.sql',
    TO_CLOB('Created change_log table and sequence.')
);