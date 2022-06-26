/// <reference path="./namespace/namespace.ts" />

namespace App {
  function request(method: method, {url, body, headers}: Params = {}, args: any) {

    const route: Route = {
      // parent
      class: args[0].constructor,
      classMethod: args[1],

      // config for request
      request: {
        origin: args[0].constructor.name.toLowerCase(),
        path: "",
        url: "",
        method,
        // request payload
        payload: {
          headers,
          body,
        }
      }
    };

    /**
     * Validate url
     */
    if (url) {
      route.request.path = url;
      route.request.url = "/" + route.request.origin + "/" + route.request.path;
    } else {
      route.request.path = route.request.origin;
      route.request.url = "/" + route.request.origin + "/";
    }

    /**
     * Send request and bind value
     */
    args[2].value = async (): Promise<Response> => fetch(route.request.url, {...route.request.payload, method: route.request.method});
  }
  
  /**
   * Delete decorator
   */
  const Delete = (value?: Params): Function => (...args: any[]): void => request("delete", value, args);

  /**
   * Post decorator
   */
  const Post = (value?: Params): Function => (...args: any[]): void => request("post", value, args);

  /**
   * Get decorator
   */
  const Get = (value?: Params): Function => (...args: any[]): void => request("get", value, args);

  /**
   * Put decorator
   */
  const Put = (value?: Params): Function => (...args: any[]): void => request("put", value, args);
  
  class ExampleRequest {
    @Get()
    getHello() {}

    @Post()
    postHello() {}

    @Delete()
    deleteHello() {}

    @Put()
    putHello() {}
  }  

  const ex = new ExampleRequest();

  console.log("get", ex.getHello());
  console.log("put", ex.putHello());
  console.log("post", ex.postHello());
  console.log("delete", ex.deleteHello());
}
