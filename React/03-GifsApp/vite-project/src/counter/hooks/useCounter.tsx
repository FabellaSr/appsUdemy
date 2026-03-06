import { useState } from 'react'

export const useCounter = ( initialValue: number = 5) => {
    const [counter, setCounter] = useState(initialValue);
    const handlerAdd = () => {
        setCounter(counter + 1);
    }
    const handlerSubstract = () => {
        setCounter((prevState) => prevState - 1);
    }
    const handlerReset = () => {
        setCounter(initialValue);
    }
    return {
        counter,
        handlerAdd,
        handlerSubstract,
        handlerReset
    }
}
