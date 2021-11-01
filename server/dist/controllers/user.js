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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.changeRole = exports.me = void 0;
const typeorm_1 = require("typeorm");
const Role_1 = require("../entity/Role");
const User_1 = require("../entity/User");
const logger_1 = __importDefault(require("../middleware/logger"));
const me = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne(request.session.userId, { relations: ['role'] });
        if (!user) {
            response.status(401).send();
            return;
        }
        response.status(200).send(user);
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500);
    }
});
exports.me = me;
const changeRole = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne(request.params.id);
        if (!user) {
            response.status(404).send({ field: 'user', message: 'User not found' });
            return;
        }
        if (user.id === request.session.userId) {
            response.status(400).send({ field: 'user', message: 'Cannot update self' });
            return;
        }
        if (!request.body.role) {
            response.status(400).send({ field: 'role', message: 'Invalid role value' });
            return;
        }
        const roleRepository = (0, typeorm_1.getRepository)(Role_1.Role);
        const role = yield roleRepository.findOneOrFail(request.body.role);
        if (!role) {
            response.status(404).send({ field: 'role', message: 'Role not found' });
            return;
        }
        user.role = role;
        userRepository.save(user);
        logger_1.default.info(`User: ${user.id} update to role ${role.name}`);
        response.status(200).send({ field: 'alert', message: 'User updated successfully' });
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ error: error.message });
    }
});
exports.changeRole = changeRole;
const getUsers = (_, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const users = yield userRepository.find({ relations: ['role'] });
        response.status(200).send(users);
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ error: error.message });
    }
});
exports.getUsers = getUsers;
//# sourceMappingURL=user.js.map