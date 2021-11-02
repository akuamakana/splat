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
exports.removeUserFromProject = exports.addUserToProject = exports.getProject = exports.getProjects = exports.deleteProject = exports.updateProject = exports.createProject = void 0;
const typeorm_1 = require("typeorm");
const Project_1 = require("../entity/Project");
const User_1 = require("../entity/User");
const logger_1 = __importDefault(require("../middleware/logger"));
const createProject = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.body.title.length < 3) {
            response.status(400).send({ field: 'title', message: 'Too short' });
            return;
        }
        const projectRepository = (0, typeorm_1.getRepository)(Project_1.Project);
        const project = new Project_1.Project();
        project.title = request.body.title;
        project.description = request.body.description;
        if (response.locals.user) {
            project.user = response.locals.user;
            project.assigned_users = [response.locals.user];
            yield projectRepository.save(project);
            logger_1.default.info('Project created successfully: ' + project.id);
            response.status(201).send(Object.assign({ field: 'alert', message: 'Project successfully created.' }, project));
        }
        else {
            response.status(401).send({ message: 'Access denied' });
            return;
        }
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ message: error.message });
    }
});
exports.createProject = createProject;
const updateProject = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.body.title.length < 3) {
            response.status(400).send({ field: 'title', message: 'Too short' });
            return;
        }
        if (response.locals.projectRepository && response.locals.project) {
            const updatedProject = yield response.locals.projectRepository.save(Object.assign({ id: response.locals.project.id }, request.body));
            response.status(200).send(Object.assign({ field: 'alert', message: 'Project successfully updated.' }, updatedProject));
        }
        else {
            response.status(401).send({ field: 'alert', message: 'Access denied' });
        }
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ message: error.message });
    }
});
exports.updateProject = updateProject;
const deleteProject = (_, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (response.locals.projectRepository && response.locals.project) {
            yield response.locals.projectRepository.remove(response.locals.project);
            response.status(200).send({ field: 'alert', message: 'Project successfully deleted.' });
        }
        else {
            response.status(401).send({ field: 'alert', message: 'Access denied' });
        }
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ message: error.message });
    }
});
exports.deleteProject = deleteProject;
const getProjects = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectRepository = (0, typeorm_1.getRepository)(Project_1.Project);
        const projects = yield projectRepository
            .createQueryBuilder('project')
            .leftJoinAndSelect('project.assigned_users', 'assigned_users')
            .where(`assigned_users.id = ${request.session.userId}`)
            .orderBy('project.updated_at', 'DESC')
            .getMany();
        response.status(200).send(projects);
    }
    catch (error) {
        response.status(500).send({ error: error.message });
    }
});
exports.getProjects = getProjects;
const getProject = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const project = yield ((_a = response.locals.projectRepository) === null || _a === void 0 ? void 0 : _a.findOne(request.params.id, { relations: ['assigned_users', 'assigned_users.role'] }));
        if (!project) {
            response.status(404).send({ message: 'Project not found' });
            return;
        }
        response.status(200).send(project);
    }
    catch (error) {
        response.status(500).send({ error: error.message });
    }
});
exports.getProject = getProject;
const addUserToProject = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne(request.params.uid);
        const projectRepository = (0, typeorm_1.getRepository)(Project_1.Project);
        const project = yield projectRepository.findOne(request.params.id, { relations: ['assigned_users'] });
        if (!project) {
            response.status(404).send({ message: 'Project not found' });
            return;
        }
        if (user && project) {
            const _assignedUsers = project.assigned_users.filter((_user) => user.id === _user.id);
            if (_assignedUsers.length === 1) {
                response.status(400).send({ field: 'alert', message: 'User is already in project' });
                return;
            }
            project.assigned_users = [...project.assigned_users, user];
            yield (projectRepository === null || projectRepository === void 0 ? void 0 : projectRepository.save(project));
            logger_1.default.info(`User: ${user === null || user === void 0 ? void 0 : user.id} added to project: ${project.id}`);
            response.status(200).send({ field: 'alert', message: 'User added to project' });
        }
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ error: error.message });
    }
});
exports.addUserToProject = addUserToProject;
const removeUserFromProject = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectRepository = (0, typeorm_1.getRepository)(Project_1.Project);
        const project = yield projectRepository.findOne(request.params.id, { relations: ['assigned_users'] });
        if (!project) {
            response.status(404).send({ message: 'Project not found' });
            return;
        }
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = yield userRepository.findOne(request.params.uid);
        if (user) {
            if (user.id === request.session.userId) {
                response.status(400).send({ field: 'alert', message: 'Unable to remove self from project' });
                return;
            }
            const _assignedUsers = project.assigned_users.filter((_user) => user.id !== _user.id);
            if (_assignedUsers.length === 0) {
                response.status(403).send({ field: 'alert', message: 'User is not in project' });
                return;
            }
            project.assigned_users = _assignedUsers;
        }
        yield (projectRepository === null || projectRepository === void 0 ? void 0 : projectRepository.save(project));
        logger_1.default.info(`User: ${user === null || user === void 0 ? void 0 : user.id} removed from project: ${project.id}`);
        response.status(200).send({ field: 'alert', message: 'User removed from project' });
    }
    catch (error) {
        logger_1.default.error(error);
        response.status(500).send({ error: error.message });
    }
});
exports.removeUserFromProject = removeUserFromProject;
//# sourceMappingURL=project.js.map