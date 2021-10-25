"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoute = void 0;
const verifyLoggedIn_1 = __importDefault(require("../middleware/verifyLoggedIn"));
const verifyAccess_1 = __importDefault(require("../middleware/verifyAccess"));
const verifyRole_1 = __importDefault(require("../middleware/verifyRole"));
const project_1 = require("./../controllers/project");
const projectRoute = (app) => {
    app.post('/project', [verifyLoggedIn_1.default, (0, verifyRole_1.default)(3)], project_1.createProject);
    app.put('/project/:id', [verifyLoggedIn_1.default, verifyAccess_1.default, (0, verifyRole_1.default)(3)], project_1.updateProject);
    app.delete('/project/:id', [verifyLoggedIn_1.default, verifyAccess_1.default, (0, verifyRole_1.default)(3)], project_1.deleteProject);
    app.get('/project', [verifyLoggedIn_1.default], project_1.getProjects);
    app.get('/project/:id', [verifyLoggedIn_1.default, verifyAccess_1.default, (0, verifyRole_1.default)(2)], project_1.getProject);
};
exports.projectRoute = projectRoute;
//# sourceMappingURL=project.js.map