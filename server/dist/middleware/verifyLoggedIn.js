"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const verifyLoggedIn = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.session.userId) {
        response.status(401).send();
        return;
    }
    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
    const user = yield userRepository.findOne(request.session.userId, { relations: ['role'] });
    if (!user) {
        response.status(401).send();
        return;
    }
    response.locals.user = user;
    response.locals.userRole = user.role.id;
    next();
});
exports.default = verifyLoggedIn;
//# sourceMappingURL=verifyLoggedIn.js.map