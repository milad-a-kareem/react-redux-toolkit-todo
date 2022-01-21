import { createSlice } from "@reduxjs/toolkit";

const initialTodo = {
    todos:[]
}
const todosReducer = createSlice({
    name: 'todos',
    initialState:initialTodo,
    reducers: {
        addTodo(state, action){
            state.todos.unshift({id: Math.round(Math.random()*10000000), text: action.payload})
        },
        removeTodo(state, action){
            state.todos= state.todos.filter(todo => todo.id !== action.payload)
        },
        replaceTodos(state, action){
            state.todos = action.payload
        },
    }
})
export const todoActions = todosReducer.actions

export default todosReducer.reducer