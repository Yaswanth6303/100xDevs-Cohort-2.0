import "./App.css";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import {
  jobsAtom,
  messagesAtom,
  networkAtom,
  notificationsAtom,
} from "./atoms";
import { useMemo } from "react";

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
  const messagingAtomCount = useRecoilValue(messagesAtom);
  const notificationAtomCount = useRecoilValue(notificationsAtom);
  // Now i want the total number of notifications on Me so i should add all the notification
  // Which are present
  // const totalNotificationCount = networkNotificationCount + jobsAtomCount + notificationAtomCount + messagingAtomCount;
  /*But the above approach is not optimal. It will always be reredering whenever
  we call function MainApp() Eventhough there is no change in the value. To rectify that
  use useMemo() hook
  useMemo will help us if any particular value changes then only it will rerender otherwise
  it will not rerender*/
  // useMemo dependends on these 4 things networkNotificationCount, jobsAtomCount,notificationAtomCount
  // messagingAtomCount. If these value changes then itself rerender happens
  // Check App3.jsx for using Selectors. App3.jsx is more better
  const totalNotificationCount = useMemo(() => {
    return (
      networkNotificationCount +
      jobsAtomCount +
      notificationAtomCount +
      messagingAtomCount
    );
  }, [
    networkNotificationCount,
    jobsAtomCount,
    notificationAtomCount,
    messagingAtomCount,
  ]);

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

      <button>Me ({totalNotificationCount})</button>
    </>
  );
}

export default App;
