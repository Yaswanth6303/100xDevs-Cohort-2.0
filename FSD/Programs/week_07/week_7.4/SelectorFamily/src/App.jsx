import './App.css'
import { RecoilRoot, useRecoilState } from 'recoil';
import { todosAtomFamily } from './atoms';

function App() {
  return <RecoilRoot>
    <Todo id={1}/>
    {/*Here for every id it will not send seperate request for backend. It will send
    only one request and it get cached*/}
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={3} />
    <Todo id={3} />
  </RecoilRoot>
}

function Todo({id}) {
   const [todo, setTodo] = useRecoilState(todosAtomFamily(id));

  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  )
}

export default App

/*
What happens when the values aren't loaded immedietely?
For example, the TODOs that are coming back from the server?
How can we show loader on screen when that happens rather than an empty state?

See Solution in Lodables
*/