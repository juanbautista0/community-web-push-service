import Db from "../utils/Db"
const User = Db.model('User', { tableName: 'users' })
export default User