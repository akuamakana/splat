"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateLoggedIn = (request, response, next) => {
    if (!request.session.userId) {
        response.status(401).send();
        return;
    }
    next();
};
exports.default = validateLoggedIn;
//# sourceMappingURL=validateLoggedIn.js.map