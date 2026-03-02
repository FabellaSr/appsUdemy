//const myArray:number = [1,2,3,'4',5];
const myArray: number[] = [1,2,3,4,5];

const myArray2 = [...myArray];
const myArray3 = structuredClone(myArray);

myArray.push(10);

console.log(myArray , myArray2, myArray3);