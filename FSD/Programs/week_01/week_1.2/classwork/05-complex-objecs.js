const personArray = ["Yaswanth", "Ganesh", "Priya"];
const genderArray = ["male", "male", "female"];

for(let i = 0;i < personArray.length;i++){
    if(genderArray[i] == "male"){
        console.log(personArray[i] +" is a male.");
    }
}

const people = [
    { firstName: 'John', lastName: 'Doe', gender: 'male' },
    { firstName: 'Jane', lastName: 'Doe', gender: 'female' },
    { firstName: 'Bob', lastName: 'Smith', gender: 'male' },
];
for(let i = 0;i < people.length;i++){
    console.log(people[i]["firstName"] + " is a " + people[i]["gender"]);
}