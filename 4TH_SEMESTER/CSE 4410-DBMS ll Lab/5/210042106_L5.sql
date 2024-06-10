-- Task 1
DECLARE 
    v_dept_name department.dept_name%TYPE;
    v_budget department.budget%TYPE;
    v_count NUMBER(5) := 0;

    CURSOR c1 IS
        SELECT dept_name, budget
        FROM department;

BEGIN
    OPEN c1;

    LOOP
        FETCH c1 INTO v_dept_name, v_budget;
        EXIT WHEN c1%NOTFOUND;

        IF v_budget > 99999 THEN
            UPDATE department
            SET budget = budget * 0.9
            WHERE dept_name = v_dept_name;
        ELSE
            v_count := v_count + 1;
        END IF;
    END LOOP;

    CLOSE c1;

    DBMS_OUTPUT.PUT_LINE('Number of unaffected departments: ' || v_count);
END;
/


-- Task 2
DECLARE 
    v_day VARCHAR2(1);
    v_start_hr NUMBER(2);
    v_end_hr NUMBER(2);
    v_instructor_name instructor.name%TYPE;

    CURSOR c1 IS
        SELECT DISTINCT i.name
        FROM instructor i
        JOIN teaches t ON i.ID = t.ID
        JOIN section s ON t.course_id = s.course_id AND t.sec_id = s.sec_id AND t.semester = s.semester AND t.year = s.year
        JOIN time_slot ts ON s.time_slot_id = ts.time_slot_id
        WHERE ts.day = v_day AND ts.start_hr >= v_start_hr AND ts.end_hr <= v_end_hr;

BEGIN
    -- input
    DBMS_OUTPUT.PUT_LINE('Enter the day of the week');
    v_day := &v_day;
    DBMS_OUTPUT.PUT_LINE('Enter the starting hour');
    v_start_hr := &v_start_hr;
    DBMS_OUTPUT.PUT_LINE('Enter the ending hour (0-23):');
    v_end_hr := &v_end_hr;

    -- fetch
    OPEN c1;
    LOOP
        FETCH c1 INTO v_instructor_name;
        EXIT WHEN c1%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(v_instructor_name);
    END LOOP;
    CLOSE c1;
END;
/



-- Task 3
DECLARE 
    v_N NUMBER;
    v_ID student.ID%TYPE;
    v_name student.name%TYPE;
    v_dept_name student.dept_name%TYPE;
    v_course_count NUMBER;

    CURSOR c1 IS
        SELECT s.ID, s.name, s.dept_name, COUNT(*) as course_count
        FROM student s
        JOIN takes t ON s.ID = t.ID
        GROUP BY s.ID, s.name, s.dept_name
        ORDER BY course_count DESC;

BEGIN
    -- input
    DBMS_OUTPUT.PUT_LINE('Enter the number of top students to fetch:');
    v_N := &v_N;

    -- fetch
    OPEN c1;
    FOR i IN 1..v_N LOOP
        FETCH c1 INTO v_ID, v_name, v_dept_name, v_course_count;
        EXIT WHEN c1%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('ID: ' || v_ID || ', Name: ' || v_name || ', Department: ' || v_dept_name || ', Courses taken: ' || v_course_count);
    END LOOP;
    CLOSE c1;
END;
/




-- Task 4
DECLARE 
    v_dept_name department.dept_name%TYPE;
    v_max_id student.ID%TYPE;
    v_new_id student.ID%TYPE;

    CURSOR c1 IS
        SELECT dept_name
        FROM (
            SELECT dept_name, COUNT(*) as student_count
            FROM student
            GROUP BY dept_name
            ORDER BY student_count ASC
        )
        WHERE ROWNUM = 1;

    CURSOR c2 IS
        SELECT MAX(ID) as max_id
        FROM student;

BEGIN
    -- fetch dept
    OPEN c1;
    FETCH c1 INTO v_dept_name;
    CLOSE c1;

    -- fetch max id
    OPEN c2;
    FETCH c2 INTO v_max_id;
    CLOSE c2;

    v_new_id := TO_NUMBER(v_max_id) + 1;

    -- insert
    INSERT INTO student (ID, name, dept_name, tot_cred)
    VALUES (TO_CHAR(v_new_id), 'Jane Doe', v_dept_name, 0);

END;
/


-- Task 5
DECLARE
    v_student_id student.ID%TYPE;
    v_student_name student.name%TYPE;
    v_dept_name student.dept_name%TYPE;
    v_instructor_id instructor.ID%TYPE;
    v_instructor_name instructor.name%TYPE;
    v_advised_count NUMBER;

    CURSOR c1 IS
        SELECT ID, name, dept_name
        FROM student
        WHERE ID NOT IN 
        (
            SELECT s_ID FROM advisor
        );

    CURSOR c2(dept_name_in VARCHAR2) IS
        SELECT ID, name
        FROM
        (
            SELECT i.ID, i.name, COUNT(a.s_ID) as advised_count
            FROM instructor i
            LEFT JOIN advisor a ON i.ID = a.i_ID
            WHERE i.dept_name = dept_name_in
            GROUP BY i.ID, i.name
            ORDER BY advised_count ASC
        )
        WHERE ROWNUM = 1;

BEGIN
    OPEN c1;

    LOOP
        FETCH c1 INTO v_student_id, v_student_name, v_dept_name;
        EXIT WHEN c1%NOTFOUND;
        
        OPEN c2(v_dept_name);
        FETCH c2 INTO v_instructor_id, v_instructor_name;
        CLOSE c2;

        INSERT INTO advisor (s_ID, i_ID)
        VALUES (v_student_id, v_instructor_id);

        SELECT COUNT(*) INTO advised_count
        FROM advisor
        WHERE i_ID = v_instructor_id;

        DBMS_OUTPUT.PUT_LINE('Student: ' || v_student_name || ', Advisor: ' || v_instructor_name || ', Students advised:' || v_advised_count);
    END LOOP;

    CLOSE c1;
END;
/



