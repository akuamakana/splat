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
exports.createProject = void 0;
const typeorm_1 = require("typeorm");
const Project_1 = require("../entity/Project");
const logger_1 = __importDefault(require("../middleware/logger"));
const createProject = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = new Project_1.Project();
        project.name = request.body.name;
        project.description = request.body.description;
        const user = (0, typeorm_1.getRepository)(User);
        yield (0, typeorm_1.getConnection)().manager.save(project);
        logger_1.default.info('Project created successfully: ' + project.id);
        response.status(201).send({ message: 'Project successfully created.' });
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ message: error.message });
    }
});
exports.createProject = createProject;
//# sourceMappingURL=project.js.map