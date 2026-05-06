/* Big companies will provide access to components but not to the state. To accommodate 
this change, we will create two separate folders: one for components and one for state. 
This approach is used by Razorpay.*/

/* In Recoil, atoms function is similarly to `useState` in React. Atoms allow us to set, 
update, and retrieve state variables. By defining the state outside of the main logic, 
we can manage it more effectively. One major advantage of this approach is that it solves 
the problem of unnecessary re-renders. Components or functions that do not use the state 
will not re-render, unlike with Context API, where those components would still re-render. 
This separation also helps in better state management outside the main logic.

There is a folder called store in that place we store all the atoms
In App.jsx we have used a State variable but now we use Atom to create a State Variable    
*/

// Here App1 and Count is not having any state variable
// CountRerender needs count variable
// Buttons need setCount variable

/* 
In Recoil 
If we want only value use
useRecoilValue
If we want to update the value use
useSetRecoilState
useRecoil is same as useState [One is current value, one is for updating the value] 
*/

import { useMemo } from "react";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { countAtom } from "./store/atoms/count.jsx";

// Wrap the complete logic inside the RecoilRoot to work
function App2() {
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
  // Get the value for countAtom so in braces i have written countAtom
  const count = useRecoilValue(countAtom);

  return (
    <div>
      <b>{count}</b>
    </div>
  );
}

// Method 1 Without selectors With selectors visit App2.jsx
function EvenCountRender() {
  // This is slightly Unoptimal because whenever i click on Increase or Decrease buttons
  // This is getting rerendered to stop this use useMemo().
  const count = useRecoilValue(countAtom);
  const isEven = count % 2 == 0;
  console.log("Rerender");
  return <div>{isEven ? "It is even" : null}</div>;
}

function EvenCountRenderOptimised() {
  // Here i am using useMemo() so whenever the count changes then only the function
  // will rerender. Slightly optimal
  const count = useRecoilValue(countAtom);
  console.log("Rerender");
  const isEven = useMemo(() => {
    return count % 2 == 0;
  }, [count]);
  return <div>{isEven ? "It is even" : null}</div>;
}

function Buttons() {
  // Here Buttons does not need count
  // Here whenever i click on Increase or Decrease the value of counter should rerender
  // no need of button is getting rerendered.
  /* 
    For this const [count, setCount] = useRecoilState(countAtom);
    Method-1
    setCount(count + 1)
    Method-2
    setCount(count => count + 1)
    Ideally if we use Method-2 no need of writing count variable in state because it will 
    not get used
    If we are using Method-1 then only count variable will get used 
    
    To make optimal use Method-2 and change the hook from ueRecoilState to useSetRecoilState
    Here only numbers are getting rerendered even the buttons are not getting reredered
    because we are using
    const setCount = useSetRecoilState(countAtom)
    */
  // const [count, setCount] = useRecoilState(countAtom);
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
      {/*<EvenCountRender></EvenCountRender>*/}
      <EvenCountRenderOptimised></EvenCountRenderOptimised>
    </div>
  );
}

export default App2;
