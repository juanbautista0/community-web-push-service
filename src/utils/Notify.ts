import dotenv from "dotenv"
import webpush from "web-push"
import InArray from "./InArray"
import LogManager from "./LogManager"
import { PushSubscription } from "web-push"
import EntityNofication from "../interfaces/EntityNofication"
import Publication from "../interfaces/Publication"
import User from "../interfaces/User"
import VAPIDKeys from "../interfaces/VAPIDKeys"

dotenv.config()
const issetKeys = (keys: string[]) => {
    if (typeof process.env.SERVICE_VAPIDKEYS === 'undefined')
        return false;

    var count = 0;
    const current = Object.keys(JSON.parse(process.env.SERVICE_VAPIDKEYS)) ?? [];

    for (let i = 0; i < keys.length; i++)
        if (InArray(keys[i], current))
            count++

    if (keys.length === count)
        return true;

    return false;

}
const Notify = {
    sendNotification: (pushSubscription: PushSubscription, notification: EntityNofication, publication: Publication, userFrom?: User, userTo?: User, callback?: Function) => {
        if (Notify.keysValidate()) {
            const vapidkeys = Notify.getKeys();
            webpush.setVapidDetails(
                process.env.SERVICE_WEB_PUSH_CONTACT,
                vapidkeys.publicKey,
                vapidkeys.privateKey
            );
            const payload = {
                "data": {
                    "notification": notification,
                    "publication": publication,
                    "user_from": userFrom,
                    "user_to": userTo,
                    "date": new Date()
                },
                "notification": {
                    "title": notification.message,
                    "body": notification.message,
                    "vibrate": [100, 50, 100],
                    "icon": (typeof process.env.SERVICE_ICON !== 'undefined') ? process.env.SERVICE_ICON : '',
                    "actions": [{
                        "action": "Explore",
                        "title": "Ir a la app"
                    }]
                }
            }

            webpush.sendNotification(pushSubscription, JSON.stringify(payload))
                .then(res => (typeof callback !== 'undefined') ? callback() : true)
                .catch(err => LogManager.set({
                    from: 'sendNotification',
                    recommendation: '',
                    date: new Date()
                }, 'Message not sent'))
        }
    },
    keysValidate: () => {
        try {
            if (typeof process.env.SERVICE_VAPIDKEYS !== 'undefined')
                if (issetKeys(["publicKey", "privateKey"]))
                    return true
        } catch (e) {
            LogManager.set({
                from: 'keysValidate',
                recommendation: 'validate environment variables',
                date: new Date()
            }, (e as Error).message)
        }
    },
    getKeys: (): VAPIDKeys => {
        const formmater: VAPIDKeys = JSON.parse(process.env.SERVICE_VAPIDKEYS);
        return {
            privateKey: formmater.privateKey ?? '',
            publicKey: formmater.publicKey ?? ''
        }
    }
}

export default Notify;