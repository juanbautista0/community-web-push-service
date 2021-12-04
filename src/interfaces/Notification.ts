import Actions from "./Actions"

type Notification = {
    title: string,
    body: string,
    vibrate: number[],
    image: string,
    actions: Actions[]
}
export default Notification