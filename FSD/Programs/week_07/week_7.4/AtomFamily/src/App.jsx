import "./App.css";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { todosAtomFamily } from "./atoms";
import { useEffect } from "react";

function App() {
  return (
    <RecoilRoot>
      {/*Todo will automatically updated after 3 seconds.*/}
      <UpdaterComponent></UpdaterComponent>
      <Todo id={1} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
    </RecoilRoot>
  );
}

function UpdaterComponent() {
  // Here i am setting new values for todo id 2 so i used useSetRecoilState for id=2
  const updateTodo = useSetRecoilState(todosAtomFamily(2));

  useEffect(() => {
    setTimeout(() => {
      updateTodo({
        id: 2,
        title: "Go to bath",
        description: "Go to bath by 8:30 AM",
      });
    }, 3000);
  }, []);
  return <div></div>;
}

function Todo({ id }) {
  // Here the todos to be fetched via atom
  // If 2 todos is having same id it should hit the same atom if 2 todos is having different
  // values we should create a fresh atom for them. This problem will be solved by atom family.

  // With the help of the ID i can get the unique Todo atom from the atom family.
  const currentTodo = useRecoilValue(todosAtomFamily(id));

  return (
    <>
      {currentTodo.title}
      <br></br>
      {currentTodo.description}
      <br />
      <br></br>
    </>
  );
}

export default App;

// Now this is hardcoded if the data. if the data is dynamic we should use selector family.
