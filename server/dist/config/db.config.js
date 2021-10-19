"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
exports.dbConfig = {
    host: 'localhost',
    username: 'root',
    password: 'passw0rd',
    database: 'splat',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
//# sourceMappingURL=db.config.js.map