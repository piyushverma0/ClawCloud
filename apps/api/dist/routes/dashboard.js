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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRoutes = dashboardRoutes;
var db_1 = require("@clawcloud/db");
function dashboardRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            // 1. SOUL Profile
            fastify.get('/api/instances/:id/soul', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var id, instance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = request.params.id;
                            return [4 /*yield*/, db_1.prisma.instance.findUnique({ where: { id: id } })];
                        case 1:
                            instance = _a.sent();
                            if (!instance)
                                return [2 /*return*/, reply.status(404).send({ error: 'Not found' })];
                            return [2 /*return*/, instance.soulProfile || { name: '', personality: '', goals: '', constraints: '' }];
                    }
                });
            }); });
            fastify.put('/api/instances/:id/soul', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var id, soulProfile, instance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = request.params.id;
                            soulProfile = request.body;
                            return [4 /*yield*/, db_1.prisma.instance.update({
                                    where: { id: id },
                                    data: { soulProfile: soulProfile }
                                })];
                        case 1:
                            instance = _a.sent();
                            return [2 /*return*/, instance.soulProfile];
                    }
                });
            }); });
            // 2. Memories
            fastify.get('/api/instances/:id/memories', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var id, search;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = request.params.id;
                            search = request.query.search;
                            return [4 /*yield*/, db_1.prisma.memory.findMany({
                                    where: {
                                        instanceId: id,
                                        content: search ? { contains: search, mode: 'insensitive' } : undefined
                                    },
                                    orderBy: { createdAt: 'desc' }
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            fastify.delete('/api/instances/:id/memories/:memoryId', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var memoryId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            memoryId = request.params.memoryId;
                            return [4 /*yield*/, db_1.prisma.memory.delete({ where: { id: memoryId } })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            }); });
            fastify.post('/api/instances/:id/memories/dedupe', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // Mock background job trigger
                    return [2 /*return*/, { status: 'job_started', message: 'Deduplication background job has been triggered.' }];
                });
            }); });
            // 3. Channels
            fastify.get('/api/instances/:id/channels', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = request.params.id;
                            return [4 /*yield*/, db_1.prisma.channel.findMany({ where: { instanceId: id } })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            fastify.post('/api/instances/:id/channels', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var id, _a, platform, token, isActive;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            id = request.params.id;
                            _a = request.body, platform = _a.platform, token = _a.token, isActive = _a.isActive;
                            return [4 /*yield*/, db_1.prisma.channel.create({
                                    data: { instanceId: id, platform: platform, token: token, isActive: isActive }
                                })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            }); });
            // 4. Cron Jobs
            fastify.get('/api/instances/:id/cron', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = request.params.id;
                            return [4 /*yield*/, db_1.prisma.cronJob.findMany({ where: { instanceId: id } })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            fastify.post('/api/instances/:id/cron', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var id, _a, name, schedule, action;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            id = request.params.id;
                            _a = request.body, name = _a.name, schedule = _a.schedule, action = _a.action;
                            return [4 /*yield*/, db_1.prisma.cronJob.create({
                                    data: { instanceId: id, name: name, schedule: schedule, action: action }
                                })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            }); });
            fastify.put('/api/instances/:id/cron/:cronId/toggle', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var cronId, status;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cronId = request.params.cronId;
                            status = request.body.status;
                            return [4 /*yield*/, db_1.prisma.cronJob.update({
                                    where: { id: cronId },
                                    data: { status: status }
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            // 5. Skills
            fastify.get('/api/instances/:id/skills', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = request.params.id;
                            return [4 /*yield*/, db_1.prisma.skill.findMany({ where: { instanceId: id } })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            fastify.post('/api/instances/:id/skills', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var id, _a, name, description, registryId;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            id = request.params.id;
                            _a = request.body, name = _a.name, description = _a.description, registryId = _a.registryId;
                            if (!registryId) return [3 /*break*/, 2];
                            // Increment install count on the registry
                            return [4 /*yield*/, db_1.prisma.skillRegistry.update({
                                    where: { id: registryId },
                                    data: { installs: { increment: 1 } }
                                })];
                        case 1:
                            // Increment install count on the registry
                            _b.sent();
                            _b.label = 2;
                        case 2: return [4 /*yield*/, db_1.prisma.skill.create({
                                data: { instanceId: id, name: name, description: description, registryId: registryId }
                            })];
                        case 3: return [2 /*return*/, _b.sent()];
                    }
                });
            }); });
            fastify.delete('/api/instances/:id/skills/:skillId', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var skillId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            skillId = request.params.skillId;
                            // Decrease install count? Keeping it simple for now or maybe we don't decrement on uninstall.
                            return [4 /*yield*/, db_1.prisma.skill.delete({ where: { id: skillId } })];
                        case 1:
                            // Decrease install count? Keeping it simple for now or maybe we don't decrement on uninstall.
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                    }
                });
            }); });
            fastify.get('/api/instances/:id/skills/usage', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = request.params.id;
                            return [4 /*yield*/, db_1.prisma.skillUsage.findMany({
                                    where: { instanceId: id },
                                    include: { registry: true }
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            // 6. Session Health (Logs)
            fastify.get('/api/instances/:id/logs', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = request.params.id;
                            return [4 /*yield*/, db_1.prisma.sessionLog.findMany({
                                    where: { instanceId: id },
                                    orderBy: { createdAt: 'desc' },
                                    take: 100 // Last 100 logs
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); });
            fastify.post('/api/instances/:id/restart', function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = request.params.id;
                            // Log the restart request
                            return [4 /*yield*/, db_1.prisma.sessionLog.create({
                                    data: {
                                        instanceId: id,
                                        level: 'WARN',
                                        message: 'System restart initiated by user'
                                    }
                                })];
                        case 1:
                            // Log the restart request
                            _a.sent();
                            return [2 /*return*/, { status: 'restarting', message: 'Instance restart signal sent' }];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
