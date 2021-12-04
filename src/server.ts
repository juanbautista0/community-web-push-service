import schedule from "node-schedule"
import Worker from "./controllers/Pipeline"

schedule.scheduleJob('* * * * *', Worker)