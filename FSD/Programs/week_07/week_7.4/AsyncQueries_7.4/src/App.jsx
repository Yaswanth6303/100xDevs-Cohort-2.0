// Here we are getting the data from backend but this is ugly method.
// Here the problem is when we are doing refresh we will see that all the variables come
// to their default value. And then the values will get updated and other problem is
// there is a lot of ugly code.

/* We have set that the default value is 0 but it should be like that whenever we open
the app we should see the atchual data which is there in the backend not the value 0.

To solve this, in atoms.js convert const `notification` from default values to asynchronus
function i.e.; we have to write backend logic in notification in atoms.js but that will not
work because the `default` value for the atom should be synchronus or it can be a selector
which can be synchronus. So because of this "Asynchronus data queries" comes into picture.
*/
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { notifications, totalNotificationSelector } from './atoms'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}

function MainApp() {
  const [networkCount, setNetworkCount] = useRecoilState(notifications)
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  useEffect(() => {
    // fetch
    axios.get("http://localhost:3000/notifications")
      .then((res) => {
        setNetworkCount(res.data)
      })
  }, [])

  return (
    <>
      <button>Home</button>
      
      <button>My network ({networkCount.network >= 100 ? "99+" : networkCount.network})</button>
      <button>Jobs {networkCount.jobs}</button>
      <button>Messaging ({networkCount.messaging})</button>
      <button>Notifications ({networkCount.notifications})</button>

      <button>Me ({totalNotificationCount})</button>
    </>
  )
}

export default App
