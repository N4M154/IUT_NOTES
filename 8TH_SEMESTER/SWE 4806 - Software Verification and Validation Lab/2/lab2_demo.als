sig FsObject{

parent : lone Dir // zero or one

}

sig Dir extends FsObject {

contents : set FsObject //Directories can have directories as children as well as files. Set => zero or more

}

sig File extends FsObject {}

fact {Dir + File = FsObject} // always true

//acyclic
fact acyclic {
all d: Dir, o: d.contents | o.parent = d

}

one sig Root extends Dir{}{no parent} // creates cyclic relationship

fact parentRoot{FsObject in Root.*contents}


assert oneRoot{

one d: Dir | no d.parent

}

check oneRoot for 5
