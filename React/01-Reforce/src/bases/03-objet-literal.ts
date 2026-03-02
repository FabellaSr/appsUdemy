interface Person{
    firstName : string;
    lastName: string;
    age: number;
    address:Address;
}

interface Address{ 
    postalCode : string;
    city : string;
}
const ironman: Person = {
    firstName : 'Tony',
    lastName : 'stark',
    age : 22,
    address: {
        postalCode : 'abs',
        city: 'Sarasa'
    }
}

console.log(ironman);