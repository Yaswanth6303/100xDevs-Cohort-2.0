class Animal {
    constructor(name, legCount) {
      this.name = name
      this.legCount = legCount
    }
    describe() {
      return `${this.name} has ${this.legCount} legs`
    }
  //Another concept called static
    static isAnimal(){
      console.log("Animal")
    }
}
let dog = new Animal("Buddy", 4);
console.log(dog.describe());
//If you want to call directly using class use static function.
Animal.isAnimal();