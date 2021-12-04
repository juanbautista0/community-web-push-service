import Count from "../interfaces/Count"
import Scheme from "../interfaces/Scheme"
import Notification from "../models/Notification"
import User from "../interfaces/User"
import Publication from "../interfaces/Publication"
import EntityNofication from "../interfaces/EntityNofication"
import { PushSubscription } from "web-push"
import Notify from "../utils/Notify";
const Worker = async () => {
    let count: Count[] = await new Notification().query().count().where('shipped', '=', 1)
    if (count.length > 0)
        if (count[0].count > 0) {
            let notifications = await new Notification().where({ 'shipped': '1' }).orderBy('created_at', 'ASC').fetchAll({ withRelated: ['UserFrom', 'UserTo', 'Publication'] })
            notifications.map(async (e: Scheme) => {
                let userTo: User = e.related('UserTo').attributes
                if (userTo.pushsubscription !== null && Object.keys(JSON.parse(userTo.pushsubscription)).length > 0) {
                    let userFrom: User = e.related('UserFrom').attributes;
                    let pushSubscription: PushSubscription = JSON.parse(userTo.pushsubscription);
                    let publication: Publication = e.related('Publication').attributes;
                    let notification: EntityNofication = e.attributes;
                    Notify.sendNotification(pushSubscription, notification, publication,
                        {
                            //User from
                            id: userFrom.id,
                            name: userFrom.name,
                            last_name: userFrom.last_name,
                            email: userFrom.email
                        },
                        {
                            //User To
                            id: userTo.id,
                            name: userTo.name,
                            last_name: userTo.last_name,
                            email: userTo.email
                        }, async ()=> {
                            let val = await new  Notification({ 'id': notification.id }).save({shipped: 2, shipped_date:new Date()})
                            console.log(val.toJSON());
                        }
                    )
                }
            })
        }
    return
}

export default Worker