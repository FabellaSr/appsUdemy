
const myPromise = new Promise<number>( (resolve, reject) =>{
//const myPromise = new Promise( (resolve, reject) =>{
    setTimeout(() => {
        //!dale gato
        //resolve(100);
        reject('Mi amigo se borro');
    }, 2000);
})

myPromise
    .then(
       ( myMoneyIsBack ) => {
        console.log(`tengo mi platita ${myMoneyIsBack}`);
       }
    )
    .catch( reason => {
        console.warn(reason);
    })
    .finally(
        () => {
            console.log('Cagaste');
        }
        );