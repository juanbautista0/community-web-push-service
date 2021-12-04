type PushSubscription = {
    endpoint?: string
    keys?: {
        auth?: string,
        p256dh?: string
    }
}

export default PushSubscription