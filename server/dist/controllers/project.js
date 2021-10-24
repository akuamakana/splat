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
exports.getProject = exports.getProjects = exports.deleteProject = exports.updateProject = exports.createProject = void 0;
const typeorm_1 = require("typeorm");
const Project_1 = require("../entity/Project");
const User_1 = require("../entity/User");
const logger_1 = __importDefault(require("../middleware/logger"));
const createProject = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectRepository = (0, typeorm_1.getRepository)(Project_1.Project);
        const project = new Project_1.Project();
        project.title = request.body.title;
        project.description = request.body.description;
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne(request.session.userId);
        if (!user) {
            response.status(401).send();
            return;
        }
        project.user = user;
        yield projectRepository.save(project);
        logger_1.default.info('Project created successfully: ' + project.id);
        const _project = Object.assign(Object.assign({}, project), { user: undefined });
        response.status(201).send({ field: 'alert', message: 'Project successfully created.', project: _project });
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ message: error.message });
    }
});
exports.createProject = createProject;
const updateProject = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProject = yield response.locals.projectRepository.save(Object.assign({ id: response.locals.project.id }, request.body));
        response.status(200).send({ field: 'alert', message: 'Project successfully updated.', project: updatedProject });
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ message: error.message });
    }
});
exports.updateProject = updateProject;
const deleteProject = (_, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield response.locals.projectRepository.remove(response.locals.project);
        response.status(200).send({ field: 'alert', message: 'Project successfully deleted.' });
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ message: error.message });
    }
});
exports.deleteProject = deleteProject;
const getProjects = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne(request.session.userId);
        const projectRepository = (0, typeorm_1.getRepository)(Project_1.Project);
        const projects = yield projectRepository.find({ user });
        response.status(200).send({ projects });
    }
    catch (error) {
        response.status(500).send({ error: error.message });
    }
});
exports.getProjects = getProjects;
const getProject = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectRepository = (0, typeorm_1.getRepository)(Project_1.Project);
        const project = yield projectRepository.findOne(request.params.id);
        if (!project) {
            response.status(404).send({ message: 'Project not found' });
            return;
        }
        response.status(200).send({ project });
    }
    catch (error) {
        response.status(500).send({ error: error.message });
    }
});
exports.getProject = getProject;
//# sourceMappingURL=project.js.map