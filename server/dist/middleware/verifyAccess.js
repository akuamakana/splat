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
const typeorm_1 = require("typeorm");
const Project_1 = require("../entities/Project");
const logger_1 = __importDefault(require("../lib/logger"));
const verifyAccess = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectRepository = (0, typeorm_1.getRepository)(Project_1.Project);
        const project = yield projectRepository
            .createQueryBuilder('project')
            .where(`project.id = ${request.params.id}`)
            .leftJoinAndSelect('project.assigned_users', 'user')
            .andWhere(`user.id = ${request.session.userId}`)
            .getOne();
        if (!project) {
            response.status(404).send({ field: 'alert', message: 'Project not found' });
            return;
        }
        response.locals.projectRepository = projectRepository;
        response.locals.project = project;
        next();
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ message: error.message });
    }
});
exports.default = verifyAccess;
//# sourceMappingURL=verifyAccess.js.map