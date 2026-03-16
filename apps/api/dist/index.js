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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var cors_1 = __importDefault(require("@fastify/cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var db_1 = require("@clawcloud/db");
var apiKeyService_1 = require("./services/apiKeyService");
var socketService_1 = require("./services/socketService");
var telegramService_1 = require("./services/telegramService");
dotenv_1.default.config();
var fastify = (0, fastify_1.default)({
    logger: true
});
fastify.register(cors_1.default, {
    origin: '*'
});
fastify.get('/', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, { hello: 'ClawCloud API running' }];
    });
}); });
fastify.get('/api/instances', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var instances;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1.prisma.instance.findMany()];
            case 1:
                instances = _a.sent();
                return [2 /*return*/, instances];
        }
    });
}); });
// Mock endpoint to register usage
fastify.post('/api/instances/:id/usage', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, tokensUsed, _b, inputTokens, _c, outputTokens, _d, costUsd, _e, metadata, instance, usageRecord, today, todaysUsages, totalCostToday, budget;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                id = request.params.id;
                _a = request.body, tokensUsed = _a.tokensUsed, _b = _a.inputTokens, inputTokens = _b === void 0 ? 0 : _b, _c = _a.outputTokens, outputTokens = _c === void 0 ? 0 : _c, _d = _a.costUsd, costUsd = _d === void 0 ? 0 : _d, _e = _a.metadata, metadata = _e === void 0 ? null : _e;
                return [4 /*yield*/, db_1.prisma.instance.findUnique({
                        where: { id: id },
                        include: { user: true }
                    })];
            case 1:
                instance = _f.sent();
                if (!instance) {
                    return [2 /*return*/, reply.status(404).send({ error: 'Instance not found' })];
                }
                return [4 /*yield*/, db_1.prisma.tokenUsage.create({
                        data: {
                            tokensUsed: tokensUsed,
                            inputTokens: inputTokens,
                            outputTokens: outputTokens,
                            costUsd: costUsd,
                            metadata: metadata,
                            instanceId: id,
                            userId: instance.userId,
                        }
                    })];
            case 2:
                usageRecord = _f.sent();
                today = new Date();
                today.setHours(0, 0, 0, 0);
                return [4 /*yield*/, db_1.prisma.tokenUsage.findMany({
                        where: {
                            userId: instance.userId,
                            date: { gte: today }
                        }
                    })];
            case 3:
                todaysUsages = _f.sent();
                totalCostToday = todaysUsages.reduce(function (sum, u) { return sum + u.costUsd; }, 0);
                // Broadcast real-time update
                (0, socketService_1.broadcastTokenUsage)(id, {
                    newRecord: usageRecord,
                    totalCostToday: totalCostToday
                });
                budget = instance.user.dailyBudget || 0;
                if (!(budget > 0)) return [3 /*break*/, 6];
                if (!(totalCostToday > budget)) return [3 /*break*/, 5];
                return [4 /*yield*/, telegramService_1.TelegramService.sendBudgetAlert(instance.user.telegramHandle || '', instance.name, totalCostToday, budget)];
            case 4:
                _f.sent();
                _f.label = 5;
            case 5:
                // Auto-pruning flag
                if (totalCostToday > budget * 0.8) {
                    return [2 /*return*/, { status: 'recorded', pruneRecommended: true }];
                }
                _f.label = 6;
            case 6: return [2 /*return*/, { status: 'recorded', pruneRecommended: false }];
        }
    });
}); });
fastify.post('/api/instances/:id/rotate-key', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var id, newKey, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, apiKeyService_1.DopplerMockService.rotateInstanceKey(id)];
            case 2:
                newKey = _a.sent();
                // Real implementation would safely update and deploy the instance
                return [2 /*return*/, { status: 'success', message: 'API Key rotated securely' }];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, reply.status(500).send({ error: 'Failed to rotate API Key' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var port, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
                // Initialize Socket.io attached to the fastify server
                (0, socketService_1.initSocket)(fastify.server);
                return [4 /*yield*/, fastify.listen({ port: port, host: '0.0.0.0' })];
            case 1:
                _a.sent();
                console.log("Server listening at http://localhost:".concat(port));
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                fastify.log.error(err_2);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
start();
