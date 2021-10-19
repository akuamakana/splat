"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const auth_1 = require("../controllers/auth");
const validateRegister_1 = __importDefault(require("../middleware/validateRegister"));
const authRoute = (app) => {
    app.use((request, response, next) => {
        next();
    });
    app.post('/auth/register', [validateRegister_1.default], auth_1.register);
};
exports.authRoute = authRoute;
//# sourceMappingURL=auth.js.map