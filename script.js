// var num1;
// function addFive(num){
// const text1 = "This is text1 message";
//     if(2+2 === 4){
//         var num2 = 17;
//     }
// console.log(text1);  
//     return num + 12;
// };
// const ans = addFive(10);
// console.log(ans);
// console.log(num2);


// let string = "Hi, My name is Shyam";
// string = string.substring(4);
// console.log(string);


// const list = {
//     name: "shyam",
//     food: "pizza",
//     city: "jaipur"
// };


// const property = 'food';
// console.log(list.name);    //shyam
// console.log(list['name']);  //shyam
// console.log(list[property]);  //pizza

// 1. If there is not any property is find then it will return the undefined
// 2. If there is two property name is same then second one will overwrite the first one.



//--------------------Classes and Objects----------------------

// const me = {
//     name: {
//         firstName: "shyam",
//         lastName: "singh"
//     },
//     location: {
//         streetNumber: "20",
//         streetName: "street 1",
//         city:"jaipur",
//         pinCode: "302020",
//         state:"Raj",
//         country: "India"
//     },
//     getAddress(){
//         return `
//         ${this.name.firstName}
//         ${this.name.lastName}
//         ${this.location.streetNumber}
//         ${this.location.streetName}`;
//     }
// };
// console.log(me.getAddress());
// const ans = this.getAddress();
// console.log(ans);


// class Sample{
//     sum(num1, num2){
//         return num1 + num2;
//     }
// };

// const obj = new Sample();
// const ans = obj.sum(12, 23);
// console.log(`The sum of two numbers are ${ans}`);

//---------------------------------------------------------------


//-----------------Arrow function-----------------

// const myfunction1 = (num1, num2) =>{
//     return num1 * num2;
// }

// const ans = myfunction1(12, 12);
// console.log(ans);


// const myfunction2 = () =>{
//     console.log("This is my first function");
// };

// console.log(myfunction2());


//-----------------------------------------------------

// console.log(this === window)   // returns as true




//------------------Array in Js-------------------------
// const list = [
//     23, 34, 43, 54, 22, 32, 12, 24, 35, 67
// ];
// console.log(list.length);
// console.log(list.join(" | "));
// console.log(list[0]);
// console.log(list.slice(3,5));    //push(), pop(), shift()  --> rmeove, unshift()


//------------------------------------------------------


//-----------------------For loops and forEach in Js------

// const  items = [
//     "Ram",
//     "shyam",
//     "rohit",
//     "rahul",
//     "shivam",
//     "Raju",
//     "Mohan"
// ];


// //Method 1 

// for(let i = 0;i<items.length; i++){
//     console.log(i, items[i]);
// };


// //Method 2
// let iterator = 0;
// items.forEach(function myfunction(item){
//     console.log(`${iterator}, ${item}`);
//     iterator++;
// });

//--------------------------------------------------------

//-------------DOM in Js---------------------
// const redSquare = document.querySelector(".red-square");
// redSquare.style.backgroundColor = "#f06";
// redSquare.style.width = "124px";

const getAllHeading = document.querySelectorAll(".headings");
for(let i = 0;i<getAllHeading.length;i++){
    const item = getAllHeading[i];
    item.innerHTML = "Modified by JavaScripts";
};


const getButton = document.querySelector(".event-button");
getButton.addEventListener("click", function(){
    alert("Hey There!!!!")
})