import axios from "axios";
import { atom, selector } from "recoil";

// The default value of selector should br synchronous ot the it can be a selector
// which can be asynchronus
export const notifications = atom({
    key: "notifications",
    default: selector({ // This is Asynchronous data querie
        key: "networkAtomSelector",
        // The default function should not be asynchronous, but the get function can be 
        // asynchronous. According to this, the issue of seeing the flash of zeros is 
        // resolved, and we no longer see that flash when reloading. However, there is 
        // still a flash of a white screen while refreshing. This means that it takes time 
        // for the data to load on the screen, and during that time, a white screen is 
        // displayed. We can check this using the setTimeout function.

        // When ever there is a white screen we have to put a loader
        get: async () => {
            // await new Promise(r => setTimeout(r, 5000)) // Means it reloads after 5 sec.
            const response = await axios.get("http://localhost:3000/notifications");
            return response.data;
        },
    })
});
 

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({get}) => {
        const allNotifications = get(notifications);
        return allNotifications.network + 
        allNotifications.jobs + 
        allNotifications.notifications + 
        allNotifications.messaging
    }
})