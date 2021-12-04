type Scheme = {
    user?: Object
    User?: Function
    related?: Function,
    attributes?: {
        id: number
        sending_user_id: number
        recipient_user_id: number
        message: string
        publication_id: number
        created_at: string
        updated_at: string
        shipped_date: string
        shipped: number | null
    }
}

export default Scheme