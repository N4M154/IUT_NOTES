-- Branch Table
create table Branch 
(
    B_id int,
    location varchar(100),
    establishment_year int,
    constraint b_id primary key(B_id)
);

--  Employee Table
create table Employee 
(
    National_id int,
    Name varchar(50),
    BloodGroup varchar(5),
    Date_of_birth date,
    Employee_type varchar(50),
    Base_salary decimal(10,2),
    Housing_salary decimal (10,2),
    B_id int, 
    constraint nid primary key(National_id)
    constraint bid_fk foreign key(B_id) references Branch(B_id)
);

--  Shift Table
create table Shift 
(
    Shift_id int,
    Start_time time,
    Week_day varchar(20),
    Duration int,
    B_id int, 
    constraint shiftidpk primary key(Shift_id),
    constraint shiftidfk foreign key(B_id) references Branch(B_id)

);

--  Book Table
create table Book 
(
    ISBN varchar(13),
    Name varchar(50),
    Author varchar(50),
    Genre varchar(50),
    Price DECIMAL(10,2),
    constraint isbn primary key(isbn)
);

--  Publisher Table
create table Publisher 
(
    Name varchar(50),
    City varchar(50),
    Establishment_year int,
    constraint namepk primary key(Name)
);

--  User Table
create table User 
(
    Username varchar(50),
    Name varchar(50),
    Date_of_birth date,
    Hometown varchar(50),
    Occupation varchar(50),
    constraint usernamepk primary key(Username)
);

--  Issue Table
create table Issue 
(
    Issue_id int,
    Issue_date date,
    Due_date date,
    Username varchar(50),
    ISBN varchar(13),  
    National_id int, 
    constraint issuid_pk primary key(Issue_id),
    constraint fk1 foreign key(Username) references User(Username),
    constraint fk2 foreign key(ISBN) references Book(ISBN),
    constraint fk3 foreign key (National_id) references Employee(National_id)
);







