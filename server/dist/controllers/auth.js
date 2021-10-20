"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.me = exports.login = exports.register = void 0;
const argon2 = __importStar(require("argon2"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const logger_1 = __importDefault(require("../middleware/logger"));
const register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User_1.User();
        user.username = request.body.username;
        user.password = yield argon2.hash(request.body.password);
        user.email = request.body.email;
        yield (0, typeorm_1.getConnection)().manager.save(user);
        logger_1.default.info('Saved a new user with id: ' + user.id);
        response.status(201).send({ message: 'User successfully created.' });
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ message: error.message });
    }
});
exports.register = register;
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne({ username: request.body.username });
        if (!user) {
            response.status(401).send({ field: 'username', message: 'User not found' });
        }
        const validPassword = yield argon2.verify(user.password, request.body.password);
        if (!validPassword) {
            response.status(401).send({ field: 'password', message: 'Invalid password' });
        }
        request.session.userId = user.id;
        response.cookie('userId', user.id, { maxAge: 24 * 60 * 60, httpOnly: true });
        response.status(200).send({ message: 'Log in successful' });
    }
    catch (error) {
        response.status(500).send({ message: error.message });
    }
});
exports.login = login;
const me = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(request.session.userId);
    if (!request.session.userId) {
        response.status(401).send();
    }
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne(request.session.userId);
        response.status(200).send({ username: user.username });
    }
    catch (error) {
        response.status(500);
    }
});
exports.me = me;
//# sourceMappingURL=auth.js.map