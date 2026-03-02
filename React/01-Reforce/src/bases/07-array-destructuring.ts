const caracterNames = ['Ivan', 'Fermin','Aldana'];

const  [ p1, p2, p3 ] = caracterNames;

console.log( {p1, p2, p3} );


const  [ ,p2_2 ] = caracterNames;
console.log({p2_2});


const  [ ,, p3_3 ] = caracterNames;
console.log(p3_3);

/*const returnsArrayFn = () => {
    return['ABC',123]
}
const[letters, numbers] = returnsArrayFn();//No*/

const returnsArrayFn = () => {
    return['ABC',123] as const;
}
const [ letters, numbers ] = returnsArrayFn();
console.log(letters, numbers);
console.log(numbers + 2);
console.log(letters + 2 );

//Ejercicio
const useState = (value : string) =>{
    return [
        value,
        (entri: string)=>{ 
            console.log(entri);}
            ,] as const;
}
const [ value , setName ] = useState('Ivan');
console.log(value);
setName('ivan80');


