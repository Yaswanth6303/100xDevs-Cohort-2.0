import { atom, selector } from "recoil";

// Here everything will come to 0 for one second while doing refresh to solve this we should
// use asnchronus selector function. This has done in atoms_1.js
export const notifications = atom({
    key: "notifications",
    default: {
        network: 0, 
        jobs: 0, 
        messaging: 0, 
        notifications: 0
    }
});

// This will not work because we can't use Asynchronus functions in default.
/*export const notifications = atom({
    key: "networkAtom",
    default: () => {
        const res = await.get("https://sum-server.100xdevs.com/notifications")
        return res.data
    }
});*/

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