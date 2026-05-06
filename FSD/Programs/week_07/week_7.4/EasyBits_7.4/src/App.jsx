import "./App.css";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import {
  jobsAtom,
  messagesAtom,
  networkAtom,
  notificationsAtom,
} from "./atoms";

// If we want to use any recoil hook it should be wrapped inside the RecoilRoot
function App() {
  return (
    <RecoilRoot>
      <MainApp></MainApp>
    </RecoilRoot>
  );
}

function MainApp() {
  const networkAtomCount = useRecoilValue(networkAtom);
  const jobsAtomCount = useRecoilValue(jobsAtom);
  const notificationAtomCount = useRecoilValue(notificationsAtom);
  // To update the variable like onClick use useRecoilState hook to update.
  const [messagingAtomCount, setMessagingAtomCount] = useRecoilState(messagesAtom);

  // Here i kept brackets becauses, there notification number should be present. It represents
  // the notification number.
  return (
    <>
      <br></br>
      <button>Home</button>
      <button>
        My Network ({networkAtomCount >= 100 ? "99+" : networkAtomCount})
      </button>
      <button>Jobs ({jobsAtomCount})</button>
      <button>Messaging ({messagingAtomCount})</button>
      <button>Notification ({notificationAtomCount})</button>

      <button
        onClick={function () {
          setMessagingAtomCount((messagingAtomCount) => messagingAtomCount + 1);
        }}
      >
        Me
      </button>
    </>
  );
}

export default App;
