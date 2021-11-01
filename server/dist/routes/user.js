"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const user_1 = require("../controllers/user");
const verifyLoggedIn_1 = __importDefault(require("../middleware/verifyLoggedIn"));
const verifyRole_1 = __importDefault(require("../middleware/verifyRole"));
const user_2 = require("./../controllers/user");
const userRoute = (app) => {
    app.get('/user', [verifyLoggedIn_1.default, (0, verifyRole_1.default)(3)], user_2.getUsers);
    app.get('/user/me', [verifyLoggedIn_1.default], user_1.me);
    app.put('/user/:id', [verifyLoggedIn_1.default, (0, verifyRole_1.default)(4)], user_2.changeRole);
};
exports.userRoute = userRoute;
//# sourceMappingURL=user.js.map