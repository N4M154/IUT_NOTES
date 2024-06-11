import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;
public class Main{

    public static void main(String[] args) {
        List<Employee> employees = readDataFromCSV("C:\\Users\\Dell\\Downloads\\OOP_LAB11\\OOP_LAB11\\employee_data.csv");
        if (employees == null) {
            System.out.println("Error reading data from the CSV file.");
            return;
        }

        // 2. Filtering by Age: Filter employees who are older than 30 years.
        List<Employee> olderThan30 = new ArrayList<>();
        for (Employee employee : employees) {
            if (employee.getAge() > 30) {
                olderThan30.add(employee);
            }
        }

        // 3. Grouping by Postal Code: Group the employees by their postal code.
        List<List<Employee>> groupedByPostalCode = groupEmployeesByPostalCode(employees);

        // 4. Calculating Average Remuneration: Calculate and display the average remuneration of all employees.
        int totalRemuneration = calculateTotalRemuneration(employees);
        double averageRemuneration = totalRemuneration / (double) employees.size();
        System.out.println("Average Remuneration: " + averageRemuneration);

        // 5. Finding Highest Remuneration: Find and display the employee with the highest remuneration.
        Employee highestRemunerationEmployee = findEmployeeWithHighestRemuneration(employees);
        System.out.println("Employee with Highest Remuneration: " + highestRemunerationEmployee.getFullName());

        // 6. Checking for a Manager: Check if at least one employee has the designation "Manager."
        boolean hasManager = checkForManager(employees);
        System.out.println("Has Manager: " + hasManager);

        // 7. Sorting by Age: Sort the employees by age in ascending order and then descending order.
        List<Employee> employeesSortedByAgeAsc = new ArrayList<>(employees);
        employeesSortedByAgeAsc.sort(Comparator.comparingInt(Employee::getAge));

        List<Employee> employeesSortedByAgeDesc = new ArrayList<>(employees);
        employeesSortedByAgeDesc.sort(Comparator.comparingInt(Employee::getAge).reversed());

        // 8. Finding the Youngest Employee: Find and display the youngest employee using the min operation.
        Employee youngestEmployee = findYoungestEmployee(employees);
        if (youngestEmployee != null) {
            System.out.println("Youngest Employee: " + youngestEmployee.getFullName());
        } else {
            System.out.println("No employees found.");
        }

        // 9. Counting Employees in Uptown District: Count the number of employees working in the "Uptown" district.
        long uptownEmployeeCount = countEmployeesInDistrict(employees, "Uptown");
        System.out.println("Number of Employees in Uptown District: " + uptownEmployeeCount);

        // 10. Getting Distinct Postal Codes: Get and display the distinct postal codes from the employees.
        Set<String> distinctPostalCodes = getDistinctPostalCodes(employees);
        System.out.println("Distinct Postal Codes: " + distinctPostalCodes);

        // 11. Total cost of Remuneration: Combine the remuneration of all employees into a single sum.
        int totalRemunerationUsingReduce = calculateTotalRemunerationUsingReduce(employees);
        System.out.println("Total Remuneration: " + totalRemunerationUsingReduce);

        // 12. Checking If All Employees Are Adults: Check if all employees are older than 18.
        boolean allAdults = areAllEmployeesAdults(employees);
        System.out.println("All employees are adults: " + allAdults);

        // 13. Skipping Employees: Skip the first 3 employees and collect the rest of the employees.
        List<Employee> remainingEmployees = skipFirstNEmployees(employees, 3);

        // 14. Average Age in Downtown District: Calculate and display the average age of employees in the "Downtown" district.
        double averageAgeInDowntown = calculateAverageAgeInDistrict(employees, "Downtown");
        System.out.println("Average Age in Downtown District: " + averageAgeInDowntown);

        // 15. Displaying the Top 3 Highest Remunerations: Find and display the top 3 employees with the highest remuneration.
        List<Employee> top3HighestRemunerations = findTopNHighestRemunerations(employees, 3);

        for (int i = 0; i < top3HighestRemunerations.size(); i++) {
            System.out.println("Top " + (i + 1) + " Highest Remuneration: " + top3HighestRemunerations.get(i).getFullName());
        }
    }

    // 1. Read the data from the CSV file into a List of Employee objects.
    public static List<Employee> readDataFromCSV(String filename) {
        List<Employee> employees = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            reader.readLine();//The header line was empty
            while ((line = reader.readLine()) != null) {
                String[] data = line.split(",");
                if (data.length == 8) {
                    String firstName = data[0];
                    String lastName = data[1];
                    int age = Integer.parseInt(data[5]);
                    String postalCode = data[2];
                    String designation = data[6];
                    int remuneration = Integer.parseInt(data[7]);
                    Employee employee = new Employee(firstName, lastName, age, postalCode, designation, remuneration);
                    employees.add(employee);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return employees;
    }

    // 3. Grouping by Postal Code
    public static List<List<Employee>> groupEmployeesByPostalCode(List<Employee> employees) {
        List<List<Employee>> groupedByPostalCode = new ArrayList<>();
        int numPostalCodes = 10; // Assuming there are 10 different postal codes (10001 to 10010)
        for (int i = 0; i < numPostalCodes; i++) {
            groupedByPostalCode.add(new ArrayList<>());
        }
        for (Employee employee : employees) {
            int index = Integer.parseInt(employee.getPostalCode()) - 10001;
            groupedByPostalCode.get(index).add(employee);
        }
        return groupedByPostalCode;
    }

    // 4. Calculating Average Remuneration
    public static int calculateTotalRemuneration(List<Employee> employees) {
        int totalRemuneration = 0;
        for (Employee employee : employees) {
            totalRemuneration += employee.getRemuneration();
        }
        return totalRemuneration;
    }

    // 5. Finding Highest Remuneration
    public static Employee findEmployeeWithHighestRemuneration(List<Employee> employees) {
        Employee highestRemunerationEmployee = employees.get(0);
        for (Employee employee : employees) {
            if (employee.getRemuneration() > highestRemunerationEmployee.getRemuneration()) {
                highestRemunerationEmployee = employee;
            }
        }
        return highestRemunerationEmployee;
    }

    // 6. Checking for a Manager
    public static boolean checkForManager(List<Employee> employees) {
        for (Employee employee : employees) {
            if ("Manager".equals(employee.getDesignation())) {
                return true;
            }
        }
        return false;
    }

    // 8. Finding the Youngest Employee
    public static Employee findYoungestEmployee(List<Employee> employees) {
        if (employees.isEmpty()) {
            return null;
        }
        Employee youngestEmployee = employees.get(0);
        for (Employee employee : employees) {
            if (employee.getAge() < youngestEmployee.getAge()) {
                youngestEmployee = employee;
            }
        }
        return youngestEmployee;
    }

    // 9. Counting Employees in Uptown District
    public static long countEmployeesInDistrict(List<Employee> employees, String district) {
        long count = 0;
        for (Employee employee : employees) {
            if (district.equals(employee.getDesignation())) {
                count++;
            }
        }
        return count;
    }

    // 10. Getting Distinct Postal Codes
    public static Set<String> getDistinctPostalCodes(List<Employee> employees) {
        Set<String> distinctPostalCodes = new HashSet<>();
        for (Employee employee : employees) {
            distinctPostalCodes.add(employee.getPostalCode());
        }
        return distinctPostalCodes;
    }

    // 11. Total cost of Remuneration using reduce
    public static int calculateTotalRemunerationUsingReduce(List<Employee> employees) {
        return employees.stream().mapToInt(Employee::getRemuneration).sum();
    }

    // 12. Checking If All Employees Are Adults
    public static boolean areAllEmployeesAdults(List<Employee> employees) {
        for (Employee employee : employees) {
            if (employee.getAge() <= 18) {
                return false;
            }
        }
        return true;
    }

    // 13. Skipping Employees
    public static List<Employee> skipFirstNEmployees(List<Employee> employees, int n) {
        if (n >= employees.size()) {
            return Collections.emptyList();
        }
        List<Employee> remainingEmployees = new ArrayList<>(employees.subList(n, employees.size()));
        return remainingEmployees;
    }

    // 14. Average Age in Downtown District
    public static double calculateAverageAgeInDistrict(List<Employee> employees, String district) {
        int totalAgeInDistrict = 0;
        int count = 0;
        for (Employee employee : employees) {
            if (district.equals(employee.getDesignation())) {
                totalAgeInDistrict += employee.getAge();
                count++;
            }
        }
        if (count > 0) {
            return (double) totalAgeInDistrict / count;
        } else {
            return 0.0;
        }
    }

    // 15. Displaying the Top 3 Highest Remunerations
    public static List<Employee> findTopNHighestRemunerations(List<Employee> employees, int n) {
        List<Employee> sortedEmployees = new ArrayList<>(employees);
        sortedEmployees.sort(Comparator.comparingInt(Employee::getRemuneration).reversed());
        return sortedEmployees.subList(0, Math.min(n, employees.size()));
    }
}
