using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab01
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.ForegroundColor = ConsoleColor.Blue;
            
            
            while (true)
            {
                Console.WriteLine("\nChoose a task to complete:");
                Console.WriteLine("1. Print the average GPA of students by student ID");
                Console.WriteLine("2. Insert new GPA record in a new row in the Grades text file");
                Console.WriteLine("3. Find lowest GPA and that semester");
                Console.WriteLine("4. Exit\n");
                

                int choice = int.Parse(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        PrintAverageGPA();
                        break;
                    case 2:
                        InsertNewGPARecord();
                        break;
                    case 3:
                        FindLowestGPASemester();
                        break;
                    case 4:
                        return;
                    default:
                        Console.WriteLine("Invalid choice. Please choose from the given options.");
                        break;
                }
            }
        }
        static void PrintAverageGPA()//1. Print the average GPA of the students.
        {
            Console.Write("Enter Student ID: ");
            int studentID = int.Parse(Console.ReadLine());

            float totalGPA = 0;
            int count = 0;

            using (StreamReader gradesReader = new StreamReader("grades.txt"))
            {
                string line;
                while ((line = gradesReader.ReadLine()) != null)
                {
                    string[] data = line.Split(';');
                    int id = int.Parse(data[0]);
                    float gpa = float.Parse(data[1]);

                    if (id == studentID)
                    {
                        totalGPA += gpa;
                        count++;
                    }
                }
                
            }

            if (count > 0)
            {
                float averageGPA = totalGPA / count;
                Console.WriteLine($"Average GPA for Student ID {studentID}: {averageGPA:F2}");//point er por 2 ghor;
            }
            else
            {
                Console.WriteLine($"No GPA records found for Student ID {studentID}");
            }
            Console.WriteLine("---------------------------------------------------------");
        }
        static void InsertNewGPARecord()//2. Take Student ID, GPA, and Semester as input. Then after validating the input,
                                        //insert the information as a new row in the grades.txt file.
                                        //If the information is invalid, discard the input and show an error message.

        {
            Console.Write("Enter Student ID: ");
            int studentID = int.Parse(Console.ReadLine());

            Console.Write("Enter GPA (2.50 - 4.00): ");
            float gpa = float.Parse(Console.ReadLine());

            if (gpa < 2.50 || gpa > 4.00)
            {
                Console.WriteLine("Invalid GPA. GPA must be between 2.50 and 4.00. Please try again.");
                return;
            }

            Console.Write("Enter Semester (1 - 8): ");
            int semester = int.Parse(Console.ReadLine());
            if (semester < 1 || semester > 8)
            {
                Console.WriteLine("Invalid semester. Semester must be between 1 and 8. Please try again.");
                return;
            }

            string newRecord = $"{studentID};{gpa:F2};{semester}";

            using (StreamWriter gradesWriter = File.AppendText("grades.txt"))
            {
                gradesWriter.WriteLine(newRecord);
            }

            Console.WriteLine("New record added successfully in a new row.");
            Console.WriteLine("---------------------------------------------------------");
        }
        static void FindLowestGPASemester()//3. Take Student ID as input and show his/her name and semester in which he/she got the lowest GPA.
                                           //Print an error message if the Student ID does not exist in your database.

        {
            Console.Write("Enter Student ID: ");
            int studentID = int.Parse(Console.ReadLine());

            string lowestSemester = "";
            float lowestGPA = float.MaxValue;
            string studentName = "";

            using (StreamReader studentInfoReader = new StreamReader("studentInfo.txt"))
            {
                string line;
                while ((line = studentInfoReader.ReadLine()) != null)
                {
                    string[] data = line.Split(';');
                    int id = int.Parse(data[0]);
                    string name = data[1];

                    if (id == studentID)
                    {
                        studentName = name;
                        break;
                    }
                }
            }

            if (string.IsNullOrEmpty(studentName))
            {
                Console.WriteLine($"No student found with Student ID {studentID}");
                return;
            }

            using (StreamReader gradesReader = new StreamReader("grades.txt"))
            {
                string line;
                while ((line = gradesReader.ReadLine()) != null)
                {
                    string[] data = line.Split(';');
                    int id = int.Parse(data[0]);
                    float gpa = float.Parse(data[1]);
                    int semester = int.Parse(data[2]);

                    if (id == studentID && gpa < lowestGPA)
                    {
                        lowestGPA = gpa;
                        lowestSemester = semester.ToString();
                    }
                }
            }

            if (lowestGPA == float.MaxValue)
            {
                Console.WriteLine($"{studentName} has no GPA records.");
            }
            else
            {
                Console.WriteLine($"{studentName} got the lowest GPA ({lowestGPA:F2}) in Semester {lowestSemester}");
            }
            Console.WriteLine("---------------------------------------------------------");
        }
        

    }
}
