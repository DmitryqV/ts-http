namespace App {
  type ClassMethod = string;
  type Class = any;
  export type method = string;

  export interface Params {
    url?: string
    body?: BodyInit
    headers?: HeadersInit
  }  

  interface IRequest {
    origin: string
    path: string
    url: string
    method: method
    payload: {
      [key: string]: HeadersInit | BodyInit | undefined;
    }
  }

  export interface Route {
    class: Class
    classMethod: ClassMethod
    request: IRequest
  }
}