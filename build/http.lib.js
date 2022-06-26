"use strict";
/// <reference path="./namespace/namespace.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var App;
(function (App) {
    function request(method, { url, body, headers } = {}, args) {
        const route = {
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
        }
        else {
            route.request.path = route.request.origin;
            route.request.url = "/" + route.request.origin + "/";
        }
        /**
         * Send request and bind value
         */
        args[2].value = () => __awaiter(this, void 0, void 0, function* () { return yield (yield fetch(route.request.url, Object.assign(Object.assign({}, route.request.payload), { method: route.request.method }))).json(); });
    }
    /**
     * Delete decorator
     */
    const Delete = (value) => (...args) => request("delete", value, args);
    /**
     * Post decorator
     */
    const Post = (value) => (...args) => request("post", value, args);
    /**
     * Get decorator
     */
    const Get = (value) => (...args) => request("get", value, args);
    /**
     * Put decorator
     */
    const Put = (value) => (...args) => request("put", value, args);
    class ExampleRequest {
        getHello() { }
        postHello() { }
        deleteHello() { }
        putHello() { }
    }
    __decorate([
        Get()
    ], ExampleRequest.prototype, "getHello", null);
    __decorate([
        Post()
    ], ExampleRequest.prototype, "postHello", null);
    __decorate([
        Delete()
    ], ExampleRequest.prototype, "deleteHello", null);
    __decorate([
        Put()
    ], ExampleRequest.prototype, "putHello", null);
    const ex = new ExampleRequest();
    const flow = () => __awaiter(this, void 0, void 0, function* () {
        console.log(yield ex.getHello());
    });
    // console.log("get", ex.getHello());
    // console.log("put", ex.putHello());
    // console.log("post", ex.postHello());
    // console.log("delete", ex.deleteHello());
    flow();
})(App || (App = {}));
