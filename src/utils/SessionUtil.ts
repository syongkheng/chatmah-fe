export class SessionUtil {
  static extractJwtPayload = (token: string) => {
    return JSON.parse(atob(token.split(".")[1]))['username'];
  }
}