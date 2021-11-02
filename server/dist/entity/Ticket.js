"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = exports.TicketType = exports.TicketPriority = exports.TicketStatus = void 0;
const typeorm_1 = require("typeorm");
const Project_1 = require("./Project");
const User_1 = require("./User");
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "open";
    TicketStatus["IN_PROGRESS"] = "in progress";
    TicketStatus["CLOSED"] = "closed";
})(TicketStatus = exports.TicketStatus || (exports.TicketStatus = {}));
var TicketPriority;
(function (TicketPriority) {
    TicketPriority["LOW"] = "low";
    TicketPriority["MEDIUM"] = "medium";
    TicketPriority["HIGH"] = "high";
})(TicketPriority = exports.TicketPriority || (exports.TicketPriority = {}));
var TicketType;
(function (TicketType) {
    TicketType["BUGS"] = "bugs/errors";
    TicketType["FEATURES"] = "feature requests";
    TicketType["OTHER"] = "other comments";
    TicketType["TRAINING"] = "training/document requests";
})(TicketType = exports.TicketType || (exports.TicketType = {}));
let Ticket = class Ticket {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Ticket.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Project_1.Project, (project) => project.tickets),
    __metadata("design:type", Project_1.Project)
], Ticket.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { nullable: false }),
    __metadata("design:type", User_1.User)
], Ticket.prototype, "submitter", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Ticket.prototype, "assigned_user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.OPEN,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TicketPriority,
        default: TicketPriority.MEDIUM,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TicketType,
        default: TicketType.BUGS,
    }),
    __metadata("design:type", String)
], Ticket.prototype, "type", void 0);
Ticket = __decorate([
    (0, typeorm_1.Entity)()
], Ticket);
exports.Ticket = Ticket;
//# sourceMappingURL=Ticket.js.map