sig Person {	
father : lone Man, mother: lone Woman, children: set Person}

sig Man extends Person {
wife : lone Woman}

sig Woman extends Person {
husband: lone Man}

fact {Man + Woman = Person} 

fact marriage{wife = ~husband}

fact children{
all p : Person, c : p.children | (c.father = p or c.mother = p) } 

fact childrenInverse{
children = ~father + ~mother}

fact noPersonCanBeTheirOwnAncestor {
    no p : Person | p in p.*(father + mother)}

fact doNotMarryAncestor {
    no m : Man | m.wife in m.*(father + mother)
    no w : Woman | w.husband in w.*(father + mother)}

fact SiblingsDoNotMarry {}

assert noSelfFather{
no p:Person|p.father=p}
check noSelfFather for 5

assert noSelfMother{
no p:Person|p.mother=p}
check noSelfMother for 5

