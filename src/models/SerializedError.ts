export interface SerializedError {
  status?: number,
  data?: {
    message: string,
    stack: string
  }
}