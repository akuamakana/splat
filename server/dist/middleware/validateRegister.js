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
const User_1 = require("../entity/User");
const validateRegister = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    // simple verification of email
    if (!request.body.email.includes('@')) {
        response.status(400).send({
            field: 'email',
            message: 'Invalid email',
        });
    }
    // username contains @
    if (request.body.username.includes('@')) {
        response.status(400).send({
            field: 'username',
            message: 'Invalid username',
        });
    }
    // username length
    if (request.body.username.length <= 3) {
        response.status(400).send({
            field: 'username',
            message: 'Too short, minimum length is 4 characters',
        });
    }
    // password length
    if (request.body.password.length <= 3) {
        response.status(400).send({
            field: 'password',
            message: 'Too short, minimum length is 4 characters',
        });
    }
    try {
        let userRepository = (0, typeorm_1.getRepository)(User_1.User);
        let user = yield userRepository.findOne({ username: request.body.username });
        if (user) {
            response.status(400).send({ field: 'username', message: 'Failed. Username is already taken.' });
            return;
        }
        user = yield userRepository.findOne({ email: request.body.email });
        if (user) {
            response.status(400).send({ field: 'email', message: 'Failed. Email is already in use.' });
            return;
        }
        next();
    }
    catch (error) {
        response.status(500).send({ message: error.message });
        return;
    }
});
exports.default = validateRegister;
//# sourceMappingURL=validateRegister.js.map