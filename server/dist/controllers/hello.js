"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const hello = (request, response, next) => {
    response.status(200).send('Hello world');
};
exports.hello = hello;
//# sourceMappingURL=hello.js.map