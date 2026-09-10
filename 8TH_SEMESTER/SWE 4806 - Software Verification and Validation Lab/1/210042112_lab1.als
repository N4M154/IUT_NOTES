
/*
student course a enroll korbe. 1 course a at least 2 ta student thakbe.

*/

sig course{}

sig student {enrolled : set course} // set =>one or many

//predicate = optional. can implement or not
//fact = always true

fact Limit {all c:course  |  #(enrolled.c)<=2 }

assert checking {all c:course | #(enrolled.c) <2 }

check checking for 3 

//run{some student some course some student.enrolled} for 3


