import { useCounter } from "../hooks/useCounter"


export const MyCounterApp = () => {

    const { counter, handlerAdd, handlerSubstract, handlerReset } = useCounter(7);
    return (
        <div >
            <h1>Counter: {counter}</h1>
            <button onClick={handlerAdd}>+1</button>
            <button onClick={handlerSubstract}>-1</button>
            <button onClick={handlerReset}>Reset</button>
        </div>
    )
}

