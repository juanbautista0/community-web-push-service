import Db from "../utils/Db"
import Publication from "./Publication"
import User from "./User"

const Notification = Db.model("Notification", {
    tableName: "notifications",
    UserFrom() {
        return this.hasOne(User, 'id', 'sending_user_id')
    },
    UserTo() {
        return this.hasOne(User, 'id', 'recipient_user_id')
    },
    Publication() {
        return this.hasOne(Publication, 'id', 'publication_id')
    }
})

export default Notification