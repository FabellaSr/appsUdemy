function greet( name: string): string{
    return `Hola ${name}`;
}

const greet2 = (name: string)=> {
    return `Hola ${name}`;
}
const greet3 = (name: string)=>  `Hola ${name}`;

const message = greet('Ivano');
const message2 = greet2('Ivano');

const getUser2 = ()=>{
    return{
        uid: 'abc', 
        username: 'sarasa'
    }
}
const getUser3= ()=>({
        uid: 'abc', 
        username: 'sssaraaasa' })
interface User {
    uid: string;
    usermane: string;
}

function getUser(): User{
    return{
        uid: 'ABS',
        usermane: 'sarasa'}

}
console.log(message, message2,getUser,getUser2,getUser3,greet3);

const myNumb: number[] = [1,2,3,4];

myNumb.forEach( function(value){
    console.log(value);
}
)
myNumb.forEach( (value) => {
    console.log(value);
});
myNumb.forEach(console.log);