import './App.css'
import { RecoilRoot, useRecoilStateLoadable } from 'recoil';
import { todosAtomFamily } from './atoms';

function App() {
  return <RecoilRoot>
    <Todo id={1}/>
    <Todo id={2} />
  </RecoilRoot>
}

function Todo({id}) {
   const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id));
   //const todo `= useRecoilValueLoadable(todosAtomFamily(id));

   if (todo.state === "loading") {
      return <div>
        loading...
      </div>
   } else if(todo.state === "hasValue"){
      return (
        <>
          {todo.contents.title}
          {todo.contents.description}
          <br />
        </>
      )
  } else if(todo.state === "hasError") {
    return(
      <div>Error while getting data from backend</div>
    )
  }
}

// Learn Suspense API & ErrorBoundary we can use this for showing loading to the user when
// data is being fetched from backend
export default App
