export type Controller<T, Res> = (input: T) => Promise<{ response: Res | { message: string }; status: number }>
