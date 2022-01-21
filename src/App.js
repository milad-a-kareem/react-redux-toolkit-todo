import './App.css';
import {useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { todoActions } from './store/todoSlice';

let isFirst = true

function App() {
  const todos = useSelector(state => state.todo.todos);
  const dispatch =  useDispatch()

  const [inputText,setInputText] = useState('')

  const onRemove = (id)=>{
    dispatch(todoActions.removeTodo(id))
  }
  const onAdd = (txt)=>{
    dispatch(todoActions.addTodo(txt))
  }
  const onInput = (e)=>{
    setInputText(e.target.value)
  }

  useEffect(() => {
    fetch('https://todo-demo-e0f6b-default-rtdb.firebaseio.com/todos.json')
    .then(async(res)=>{
      const data = await res.json();
      dispatch(todoActions.replaceTodos(data))
    })
    .catch(err=>{
        console.log(err)}
    )
  },[])

  useEffect(()=>{
    if(!isFirst){
      fetch('https://todo-demo-e0f6b-default-rtdb.firebaseio.com/todos.json', {
      method:'PUT',
      // mode: 'cors',     
      // headers: new Headers({       'Content-Type': 'application/json'    }),
      body: JSON.stringify(todos)
      }).then(res=>{console.log(res)}).catch(err=>{console.log(err)})
    }
    isFirst=false
  },[todos])

  return (
    <div className="App">
      <input onChange={onInput}/>
      <button onClick={()=>{onAdd(inputText)}}>Add todo</button>

      <div>
        {
          todos.map(todo => {
            return <div key={todo.id} style={{margin:'10px', background:'grey', borderRadius:'15px', display:'flex', flexDirection: 'row', alignItems:'center', justifyContent:'space-between', padding:'10px'}}>
              <h2>{todo.text}</h2>
              <button onClick={()=>{onRemove(todo.id)}}>delete</button>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default App;
