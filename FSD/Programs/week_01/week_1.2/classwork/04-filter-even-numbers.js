//Write a program prints all the even numbers in an array
const array = [5, 3, 2, 7, 8, 9];
for (let i = 0; i < array.length;i++){
    if(array[i] % 2 == 0){
        console.log("Even numbers in the array is: "+array[i]);
    }
}