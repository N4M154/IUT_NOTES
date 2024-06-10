--1
select c.customer_name,c.customer_city
from customer c,borrower b,depositor d
where c.customer_name=b.customer_name
and c.customer_name=d.customer_name
and c.customer_name not in(
select customer_name from depositor);

--2
select c.customer_name
from customer c
where c.customer_name in(
select distinct d.customer_name --duplicate ase
from depositor d
intersect
select distinct b.customer_name
from borrower b
);

--3
select to_char(acc_opening_date,'yyyy-mm-dd')as opening_month,count(*) as acc_count
from account
group by to_char(acc_opening_date,'yyyy-mm-dd');

--4
select months_between(
(select max(acc_opening_date) 
from account
where account_number in(
select account_number
from depositor 
where customer_name = 'Smith')),
(select max(loan_date)
from loan 
where loan_number in(
select loan_number 
from borrower 
where customer_name = 'Smith'
)))
as month 
from dual;


--5
select branch_name,avg(amount) as_avg_loan
from loan
where branch_name not in(
select branch_name
from branch
where branch_city like '%Horse%')
group by branch_name;

--6
select d.customer_name, a.account_number
from depositor d,account a
where d.account_number=a.account_number
and balance = (select max(balance) from account);

--7
select branch_city, avg(amount) as average_loan_amount
from loan, branch
where loan.branch_name = branch.branch_name
group by branch_city
having avg(amount)  >= 1500;

--8
select customer_name || ' Eligible' 
as customer_name from depositor
where account_number in
(select account_number from account
where balance >=
(select sum(amount) from loan
where loan.branch_name = account.branch_name
and loan.loan_number in
(select loan_number from borrower
where borrower.customer_name = depositor.customer_name)
)
);

--9
select branch_name || 
case
when total_balance > (avg_total_balance + 500) then 'Elite'
when total_balance between (avg_total_balance + 500) and (avg_total_balance - 500) then 'Moderate'
else 'Poor'
end as branch_status
from(
select b.branch_name,(
select sum(a.balance)
from account a
where a.branch_name = b.branch_name
)as total_balance,(
select avg(a.balance)
from account a
where a.branch_name = b.branch_name
)as avg_total_balance
from branch b
) A;    

--10

select distinct b.branch_name, b.branch_city
from branch b
where b.branch_city in (
select distinct c.customer_city   
from customer c   
where c.customer_name not in(
select distinct d.customer_name
from depositor d
)and c.customer_name not in(
select distinct bor.customer_name
from borrower bor
)
) and b.branch_name in(
select distinct a.branch_name
from account a
)and b.branch_name in(
select distinct l.branch_name
from loan l
);  


--11
create table customer_new as
select * 
from customer
where 1=2;

--12
insert into customer_new (customer_name, customer_street, customer_city)
select c.customer_name, c.customer_street, c.customer_city
from customer c
where c.customer_name in(
select distinct d.customer_name
from depositor d
union
select distinct b.customer_name
from borrower b
);
    

--13
alter table customer_new
add status  varchar2(15);

--14

update customer_new c
set c.status=(
case
when
(select sum(a.balance)
from account a
where a.branch_name in
(select distinct branch_name
from depositor d
where d.customer_name = c.customer_name)
)>(
select sum(l.amount)
from loan l
where l.branch_name in
(select distinct branch_name
from borrower b
where b.customer_name = c.customer_name)) then 'In savings'
when
(select sum(a.balance)
from account a
where a.branch_name in
(select distinct branch_name
from depositor d
where d.customer_name = c.customer_name)
)<(
select sum(l.amount)
from loan l
where l.branch_name in
(select distinct branch_name
from borrower b
where b.customer_name = c.customer_name)) 
then 'In loan'
else 'In Breakeven'
end
);


--15

select status,count(*) as count
from customer_new
group by status;
