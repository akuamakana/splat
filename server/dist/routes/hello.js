"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloRoute = void 0;
const hello_1 = require("../controllers/hello");
const helloRoute = (app) => {
    app.get('/hello', hello_1.hello);
};
exports.helloRoute = helloRoute;
//# sourceMappingURL=hello.js.map