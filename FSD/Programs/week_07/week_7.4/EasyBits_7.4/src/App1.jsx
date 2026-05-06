// Using useSetRecoilState

import "./App.css";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
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
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsAtomCount = useRecoilValue(jobsAtom);
  const notificationAtomCount = useRecoilValue(notificationsAtom);
  const messagingAtomCount = useRecoilValue(messagesAtom);

  // Here i kept brackets becauses, there notification number should be present. It represents
  // the notification number.
  return (
    <>
      <br></br>
      <button>Home</button>
      <button>
        My Network (
        {networkNotificationCount >= 100 ? "99+" : networkNotificationCount})
      </button>
      <button>Jobs ({jobsAtomCount})</button>
      <button>Messaging ({messagingAtomCount})</button>
      <button>Notification ({notificationAtomCount})</button>

      <ButtonUpdater></ButtonUpdater>
    </>
  );
}

function ButtonUpdater() {
  const setMessagingAtomCount = useSetRecoilState(messagesAtom);
  return (
    <button
      onClick={function () {
        setMessagingAtomCount((messagingAtomCount) => messagingAtomCount + 1);
      }}
    >
      Me
    </button>
  );
}

export default App;
