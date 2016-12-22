import Person from "./person";

let person = new Person("Roma", "G");

document.getElementById("nameSpan").innerHTML = person.getFirstName() + " " + person.getLastName();