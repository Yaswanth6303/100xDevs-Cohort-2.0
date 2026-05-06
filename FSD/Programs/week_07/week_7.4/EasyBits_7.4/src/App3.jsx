// Now what ever we have seen that is static 
// Visit AsyncQueriese_7.4 for dynamic.

import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'
import { jobsAtom, messagesAtom, networkAtom, notificationsAtom } from './atoms'
import { useMemo } from 'react'
import { totalNotificationSelector } from './selectors'

// If we want to use any recoil hook it should be wrapped inside the RecoilRoot
function App3() {
  return <RecoilRoot>
    <MainApp></MainApp>
  </RecoilRoot>
}

function MainApp(){
  const networkNotificationCount = useRecoilValue(networkAtom)
  const jobsAtomCount = useRecoilValue(jobsAtom)
  const messagingAtomCount = useRecoilValue(messagesAtom)
  const notificationAtomCount = useRecoilValue(notificationsAtom)
  const totalNotificationCount = useRecoilValue(totalNotificationSelector)

  return (
    <>
      <br></br>
      <button>Home</button>
      <button>My Network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>
      <button>Jobs ({jobsAtomCount})</button>
      <button>Messaging ({messagingAtomCount})</button>
      <button>Notification ({notificationAtomCount})</button>

      <button>Me ({totalNotificationCount})</button>
    </>
  )
}

export default App3
