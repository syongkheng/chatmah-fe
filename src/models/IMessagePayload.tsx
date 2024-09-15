export interface IMessagePayload {
  message: string | undefined;
}

export const defaultMessagePayload: IMessagePayload = {
  message: '',
}