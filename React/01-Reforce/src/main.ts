import './style.css'
//import './bases/01-const-let';
//import './bases/05-functions'
import './bases/08-imp-exp'
import { getHeroeByOwner } from './bases/08-imp-exp';
import { Owner } from './data/heroes.data';
//import './bases/09-promises'
//import './bases/10-fetch-api'
import './bases/11-async-await'
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div> 
    <h1>Hello Vite + React!</h1>
  </div>
`
console.log(getHeroeByOwner(Owner.DC));