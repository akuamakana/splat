"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const auth_1 = require("../controllers/auth");
const verifyLoggedIn_1 = __importDefault(require("../middleware/verifyLoggedIn"));
const validateRegister_1 = __importDefault(require("../middleware/validateRegister"));
const authRoute = (app) => {
    app.post('/auth/register', [validateRegister_1.default], auth_1.register);
    app.post('/auth/login', auth_1.login);
    app.get('/auth/me', [verifyLoggedIn_1.default], auth_1.me);
};
exports.authRoute = authRoute;
//# sourceMappingURL=auth.js.map