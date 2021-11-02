"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const project_1 = require("./project");
const auth_1 = require("./auth");
const hello_1 = require("./hello");
const user_1 = require("./user");
const ticket_1 = require("./ticket");
exports.routes = {
    hello: hello_1.helloRoute,
    auth: auth_1.authRoute,
    project: project_1.projectRoute,
    user: user_1.userRoute,
    ticket: ticket_1.ticketRoute,
};
//# sourceMappingURL=index.js.map