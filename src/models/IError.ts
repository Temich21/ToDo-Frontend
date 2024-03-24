export default interface IError {
    status: number
    data: {
        errors: string[]
        message: string
    }
}