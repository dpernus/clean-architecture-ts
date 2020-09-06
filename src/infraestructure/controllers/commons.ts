export type Controller<T, Res> = (input: T) => { response: Res | { message: string }; status: number }
