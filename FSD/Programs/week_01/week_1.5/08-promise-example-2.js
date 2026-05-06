// function kiratsAsyncFunction() {
//     let p = new Promise(function (resolve) {
//         resolve('Hi there');
//     });
//     return p;
// }
//
// const value = kiratsAsyncFunction();
// console.log(value);
//
// value.then(function (data) {
//     console.log(data);
// });
//
// console.log('Hi');

function kiratsAsyncFunction1() {
    let p = new Promise(function (resolve) {
        setTimeout(resolve, 2000);
    });
    return p;
}

const value1 = kiratsAsyncFunction1();
console.log(value1);
value1.then(function () {
    console.log('hi there');
});
