type Publication = {
    id: number,
    user_id: number,
    message: string,
    parent_publication_id: number | null,
    comment: Boolean | null,
    main: Boolean | null,
    created_at: string,
    updated_at: string | null,
    mentions: string | null,
    locked: boolean,
}
export default Publication;