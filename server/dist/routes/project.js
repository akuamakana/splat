"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoute = void 0;
const validateLoggedIn_1 = __importDefault(require("../middleware/validateLoggedIn"));
const verifyAccess_1 = __importDefault(require("../middleware/verifyAccess"));
const project_1 = require("./../controllers/project");
const projectRoute = (app) => {
    app.post('/project', [validateLoggedIn_1.default], project_1.createProject);
    app.put('/project', [validateLoggedIn_1.default, verifyAccess_1.default], project_1.updateProject);
    app.delete('/project', [validateLoggedIn_1.default, verifyAccess_1.default], project_1.deleteProject);
    app.get('/project', [validateLoggedIn_1.default], project_1.getProjects);
    app.get('/project/:id', [validateLoggedIn_1.default], project_1.getProject);
};
exports.projectRoute = projectRoute;
//# sourceMappingURL=project.js.map