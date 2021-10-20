"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const project_1 = require("./project");
const auth_1 = require("./auth");
const hello_1 = require("./hello");
exports.routes = {
    hello: hello_1.helloRoute,
    auth: auth_1.authRoute,
    project: project_1.projectRoute,
};
//# sourceMappingURL=index.js.map