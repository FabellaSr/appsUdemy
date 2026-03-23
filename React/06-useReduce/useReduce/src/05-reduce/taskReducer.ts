import * as z from "zod/v4"
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskState {
    todos: Todo[];
    length: number;
    complete: number;
    pending: number;
}

export type TaskAction =
    { type: 'ADD_TODO', payload: string } |
    { type: 'TOGGLE_TODO', payload: number } |
    { type: 'DELETE_TODO', payload: number };

const TodoSchema = z.object({
    id : z.number(),
    text : z.string(),
    completed : z.boolean()
});

const TaskStateScheme = z.object({
    todos: z.array(TodoSchema),
    length: z.number(),
    complete: z.number(),
    pending: z.number()
})

export const getTaskInitialState = ():TaskState => {
    const localStorageState = localStorage.getItem('task-space')
    if(!localStorageState){
        return{
            todos: [],
            complete: 0,
            pending:0,
            length:0,
        }
    }
    //validar mediante Zod
    const resultado = TaskStateScheme.safeParse(JSON.parse(localStorageState));
    if (resultado.error) {
        return{
            todos: [],
            complete: 0,
            pending:0,
            length:0,
        }
    }
    return JSON.parse(localStorageState);

};

export const taskReucer = (
    state: TaskState,
    accion: TaskAction
): TaskState => {

    switch (accion.type) {
        case 'ADD_TODO': {
            const newTodo: Todo = {
                id: Date.now(),
                text: accion.payload.trim(),
                completed: false,
            };
            return {
                ...state,
                length: state.todos.length + 1,
                pending: state.pending + 1,
                todos: [...state.todos, newTodo]
            };
        }

        case 'DELETE_TODO': {
            const currentTodos = state.todos.filter((todo) => todo.id != accion.payload);


            return {
                ...state,
                length: currentTodos.length,
                complete: currentTodos.filter((todo) => todo.completed).length,
                pending: currentTodos.filter((todo) => !todo.completed).length,
                todos: currentTodos
            }
        }

        case 'TOGGLE_TODO': {
            const updateTodos = state.todos.map((todo) => {
                if (todo.id === accion.payload) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            return {
                ...state,
                todos: updateTodos,

                complete: updateTodos.filter((todo) => todo.completed).length,
                pending: updateTodos.filter((todo) => !todo.completed).length,
            };
        }
        default:
            return state;
    }

    return state;
}