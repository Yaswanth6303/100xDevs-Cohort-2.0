import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { countAtom, evenSelector } from "./store/atoms/count.jsx";

// Wrap the complete logic inside the RecoilRoot to work
function App3() {
  return (
    <div>
      <RecoilRoot>
        <Count></Count>
      </RecoilRoot>
    </div>
  );
}

function Count() {
  console.log("re-render");
  return (
    <div>
      <CountRenderer></CountRenderer>
      <Buttons></Buttons>
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);

  return (
    <div>
      <b>{count}</b>
    </div>
  );
}

function EvenCountRender() {
  const isEven = useRecoilValue(evenSelector);

  return <div>{isEven ? "It is even" : null}</div>;
}

function Buttons() {
  const setCount = useSetRecoilState(countAtom);
  console.log("buttons re-rendererd");

  return (
    <div>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount((count) => count - 1);
        }}
      >
        Decrease
      </button>
      <EvenCountRender></EvenCountRender>
    </div>
  );
}

export default App3;