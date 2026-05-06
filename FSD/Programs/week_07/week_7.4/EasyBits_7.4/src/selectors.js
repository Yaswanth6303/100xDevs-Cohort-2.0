import { selector } from "recoil";
import { jobsAtom, messagesAtom, networkAtom, notificationsAtom } from "./atoms";

// totalNotificationSelector depends on all 4 atoms
export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    // Value is a function which give access to the get object
    get: ({get}) => {
        const networkAtomCount = get(networkAtom)
        const jobsAtomCount = get(jobsAtom)
        const notificationAtomCount = get(notificationsAtom) 
        const messageAtomCount = get(messagesAtom)
        return networkAtomCount + jobsAtomCount + notificationAtomCount + messageAtomCount 
    }
})