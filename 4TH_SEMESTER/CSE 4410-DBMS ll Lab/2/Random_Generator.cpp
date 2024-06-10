#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
#include <ctime>
using namespace std;
// random strings in the records later
string generateString(int length)
{
static const char alphanum[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
string str(length, ' ');
for(int i = 0; i < length; i++)
{
str[i] = alphanum[rand()%62];
}
return str;
}

int main()
{
srand(time(0));
ofstream sqlFile("insert_statements.sql");

// Create the tables
sqlFile << "CREATE TABLE department (";
sqlFile << "id NUMBER PRIMARY KEY,";
sqlFile << "name VARCHAR2(20)";
sqlFile << ")TABLESPACE tbs1;\n";

sqlFile << "CREATE TABLE student (";
sqlFile << "name VARCHAR2(20),";
sqlFile << "id NUMBER PRIMARY KEY,";
sqlFile << "dept_id NUMBER,";
sqlFile << "FOREIGN KEY (dept_id) REFERENCES department(id)";
sqlFile << ")TABLESPACE tbs1;\n";

sqlFile << "CREATE TABLE course (";
sqlFile << "course_code VARCHAR2(10) PRIMARY KEY,";
sqlFile << "name VARCHAR2(20),";
sqlFile << "credit NUMBER,";
sqlFile << "offered_by_dept_id NUMBER,";
sqlFile << "FOREIGN KEY (offered_by_dept_id) REFERENCES department(id)";
sqlFile << ")TABLESPACE tbs2;\n";

// department records
for(int i=0; i<3; i++)
{
string name = "Department " + to_string(i+1);
sqlFile << "INSERT INTO department VALUES(" << i+1 << ", '" << name << "');\n" << endl;
}
// student records
for(int i=0; i<5000; i++)
{
string name = generateString(8);
int id = i+1;
int deptId = rand()%3 + 1;

sqlFile << "INSERT INTO student VALUES('" << name << "', " << id << ", " << deptId << ");\n";
}
// course records
for(int i=0; i<5000; i++)
{
string course = "CSE" + to_string(i+1);
string name = generateString(10);
int credit = rand()%5 + 1;
int deptId = rand()%3 + 1;

sqlFile << "INSERT INTO course VALUES('" << course << "', '" << name << "', " << credit << ", " << deptId << ");\n";
}
sqlFile << "COMMIT;";
sqlFile.close();
return 0;
}
