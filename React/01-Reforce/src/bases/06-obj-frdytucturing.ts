const person = {
    name: 'Ivan',
    age: 32, 
    key: 'Ivan80',
};
//const { age, key, name } = person;
const { age:anio, key, name:ivanName } = person;
console.log({ivanName,key,anio});

interface Hero {
    name: string;
    age: number;
    key: string;
    rank?: string;
}

/*const useContext = (hero: Hero) =>{
    const { age, key, name } = hero;
    return {
        keyName: 'ABX'
    }
}*/
const useContext = ({name, age, key,rank}: Hero) =>{ 
    return {
        keyName: key,
        user: {
            name: name,
            age,
        },
        rank
    }
}
const context = useContext(person);
console.log(context);

console.log(context.user.age);

const { 
    keyName, 
    rank, 
    user: {name ,age}} = useContext(person);

console.log({keyName,rank,name,age});