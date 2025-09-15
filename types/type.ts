export type productType = {
    parentProduct: string,
    children?: string[] | null
}

export type user = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}