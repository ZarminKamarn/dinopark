export type AttractionRow = {
    id: number | null,
    name: string,
    type: string,
    min_height: number,
    children_are_allowed: boolean,
    image: string | null,
    park_id: number
}