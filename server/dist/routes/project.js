"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoute = void 0;
const project_1 = require("./../controllers/project");
const validateLoggedIn_1 = __importDefault(require("../middleware/validateLoggedIn"));
const projectRoute = (app) => {
    app.use((request, response, next) => {
        next();
    });
    app.post('/project', [validateLoggedIn_1.default], project_1.createProject);
};
exports.projectRoute = projectRoute;
//# sourceMappingURL=project.js.map